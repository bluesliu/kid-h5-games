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
//热气球
var BalloonView = (function (_super) {
    __extends(BalloonView, _super);
    function BalloonView() {
        var _this = _super.call(this) || this;
        _this.container = new egret.Sprite();
        _this.addChild(_this.container);
        var bg = DisplayUtil.createBitmapByName("balloon_png");
        bg.x = -bg.width / 2;
        bg.y = -bg.height;
        _this.container.addChild(bg);
        _this.role = DisplayUtil.createMovieClipByName("role");
        _this.role.x = 0;
        _this.role.y = -200;
        _this.container.addChild(_this.role);
        _this.role.play(-1);
        return _this;
    }
    BalloonView.prototype.onRender = function () {
        if (this.isFloat) {
            //上下浮动的效果
            this.container.y += Math.sin(egret.getTimer() / 1000) / 2;
        }
    };
    BalloonView.prototype.reset = function () {
        this.container.y = 0;
    };
    return BalloonView;
}(egret.Sprite));
__reflect(BalloonView.prototype, "BalloonView");
//# sourceMappingURL=BalloonView.js.map