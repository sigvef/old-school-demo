function createPlasmaShaderMaterial(uniforms) {

    var vertexShaders = [

        "varying vec2 v_coords;",

        "void main() {",
            "v_coords = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}",
    ""].join("\n");

    var fragmentShaders = [
        "uniform float time;",
        "uniform float scale;",
        "float v = 0.0;",
        "varying vec2 v_coords;",

        "void main() {",
            "vec2 c = v_coords * scale - scale/2.;",
            "v += sin((c.x + time));",
            "v += sin((c.y + time) / 2.);",
            "v += sin((c.x + c.y + time) / 2.);",
            "c += .5 * vec2(sin(time / 3.), cos(time / 2.));",
            "v += sin(sqrt(c.x * c.x + c.y * c.y + 1.)+ time);",
            "v = v / 2.;",
            "vec3 col = vec3(sin(3.14159265 * v), 1, cos(3.14159265 * v));",
            "gl_FragColor = vec4(col * .5 + .5, 1);",
        "}",
    ""].join("\n");

    material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShaders,
        fragmentShader: fragmentShaders
    });

    return material;
}
