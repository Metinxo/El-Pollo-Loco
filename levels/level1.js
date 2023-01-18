let level1;

function initLevel() {
level1 = new Level(
    [
        new Endboss(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new LilChicken(),
        new LilChicken(),
        new LilChicken(),
        new LilChicken(),
        new LilChicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new LilChicken(),
        new LilChicken(),
        new LilChicken(),
        new LilChicken(),
        new LilChicken(),
        new LilChicken()
],


[
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud2(),
    new Cloud2(),
    new Cloud(),
    new Cloud(),
    new Cloud2(),
    new Cloud2(),
    new Cloud2(),
    new Cloud2(),
    new Cloud(),
    new Cloud2(),
    new Cloud(),
    new Cloud2(),
    new Cloud2(),
    new Cloud(),
    new Cloud2()
],


[
    new BackgroundObject('img/5_background/layers/air.png', -719),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

    new BackgroundObject('img/5_background/layers/air.png', 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

    new BackgroundObject('img/5_background/layers/air.png', 719),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

    new BackgroundObject('img/5_background/layers/air.png', 719*2),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),

    new BackgroundObject('img/5_background/layers/air.png', 719*3),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),
    
    new BackgroundObject('img/5_background/layers/air.png', 719*4),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*4),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*4),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*4),

    new BackgroundObject('img/5_background/layers/air.png', 719*5),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*5),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*5),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*5),
    
    new BackgroundObject('img/5_background/layers/air.png', 719*6),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*6),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*6),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*6),

    new BackgroundObject('img/5_background/layers/air.png', 719*7),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*7),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*7),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*7),
    
    new BackgroundObject('img/5_background/layers/air.png', 719*8),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*8),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*8),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*8),

    new BackgroundObject('img/5_background/layers/air.png', 719*9),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*9),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*9),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*9),
],


[
            new Bottle(0, 950, 215),
            new Bottle(0, 1000, 145),
            new Bottle(0, 1050, 100),
            new Bottle(0, 1100, 100),
            new Bottle(0, 1150, 145),
            new Bottle(0, 1200, 215),
            new Bottle(1, 1600, 360),
            new Bottle(2, 2000, 360),
            new Bottle(0, 3500, 215),
            new Bottle(0, 3550, 145),
            new Bottle(0, 3600, 100),
            new Bottle(0, 3650, 100),
            new Bottle(0, 3700, 145),
            new Bottle(0, 3750, 215),
            new Bottle(1, 4000, 360),
            new Bottle(2, 4200, 360),
            new Bottle(0, 4950, 215),
            new Bottle(0, 5000, 145),
            new Bottle(0, 5050, 100),
            new Bottle(0, 5500, 190),
            new Bottle(0, 5500, 145),
            new Bottle(0, 5500, 100),
            new Bottle(1, 4500, 360),
            new Bottle(2, 4600, 360),
            new Bottle(1, 3800, 360),
],


[
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin()
]
);
}