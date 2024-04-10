precision mediump float;
uniform sampler2D uTexture;
uniform float uAlpha;
varying vec2 vTexcoord;
// todo #3 - receive texture coordinates and verify correctness by 
// using them to set the pixel color 
void main(void) {
    // todo #5
    vec4 texColor = texture2D(uTexture, vTexcoord);
    gl_FragColor = vec4(texColor.rgb, uAlpha);
    // todo #3
    //gl_FragColor = vec4(vTexcoord.x, vTexcoord.y, 0.0, uAlpha);
}
// EOF 00100001-10