precision mediump float;

uniform vec3 uLightDirection;
uniform vec3 uCameraPosition;
uniform sampler2D uTexture;

varying vec2 vTexcoords;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;

void main(void) {
    // diffuse contribution
    // todo #1 normalize the light direction and store in a separate variable
    gl_FragColor = vec4(uLightDirection, 1.0);

    // Normalize the light direction and visualize it
    vec3 normalizedLightDirection = normalize(uLightDirection);
    gl_FragColor = vec4(normalizedLightDirection, 1.0);

    // // todo #2 normalize the world normal and store in a separate variable
    vec3 normalizedWorldNormal = normalize(vWorldNormal);
    gl_FragColor = vec4(normalizedWorldNormal * 0.5 + 0.5, 1.0);
    // // todo #3 calculate the lambert term
    float lambertTerm = max(dot(normalizedLightDirection, normalizedWorldNormal), 0.0);
    gl_FragColor = vec4(vec3(lambertTerm), 1.0);
    // // specular contribution
    // // todo #4 in world space, calculate the direction from the surface point to the eye (normalized)
    vec3 eyeVector = normalize(uCameraPosition - vWorldPosition);
    vec3 visualizedEyeVector = eyeVector * 0.5 + 0.5;
    gl_FragColor = vec4(visualizedEyeVector, 1.0);

    // // todo #5 in world space, calculate the reflection vector (normalized)
    vec3 reflectionVector = reflect(-normalizedLightDirection, normalizedWorldNormal);
    vec3 visualizedReflectionVector = reflectionVector * 0.5 + 0.5;
    gl_FragColor = vec4(visualizedReflectionVector, 1.0);

    // // todo #6 calculate the phong term
    float specularPower = 64.0;
    float phongTerm = pow(max(dot(reflectionVector, eyeVector), 0.0), specularPower);
    gl_FragColor = vec4(vec3(phongTerm), 1.0);

    // // combine
    // // todo #7 apply light and material interaction for diffuse value by using the texture color as the material
    vec3 materialColor = texture2D(uTexture, vTexcoords).rgb;
    vec3 diffuseColor = materialColor * lambertTerm;
    gl_FragColor = vec4(diffuseColor, 1.0);

    // todo #8 apply light and material interaction for phong, assume phong material color is (0.3, 0.3, 0.3)

    vec3 specularMaterialColor = vec3(0.3, 0.3, 0.3);
    
    vec3 specularColor = specularMaterialColor * phongTerm * vec3(0.6, 0.6, 0.6);
    vec3 ambient = materialColor * 0.1;
    gl_FragColor = vec4(ambient + diffuseColor + specularColor, 1.0);
    
    vec3 albedo = texture2D(uTexture, vTexcoords).rgb;

    ambient = albedo * 0.1;
    // // vec3 diffuseColor = todo
    // // vec3 specularColor = todo

    // // todo #9
    // // add "diffuseColor" and "specularColor" when ready
    // vec3 finalColor = ambient; // + diffuseColor + specularColor;
    vec3 finalColor = ambient + diffuseColor + specularColor;

    gl_FragColor = vec4(finalColor, 1.0);
}

// EOF 00100001-10