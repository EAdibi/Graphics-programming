precision mediump float;

uniform sampler2D uTexture;
uniform float uAlpha;

// todo #3 - receive texture coordinates and verify correctness by
// using them to set the pixel color
varying vec2 vTexcoords;

void main(void) {
    // todo #5
    vec4 textureColor = texture2D(uTexture, vTexcoords);

    // todo #3
    gl_FragColor = vec4(textureColor.rgb, uAlpha);
}