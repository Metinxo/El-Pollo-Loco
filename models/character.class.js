class Character extends MovableObject {
    height = 250;
    width = 125;
    y = 176;
    speed = 10;
    waitingTime = 0;


    offset = {
        top: 100,
        bottom: 15,
        left: 20,
        right: 20
    }


    IMAGES_SHORT_WAIT = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];


    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];


    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ]


    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'

    ];


    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];


    walking_sound = new Audio('audio/run.mp3');
    pepeGrunt = new Audio('audio/hurt.mp3');
    pepeJumpSound = new Audio('audio/jump.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_SHORT_WAIT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }


    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playCharacter(), 100);
    }


    moveCharacter() {
        this.walking_sound.pause();
        if (this.canMoveRight())
            this.moveRight();
        if (this.canMoveLeft())
            this.moveLeft();
        if (this.canJump()) {
            this.jump();
            this.characterRun();
        }
        this.world.camera_x = -this.x + 100;
    }


    /**
 * function for move right
 */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < (this.world.level.level_end_x);
    }


    /**
 * function for move right
 */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        this.characterRun();
    }

/**
 * 
 * @returns function for move Left
 */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }


/**
 * function for move left +  Walk sound
 */
    moveLeft() {
        super.moveLeft();
        this.walking_sound.play();
        this.otherDirection = true;
    }

/**
 * 
 * @returns can Jump
 */
    canJump() {
       return this.world.keyboard.SPACE && !this.isAboveGround();
    }


    playCharacter() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.characterHurt();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.renderPepeJump();
        } else {
            this.playAnimation(this.IMAGES_SHORT_WAIT);
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }


    /**
* Jump
*/
    jump() {
        this.speedY = 23;
    }


    /**
 * Hurtsound
 */
    characterHurt() {
        this.pepeGrunt.volume = 0.1;
        this.pepeGrunt.play();
    }


    /**
* walksound
*/
    characterRun() {
        this.walking_sound.volume = 0.1;
        this.walking_sound.play();
    }


    /**
 * Jumpsound
 */
    renderPepeJump() {
        this.pepeJumpSound.volume = 0.2;
        this.pepeJumpSound.play();
    }
}