class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 5800;
    bottles;
    coins;

    constructor(enemies, clouds, bottles, coins, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}