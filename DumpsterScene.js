function DumpsterScene(){
}

DumpsterScene.prototype.startTime = 0;

DumpsterScene.prototype.NAME = 'dumpster';

DumpsterScene.prototype.init = function(done){

    var geometry, material, cube;
    var dumpster;


    this.scene = new THREE.Scene();

    this.camera = new THREE.ScriptedCamera(this.script, this.scene);
    renderer.autoClear = false;

    this.composer = new THREE.EffectComposer(renderer);
    this.bloomEffect = new THREE.BloomPass(2, 16, 16);
    this.noiseEffect = new THREE.ShaderPass(THREE.NoiseShader);
    this.copyPass = new THREE.ShaderPass(THREE.CopyShader);
    this.copyPass.renderToScreen = true;
    this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));
    this.composer.addPass(this.noiseEffect);
    this.composer.addPass(this.bloomEffect);
    this.composer.addPass(this.copyPass);

    geometry = new THREE.CubeGeometry(100, 100, 100);
    material = new THREE.MeshLambertMaterial({
        color: 0xff0000
    });

    cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);

    light = new THREE.PointLight(0xffffff);
    light.position = new THREE.Vector3(500,1000,400);
    this.scene.add(light);
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(1000,1000,1000);
    spotLight.lookAt(cube.position);
    this.cameraLight = new THREE.DirectionalLight(0xffffff);
    this.scene.add(this.cameraLight);
    this.scene.add(spotLight);

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
    this.scene.fog = new THREE.FogExp2(0x040411, 0.001);

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
                that.scene.add(mesh);
            });

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

    var controls = new THREE.FlyControls(this.camera);
    controls.movementSpeed = 0.1;
    controls.domElement = renderer.domElement;
    controls.rollSpeed = Math.PI / 24 / 100;
    controls.autoForward = false;

    if(window.location.hash){
        setInterval(function(){
            controls.update(10);
        }, 10);
    }

    done();
}

DumpsterScene.prototype.update = function(){
    if(!window.location.hash){
        this.camera.update(t);
    }


    this.cameraLight.position.x = this.camera.position.x;
    this.cameraLight.position.y = this.camera.position.y;
    this.cameraLight.position.z = this.camera.position.z;
    this.cameraLight.lookAt(this.camera.target);

    if(t >= 1228) {
       var amount = (t - 1228) / (1588 - 1288);
       this.camera.up.x = lerp(0, 0.70999757454156, amount);
       this.camera.up.y = lerp(1, 0.66357575026628, amount);
       this.camera.up.z = lerp(0, -0.235734316135022, amount);
    }

    this.noiseEffect.uniforms.width.value = (16*GU)/2;
    this.noiseEffect.uniforms.time.value =  Math.sin(t / 200) * 200;
    this.noiseEffect.uniforms.height.value = (9*GU)/2;
    this.noiseEffect.uniforms.amount.value = 0.03;
    if(t < 10){
        this.camera.position.x = 500;
        this.camera.position.y = 500;
        this.camera.position.z = 500;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
    }
}

DumpsterScene.prototype.render = function() {
    renderer.clear();
    if(t < 1000){
        renderer.domElement.style.opacity = t / 1000;
    } else {
        renderer.domElement.style.opacity = 1;
    }
    this.composer.render();
    renderer.render(this.scene, this.camera);
}

DumpsterScene.prototype.reset = function(){
}

DumpsterScene.prototype.script = {
cameraPath: [
new THREE.Vector3(-99.22861197705818, 2933.57861446453, 540.5647888780219),
new THREE.Vector3(471.44888780665775, 1400.7936036013145, 649.2762506155278),
new THREE.Vector3(-419.72076693357775, 129.63547493050487, -133.44239812420423),
new THREE.Vector3(-195.39129174256618, 301.92029702007113, 352.42602350435243),
new THREE.Vector3(13.897908036564276, 197.20925161959008,-14.147202197704537)
], targetPath: [
new THREE.Vector3(-95.10763647305528, 2933.9622320233802, 575.3192187893898),
new THREE.Vector3(446.4720168814318, 1431.230387318167, 835.1519029096434),
new THREE.Vector3(-385.13416256437125, 127.75141990443754, -115.51986663820034),
new THREE.Vector3(15.03311296874931, 198.09668280746146, -14.629135030549534),
new THREE.Vector3(2.805399212522662, 194.5386555890456, -51.49135767933846)
]};
