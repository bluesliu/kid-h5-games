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
var Ren = (function (_super) {
    __extends(Ren, _super);
    function Ren() {
        var _this = _super.call(this) || this;
        _this._bmp = new egret.Bitmap();
        _this.addChild(_this._bmp);
        return _this;
    }
    Ren.prototype.shangxin = function () {
        this._bmp.texture = RES.getRes("renSX_png");
    };
    Ren.prototype.pingchang = function () {
        this._bmp.texture = RES.getRes("renPC_png");
    };
    Ren.prototype.kaixin = function () {
        this._bmp.texture = RES.getRes("renKX_png");
    };
    return Ren;
}(egret.Sprite));
__reflect(Ren.prototype, "Ren");
//# sourceMappingURL=Ren.js.map