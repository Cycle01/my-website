import { asset } from "@/lib/asset"
import { ShaderScene } from "@/components/studio/shader-scene"

/*
  Secrets of Sundown 2's scene: a fire lookout tower on a forest ridge at
  sundown, with one light left on. Four parallax ridgelines of pines, a low
  sun, drifting fog and a lit cabin window, all in one fragment shader.
  The poster images are frames of this same shader.
*/

const FRAG = `
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

export function DuskScene({ className = "" }: { className?: string }) {
  return (
    <ShaderScene
      frag={FRAG}
      poster={asset("/images/studio/dusk-poster.webp")}
      posterMobile={asset("/images/studio/dusk-poster-mobile.webp")}
      background="#0d0706"
      className={className}
    />
  )
}
