function PartyScene(){ }

PartyScene.prototype.NAME = 'party';
PartyScene.prototype.startTime = 5436;

PartyScene.prototype.init = function(done){
    this.scene = new THREE.Scene();

    PartyScene.random = new Random();

    var loader = new THREE.JSONLoader();
    var that = this;
    loader.load("res/dumpster_scene.js",
            function(geometry, materials) {
                var dumpsterMaterial = materials[0];
                dumpsterMaterial.normalMap = THREE.ImageUtils.loadTexture("res/Tex_0040_2.jpg"); 
                dumpsterMaterial.bumpScale = 19;
                dumpsterMaterial.shinyness = 25;
                dumpsterMaterial.normalMap.wrapS = dumpsterMaterial.normalMap.wrapT = THREE.RepeatWrapping;
                var mesh = new THREE.Mesh(geometry,
                    new THREE.MeshFaceMaterial(materials));
                mesh.castShadow = true;
                that.dumpsterMesh = mesh;
            });

    var light = new THREE.PointLight(0xffffff);
    light.position = new THREE.Vector3(500,1000,400);
    this.scene.add(light);
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(1000,1000,1000);
    spotLight.lookAt(new THREE.Vector3(0,0,0));
    this.cameraLight = new THREE.DirectionalLight(0xffffff);
    this.scene.add(this.cameraLight);
    this.scene.add(spotLight);

    this.camera = new THREE.PerspectiveCamera(75, 16 / 9, 1, 30000);
    this.camera.position.x = 1000;
    this.camera.position.y = 1000;
    this.camera.position.z = 1000;
    this.camera.lookTarget = new THREE.Vector3(0,0,0);

    var particleGeometry = new THREE.Geometry();

    for ( i = 0; i < 20000; i ++ ) {
        var vertex = new THREE.Vector3();
        vertex.x = DumpsterScene.random() * 2000 - 1000;
        vertex.y = DumpsterScene.random() * 3000;
        vertex.z = DumpsterScene.random() * 2000 - 1000;
        particleGeometry.vertices.push( vertex );
    }

    var particleParameters = [
        [[1, 1, 0.5], 1],
        [[0.95, 1, 0.5], 1.2],
        [[0.90, 1, 0.5], 1.4],
        [[0.85, 1, 0.5], 1.6],
        [[0.80, 1, 0.5], 1.8]
    ];

    var particleMaterials = [];
    this.particleSystems = [];

    for ( i = 0; i < particleParameters.length; i ++ ) {
        var color = particleParameters[i][0];
        var size  = particleParameters[i][1];
        particleMaterials[i] = new THREE.ParticleSystemMaterial({
            size: size,
            fog: true,
            opacity: 0.5,
            transparency: true
        });
        this.particleSystems[i] = new THREE.ParticleSystem(particleGeometry, particleMaterials[i]);
        this.particleSystems[i].rotation.x = DumpsterScene.random() * 6;
        this.particleSystems[i].rotation.y = DumpsterScene.random() * 6;
        this.particleSystems[i].rotation.z = DumpsterScene.random() * 6;
        this.scene.add(this.particleSystems[i]);
    }

    this.composer = new THREE.EffectComposer(renderer);
    this.bloomEffect = new THREE.BloomPass(3, 25, 16);
    this.noiseEffect = new THREE.ShaderPass(THREE.NoiseShader);
    this.copyPass = new THREE.ShaderPass(THREE.CopyShader);
    this.copyPass.renderToScreen = true;
    this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));
    this.composer.addPass(this.noiseEffect);
    this.composer.addPass(this.bloomEffect);
    this.composer.addPass(this.copyPass);

    var urlPrefix = "res/skybox/";
    var map = [
        THREE.ImageUtils.loadTexture(urlPrefix + "ft.jpg"),
        THREE.ImageUtils.loadTexture(urlPrefix + "bk.jpg"),
        THREE.ImageUtils.loadTexture(urlPrefix + "up.jpg"),
        THREE.ImageUtils.loadTexture(urlPrefix + "dn.jpg"),
        THREE.ImageUtils.loadTexture(urlPrefix + "rt.jpg"),
        THREE.ImageUtils.loadTexture(urlPrefix + "lf.jpg")
            ];
    var skyGeometry = new THREE.CubeGeometry( 3000, 3000, 3000 );   
    var materialArray = [];
    for (var i = 0; i < 6; i++) {
        materialArray[i] = new THREE.MeshBasicMaterial({
            map: map[i],
            side: THREE.BackSide
        });
    }
    var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
    this.skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    this.skyBox.position.y = 1500;
    this.scene.add(this.skyBox);
    this.scene.fog = new THREE.FogExp2(0x041104, 0.001);

    var loader = new THREE.JSONLoader();
    var that = this;

    var ground = new THREE.Mesh(new THREE.CubeGeometry(3000, 3000, 1), new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('res/asphalt.jpg'),
        color: 0x666666
    }));
    ground.material.map.wrapS = ground.material.map.wrapT = THREE.RepeatMapping;
    ground.material.map.repeat.set(20, 20);
    ground.rotation.x = 3.141592 * 1.5;
    ground.position.y = 10;
    this.ground = ground;
    this.scene.add(ground);


    this.discoLight = new THREE.PointLight(0xffffff);
    this.discoLight.position.x = 1000;
    this.discoLight.position.y = 1000;
    this.discoLight.position.z = 1000;
    this.scene.add(this.discoLight);

    this.featureLight = new THREE.SpotLight(0x00ff00);
    this.featureLight.position.y = 2000;
    this.featureLight.lookAt(new THREE.Vector3(0,0,0));
    this.featureLight.intensity = 10;
    this.featureLight.exponent = 1;
    this.featureLight.angle = Math.PI / 10;
    this.scene.add(this.featureLight);


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
    for(var i=0;i<256;i++){
        this.polyhedronWires[i] = new THREE.Mesh(geometry,
                this.polyheldronWireMaterial);
        this.polyhedrons[i] = new THREE.Mesh(geometry, this.polyhedronMaterial);
        this.polyhedrons[i].position.x = ((i % 16) - 8) * 160;
        this.polyhedrons[i].position.y = 100;
        this.polyhedrons[i].position.z = ((i / 16 | 0) - 8) * 160;
        this.polyhedronWires[i].position.x = this.polyhedrons[i].position.x;
        this.polyhedronWires[i].position.y = this.polyhedrons[i].position.y;
        this.polyhedronWires[i].position.z = this.polyhedrons[i].position.z;
        this.scene.add(this.polyhedrons[i]);
        this.scene.add(this.polyhedronWires[i]);
    }
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
        new THREE.CubeGeometry(200, 200, 200),
        createPlasmaShaderMaterial(this.plasmaUniforms)
    );
    this.plasmaCube.position.y = 1000;
    this.scene.add(this.plasmaCube);
    done();
}

