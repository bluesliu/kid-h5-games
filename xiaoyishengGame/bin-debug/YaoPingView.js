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
var YaoPingView = (function (_super) {
    __extends(YaoPingView, _super);
    function YaoPingView() {
        var _this = _super.call(this) || this;
        _this._bj = new egret.Bitmap();
        _this.addChild(_this._bj);
        _this._bj.texture = RES.getRes("yaopin_png");
        return _this;
    }
    YaoPingView.prototype.setStr = function (str) {
        this.bmp = new egret.Bitmap();
        console.log(str);
        this.bmp.texture = RES.getRes(str);
        this.addChild(this.bmp);
        this.bmp.scaleX = this.bmp.scaleY = Math.min(170 / this.bmp.width, 120 / this.bmp.height);
        this.bmp.y = 155;
        this.bmp.x = (this._bj.width - this.bmp.width * this.bmp.scaleY) / 2;
    };
    return YaoPingView;
}(egret.Sprite));
__reflect(YaoPingView.prototype, "YaoPingView");
//# sourceMappingURL=YaoPingView.js.map