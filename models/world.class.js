class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();

    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
            this.checkCollisionItems();
        }, 200);
    }


    checkThrowObject() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }


    checkCollisions() {
        // Check Collisions
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy)
            }
            
        });
    }
        /**
     * main function for all functions of collision with items
     */
    checkCollisionItems() {
        this.checkCollisionCoin();
        this.checkCollectBottle();
    }


    /**
     * checks conditions of collectiing coins
     */
    checkCollisionCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                let i = this.level.coins.indexOf(coin);
                this.level.coins.splice(i, 1);
                this.statusBarCoin.collectedCoins++;
            }
        });
    }


    /**
     * checks conditions of collecting bottles
     */
    checkCollectBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                let i = this.level.bottles.indexOf(bottle);
                this.level.bottles.splice(i, 1);
                this.statusBarBottle.collectedBottles++;
            }
        });
    }



    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.bottles);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        // ----- Space for fixed objects -----
        this.ctx.translate(-this.camera_x, 0); //Back 
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        this.drawCollectedItems();
        this.ctx.translate(this.camera_x, 0); //Forwards
        this.addObjectToMap(this.level.enemies);

        this.addObjectToMap(this.throwableObjects);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }

    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    drawCollectedItems() {
        this.ctx.font = '40px zabras';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(this.statusBarCoin.collectedCoins, 80, 102);
        this.ctx.fillText(this.statusBarBottle.collectedBottles, 170, 102);
    }


}