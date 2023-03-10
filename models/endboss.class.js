class Endboss extends MovableObject {
    height = 400;
    width = 300;
    y = 50;
    x = 6080;
    speed = 0.7;
    i = 0;
    firstEncounter = true;
    noRecentHit = true;
    energy = 2; // dont get confused by the 2, the boss dies after 3 hits!
    died = false;
    bossIsWalking = false;


    bossScream = new Audio('audio/endboss.mp3');

    offset = {
        top: 100,
        bottom: 15,
        left: 50,
        right: 50
    };


    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];


    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];


    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];


    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    
    
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        setTimeout(() => {
            this.animate();
        }, 1000)
    }


    /**
     * function animates the start and the walk of boss
     */
    animate() {
        this.mainI = setInterval(() => {
            this.playStartAnimation();
            this.checkFirstEncounter();
        }, 1000 / 6);
        this.moveBoss();
    }


    /**
     * function plays start animation of boss
     */
    playStartAnimation() {
        if (this.i < 10) {
            this.playAnimation(this.IMAGES_ALERT);
        } else if (this.i < 14) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (!this.firstEncounter) {
            this.bossWalking();
        }
        this.i++;
    }


    /**
     * function checks the first encounter of pepe and boss
     */
    checkFirstEncounter() {
        if (this.world.character.x > 5000 && this.firstEncounter) {
            this.i = 0;
            this.firstEncounter = false;
            this.endbossSound();
        }
    }


    /**
     * funciton moves boss to the left
     */
    moveBoss() {
        setInterval(() => {
            if (this.bossIsWalking) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }


    /**
     * function animates the boss walking
     */
    bossWalking() {
        this.playAnimation(this.IMAGES_WALKING);
        this.bossIsWalking = true;
    }


    /**
     * function animates the boss attacking when hit by pepe
     */
    bossAttacks() {
        this.bossIsWalking = false;
        clearInterval(this.mainI);
        let i1 = setInterval(() => {
            this.playAnimation(this.IMAGES_ATTACK);
        }, 1000 / 6);
        setTimeout(() => {
            clearInterval(i1);
            this.animate();
        }, 1500);
    }


    /**
     * function checks if game is over of if energy is taken from boss
     */
    bossGetsHit() {
        this.bossIsWalking = false;
        clearInterval(this.mainI);
        if (this.energy > 0 && this.noRecentHit) {
            this.bossLosesEnergy();
        } else if (this.energy <= 0 && this.noRecentHit) {
            this.gameOverWin();
        }
    }


    /**
     * function takes energy from boss and continues the fight
     */
    bossLosesEnergy() {
        this.bossIsWalking = false;
        this.noRecentHit = false;
        this.energy--;
        let i2 = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT);
        }, 1000 / 6);
        setTimeout(() => {
            clearInterval(i2);
            this.noRecentHit = true;
            this.animate();
        }, 1000);
    }


    /**
 * function ends the game, pepe wins
 */
    gameOverWin() {
        this.noRecentHit = false;
        let i3 = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 1000 / 6);
        setTimeout(() => {
            clearInterval(i3);
            this.died = true;
        }, 1000);
               
    }


    /**
 * Bosssound
 */
    endbossSound() {
        this.bossScream.volume = 0.02;
        this.bossScream.play();
    }



}

