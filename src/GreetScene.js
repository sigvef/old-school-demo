function GreetScene(){ }

GreetScene.prototype.NAME = 'greet';
GreetScene.prototype.startTime = 4126;

GreetScene.prototype.init = function(done){
    this.greetzImage = document.createElement('img');
    this.greetzImage.src = 'res/greetz.png';
    this.canvas = document.createElement('canvas');
    this.canvas.width = 16 * GU;
    this.canvas.height = 9 * GU;
    Math.random = Random();
    GreetScene.random = Random();
    this.ctx = this.canvas.getContext('2d');
    this.balls = new BallPool();
    this.infiniteCanvas = new InfiniteCanvas();
    this.leaderBall = new Ball();
    this.leaderBall.x = 0;
    this.leaderBall.y = 4.5;
    this.leaderBall.direction = 0.25 * 3.141592;
    this.leaderBall.thickness = 100;
    for(var i=0;i<100;i++){
        this.balls.addBall(this.leaderBall.x, this.leaderBall.y);
    }
    this.scale = 1.5;
    done();
}

GreetScene.prototype.update = function(){
    this.scale *= 0.9998;
    if(t % 100 == 0){
        this.balls.addBall(this.leaderBall.x, this.leaderBall.y, this.leaderBall.direction);
        this.balls.addBall(this.leaderBall.x, this.leaderBall.y, this.leaderBall.direction);
        this.balls.addBall(this.leaderBall.x, this.leaderBall.y, this.leaderBall.direction);
        this.balls.addBall(this.leaderBall.x, this.leaderBall.y, this.leaderBall.direction);
        this.balls.addBall(this.leaderBall.x, this.leaderBall.y, this.leaderBall.direction);
        this.balls.addBall(this.leaderBall.x, this.leaderBall.y, this.leaderBall.direction);
    }
    this.leaderBall.update();
    this.leaderBall.directiondt *= 0.9;
    this.balls.update();
    this.syncrender();
}

GreetScene.prototype.syncrender = function(){
    this.leaderBall.render(this.infiniteCanvas);
    this.balls.render(this.infiniteCanvas);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    var x = -(this.leaderBall.x - 6);
    var y = -(this.leaderBall.y - 4.5);
    this.canvas.style.backgroundPosition = (x * GU / 2) + 'px ' + (y * GU / 2) + 'px';
}

GreetScene.prototype.render = function(){
    var x = -(this.leaderBall.x - 6);
    var y = -(this.leaderBall.y - 4.5);
    this.infiniteCanvas.render(this.ctx, x, y, this.scale);
    if(t <= 4300){
        var amount = Math.min(1, 1 - (t - 4130) / (4300 - 4130));
        this.ctx.fillStyle = 'rgba(255, 255, 255,' + amount + ')';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    }

    if(t > 5129){
        var amount = (t - 5129) / (5369 - 5129);
        this.ctx.fillStyle = 'rgba(255, 255, 255,' + amount + ')';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

GreetScene.prototype.reset = function(){
    renderer.domElement.style.display = 'none';
    this.infiniteCanvas.drawImage(this.greetzImage, -10, 9);

    this.canvas.style.margin = renderer.domElement.style.margin;
    document.body.appendChild(this.canvas);
    GreetScene.random = Random(172344);
}
GreetScene.prototype.pause = function(){
    document.body.removeChild(this.canvas);
}
GreetScene.prototype.resume = function(){
}

