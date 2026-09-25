"use client"

import type { RefObject } from "react"
import { asset } from "@/lib/asset"
import { ShaderScene } from "@/components/studio/shader-scene"

/*
  The studio hero's scene: a full moon over a pine ridge at night. Twinkling
  stars, a shaded moon with maria and craters, thin clouds that catch its
  light, and cold mist over three ridgelines. The moon sinks behind the trees
  as the hero scrolls away. The poster images are frames of this same shader.
*/

const FRAG = `
// Moon surface: large dark maria plus small crater pits, on a unit disc.
float moonSurface(vec2 n) {
  float maria = smoothstep(0.52, 0.72, fbm(n * 1.6 + vec2(3.1, 7.4)));
  float pits = 0.0;
  for (int i = 0; i < 9; i++) {
    float fi = float(i);
    vec2 c = vec2(hash(fi * 3.7) * 1.6 - 0.8, hash(fi * 5.3 + 1.0) * 1.6 - 0.8);
    float r = mix(0.05, 0.16, hash(fi * 9.1));
    float d = length(n - c) / r;
    // A darker floor with a lighter rim.
    pits += smoothstep(1.0, 0.15, d) * 0.16 - smoothstep(1.3, 1.0, d) * smoothstep(0.8, 1.0, d) * 0.05;
  }
  float grain = fbm(n * 9.0) * 0.25;
  return clamp(1.0 - maria * 0.38 - pits + grain - 0.12, 0.0, 1.2);
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float asp = uRes.x / uRes.y;
  float t = uTime;
  float wide = step(1.0, asp);

  // Sky: blue-black overhead, a little lighter toward the horizon.
  vec3 col = mix(vec3(0.045, 0.058, 0.08), vec3(0.008, 0.011, 0.02), smoothstep(-0.35, 0.5, p.y));

  // Moon: upper right on wide screens, upper centre-right on phones. It sets as the hero scrolls away.
  // When the hero passes the badge's position (uAnchor), the moon sits right behind it.
  float R = mix(0.1, 0.17, wide);
  vec2 mc = mix(vec2(0.17 * asp, 0.3), vec2(0.27 * asp, 0.19), wide);
  if (uAnchor.z > 0.0) { R = uAnchor.z; mc = uAnchor.xy; }
  mc += vec2(uMouse.x * 0.008, uMouse.y * 0.006);
  mc.y -= uScroll * 0.35;
  float d = length(p - mc);

  // Stars, fading out near the moon and the horizon.
  vec2 sg = p * 70.0;
  vec2 cell = floor(sg);
  float rnd = hash2(cell);
  vec2 sp = vec2(hash2(cell + 7.1), hash2(cell + 3.3)) * 0.8 + 0.1;
  float star = smoothstep(0.1, 0.0, length(fract(sg) - sp)) * step(0.965, rnd);
  float tw = 0.55 + 0.45 * sin(t * (1.0 + rnd * 3.0) + rnd * 40.0);
  col += vec3(0.85, 0.9, 1.0) * 1.4 * star * tw * smoothstep(R * 1.4, R * 3.0, d) * smoothstep(-0.2, 0.15, p.y);

  // Halo.
  col += vec3(0.5, 0.6, 0.78) * exp(-max(d - R, 0.0) * 5.0) * 0.16;
  col += vec3(0.35, 0.45, 0.62) * exp(-max(d - R, 0.0) * 1.6) * 0.07;

  // Disc, lit from the upper left so the lower right falls into soft shadow.
  if (d < R * 1.02) {
    vec2 n = (p - mc) / R;
    float z = sqrt(max(0.0, 1.0 - dot(n, n)));
    vec3 nn = vec3(n, z);
    float light = clamp(dot(nn, normalize(vec3(-0.35, 0.3, 0.9))), 0.0, 1.0);
    float surf = moonSurface(n + vec2(t * 0.002, 0.0));
    vec3 moon = vec3(0.74, 0.77, 0.82) * surf * (0.3 + 0.7 * light);
    moon *= mix(0.72, 1.0, z); // limb darkening
    float edge = 1.5 / uRes.y;
    col = mix(col, moon, smoothstep(R + edge, R - edge, d));
  }

  // Thin clouds drifting across, lit from behind by the moon.
  float cy = p.y - mc.y;
  float band = smoothstep(0.22, 0.0, abs(cy + 0.03)) + 0.6 * smoothstep(0.16, 0.0, abs(cy - 0.2));
  float cloud = fbm(vec2(p.x * 1.4 - t * 0.018, p.y * 6.0 + 2.0));
  cloud = smoothstep(0.45, 0.85, cloud) * band;
  vec3 cloudCol = mix(vec3(0.05, 0.06, 0.08), vec3(0.55, 0.6, 0.7), exp(-d * 4.0));
  col = mix(col, cloudCol, cloud * 0.55);

  // Three ridgelines of pines, far to near, drifting with the pointer by depth.
  float bases[3];
  bases[0] = -0.3; bases[1] = -0.38; bases[2] = -0.5;
  vec3 tints[3];
  tints[0] = vec3(0.04, 0.055, 0.075);
  tints[1] = vec3(0.022, 0.03, 0.043);
  tints[2] = vec3(0.008, 0.01, 0.015);
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float depth = (fi + 1.0) / 3.0;
    float x = p.x + uMouse.x * (0.01 + 0.04 * depth * depth) + sin(t * 0.04) * 0.02 * depth;
    float yTop = bases[i] + ridge(x, fi * 17.3 + 5.0, mix(40.0, 12.0, depth), mix(0.05, 0.22, depth * depth));
    float fogBand = smoothstep(yTop + 0.08, yTop - 0.01, p.y) * smoothstep(yTop - 0.1, yTop, p.y);
    float fog = fbm(vec2(x * 2.2 - t * 0.012, p.y * 7.0 + fi * 3.0));
    col = mix(col, vec3(0.2, 0.25, 0.32), fogBand * fog * 0.3 * (1.0 - depth * 0.6));
    float edge = 1.5 / uRes.y;
    col = mix(col, tints[i], smoothstep(edge, -edge, p.y - yTop));
  }

  // Low mist and vignette.
  float mist = fbm(vec2(p.x * 1.5 + t * 0.01, p.y * 3.0 - t * 0.004));
  col = mix(col, vec3(0.1, 0.12, 0.16), smoothstep(-0.25, -0.5, p.y) * mist * 0.3);
  vec2 v = p / vec2(max(asp, 1.0) * 0.62, 0.62);
  col *= mix(1.0, 0.5, smoothstep(0.6, 1.4, length(v)));

  gl_FragColor = vec4(col, 1.0);
}
`

export function MoonScene({ anchor, className = "" }: { anchor?: RefObject<HTMLElement | null>; className?: string }) {
  return (
    <ShaderScene
      frag={FRAG}
      poster={asset("/images/studio/moon-poster.webp")}
      posterMobile={asset("/images/studio/moon-poster-mobile.webp")}
      background="#05070b"
      priority
      anchor={anchor}
      anchorScale={0.62}
      className={className}
    />
  )
}
