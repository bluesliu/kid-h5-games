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
        var bg = Source.createBitmapByName("jzgr_19_png");
        this.addChild(bg);
        // this._qwd = Source.createBitmapByName("jzgr_18_png");
        // this.addChild(this._qwd);
        // this._qwd.x=148.5;
        // this._qwd.y=307;
    };
    Bg.prototype.reset = function () {
        // this._qwd.visible=false;
    };
    return Bg;
}(egret.Sprite));
__reflect(Bg.prototype, "Bg");
//# sourceMappingURL=Bg.js.map