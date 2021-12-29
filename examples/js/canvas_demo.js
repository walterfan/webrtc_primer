function RtcApp() {

    this.canvasContext = null;

   
    this.canvasWidth  = 640;
    this.canvasHeight = 480;

    this.canvasElement = null;


}

RtcApp.prototype.init = function() {
    console.log("--- init ---");

    this.canvasElement = document.getElementById("myCanvas");
    this.canvasContext = this.canvasElement.getContext("2d");
    this.counter = 1500; //25*60 seconds
    this.countDownTimer = null;


    var w = document.createElement("canvas").getContext("webgl");
    var d = w.getExtension('WEBGL_debug_renderer_info');
    var g = d && w.getParameter(d.UNMASKED_RENDERER_WEBGL) || "";
    if (g.match(/Apple/) && !g.match(/Apple GPU/)) {
        console.log("it is apple m1 using arm");
    } else {
        console.log("g=", g);
    }

    if (w.getSupportedExtensions().indexOf("WEBGL_compressed_texture_s3tc_srgb") == -1) {
        console.log("it maybe m1 using arm");
      }
};

RtcApp.prototype.drawClock = function(e) {
    console.log("--- drawClock ---");
    var me = this;
    this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.countDownTimer = setInterval( function() { fillCounter(me); }, 1000 );
}

RtcApp.prototype.drawChessboard=function(e) {

    console.log("--- drawChessboard ---");

    var imageData = this.canvasContext.createImageData(this.canvasWidth, this.canvasHeight);
    // or
    //var imageData = canvas.getContext("2d").getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
    
    if(this.countDownTimer) clearInterval(this.countDownTimer);
    this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    var cellsize = 20;
    for (var i = 0; i < imageData.width; i += 2 * cellsize)
    {
        for (var j = 0; j < imageData.height; j += cellsize)
        {
            var diff = ((j / cellsize) % 2) * cellsize;
            for (var x = i + diff; (x < i + diff + cellsize) && (x < imageData.width); x++)
            {
                for (var y = j; y < j + cellsize; y++)
                {
                    setPixel(imageData, x, y, 120, 120, 120, 255);
                }
            }
        }
    }

    this.canvasContext.putImageData(imageData, 0, 0);
}

RtcApp.prototype.drawRandomImage=function(e) {

    console.log("--- drawRandomImage ---");
    if(this.countDownTimer) clearInterval(this.countDownTimer);
    this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    var imageData = this.canvasContext.createImageData(this.canvasWidth, this.canvasHeight);

    for (var x = 0; x < imageData.width; x++)
    {
        for (var y = 0; y < imageData.height; y++)
        {
            setPixel(imageData, x, y, getRandomNum(0,255), getRandomNum(0,255), getRandomNum(0,255), getRandomNum(0,255));
        }
    }

    this.canvasContext.putImageData(imageData, 0, 0);
}

function setPixel(imageData, x, y, r, g, b, a){

    var index = (x + y * imageData.width);
    imageData.data[index * 4 + 0] = r;
    imageData.data[index * 4 + 1] = g;
    imageData.data[index * 4 + 2] = b;
    imageData.data[index * 4 + 3] = a;
}

function fillCounter(me) {
    var no = me.counter;
    var ctx = me.canvasContext;
    var pointToFill = 4.72;
    var cw = ctx.canvas.width;
    var ch = ctx.canvas.height;
    var diff;

    diff = ((no / 10) * Math.PI * 2 * 10);
    ctx.clearRect(0, 0, cw, ch);
    ctx.lineWidth = 15;
    ctx.fillStyle = '#000';
    ctx.strokeStyle = '#F5E0A9';
    ctx.textAlign = 'center';
    ctx.font = "25px monospace";
    ctx.fillText(no + ' sec', 100, 110);
    ctx.beginPath();
    ctx.arc(100, 100, 90, pointToFill, diff / 10 + pointToFill);
    ctx.stroke();
    if (no == 0) {
        clearTimeout(fill);
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, cw, ch);
        ctx.fillStyle = '#000';
        ctx.fillText('Times up', 100, 110);
    }
    me.counter --;
}

function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
  }