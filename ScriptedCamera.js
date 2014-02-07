THREE.ScriptedCamera = function(script, scene) {

    var cameraPath = new THREE.Spline(script.cameraPath);
    var targetPath = new THREE.Spline(script.targetPath);

    var camera = new THREE.PerspectiveCamera(75, 16 / 9, 1, 30000);

    camera.update = function(){
        var position = cameraPath.getPoint(t / 1475);
        camera.position.x = position.x;
        camera.position.y = position.y;
        camera.position.z = position.z;

        var target = targetPath.getPoint(t / 1475);
        camera.lookAt(target);
    }
    return camera;
}
