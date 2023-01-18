class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.3;
    energy = 100;
    lastHit = 0;
    

    /**
     * Function applys gravity to object who calls function
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }


    /**
     * @returns true if object who calls function is above ground or a thrown bottle
     */
    isAboveGround() {
        if (this instanceof ThrownBottle) { // Throwable object should always fall
            return true;
        } else {
            return this.y < 170;
        }
    }


    /**
     * checks if two objects are colliding together
     * offset value adjust object size
     * @returns boolean
     */
    isColliding(mo) {
        return this.rightBorder() > this.leftObjectBorder(mo) &&
               this.bottomBorder() > this.topObjectBorder(mo) &&
               this.leftBorder() < this.rightObjectBorder(mo) &&
               this.topBorder() < this.bottomObjectBorder(mo);
       }
       rightBorder() {
           return this.x + this.width - this.offset.right;
       }
       leftBorder() {
           return this.x + this.offset.left;
       }
       topBorder() {
           return this.y + this.offset.top;
       }
       bottomBorder() {
           return this.y + this.height - this.offset.bottom;
       }  
       rightObjectBorder(mo) {
           return mo.x + mo.width - mo.offset.right;
       }   
       leftObjectBorder(mo) {
           return mo.x + mo.offset.left;
       }
       topObjectBorder(mo) {
           return mo.y + mo.offset.top;
       }
       bottomObjectBorder(mo) {
           return mo.y + mo.height - mo.offset.bottom;
       }
   

    /**
     * function decreases energy form object calling it
     */
    hit() {
        this.energy -= 1;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //Difference in MS
        timepassed = timepassed / 1000; //Difference in s
        return timepassed < 0.6;
    }

    /**
     * @returns true if energy of calling object is 0
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * function repeatly goes through array (images of array)
     * @param {Array} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * function for move right
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * function for move left
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * function for jump
     */
    jump() {
        this.speedY = 26;
    }


    /**
     * @param {Object} mo 
     * @returns true if object that calls this function lands on top of object in parameter
     */
    jumpsOn(mo) {
        return this.x + this.width > mo.x &&
            this.x < mo.x + mo.width &&
            this.y + this.height + 5 >= mo.y - 5 &&
            this.y + this.height - 5 <= mo.y + 5 &&       
            this.speedY < 0;                                  
    }
}