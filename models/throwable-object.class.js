class ThrowableObject extends MovableObject {


    imagesBottleRotation = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];


    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.imagesBottleRotation);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.trow();
    }

    trow() {
        this.speedY = 25;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
        setInterval(() => this.playAnimation(this.imagesBottleRotation), 50);
    }
}