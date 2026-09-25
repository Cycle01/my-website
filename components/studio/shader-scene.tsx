"use client"

import { useEffect, useRef, useState, type RefObject } from "react"

/*
  Shared runtime for the studio's full-screen fragment-shader scenes
  (dusk-scene.tsx, moon-scene.tsx). No 3D library: one triangle covering the
  canvas and a fragment shader that draws everything.

  Uniforms every scene gets:
    uRes    canvas size in pixels
    uTime   seconds (frozen for reduced motion)
    uMouse  eased pointer position, -1..1 (desktop only)
    uScroll 0 while the scene's top is in view, rising to 1 as it scrolls a
            full height out of view
    uAnchor centre (xy) and radius (z) of an optional DOM element, in the
            shader's coordinates (y up, units of canvas height, origin at the
            centre); z is 0 when no anchor is set

  A poster image (a frame of the same shader) is shown until WebGL is ready and
  stays as the fallback when WebGL is unavailable. Rendering pauses offscreen
  and in hidden tabs.
*/

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

/** Noise helpers and a pine-ridge height function shared by the scenes. */
export const GLSL_COMMON = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;
uniform vec3 uAnchor;

float hash(float n) { return fract(sin(n) * 43758.5453); }
float hash2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(float x) {
  float i = floor(x); float f = fract(x);
  return mix(hash(i), hash(i + 1.0), f * f * (3.0 - 2.0 * f));
}
float noise2(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash2(i), hash2(i + vec2(1.0, 0.0)), u.x),
             mix(hash2(i + vec2(0.0, 1.0)), hash2(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise2(p); p *= 2.03; a *= 0.5; }
  return v;
}

// Height of a ridge of pines at x: soft hills plus overlapping triangular trees.
float ridge(float x, float seed, float dens, float treeH) {
  float hills = noise(x * 1.3 + seed) * 0.06 + noise(x * 3.7 + seed * 2.0) * 0.02;
  float cx = x * dens;
  float c = floor(cx);
  float top = 0.0;
  for (int k = -1; k <= 1; k++) {
    float ci = c + float(k);
    float center = ci + 0.5 + (hash(ci + seed) - 0.5) * 0.6;
    float h = treeH * mix(0.35, 1.0, hash(ci * 1.7 + seed * 3.0));
    float w = mix(0.28, 0.46, hash(ci * 2.3 + seed));
    float d = abs(cx - center) / w;
    // Slightly ragged edges so the pines read as branches, not paper triangles.
    float tiers = 0.12 * (1.0 - d) * abs(sin((1.0 - d) * 9.0 + ci));
    top = max(top, h * (1.0 - d) * (1.0 - tiers));
  }
  return hills + max(top, 0.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)
  if (!sh) return null
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh)
    return null
  }
  return sh
}

interface ShaderSceneProps {
  /** Fragment shader body; GLSL_COMMON is prepended. */
  frag: string
  poster: string
  posterMobile: string
  /** Colour behind the poster while it loads. */
  background: string
  /** Load the poster eagerly (above the fold). */
  priority?: boolean
  /** Start time offset in seconds, so the first frame matches the poster. */
  timeOffset?: number
  /** Element the scene lines something up with (passed as uAnchor). */
  anchor?: RefObject<HTMLElement | null>
  /** uAnchor.z as a fraction of the anchor's width. */
  anchorScale?: number
  className?: string
}

