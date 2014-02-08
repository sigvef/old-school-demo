function ScreenScene(){ }

ScreenScene.prototype.NAME = 'screen';
ScreenScene.prototype.startTime = 1488;

ScreenScene.prototype.init = function(done){

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, 16 / 9, 1, 30000);
    this.camera.position.z = 500;
    var geometry = new THREE.SphereGeometry(100, 3, 2);
    this.polyhedrons = [];
    this.polyhedronWires = [];
    this.polyheldronWireMaterial = new THREE.MeshBasicMaterial({
        wireframe: true,
        color: 0x00ff00
    });
    this.polyhedronMaterial = new THREE.MeshBasicMaterial({
        opacity: 0.1,
        transparent: true,
        color: 0x00ff00
    });

    this.piano = [];
    
    for(var i=0;i<16;i++){
        if(i == 1 || i == 4 || i == 6 || i == 8 || i == 11 || i == 13){
            this.piano[i] = new THREE.Mesh(
                new THREE.CubeGeometry(30, 120, 10),
                new THREE.MeshLambertMaterial({
                    color: 0x228822
                })
            );
            this.piano[i].baseColor = 0x228822;
        } else {
            this.piano[i] = new THREE.Mesh(
                new THREE.CubeGeometry(60, 200, 20),
                new THREE.MeshLambertMaterial({
                    color: 0xaaffaa
                })
            );
            this.piano[i].baseColor = 0xaaffaa;
        }
        this.piano[i].exited = 0;
        this.piano[i].maxExited = 20;
        this.piano[i].exitedColor = 0xff9000;
    } 
    this.piano[0].position.x = (0-4.5) * 61;
    this.piano[0].position.y = 100;
    this.piano[0].rotation.x = -3.5;

    this.piano[1].position.x = (0.5-4.5) * 61;
    this.piano[1].position.y = 140;
    this.piano[1].rotation.x = -3.5;

    this.piano[2].position.x = (1-4.5) * 61;
    this.piano[2].position.y = 100;
    this.piano[2].rotation.x = -3.5;

    this.piano[3].position.x = (2-4.5) * 61;
    this.piano[3].position.y = 100;
    this.piano[3].rotation.x = -3.5;

    this.piano[4].position.x = (2.5-4.5) * 61;
    this.piano[4].position.y = 140;
    this.piano[4].rotation.x = -3.5;

    this.piano[5].position.x = (3-4.5) * 61;
    this.piano[5].position.y = 100;
    this.piano[5].rotation.x = -3.5;

    this.piano[6].position.x = (3.5-4.5) * 61;
    this.piano[6].position.y = 140;
    this.piano[6].rotation.x = -3.5;

    this.piano[7].position.x = (4-4.5) * 61;
    this.piano[7].position.y = 100;
    this.piano[7].rotation.x = -3.5;

    this.piano[8].position.x = (4.5-4.5) * 61;
    this.piano[8].position.y = 140;
    this.piano[8].rotation.x = -3.5;

    this.piano[9].position.x = (5-4.5) * 61;
    this.piano[9].position.y = 100;
    this.piano[9].rotation.x = -3.5;

    this.piano[10].position.x = (6-4.5) * 61;
    this.piano[10].position.y = 100;
    this.piano[10].rotation.x = -3.5;

    this.piano[11].position.x = (6.5-4.5) * 61;
    this.piano[11].position.y = 140;
    this.piano[11].rotation.x = -3.5;

    this.piano[12].position.x = (7-4.5) * 61;
    this.piano[12].position.y = 100;
    this.piano[12].rotation.x = -3.5;

    this.piano[13].position.x = (7.5-4.5) * 61;
    this.piano[13].position.y = 140;
    this.piano[13].rotation.x = -3.5;

    this.piano[14].position.x = (8-4.5) * 61;
    this.piano[14].position.y = 100;
    this.piano[14].rotation.x = -3.5;

    this.piano[15].position.x = (9-4.5) * 61;
    this.piano[15].position.y = 100;
    this.piano[15].rotation.x = -3.5;

    this.composer = new THREE.EffectComposer(renderer);
    this.bloomEffect = new THREE.BloomPass(0.75, 16);
    this.noiseEffect = new THREE.ShaderPass(THREE.NoiseShader);
    this.fisheyeEffect = new THREE.ShaderPass(THREE.LensShader);
    this.scanlineEffect = new THREE.ShaderPass(THREE.ScanlineShader);
    this.copyPass = new THREE.ShaderPass(THREE.CopyShader);
    this.copyPass.renderToScreen = true;
    this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));
    this.composer.addPass(this.scanlineEffect);
    this.composer.addPass(this.noiseEffect);
    this.composer.addPass(this.bloomEffect);
    this.composer.addPass(this.fisheyeEffect);
    this.composer.addPass(this.copyPass);

    this.plasmaUniforms = {
        time: {
            type: "f",
            value: 0.1
        },
        scale: {
            type: "f",
            value: 10.
        }
    };

    this.plasmaCube = new THREE.Mesh(
        new THREE.CubeGeometry(200, 200,200),
        createPlasmaShaderMaterial(this.plasmaUniforms)
    );
    for(var i=0;i<6;i++){
        this.polyhedronWires[i] = new THREE.Mesh(geometry,
                this.polyheldronWireMaterial);
        this.polyhedrons[i] = new THREE.Mesh(geometry, this.polyhedronMaterial);
        this.scene.add(this.polyhedrons[i]);
        this.scene.add(this.polyhedronWires[i]);
    }
    this.polyhedrons[0].position.x = this.polyhedronWires[0].position.x = 200;
    this.polyhedrons[0].position.y = this.polyhedronWires[0].position.y = 100;
    this.polyhedrons[1].position.x = this.polyhedronWires[1].position.x = -200;
    this.polyhedrons[1].position.y = this.polyhedronWires[1].position.y = 100;
    this.polyhedrons[2].position.x = this.polyhedronWires[2].position.x = 200;
    this.polyhedrons[2].position.y = this.polyhedronWires[2].position.y = -100;
    this.polyhedrons[3].position.x = this.polyhedronWires[3].position.x = -200;
    this.polyhedrons[3].position.y = this.polyhedronWires[3].position.y = -100;
    this.polyhedrons[4].position.x = this.polyhedronWires[4].position.x = 0;
    this.polyhedrons[4].position.y = this.polyhedronWires[4].position.y = 100;
    this.polyhedrons[5].position.x = this.polyhedronWires[5].position.x = 0;
    this.polyhedrons[5].position.y = this.polyhedronWires[5].position.y = -100;
    var origo = new THREE.Vector3(0, 0, 0);
    this.camera.lookAt(origo);
    this.scrollerCanvas = document.createElement('canvas');
    this.scrollerCanvas.width = 16 * GU;
    this.scrollerCanvas.height = 4 * GU;
    this.scrollerCtx = this.scrollerCanvas.getContext('2d');
    this.scrollerScratchCanvas = document.createElement('canvas');
    this.scrollerScratchCanvas.width = 16 * GU;
    this.scrollerScratchCanvas.height = 4 * GU;
    this.scrollerScratchCtx = this.scrollerScratchCanvas.getContext('2d');
    this.scrollerTexture = new THREE.Texture(this.scrollerCanvas);
    this.scrollerTexture.needsUpdate = true;
    this.scroller = new THREE.Mesh(
        new THREE.CubeGeometry(160 * 5, 40 * 5, 40 * 5),
        new THREE.MeshBasicMaterial({ map: this.scrollerTexture })
    );
    this.scroller.position.z = -200;
    this.scrollerTexture.flipY = true;
    this.scene.add(this.scroller);
    var ambient = new THREE.AmbientLight(0x111111);
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 0, 500);
    this.scene.add(spotLight);
    this.scene.add(ambient);
    this.textX = 2000;
    done();
}

