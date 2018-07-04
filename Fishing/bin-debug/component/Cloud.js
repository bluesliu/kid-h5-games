var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Cloud = (function (_super) {
    __extends(Cloud, _super);
    function Cloud() {
        var _this = _super.call(this) || this;
        _this._time = 40;
        _this.createView();
        return _this;
    }
    Cloud.prototype.createView = function () {
        this._bird1 = new Bird();
        this.addChild(this._bird1);
        this._bird1.alpha = 0;
        this._bird1.x = 0;
        this._bird1.y = 100;
        this._bird1.scaleX = this._bird1.scaleY = 0.2;
        this._bird2 = new Bird();
        this.addChild(this._bird2);
        this._bird2.alpha = 0;
        this._bird2.x = 900;
        this._bird2.y = 150;
        this._bird2.scaleX = this._bird2.scaleY = 0.1;
        this._cloud1 = Source.createBitmapByName("yun_0_png");
        this.addChild(this._cloud1);
        this._cloud1.x = 43;
        this._cloud1.y = 185;
        this._cloud2 = Source.createBitmapByName("yun_1_png");
        this.addChild(this._cloud2);
        this._cloud2.x = 397.5;
        this._cloud2.y = 69;
        this._cloud3 = Source.createBitmapByName("yun_2_png");
        this.addChild(this._cloud3);
        this._cloud3.x = 815;
        this._cloud3.y = 122;
        this._cloud4 = Source.createBitmapByName("yun_3_png");
        this.addChild(this._cloud4);
        this._cloud4.x = 1185.5;
        this._cloud4.y = 137.5;
        this.start();
    };
    Cloud.prototype.start = function () {
        egret.Tween.get(this._cloud1, { loop: true })
            .to({ x: -this._cloud1.width }, (43 + this._cloud1.width) * this._time * 1000 / 1366)
            .to({ x: 1366 }, 0)
            .to({ x: 43 }, (1366 - 43) * this._time * 1000 / 1366);
        egret.Tween.get(this._cloud2, { loop: true })
            .to({ x: -this._cloud2.width }, (397.5 + this._cloud2.width) * this._time * 1000 / 1366)
            .to({ x: 1366 }, 0)
            .to({ x: 397.5 }, (1366 - 397.5) * this._time * 1000 / 1366);
        egret.Tween.get(this._cloud3, { loop: true })
            .to({ x: -this._cloud3.width }, (815 + this._cloud3.width) * this._time * 1000 / 1366)
            .to({ x: 1366 }, 0)
            .to({ x: 815 }, (1366 - 815) * this._time * 1000 / 1366);
        egret.Tween.get(this._cloud4, { loop: true })
            .to({ x: -this._cloud4.width }, (1185.5 + this._cloud4.width) * this._time * 1000 / 1366)
            .to({ x: 1366 }, 0)
            .to({ x: 1185.5 }, (1366 - 1185.5) * this._time * 1000 / 1366);
        egret.Tween.get(this._bird1, { loop: true })
            .wait(Math.round(Math.random() * 5) * 1000 + 5000)
            .to({ alpha: 1 }, 500)
            .to({ y: 200, x: 200, scaleX: 0.5, scaleY: 0.5 }, 10000)
            .to({ y: 100, x: 400, scaleX: 0.2, scaleY: 0.2 }, 10000)
            .to({ alpha: 0 }, 500)
            .to({ y: 100, x: 0 }, 0)
            .wait(Math.round(Math.random() * 5) * 1000 + 5000)
            .to({ alpha: 1 }, 500);
        egret.Tween.get(this._bird2, { loop: true })
            .to({ alpha: 1 }, 500)
            .to({ y: 250, x: 1100, scaleX: 0.4, scaleY: 0.4 }, 10000)
            .to({ y: 100, x: 1366, scaleX: 0.1, scaleY: 0.1 }, 10000)
            .to({ alpha: 0 }, 500)
            .to({ y: 150, x: 0 }, 0)
            .wait(Math.round(Math.random() * 5) * 1000 + 5000)
            .to({ alpha: 1 }, 500);
    };
    return Cloud;
}(egret.Sprite));
__reflect(Cloud.prototype, "Cloud");
//# sourceMappingURL=Cloud.js.map