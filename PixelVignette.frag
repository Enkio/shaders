// Author: Enkio
// Title: Pixel Vignette

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
const vec3 color = vec3(0.238,0.957,0.995);

float random (vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);}

void main() {
    
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = uv;
    vec3 scene = vec3(0.);
    
    vec2 center = uv * 2. - 1.;
    float border = max(abs(center.x), abs(center.y));
    
    vec2 ipos = floor(uv * 80.);
    
    vec2 local = vec2(random(ipos));
    local -= u_time *1.5;
    local.y = fract(local.y);
    
    float pixel_effect = length(local.y);
	float grad = smoothstep(0.8, 1., border);
    float d = grad * (1. - pixel_effect);
    
	scene = mix(scene, vec3(d), color);
    gl_FragColor = vec4(scene, 1.0);
}