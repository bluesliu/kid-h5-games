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
        _this._time = 80;
        _this.createView();
        return _this;
    }
    Bg.prototype.createView = function () {
        var bg = Source.createBitmapByName("bg_png");
        this.addChild(bg);
        // this._cloud1 = Source.createBitmapByName("cloud_1_png");
        // this.addChild(this._cloud1);
        // this._cloud1.x=203.4;
        // this._cloud1.y=64;
        // this._cloud2 = Source.createBitmapByName("cloud_2_png");
        // this.addChild(this._cloud2);
        // this._cloud2.x=682.7;
        // this._cloud2.y=90.4;
        // this._cloud3 = Source.createBitmapByName("cloud_3_png");
        // this.addChild(this._cloud3);
        // this._cloud3.x=1066.5;
        // this._cloud3.y=110.4;
        var basketballStands = Source.createBitmapByName("basketballStands0_png");
        this.addChild(basketballStands);
        basketballStands.x = 245;
        basketballStands.y = 472;
        this.start();
    };
    Bg.prototype.start = function () {
        // egret.Tween.get( this._cloud1, { loop:true} )
        // .to( {x:-this._cloud1.width},(203.4+this._cloud1.width)*this._time*1000/1366)
        // .to( {x:1366},0)
        // .to( {x:203.4},(1366-203.4)*this._time*1000/1366);
        // egret.Tween.get( this._cloud2, { loop:true} )
        // .to( {x:-this._cloud2.width},(682.7+this._cloud2.width)*this._time*1000/1366)
        // .to( {x:1366},0)
        // .to( {x:682.7},(1366-682.7)*this._time*1000/1366);
        // egret.Tween.get( this._cloud3, { loop:true} )
        // .to( {x:-this._cloud3.width},(1066.5+this._cloud3.width)*this._time*1000/1366)
        // .to( {x:1366},0)
        // .to( {x:1066.5},(1366-1066.5)*this._time*1000/1366);
    };
    Bg.prototype.reset = function () {
    };
    return Bg;
}(egret.Sprite));
__reflect(Bg.prototype, "Bg");
//# sourceMappingURL=Bg.js.map