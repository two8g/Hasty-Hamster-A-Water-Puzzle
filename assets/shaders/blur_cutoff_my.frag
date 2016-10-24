

#ifdef GL_ES
  #define LOWP lowp
  precision mediump float;
#else
  #define LOWP
#endif

varying LOWP vec4 v_color;
varying vec2 v_texCoords;         // input original texture coords for fragment
uniform sampler2D u_texture; // texture to blur
uniform float uBlurBufferSize;  // 1 / Size of the blur buffer
                                // shader. [0,1]
varying vec2 vBlurTexCoords[5]; // input texture coords for blur sampling, for
                                // fragment shader.

uniform float minThresh;
uniform float minInnerThresh;
uniform float maxInnerThresh;
uniform float maxThresh;
uniform LOWP vec4 midInnerColor;
uniform LOWP vec4 midOuterColor;

void main()
{
    vec4 sum = vec4(0.0);
//     Gaussian blur. Sigma: 2.3, kernel size: 5.
    sum += texture2D(u_texture, vBlurTexCoords[0]) * 0.164074;
    sum += texture2D(u_texture, vBlurTexCoords[1]) * 0.216901;
    sum += texture2D(u_texture, vBlurTexCoords[2]) * 0.23805;
    sum += texture2D(u_texture, vBlurTexCoords[3]) * 0.216901;
    sum += texture2D(u_texture, vBlurTexCoords[4]) * 0.164074;

    gl_FragColor = sum;
//    gl_FragColor = texture2D(u_texture, vBlurTexCoords[2]);


//  gl_FragColor = v_color;
  float a = sum.a;
  if (a < minThresh) gl_FragColor.a = 0.0;
  else if (maxThresh < a) gl_FragColor.a = v_color.a;
  else if (sum.a < minInnerThresh) gl_FragColor = midOuterColor;
  else if (sum.a < maxInnerThresh) gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  else gl_FragColor = midInnerColor;
}
