"use client"

import { useEffect, useRef, useState } from "react"
import { asset } from "@/lib/asset"

/*
  The studio's hero scene: a fire lookout tower on a forest ridge at sundown,
  with one light left on. Drawn in a single fragment shader (no 3D library):
  four parallax ridgelines of pines, a low sun, drifting fog and a lit cabin
  window. The poster images are frames of this same shader, used as the
  static fallback and as the placeholder while WebGL starts.
*/

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;

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

float sdSeg(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a; vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}
float sdBox(vec2 p, vec2 c, vec2 h) {
  vec2 d = abs(p - c) - h;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float asp = uRes.x / uRes.y;
  // Narrow screens pull the tower and sun toward the centre so both stay in frame.
  float k = clamp(asp / 1.78, 0.42, 1.25);
  float t = uTime;

  // Sky: near-black at the top, ember red, amber at the horizon.
  float sy = p.y;
  vec3 col = mix(vec3(0.88, 0.47, 0.17), vec3(0.36, 0.09, 0.06), smoothstep(-0.12, 0.18, sy));
  col = mix(col, vec3(0.05, 0.027, 0.024), smoothstep(0.12, 0.55, sy));

  // Low sun, sitting just above the far treeline.
  vec2 sunC = vec2(0.36 * k + uMouse.x * 0.006, -0.02);
  float sd = length(p - sunC);
  col += vec3(1.0, 0.62, 0.28) * exp(-sd * 6.0) * 0.35;
  col += vec3(1.0, 0.5, 0.2) * exp(-sd * 2.2) * 0.12;
  col = mix(col, vec3(1.0, 0.86, 0.6), smoothstep(0.062, 0.056, sd));

  // Ridges, far to near. Each layer sways slowly and follows the pointer by depth.
  float bases[4];
  bases[0] = -0.075; bases[1] = -0.15; bases[2] = -0.24; bases[3] = -0.39;
  vec3 tints[4];
  tints[0] = vec3(0.55, 0.22, 0.11);
  tints[1] = vec3(0.29, 0.10, 0.06);
  tints[2] = vec3(0.13, 0.055, 0.04);
  tints[3] = vec3(0.035, 0.02, 0.018);

  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float depth = (fi + 1.0) / 4.0;
    float par = uMouse.x * (0.012 + 0.05 * depth * depth);
    float drift = sin(t * 0.045) * 0.03 * depth;
    float x = p.x + par + drift;
    float dens = mix(46.0, 11.0, depth);
    float treeH = mix(0.045, 0.26, depth * depth);
    float yTop = bases[i] + uMouse.y * 0.01 * depth + ridge(x, fi * 13.1, dens, treeH);

    // Fog pooling above this layer, thinner for nearer layers.
    float fogBand = smoothstep(yTop + 0.09, yTop - 0.01, p.y) * smoothstep(yTop - 0.12, yTop, p.y);
    float fog = fbm(vec2(x * 2.4 - t * 0.015, p.y * 7.0 + fi * 3.0));
    col = mix(col, vec3(0.62, 0.3, 0.18), fogBand * fog * 0.35 * (1.0 - depth * 0.6));

    // The lookout tower stands on the third ridge, drawn first so the ridge's own trees hide its legs.
    if (i == 2) {
      float edge = 1.5 / uRes.y;
      vec2 q = vec2(x - (0.22 * k), p.y);
      float ground = bases[2] - 0.12;
      float cabinB = 0.0;
      float legs = min(sdSeg(q, vec2(-0.05, ground), vec2(-0.028, cabinB)),
                       sdSeg(q, vec2(0.05, ground), vec2(0.028, cabinB)));
      float braces = 1e3;
      for (int b = 0; b < 4; b++) {
        float y0 = mix(ground, cabinB, float(b) / 4.0);
        float y1 = mix(ground, cabinB, float(b + 1) / 4.0);
        float x0 = mix(0.05, 0.028, float(b) / 4.0);
        float x1 = mix(0.05, 0.028, float(b + 1) / 4.0);
        braces = min(braces, sdSeg(q, vec2(-x0, y0), vec2(x1, y1)));
        braces = min(braces, sdSeg(q, vec2(x0, y0), vec2(-x1, y1)));
      }
      float frame = min(legs - 0.0032, braces - 0.0014);
      float cabin = sdBox(q, vec2(0.0, 0.028), vec2(0.046, 0.028));
      float roofY = clamp((0.09 - q.y) / 0.032, 0.0, 1.0);
      float roof = max(abs(q.x) - 0.058 * roofY, max(q.y - 0.09, 0.058 - q.y));
      float deck = sdBox(q, vec2(0.0, 0.0), vec2(0.055, 0.004));
      float tower = min(min(frame, cabin), min(roof, deck));
      float tw = smoothstep(edge, -edge, tower);
      col = mix(col, vec3(0.07, 0.03, 0.025), tw);

      // One light left on.
      float flicker = 0.9 + 0.1 * noise(t * 3.0) + 0.05 * sin(t * 17.0);
      float win = sdBox(q, vec2(-0.017, 0.03), vec2(0.011, 0.012));
      float lit = smoothstep(edge, -edge, win);
      col = mix(col, vec3(1.0, 0.8, 0.45) * flicker, lit);
      col += vec3(1.0, 0.55, 0.22) * exp(-max(win, 0.0) * 55.0) * 0.28 * flicker * (1.0 - lit);
    }
    float edge = 1.5 / uRes.y;
    float inside = smoothstep(edge, -edge, p.y - yTop);
    col = mix(col, tints[i], inside);

  }

  // Low mist over the foreground.
  float mist = fbm(vec2(p.x * 1.5 + t * 0.01, p.y * 3.0 - t * 0.004));
  col = mix(col, vec3(0.25, 0.1, 0.07), smoothstep(-0.2, -0.5, p.y) * mist * 0.25);

  // Vignette.
  vec2 v = p / vec2(max(asp, 1.0) * 0.62, 0.62);
  col *= mix(1.0, 0.45, smoothstep(0.55, 1.35, length(v)));

  gl_FragColor = vec4(col, 1.0);
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

export function DuskScene({ className = "" }: { className?: string }) {
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
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
      if (!vs || !fs) return
      const prog = gl.createProgram()!
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

      // Render below native resolution: the scene is soft by design, and phones
      // get the lightest setting.
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

      const t0 = performance.now()
      const draw = (now: number) => {
        resize()
        mouse.x += (mouse.tx - mouse.x) * 0.05
        mouse.y += (mouse.ty - mouse.y) * 0.05
        gl.uniform2f(uRes, canvas.width, canvas.height)
        gl.uniform1f(uTime, reduced ? 12 : 12 + (now - t0) / 1000)
        gl.uniform2f(uMouse, mouse.x, mouse.y)
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

      // Pause when scrolled away or the tab is hidden.
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
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden bg-[#0d0706] ${className}`} aria-hidden="true">
      <picture>
        <source media="(max-width: 768px)" srcSet={asset("/images/studio/dusk-poster-mobile.webp")} />
        <img
          src={asset("/images/studio/dusk-poster.webp")}
          alt=""
          fetchPriority="high"
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
