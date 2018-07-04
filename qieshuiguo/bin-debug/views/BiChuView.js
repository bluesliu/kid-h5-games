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
var BiChuView = (function (_super) {
    __extends(BiChuView, _super);
    function BiChuView() {
        var _this = _super.call(this) || this;
        _this._bichu = new egret.Bitmap();
        _this._bichu.texture = RES.getRes("bichu_png");
        _this._bichu.scaleX = _this._bichu.scaleY = 2;
        _this.addChild(_this._bichu);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onStage, _this);
        return _this;
    }
    BiChuView.prototype.onStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onStage, this);
        egret.setTimeout(this.qingchu, this, 300);
    };
    BiChuView.prototype.qingchu = function () {
        this.removeChild(this._bichu);
        this.parent.removeChild(this);
        this._bichu = null;
    };
    return BiChuView;
}(egret.Sprite));
__reflect(BiChuView.prototype, "BiChuView");
//# sourceMappingURL=BiChuView.js.map