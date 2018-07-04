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
var Bg = (function (_super) {
    __extends(Bg, _super);
    function Bg() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    Bg.prototype.createView = function () {
        var sky0 = Source.createBitmapByName("bg_png");
        this.addChild(sky0);
        // this._plane = Source.createBitmapByName("飞机_png");
        // this.addChild(this._plane);
        // this._plane.x=-121;
        // this._plane.y=244;
        this._cloud1 = Source.createBitmapByName("cloud1_png");
        this.addChild(this._cloud1);
        this._cloud1.scaleX = this._cloud1.scaleY = 1.2;
        this._cloud1.x = 1066.6;
        this._cloud1.y = 100 + 6.7 - 100;
        this._cloud2 = Source.createBitmapByName("cloud2_png");
        this.addChild(this._cloud2);
        this._cloud2.alpha = 0.8;
        this._cloud2.x = -240;
        this._cloud2.y = 202 - 100;
        this._cloud3 = Source.createBitmapByName("cloud3_png");
        this.addChild(this._cloud3);
        this._cloud3.scaleX = this._cloud3.scaleY = 0.8;
        this._cloud3.alpha = 0.5;
        this._cloud3.x = 1366;
        this._cloud3.y = 255 - 100;
        var sky = Source.createBitmapByName("bg0_png");
        this.addChild(sky);
        // let land = Source.createBitmapByName("草地_png");
        // this.addChild(land);
        // land.y=192.45;
        this.start();
    };
    Bg.prototype.start = function () {
        // egret.Tween.get( this._plane, { loop:true} )
        // 	.to( {x:1780, y:76},40000, egret.Ease.sineIn  )
        // 	.wait(1000*10);	
        egret.Tween.get(this._cloud1, { loop: true })
            .to({ x: -240 }, 60000, egret.Ease.sineIn)
            .to({ x: 1366.6 }, 0, egret.Ease.sineIn)
            .wait(500 * 10)
            .to({ x: 1066.6 }, 36000, egret.Ease.sineIn);
        egret.Tween.get(this._cloud2, { loop: true })
            .to({ x: 1366 }, 60000, egret.Ease.sineIn)
            .to({ x: 1366.6 }, 0, egret.Ease.sineIn)
            .wait(800 * 10);
        egret.Tween.get(this._cloud3, { loop: true })
            .wait(200 * 10)
            .to({ x: -240 }, 60000, egret.Ease.sineIn)
            .wait(200 * 10);
    };
    Bg.prototype.stop = function () {
        egret.Tween.removeTweens(this._plane);
        egret.Tween.removeTweens(this._cloud1);
        egret.Tween.removeTweens(this._cloud2);
        egret.Tween.removeTweens(this._cloud3);
    };
    return Bg;
}(egret.Sprite));
__reflect(Bg.prototype, "Bg");
//# sourceMappingURL=Bg.js.map