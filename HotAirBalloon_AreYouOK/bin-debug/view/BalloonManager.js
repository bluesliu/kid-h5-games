var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BalloonManager = (function () {
    function BalloonManager() {
        this.m_rightCount = 0;
        this.speedY = 1;
        this.balloon = new BalloonView();
        Game.instance.sceneLayer.addChild(this.balloon);
        this.reset();
    }
    BalloonManager.prototype.reset = function () {
        this.balloon.reset();
        this.balloon.scaleX = 1;
        this.balloon.scaleY = 1;
        this.balloon.x = 976;
        this.balloon.y = 1004;
        this.rightCount = 0;
        this.speedY = 1;
    };
    BalloonManager.prototype.onRender = function () {
        var targetY = 0;
        if (this.rightCount < Game.WIN_NUM) {
            targetY = 1004 - this.rightCount * 30;
            this.speedY = 1;
        }
        else {
            targetY = -10;
            this.speedY = 5;
        }
        if (this.balloon.y <= targetY) {
            this.balloon.y = targetY;
        }
        else {
            this.balloon.y -= this.speedY;
        }
        this.balloon.onRender();
    };
    Object.defineProperty(BalloonManager.prototype, "rightCount", {
        get: function () { return this.m_rightCount; },
        set: function (value) {
            this.m_rightCount = value;
            this.balloon.isFloat = value > 0 && value < Game.WIN_NUM;
        },
        enumerable: true,
        configurable: true
    });
    return BalloonManager;
}());
__reflect(BalloonManager.prototype, "BalloonManager");
//# sourceMappingURL=BalloonManager.js.map