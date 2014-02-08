function ShoutScene(){ }

ShoutScene.prototype.NAME = 'shout';
ShoutScene.prototype.startTime = 5370;

ShoutScene.prototype.init = function(done){
    this.canvas = document.createElement('canvas');
    this.canvas.width = 16 * GU;
    this.canvas.height = 9 * GU;
    this.ctx = this.canvas.getContext('2d');
    done();
}
ShoutScene.prototype.update = function(){
}

ShoutScene.prototype.render = function(){
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    if(t >= 5370 && t < 5387) {
        this.ctx.fillStyle = '#5bd673';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = '400pt cool';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText('OLD', this.canvas.width / 2, this.canvas.height / 2);
    }
    if(t >= 5387 && t < 5410) {
        this.ctx.fillStyle = '#478ebf';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = '150pt cool';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText('COMPUTERS', this.canvas.width / 2, this.canvas.height / 2);
    }
    if(t >= 5410 && t < 5434) {
        this.ctx.fillStyle = '#d7dc53';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = '300pt cool';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText('NEVER', this.canvas.width / 2, this.canvas.height / 2);
    }
    if(t >= 5435 && t < 5450) {
        this.ctx.fillStyle = '#be4e3f';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = '400pt cool';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText('DIE!', this.canvas.width / 2, this.canvas.height / 2);
    }
}

ShoutScene.prototype.reset = function(){
    document.body.appendChild(this.canvas);
}
ShoutScene.prototype.pause = function(){
    document.body.removeChild(this.canvas);
}
ShoutScene.prototype.resume = function(){
}
