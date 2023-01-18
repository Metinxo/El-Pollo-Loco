let canvas;
let world;
let keyboard = new Keyboard();
let playBtnI;
let playBtnBig = true;
let sound = true;


/**
 * function starts the game from start screen
 */
function startGame() {
    clearInterval(playBtnI);
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('playButtons').style = '';
    bindTouchEvents();
    document.getElementById('startScreen').classList.add("d-none");
    initGame();
}


/**
 * Initialization of the game
 */
function initGame() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.sound = sound;
}


/**
 * Keyboard Press
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});


/**
 * Keyboard Lift
 */
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

/**
 * keyboard binds IMG
 */
function bindTouchEvents() {
    document.getElementById('left').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    })

    document.getElementById('left').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    })

    document.getElementById('right').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    })

    document.getElementById('right').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    })

    document.getElementById('up').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    })
    document.getElementById('up').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    })

    document.getElementById('throw').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.D = true;
    })
    document.getElementById('throw').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.D = false;
    })
}


/**
 * restarts the game after it finished
 */
function restartGame() {
    resetEndscreen();
    reloadGame();
}

/**
 * reload Game
 */
function reloadGame() {
    document.location.reload();
}


/**
 * takes player to start screen after the game
 */
function goToStartMenu() {
    reloadGame();

}


/**
 * Win/Lose Endscreen
 */
function resetEndscreen() {
    document.getElementById('endScreenWin').classList.add("d-none");
    document.getElementById('endScreenLose').classList.add("d-none");
}