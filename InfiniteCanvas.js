function InfiniteCanvas(){
    this.canvases = {};
}

InfiniteCanvas.prototype.drawImage = function(image, x, y, scale){
    scale = scale;
    var x_canvas = Math.floor(x / 16);
    var y_canvas = Math.floor(y / 9);
    var is_x_overflowing = (((x % 16) + 16) + image.width / GU) > 16;
    var is_y_overflowing = (((y % 9) + 9) + image.height / GU) > 9;

    var ctx = this.getContext(x_canvas, y_canvas);
    var draw_x = GU * (x - x_canvas * 16);
    var draw_y = GU * (y - y_canvas * 9);
    ctx.save();
    ctx.translate(draw_x, draw_y);
    ctx.scale(scale, scale);
    ctx.drawImage(image, image.width / 2, image.height / 2);
    ctx.restore();


    if(is_x_overflowing){
        var ctx = this.getContext(x_canvas + 1, y_canvas);
        var draw_x = GU * (x - (x_canvas + 1) * 16);
        var draw_y = GU * (y - y_canvas * 9);
        ctx.save();
        console.log(draw_x, draw_y);
        ctx.translate(draw_x, draw_y);
        ctx.scale(scale, scale);
        ctx.drawImage(image, image.width / 2, image.height / 2);
        ctx.restore();
    }
    if(is_y_overflowing){
        var ctx = this.getContext(x_canvas, y_canvas + 1);
        var draw_x = GU * (x - x_canvas * 16);
        var draw_y = GU * (y - (y_canvas + 1) * 9);
        ctx.save();
        ctx.translate(draw_x, draw_y);
        ctx.scale(scale, scale);
        ctx.drawImage(image, image.width / 2, image.height / 2);
        ctx.restore();
    }
    if(is_x_overflowing && is_y_overflowing){
        var ctx = this.getContext(x_canvas + 1, y_canvas + 1);
        var draw_x = GU * (x - (x_canvas + 1) * 16);
        var draw_y = GU * (y - (y_canvas + 1) * 9);
        ctx.save();
        ctx.translate(draw_x, draw_y);
        ctx.scale(scale, scale);
        ctx.drawImage(image, image.width / 2, image.height / 2);
        ctx.restore();
    }
};

InfiniteCanvas.prototype.render = function(ctx, x, y, scale){
    scale = scale || 1;
    var x_canvas = Math.floor(x / 16);
    var y_canvas = Math.floor(y / 9);
    ctx.save();
    ctx.scale(scale, scale);
    var canvases_in_each_direction = 2 + Math.ceil(1 / scale);
    for(var x_direction=0;x_direction<canvases_in_each_direction;x_direction++){
    for(var y_direction=0;y_direction<canvases_in_each_direction;y_direction++){
    var xc = x_direction - canvases_in_each_direction / 2 | 0;
    var yc = y_direction - canvases_in_each_direction / 2 | 0;
    ctx.drawImage(
        this.getCanvas(-x_canvas + xc, -y_canvas + yc),
        GU * (x - (x_canvas - xc) * 16),
        GU * (y - (y_canvas - yc) * 9));
    }
    }
    /*
    ctx.drawImage(this.getCanvas(-x_canvas, -y_canvas),
                  GU * (x - (x_canvas) * 16), GU * (y - y_canvas * 9));
    ctx.drawImage(this.getCanvas(-x_canvas - 1, -y_canvas),
                  GU * (x - (x_canvas + 1) * 16), GU * (y - y_canvas * 9));
    ctx.drawImage(this.getCanvas(-x_canvas, -y_canvas - 1),
                  GU * (x - x_canvas * 16), GU * (y - (y_canvas + 1) * 9));
    ctx.drawImage(this.getCanvas(-x_canvas - 1, -y_canvas - 1),
                  GU * (x - (x_canvas + 1) * 16), GU * (y - (y_canvas + 1) * 9));
    */
    ctx.restore();
}


InfiniteCanvas.prototype.getCanvas = function(x, y){
    if(!(x in this.canvases)){
        this.canvases[x] = {};  
    }
    if(!(y in this.canvases[x])){
        this.canvases[x][y] = document.createElement('canvas');
        this.canvases[x][y].width = GU * 16;
        this.canvases[x][y].height = GU * 9;
        /*
        var ctx = this.canvases[x][y].getContext('2d');
        ctx.fillStyle = 'rgb(' + (Math.random()*200|0) + ', ' +
                                 (Math.random()*200|0) + ', ' + 
                                 (Math.random()*200|0) + ')';
        ctx.fillRect(0, 0, this.canvases[x][y].width, this.canvases[x][y].height);
        ctx.fillStyle = 'white';
        ctx.font = '40px Arial bold';
        ctx.fillText('' + x + ',' + y, 100, 100);
        */
    }
    return this.canvases[x][y];
}

InfiniteCanvas.prototype.getContext = function(x, y){
    return this.getCanvas(x, y).getContext('2d');
}
