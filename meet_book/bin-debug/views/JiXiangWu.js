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
var JiXiangWu = (function (_super) {
    __extends(JiXiangWu, _super);
    function JiXiangWu() {
        var _this = _super.call(this) || this;
        _this.chushi();
        return _this;
    }
    JiXiangWu.prototype.chushi = function () {
        this._pingchang = new egret.Bitmap();
        this._pingchang.texture = RES.getRes("kaTong_png");
        this.addChild(this._pingchang);
        this._shibai = new egret.Bitmap();
        this._shibai.texture = RES.getRes("Long_shiBai_png");
        this.addChild(this._shibai);
        this._shibai.visible = false;
        this._chenggong = new egret.Bitmap();
        this._chenggong.texture = RES.getRes("Long_chenggong_png");
        this.addChild(this._chenggong);
        this._chenggong.visible = false;
    };
    /**
     * 显示失败了
     */
    JiXiangWu.prototype.shibail = function () {
        this._pingchang.visible = false;
        this._shibai.visible = true;
    };
    /**
     * 显示成功了
     */
    JiXiangWu.prototype.chenggongl = function () {
        this._pingchang.visible = false;
        this._chenggong.visible = true;
    };
    return JiXiangWu;
}(egret.Sprite));
__reflect(JiXiangWu.prototype, "JiXiangWu");
//# sourceMappingURL=JiXiangWu.js.map