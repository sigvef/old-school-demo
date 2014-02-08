function GreetScene(){ }

GreetScene.prototype.NAME = 'greet';
GreetScene.prototype.startTime = 4136;

GreetScene.prototype.init = function(done){
    this.greetzImage = document.createElement('img');
    this.greetzImage.src = 'res/greetz.png';
    this.canvas = document.createElement('canvas');
    this.canvas.width = 16 * GU;
    this.canvas.height = 9 * GU;
    Math.random = Random();
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
    this.infiniteCanvas.render(this.ctx, -(this.leaderBall.x - 8), -(this.leaderBall.y - 4.5), this.scale);
}

GreetScene.prototype.render = function(){
}

GreetScene.prototype.reset = function(){
    renderer.domElement.style.display = 'none';
    this.infiniteCanvas.drawImage(this.greetzImage, -4, 0);
    document.body.appendChild(this.canvas);
    Math.random = Random(12);
}
GreetScene.prototype.pause = function(){
}
GreetScene.prototype.resume = function(){
}

