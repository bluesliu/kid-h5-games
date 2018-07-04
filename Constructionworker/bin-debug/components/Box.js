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
var Box = (function (_super) {
    __extends(Box, _super);
    function Box() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    Box.prototype.createView = function () {
        var box = Source.createBitmapByName("jzgr_1_png");
        this.addChild(box);
        box.smoothing = true;
        box.anchorOffsetX = box.width / 2;
        box.anchorOffsetY = box.height / 2;
    };
    Box.prototype.addContent = function (bmp) {
        var scale = Math.min(208 / bmp.width * 0.8, 209 / bmp.height * 0.8);
        bmp.scaleX = bmp.scaleY = scale;
        this.addChild(bmp);
        bmp.anchorOffsetX = bmp.width / 2;
        bmp.anchorOffsetY = bmp.height / 2;
    };
    return Box;
}(egret.Sprite));
__reflect(Box.prototype, "Box");
//# sourceMappingURL=Box.js.map