ScreenScene.prototype.update = function(){
    this.noiseEffect.uniforms.width.value = (16*GU)/2;
    this.noiseEffect.uniforms.time.value =  Math.sin(t / 200) * 200;
    this.noiseEffect.uniforms.height.value = (9*GU)/2;
    this.noiseEffect.uniforms.amount.value = 0.03;
    for(var i=0;i<6;i++){
        var polyhedronWire = this.polyhedronWires[i];
        var polyhedron = this.polyhedrons[i];
        polyhedronWire.rotation.x = polyhedron.rotation.x = t / 201 * 4;
        polyhedronWire.rotation.y = polyhedron.rotation.y = t / 93 * 4;
    }
    this.polyhedronMaterial.opacity = (1 + Math.sin(2 * t / 50 / 120 * 145 * Math.PI * 2)) / 2;

    this.textX -= t < 2490 ? 5 : 10;


    /* piano keyboarding */
    var base = 2140;
    switch(t - base){
        case 10: this.piano[3].exited = this.piano[3].maxExited; break;
        case 20: this.piano[5].exited = this.piano[5].maxExited; break;
        case 30: this.piano[12].exited = this.piano[12].maxExited; break;
        case 50: this.piano[3].exited = this.piano[3].maxExited; break;
        case 60: this.piano[5].exited = this.piano[5].maxExited; break;
        case 70: this.piano[15].exited = this.piano[12].maxExited; break;
        case 90: this.piano[3].exited = this.piano[3].maxExited; break;
        case 100: this.piano[13].exited = this.piano[13].maxExited; break;
        case 110: this.piano[12].exited = this.piano[12].maxExited; break;
        case 130: this.piano[3].exited = this.piano[3].maxExited; break;
        case 140: this.piano[5].exited = this.piano[5].maxExited; break;
        case 150: this.piano[8].exited = this.piano[8].maxExited; break;
        case 170: this.piano[3].exited = this.piano[3].maxExited; break;
        case 180: this.piano[5].exited = this.piano[5].maxExited; break;
        case 190: this.piano[10].exited = this.piano[10].maxExited; break;
        case 210: this.piano[8].exited = this.piano[8].maxExited; break;
        case 220: this.piano[13].exited = this.piano[13].maxExited; break;
        case 230: this.piano[12].exited = this.piano[12].maxExited; break;
        case 250: this.piano[8].exited = this.piano[8].maxExited; break;
        case 260: this.piano[10].exited = this.piano[10].maxExited; break;
        case 270: this.piano[3].exited = this.piano[3].maxExited; break;
        case 275: this.piano[5].exited = this.piano[5].maxExited; break;
        case 280: this.piano[0].exited = this.piano[0].maxExited; break;
        case 284: this.piano[3].exited = this.piano[3].maxExited; break;
        case 287: this.piano[5].exited = this.piano[5].maxExited; break;
        case 290: this.piano[8].exited = this.piano[8].maxExited; break;
        case 300: this.piano[10].exited = this.piano[10].maxExited; break;
        case 310: this.piano[5].exited = this.piano[5].maxExited; break;
    }
    switch(t - base - 335){
        case 10: this.piano[3].exited = this.piano[3].maxExited; break;
        case 20: this.piano[5].exited = this.piano[5].maxExited; break;
        case 30: this.piano[12].exited = this.piano[12].maxExited; break;
        case 50: this.piano[3].exited = this.piano[3].maxExited; break;
        case 60: this.piano[5].exited = this.piano[5].maxExited; break;
        case 70: this.piano[15].exited = this.piano[12].maxExited; break;
        case 90: this.piano[3].exited = this.piano[3].maxExited; break;
        case 100: this.piano[13].exited = this.piano[13].maxExited; break;
        case 110: this.piano[12].exited = this.piano[12].maxExited; break;
        case 130: this.piano[3].exited = this.piano[3].maxExited; break;
        case 140: this.piano[5].exited = this.piano[5].maxExited; break;
        case 150: this.piano[8].exited = this.piano[8].maxExited; break;
        case 170: this.piano[3].exited = this.piano[3].maxExited; break;
        case 180: this.piano[5].exited = this.piano[5].maxExited; break;
        case 190: this.piano[10].exited = this.piano[10].maxExited; break;
        case 210: this.piano[8].exited = this.piano[8].maxExited; break;
        case 220: this.piano[13].exited = this.piano[13].maxExited; break;
        case 230: this.piano[12].exited = this.piano[12].maxExited; break;
        case 250: this.piano[8].exited = this.piano[8].maxExited; break;
        case 260: this.piano[10].exited = this.piano[10].maxExited; break;
        case 270: this.piano[3].exited = this.piano[3].maxExited; break;
        case 275: this.piano[5].exited = this.piano[5].maxExited; break;
        case 280: this.piano[0].exited = this.piano[0].maxExited; break;
        case 284: this.piano[3].exited = this.piano[3].maxExited; break;
        case 287: this.piano[5].exited = this.piano[5].maxExited; break;
        case 290: this.piano[8].exited = this.piano[8].maxExited; break;
        case 300: this.piano[10].exited = this.piano[10].maxExited; break;
        case 310: this.piano[5].exited = this.piano[5].maxExited; break;
    }

    


    for(var i=0;i<16;i++){
        var piano = this.piano[i];
        if(piano.exited){
            piano.exited--;
            var amount = 1 - piano.exited / piano.maxExited;
            var fromRed = (0xff0000 & piano.exitedColor) >> 16;
            var fromGreen = (0x00ff00 & piano.exitedColor) >> 8;
            var fromBlue = 0x0000ff & piano.exitedColor;
            var toRed = (0xff0000 & piano.baseColor) >> 16;
            var toGreen = (0x00ff00 & piano.baseColor) >> 8;
            var toBlue = 0x0000ff & piano.baseColor;
            piano.material.color.setHex((lerp(fromRed, toRed, amount) << 16) | lerp(fromGreen, toGreen, amount) << 8 | lerp(fromBlue, toBlue, amount));
            console.log(piano.material.color & 0xff0000, piano.material.color & 0x00ff00, piano.material.color & 0x0000ff );
        }
    }

    if(t == 2140){
        for(var i=0;i<this.polyhedrons.length;i++){
            if(i == 2 || i == 3 || i == 5) continue;
            this.scene.remove(this.polyhedrons[i]);
            this.scene.remove(this.polyhedronWires[i]);
        }
        this.scene.remove(this.scroller);
        for(var i=0;i<16;i++){
            this.scene.add(this.piano[i]);
        }
    }

    for(var i=0;i<16;i++){
        this.piano[i].position.y += Math.sin(i + t / 50 / 120 * 145 * Math.PI) * 0.1;
    }

    if(t == 2465){
        this.scroller.position.y = -200;
        this.scene.add(this.scroller);
    }
    if(t >= 2465){
        this.scroller.rotation.x = -0.15;
    }
    if(t == 2480) {
        for(var i=0;i<this.polyhedrons.length;i++){
            if(i == 2 || i == 3 || i == 5){
                this.scene.remove(this.polyhedrons[i]);
                this.scene.remove(this.polyhedronWires[i]);
            }
        }
    }
    if(t == 2807){
        for(var i=0;i<16;i++){
            this.scene.remove(this.piano[i]);
        }
        this.scene.add(this.plasmaCube);
    }

    this.plasmaCube.rotation.x = t / 201 * 4;
    this.plasmaCube.rotation.y = t / 101 * 4;
    this.plasmaCube.position.y = 100;
    this.plasmaCube.position.z = -200;
    this.plasmaCube.position.x = Math.sin(t / 50 / 120 * 145 * Math.PI) * 200;
    this.plasmaUniforms.time.value = t / 10;
    this.plasmaUniforms.scale.value = (2 + Math.sin(t / 17)) * 5;
};

