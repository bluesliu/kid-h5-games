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
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    Ball.prototype.createView = function () {
        this._ball = Source.createBitmapByName("ball_png");
        this.addChild(this._ball);
        // this._ball.anchorOffsetX=43.5;
        // this._ball.anchorOffsetY=43.5;
    };
    Ball.prototype.play = function () {
        egret.Tween.get(this._ball, { loop: true })
            .to({ y: 70 }, 400)
            .to({ y: 0 }, 400);
        // .to( {x:203.4},(1366-203.4)*this._time*1000/1366);
    };
    Ball.prototype.stop = function () {
        egret.Tween.removeTweens(this._ball);
    };
    return Ball;
}(egret.Sprite));
__reflect(Ball.prototype, "Ball");
//# sourceMappingURL=Ball.js.map