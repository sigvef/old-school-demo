THREE.LensShader = {

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
            "vec2 center = vec2(0.5, 0.5);",
            "float radius = 4.;",
            "float scale = -0.25;",
            "vec2 textureCoordinateToUse = vUv;",
            "float dist = distance(center, vUv);",
            "textureCoordinateToUse -= center;",
            "if (dist < radius) {",
                "highp float percent = 1.0 + ((0.5 - dist) / 0.5) * scale;",
                "textureCoordinateToUse = textureCoordinateToUse * percent;",
                "textureCoordinateToUse += center;",
                "vec4 color = texture2D(tDiffuse, textureCoordinateToUse );",
                "if (percent > 1.) {",
                    "color = (1. - (percent - 1.) * 15.) * color;",
                "}",
                "gl_FragColor = color;",
            "}",
        "}"
	].join("\n")
};