export function ShaderScene({ frag, poster, posterMobile, background, priority = false, timeOffset = 12, anchor, anchorScale = 0.5, className = "" }: ShaderSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const finePointer = window.matchMedia("(pointer: fine)").matches
    const small = window.matchMedia("(max-width: 768px)").matches
    let raf = 0
    let running = false
    let onScreen = true
    let disposed = false
    let cleanupGl = () => {}

    const start = () => {
      if (disposed) return
      const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" })
      if (!gl) return // poster stays

      const vs = compile(gl, gl.VERTEX_SHADER, VERT)
      const fs = compile(gl, gl.FRAGMENT_SHADER, GLSL_COMMON + frag)
      if (!vs || !fs) return
      const prog = gl.createProgram()
      if (!prog) return
      gl.attachShader(prog, vs)
      gl.attachShader(prog, fs)
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
      gl.useProgram(prog)

      const buf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
      const loc = gl.getAttribLocation(prog, "aPos")
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

      const uRes = gl.getUniformLocation(prog, "uRes")
      const uTime = gl.getUniformLocation(prog, "uTime")
      const uMouse = gl.getUniformLocation(prog, "uMouse")
      const uScroll = gl.getUniformLocation(prog, "uScroll")
      const uAnchor = gl.getUniformLocation(prog, "uAnchor")

      // Render below native resolution: the scenes are soft by design, and
      // phones get the lightest setting.
      const scale = small ? 0.5 : Math.min(window.devicePixelRatio || 1, 1.5) * 0.75
      const resize = () => {
        const w = Math.max(1, Math.round(canvas.clientWidth * scale))
        const h = Math.max(1, Math.round(canvas.clientHeight * scale))
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w
          canvas.height = h
          gl.viewport(0, 0, w, h)
        }
      }

      const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
      const onPointer = (e: PointerEvent) => {
        mouse.tx = (e.clientX / window.innerWidth) * 2 - 1
        mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1)
      }
      if (finePointer && !reduced) window.addEventListener("pointermove", onPointer, { passive: true })

      const scrollProgress = () => {
        const r = canvas.getBoundingClientRect()
        return Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)))
      }

      const t0 = performance.now()
      const draw = (now: number) => {
        resize()
        mouse.x += (mouse.tx - mouse.x) * 0.05
        mouse.y += (mouse.ty - mouse.y) * 0.05
        gl.uniform2f(uRes, canvas.width, canvas.height)
        gl.uniform1f(uTime, reduced ? timeOffset : timeOffset + (now - t0) / 1000)
        gl.uniform2f(uMouse, mouse.x, mouse.y)
        gl.uniform1f(uScroll, reduced ? 0 : scrollProgress())
        const a = anchor?.current
        if (a) {
          const cr = canvas.getBoundingClientRect()
          const ar = a.getBoundingClientRect()
          const h = Math.max(1, cr.height)
          gl.uniform3f(
            uAnchor,
            (ar.left + ar.width / 2 - cr.left - cr.width / 2) / h,
            -(ar.top + ar.height / 2 - cr.top - cr.height / 2) / h,
            (ar.width * anchorScale) / h,
          )
        } else {
          gl.uniform3f(uAnchor, 0, 0, 0)
        }
        gl.drawArrays(gl.TRIANGLES, 0, 3)
      }

      const loop = (now: number) => {
        draw(now)
        raf = running ? requestAnimationFrame(loop) : 0
      }
      const setRunning = (on: boolean) => {
        if (reduced) return
        if (on && !running) {
          running = true
          raf = requestAnimationFrame(loop)
        } else if (!on && running) {
          running = false
          cancelAnimationFrame(raf)
          raf = 0
        }
      }

      draw(performance.now())
      setLive(true)
      setRunning(onScreen && !document.hidden)

      const io = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting
        setRunning(onScreen && !document.hidden)
      })
      io.observe(canvas)
      const onVis = () => setRunning(onScreen && !document.hidden)
      document.addEventListener("visibilitychange", onVis)
      const onResize = () => reduced && draw(performance.now())
      window.addEventListener("resize", onResize)

      cleanupGl = () => {
        setRunning(false)
        io.disconnect()
        document.removeEventListener("visibilitychange", onVis)
        window.removeEventListener("resize", onResize)
        window.removeEventListener("pointermove", onPointer)
        gl.getExtension("WEBGL_lose_context")?.loseContext()
      }
    }

    // Let the page's text and images load first; the poster covers the wait.
    const hasIdle = typeof window.requestIdleCallback === "function"
    const idle = hasIdle ? window.requestIdleCallback(start, { timeout: 1200 }) : window.setTimeout(start, 300)

    return () => {
      disposed = true
      if (hasIdle) window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
      cleanupGl()
    }
  }, [frag, timeOffset, anchor, anchorScale])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ background }} aria-hidden="true">
      <picture>
        <source media="(max-width: 768px)" srcSet={posterMobile} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt=""
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${live ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  )
}