ScreenScene.prototype.render = function(){
    renderer.clear();
    this.scrollerScratchCtx.clearRect(0, 0,
            this.scrollerCanvas.width, this.scrollerCanvas.height);
    var cleariness = (((2 + Math.cos(t/20)) * 100) | 0 ) / 400;
    this.scrollerCtx.fillStyle = 'rgba(0,0,0,' + cleariness + ')';
    this.scrollerCtx.fillRect(0, 0,
            this.scrollerCanvas.width, this.scrollerCanvas.height);
    this.scrollerScratchCtx.font = t < 2490 ? '80pt cool' : '60pt cool';
    this.scrollerScratchCtx.fillStyle = '#0f0';
    this.scrollerScratchCtx.strokeStyle = '#080';
    this.scrollerScratchCtx.lineWidth = 5;
    var text = '      "Old Computers Never Die!"                                           music, code and graphics by sigveseb                 --                 presented at the first Abellan demo compo! Let\'s hope there will be many more of these!                --                powered by the ever complexening bootstrap.js ;)';
    this.scrollerScratchCtx.fillText(text, this.textX, 2 * GU);
    this.scrollerScratchCtx.strokeText(text, this.textX, 2 * GU);
    for(var x=0;x<16*GU;x++){
        var y = Math.sin(t/13 + x / GU * 2) * 20 + Math.sin(t / 5 + x / 100) * 50;
        this.scrollerCtx.drawImage(this.scrollerScratchCanvas,
            x, 0, 1, 4 * GU, x, y, 1, 4 * GU);
    }
    this.scrollerTexture.needsUpdate = true;
    this.composer.render();
    renderer.render(this.scene, this.camera);
};
ScreenScene.prototype.reset = function(){};
