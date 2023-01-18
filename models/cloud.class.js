class Cloud extends MovableObject {
    y = 20 + Math.random() * 10;
    x = 200 + Math.random() * 3000;
    width = 500;
    height = 250;
    speed = 0.1 + Math.random() * 0.3;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = 0 + Math.random() * 4000; //
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    }
}