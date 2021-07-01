(function() {
    var ctx = null;

    var Game = {
        canvas: document.getElementById("canvas"),
    
        setup: function() {
            if(this.canvas.getContext) {
                ctx = this.canvas.getContext('2d');
                this.width = this.canvas.width;
                this.height = this.canvas.height;
            }
        }
    
    }
}());


