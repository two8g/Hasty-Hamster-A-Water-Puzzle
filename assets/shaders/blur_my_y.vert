

attribute vec4 a_position;       // in 2d worldspace
attribute vec4 a_color;
attribute vec2 a_texCoord0;       // texture coordinates for vertex

uniform float uBlurBufferSize;  // 1 / Size of the blur buffer
uniform mat4 u_projTrans;

varying vec4 v_color;
//varying vec2 v_texCoords;         // output original texture coords for fragment shader. [0,1]
varying vec2 vBlurTexCoords[5]; // output texture coords for blur sampling, for fragment shader.

void main() {
   v_color = a_color;
//   v_color.a = v_color.a * (255.0/254.0);
   vec2 v_texCoords = a_texCoord0;
   gl_Position =  u_projTrans * a_position;

    // Pre-calculate the blur texcoords
    vBlurTexCoords[0] = v_texCoords + vec2(0.0, -2.0 * uBlurBufferSize);
    vBlurTexCoords[1] = v_texCoords + vec2(0.0, -1.0 * uBlurBufferSize);
    vBlurTexCoords[2] = v_texCoords;
    vBlurTexCoords[3] = v_texCoords + vec2(0.0,  1.0 * uBlurBufferSize);
    vBlurTexCoords[4] = v_texCoords + vec2(0.0,  2.0 * uBlurBufferSize);
}
