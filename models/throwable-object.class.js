class ThrownBottle extends MovableObject {
    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    bottleHitSomething = false;


    constructor(x, y) {
        super().loadImage(this.IMAGES_BOTTLE_ROTATION[0]);
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.trow();
        this.animate();
    }


    trow() {
        this.speedY = 11;
        this.applyGravity();
        setInterval(() => {
            if (!this.bottleHitSomething) {
                this.x += 12;
                this.y -= 5;
            } else {
                this.speedY = 0;
            }
        }, 1000 / 50);
    }

    
    /**
     * function animates bottle on the flight and on hit
     */
    animate() {
        setInterval(() => {
            if (this.bottleHitSomething) {
                setInterval(() => this.playAnimation(this.IMAGES_BOTTLE_SPLASH),1000 / 30);
            } else {
                setInterval(() => this.playAnimation(this.IMAGES_BOTTLE_ROTATION),50);
            }
        }, 50);
    }
}