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
var Dog = (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        var _this = _super.call(this) || this;
        _this._bmp = new egret.Bitmap();
        _this.addChild(_this._bmp);
        return _this;
    }
    Dog.prototype.kaixin = function () {
        this._bmp.texture = RES.getRes("dogkx_png");
    };
    Dog.prototype.shangxin = function () {
        this._bmp.texture = RES.getRes("dogSX_png");
    };
    return Dog;
}(egret.Sprite));
__reflect(Dog.prototype, "Dog");
//# sourceMappingURL=Dog.js.map