PartyScene.prototype.update = function(){
    for ( i = 0; i < this.particleSystems.length; i ++ ) {
        var ps = this.particleSystems[i];
        ps.position.x = Math.sin(t/100) * 10;
        ps.position.y = - t; 
        ps.position.z = Math.cos(t/100) * 10;
        ps.rotation.x = t / 8000; 
        ps.rotation.y = t / 3402; 
        ps.rotation.z = t / 4539; 
    }
    this.plasmaCube.rotation.x = t / 201 * 4;
    this.plasmaCube.rotation.y = t / 101 * 4;
    this.plasmaCube.position.x = Math.sin(t / 21) * 1000;
    this.plasmaCube.position.z = Math.cos(t / 21) * 1000;
    this.plasmaUniforms.time.value = t / 10;
    this.plasmaUniforms.scale.value = (2 + Math.sin(t / 17)) * 5;
    for(var i=0;i<256;i++){
        var polyhedronWire = this.polyhedronWires[i];
        var polyhedron = this.polyhedrons[i];
        polyhedronWire.rotation.x = polyhedron.rotation.x = t / 201 * 4;
        polyhedronWire.rotation.y = polyhedron.rotation.y = t / 93 * 4;
        polyhedronWire.position.y = polyhedron.position.y = 100 + Math.sin(((i % 16) | 0) * t / 73) * 50 + 50 * Math.sin(t / 57 + ((i / 16) | 0));
    }
    this.polyhedronMaterial.opacity = (1 + Math.sin(2 * t / 50 / 120 * 145 * Math.PI * 2)) / 2;

    if(Math.sin(2 * t / 50 / 120 * 145 * Math.PI) > 0.99 && t < 6702){
        this.camera.position.x = 100 + Math.sin(PartyScene.random() * Math.PI * 2) * 500;
        this.camera.position.y = 200 + (1000 + Math.sin(PartyScene.random() * Math.PI * 2) * 1000) / 10;
        this.camera.position.z = 100 + Math.sin(PartyScene.random() * Math.PI * 2) * 500;
        this.camera.directionX = PartyScene.random() * 10;
        this.camera.directionY = PartyScene.random() * 10;
        this.camera.directionZ = PartyScene.random() * 10;
        this.camera.lookTarget = PartyScene.random() > 0.7 ?
            this.plasmaCube.position :
            new THREE.Vector3(PartyScene.random() * 1000, PartyScene.random() * 500 + 100, PartyScene.random() * 1000);
    }
    if(t < 6702){
        this.camera.position.x += this.camera.directionX;
        this.camera.position.y += this.camera.directionY;
        this.camera.position.z += this.camera.directionZ;
        this.camera.lookAt(this.camera.lookTarget);
    }
    this.noiseEffect.uniforms.width.value = (16*GU)/2;
    this.noiseEffect.uniforms.time.value =  Math.sin(t / 200) * 200;
    this.noiseEffect.uniforms.height.value = (9*GU)/2;
    this.noiseEffect.uniforms.amount.value = 0.03;
    
    if(t == 6702){
        renderer.domElement.style.display = 'none';
        var p = document.createElement('p');
        document.body.appendChild(p);
        p.innerHTML = '"Old computers never die!"<br><br><br>by sigveseb';
        p.style.font = '40pt cool';
        p.style.textAlign = 'center';
        p.style.marginTop = '300px';
    }
}

PartyScene.prototype.render = function(){
    renderer.clear();
    this.composer.render();
    renderer.render(this.scene, this.camera);
}
PartyScene.prototype.reset = function(){
    renderer.domElement.style.display = 'block';
    PartyScene.random = new Random();
}
PartyScene.prototype.pause = function(){
}
PartyScene.prototype.resume = function(){
}
