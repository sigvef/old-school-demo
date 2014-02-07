function ScreenScene(){ }

ScreenScene.prototype.NAME = 'screen';
ScreenScene.prototype.startTime = 1488;

ScreenScene.prototype.init = function(done){
    
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, 16 / 9, 1, 30000);
    this.camera.position.z = 500;
    var geometry = new THREE.SphereGeometry(100, 3, 2);
    this.polyhedronWire = new THREE.Mesh(geometry,
                    new THREE.MeshBasicMaterial({
                        wireframe: true,
                        color: 0x00ff00
                    })
                );
    this.polyhedron = new THREE.Mesh(geometry,
                    new THREE.MeshBasicMaterial({
                        opacity: 0.1,
                        transparent: true,
                        color: 0x00ff00
                    })
                );
    this.polyhedron.position.x = this.polyhedronWire.position.x = 100;
    this.polyhedron.position.y = this.polyhedronWire.position.y = 100;
    this.scene.add(this.polyhedron);
    this.scene.add(this.polyhedronWire);
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
    this.scene.add(this.scroller);
    var ambient = new THREE.AmbientLight(0x111111);
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 0, 500);
    spotLight.lookAt(this.polyhedron.position);
    this.scene.add(spotLight);
    this.scene.add(ambient);
    this.textX = 2000;
    done();
}

ScreenScene.prototype.update = function(){
    this.polyhedronWire.rotation.x = this.polyhedron.rotation.x = t / 201 * 2;
    this.polyhedronWire.rotation.y = this.polyhedron.rotation.y = t / 93 * 2;
    this.textX -= 5;
};

ScreenScene.prototype.render = function(){
    this.scrollerScratchCtx.clearRect(0, 0,
            this.scrollerCanvas.width, this.scrollerCanvas.height);
    var cleariness = (((2 + Math.cos(t/20)) * 100) | 0 ) / 400;
    this.scrollerCtx.fillStyle = 'rgba(0,0,0,' + cleariness + ')';
    this.scrollerCtx.fillRect(0, 0,
            this.scrollerCanvas.width, this.scrollerCanvas.height);
    this.scrollerScratchCtx.font = '40pt monospace';
    this.scrollerScratchCtx.fillStyle = '#0f0';
    this.scrollerScratchCtx.fillText('"Old Computers Never Die!"                  --                  music, code and graphics by sigveseb                  --                  presented at the first demo compo of what will hopefully become many more at Abellan!                 --                 powered by the ever complexening bootstrap.js ;)', this.textX, 2 * GU);
    for(var x=0;x<16*GU;x++){
        var y = Math.sin(x / GU * 2) * 20 + Math.sin(t / 10 + x / 100) * 50;
        this.scrollerCtx.drawImage(this.scrollerScratchCanvas,
            x, 0, 1, 4 * GU, x, y, 1, 4 * GU);
    }
    this.scrollerTexture.needsUpdate = true;
    renderer.render(this.scene, this.camera);
};
ScreenScene.prototype.reset = function(){};
