GU = 100;

function Ball(){
    this.x = 0;
    this.y = 0;
    this.direction = 0;
    this.directiondt = 0;
    this.thickness = 10;
    this.speed = 0.015;
}

Ball.prototype.update = function(){
    this.x += this.speed * Math.sin(this.direction);
    this.y += this.speed * Math.cos(this.direction);
    this.directiondt += this.speed * t / 500 * (Math.random() - 0.5);
    if(this.directiondt > this.speed * 2){
        this.directiondt = this.speed * 2;
    }
    if(this.directiondt < -this.speed * 2){
        this.directiondt = -this.speed * 2;
    }

    this.direction += this.directiondt;
    this.thickness -= this.speed * 0.15;

    if(this.thickness < 0){
        return true;
    }
}

Ball.prototype.render = function(ctx){
    ctx.drawImage(this.sprite, this.x, this.y, Math.min(this.thickness, 0.5));
}

Ball.prototype.sprite = (function(){
    var canvas = document.createElement('canvas');
    canvas.width = GU * 0.2;
    canvas.height = GU * 0.2;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(120,32,45,0.1)';
    ctx.fillStyle = 'black';
    ctx.arc(canvas.width / 2, canvas.height / 2,
            canvas.width / 2, 2 * Math.PI, false);
    ctx.fill();
    return canvas;
})();


function BallPool(){
    this.balls = [];
    this.n = 0;
    this.max = 20000;
    for(var i=0;i<this.max;i++){
        this.balls[i] = new Ball();
    }
}

BallPool.prototype.addBall = function(x, y, direction){
    if(this.n == this.max){
        var ball = this.balls[this.n - 1];
    } else {
        var ball = this.balls[this.n++];
    }
    ball.thickness = (0.5 * Math.random() + 0.5);
    ball.x = x;
    ball.y = y;
    ball.direction = direction || Math.random() * 2 * 3.141592;
}

BallPool.prototype.pop = function(i){
    this.copy(this.balls[--this.n], this.balls[i]);
}

BallPool.prototype.copy = function(from, to){
    var params = ['x', 'y', 'direction', 'thickness'];
    for(var i in params){
        var param = params[i];
        to[param] = from[param];
    }
}

BallPool.prototype.update = function(){
    for(var i=0;i<this.n;i++){
        var ball = this.balls[i];
        if(ball.update()){
            this.pop(i--);
        }
    }
}

BallPool.prototype.render = function(ctx){
    for(var i=0;i<this.n;i++){
        this.balls[i].render(ctx);
    }
}
