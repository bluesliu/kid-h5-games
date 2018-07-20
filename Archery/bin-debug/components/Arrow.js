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
var Arrow = (function (_super) {
    __extends(Arrow, _super);
    function Arrow() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    Arrow.prototype.createView = function () {
        this._arrow = Source.createBitmapByName("arrow_png");
        this.addChild(this._arrow);
        this._arrow.anchorOffsetX = 65;
        this._arrow.anchorOffsetY = 10;
    };
    return Arrow;
}(egret.Sprite));
__reflect(Arrow.prototype, "Arrow");
//# sourceMappingURL=Arrow.js.map