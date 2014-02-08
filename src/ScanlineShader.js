THREE.ScanlineShader = {

	uniforms: {
		"tDiffuse":        { type: "t", value: null }
	},

	vertexShader: [
		"varying vec2 vUv;",

		"void main() {",
			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}"
	].join("\n"),

	fragmentShader: [
        "varying mediump vec2 vUv;",
        "uniform sampler2D tDiffuse;",

        "void main() {",
            "vec4 color = texture2D(tDiffuse, vUv);",
            "if(sin(vUv.y * 160. * 1.5 * 3.14159265) > 0.){",
                "color = color * 0.9;",
            "}",
            "gl_FragColor = color;",
        "}"
	].join("\n")
};
