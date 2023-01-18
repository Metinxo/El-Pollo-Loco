class StatusBarCoin extends DrawableObject {
    collectedCoins= 0;


    IMAGES_COINS = [
        'img/7_statusbars/3_icons/icon_coin.png'
    ];


    constructor() {
        super();
        this.loadImage(this.IMAGES_COINS[0]);
        this.x = 18;
        this.y = 55;
        this.width = 60;
        this.height = 58;
    }
}
