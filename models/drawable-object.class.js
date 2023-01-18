class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;


    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };


    /**
     * function draws object in parameter
     * @param {Object} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        ctx.beginPath();
        ctx.stroke();
    }
    

    /**
     * Loads the image in parameter
     * @param {img/path} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Loads all images from Array
     * @param {Array} arr 
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}