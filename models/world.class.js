class World {
    character = new Character();
    level = level1;
    camera_x = 0;
    noRecentHit = true
    statusBar = new StatusBar();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    thrownBottle = new ThrownBottle();
    allThrownBottles = [];
    sound = true


    gameSounds = [
        new Audio('audio/loose.mp3'),
        new Audio('audio/winner.mp3'),
        new Audio('audio/bottlebreak.mp3')
    ];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.runGame();
    }

    /**
     * Function draws all objects
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.bottles);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.allThrownBottles);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.character);
        // ----- Space for fixed objects -----
        this.ctx.translate(-this.camera_x, 0); //Back 
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        this.drawCollectedItems();
        this.ctx.translate(this.camera_x, 0); //Forwards
        this.ctx.translate(-this.camera_x, 0);
        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * function draws multiple objects onto canvas
     * @param {Array} objects 
     */
    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * function draws object onto canvas
     * @param {Object} mo 
     */
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


    /**
     * function mirrors the context on canvas
     * @param {Object} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * function mirrors the context back to normal on canvas
     * @param {Object} mo 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     * draws the number of items that are collectable
     */
    drawCollectedItems() {
        this.ctx.font = '40px zabras';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(this.statusBarCoin.collectedCoins, 80, 102);
        this.ctx.fillText(this.statusBarBottle.collectedBottles, 170, 102);
    }


    /**
     * Function defines world to the variable "world" in different objects
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies[0].world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisions1();
            this.checkThrowObject();
            this.checkCollisionItems();
        }, 200);
    }



    checkCollisions1() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy)
            }
        });
    }


    /**
     * checks the conditions of throwing a object
     */
    checkThrowObject() {
        if (this.keyboard.D) {
            if (this.canThrowBottle()) {
                let bottle = new ThrownBottle(this.character.x + 100, this.character.y + 100);
                this.allThrownBottles.push(bottle);
                this.statusBarBottle.collectedBottles--;
                this.statusBarBottle.bottleDepot.splice(0, 1);
            }
        }
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


    /**
 * Function runs the game with 60 refreshes per second
 */
    runGame() {
        this.gameInterval = setInterval(() => this.updateGame60Times(), 1000 / 100);
    }


    /**
     * function lists all the functions which has to be updated every 60 seconds
     */
    updateGame60Times() {
        this.checkCollisions();
        this.checkGameOver();
    }


    /**
 * function checks if anything collides (Pepe, Thrown Bottles, Enemies)
 */
    checkCollisions() {
        this.checkChickenCollision();
        this.checkBottleCollision();
        this.checkBossCollision();
    }


    /**
     * function checks if pepe collides with any enemy
     */
    checkChickenCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.jumpsOn(enemy)) {
                this.killChickenJumpsOn(enemy);
                this.bounceJumpKill();
            }
        });
    }


    /**
 * function check if any thrown bottle hitted something
 */
    checkBottleCollision() {
        this.level.enemies.forEach((enemy) => {
            this.allThrownBottles.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {
                    this.bottleHit(bottle, enemy)
                }
            })
        })
    }


    /**
     * function checks if bottle hit normal chicken or boss and lets bottle splash
     */
    bottleHit(bottle, enemy) {
        bottle.bottleHitSomething = true;
        this.playGameSound(2);
        if (this.bottleHitBoss(bottle)) {
            this.level.enemies[0].bossGetsHit();
        } else {
            this.killChicken(enemy);
        }
        this.deleteAfterSplash(bottle);
    }


    /**
 * function deletes bottle after splash animation
 */
    deleteAfterSplash(bottle) {
        setTimeout(() => {
            let positionOfBottle = this.allThrownBottles.indexOf(bottle)
            this.allThrownBottles.splice(positionOfBottle, 1);
        }, 200);
    }


    /**
* function kills chicken in parameter
*/
    killChicken(enemy) {
        let hitEnemy = this.level.enemies.indexOf(enemy);
        this.level.enemies[hitEnemy].chickenAlive = false;
        setTimeout(() => this.deleteEnemy(hitEnemy), 10)
    }


    /**
* function kills chicken in parameter
*/
    killChickenJumpsOn(enemy) {
        let hitEnemy = this.level.enemies.indexOf(enemy);
        this.level.enemies[hitEnemy].chickenAlive = false;
        setTimeout(() => this.deleteEnemy(hitEnemy), 150)
    }


    /**
 * function deletes hit enemy
 */
    deleteEnemy(hitEnemy) {
        this.level.enemies.splice(hitEnemy, 1);
        this.level.enemies.isColliding;
    }


    /**
 * function lets pepe bounce up
 */
    bounceJumpKill() {
        this.character.speedY = 11;
    }


    /**
 * calls function for throwing the bottle if it bigger than 0
 */
    canThrowBottle() {
        return !this.character.otherDirection &&
            this.statusBarBottle.collectedBottles > 0;
    }


    /**
 * function checks if pepe collides with boss
 */
    checkBossCollision() {
        if (this.pepeHitsBoss() && this.noRecentHit) {
            this.knocksBackPepe();
            this.bossAttackAnimation();
        }
    }


    /**
* @returns true if pepe hits boss
*/
    pepeHitsBoss() {
        return this.character.x >= this.level.enemies[0].x - 100;
    }


    /**
 * function animates the knockback of pepe
 */
    knocksBackPepe() {
        this.character.speedY = 15;
        let i = setInterval(() => this.kockback(), 1000 / 60);
        setTimeout(() => clearInterval(i), 300);
    }


    /**
 * function kocks back pepe
 */
    kockback() {
        this.character.x -= 10;
        this.keyboard.RIGHT = false;
        this.keyboard.LEFT = false;
    }


    /**
 * function play boss attack animation and prevents pepe from taking multiple hits
 */
    bossAttackAnimation() {
        this.level.enemies[0].bossAttacks();
        this.noRecentHit = false;
        setTimeout(() => {
            this.noRecentHit = true;
        }, 1500);
    }


    /**
 * @returns true if bottle hitted boss
 */
    bottleHitBoss(bottle) {
        return bottle.x >= this.level.enemies[0].x - 100;
    }


    /**
     * function checks if either pepe or boss died
     */
    checkGameOver() {
        if (this.character.isDead()) {
            setTimeout(() => this.lostTheGame(), 250); //timeout for pepe death animation
        } else if (this.level.enemies[0].died) {
            this.wonTheGame();
        }
    }


    /**
     * function renders win screen after victory
     */
    wonTheGame() {
        this.stopTheGame();
        this.showWin();
    }


    /**
     * function renders lost screen after defeat
     */
    lostTheGame() {
        this.stopTheGame();
        this.showLose();
    }


    /**
     * function stops the game
     */
    stopTheGame() {
        cancelAnimationFrame(this.drawTheGame);
        clearInterval(this.gameInterval);
        this.clearInput();
    }


    /**
     * function clears all input from player
     */
    clearInput() {
        keyboard.RIGHT = false;
        keyboard.LEFT = false;
        keyboard.SPACE = false;
        keyboard.D = false;
    }


    /**
     * function shows the win for player
     */
    showWin() {
        this.playGameSound(1);
        setTimeout(() => {
            document.getElementById('endScreenWin').classList.remove('d-none');
        }, 1500);
    }


    /**
     * function shows the lose for player
     */
    showLose() {
        this.playGameSound(0);
        setTimeout(() => {
            document.getElementById('endScreenLose').classList.remove('d-none')
        }, 1500);
    }


    playGameSound(number) {
        if (this.sound) {
            let gameSound = this.gameSounds[number];
            gameSound.volume = 0.2;
            gameSound.play();
        }
    }
}