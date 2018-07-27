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
//场景
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        var _this = _super.call(this) || this;
        _this.m_bg = DisplayUtil.createBitmapByName("bg_png");
        _this.addChild(_this.m_bg);
        _this.cardLayer = new egret.Sprite();
        _this.addChild(_this.cardLayer);
        var maskMC = new egret.Sprite();
        maskMC.graphics.beginFill(0xff0000);
        maskMC.graphics.drawRect(182, 400, 1002, 281);
        _this.addChild(maskMC);
        _this.cardLayer.mask = maskMC;
        return _this;
    }
    return Scene;
}(egret.Sprite));
__reflect(Scene.prototype, "Scene");
//# sourceMappingURL=Scene.js.map