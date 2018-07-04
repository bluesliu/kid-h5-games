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
var BeiJIngView = (function (_super) {
    __extends(BeiJIngView, _super);
    function BeiJIngView() {
        var _this = _super.call(this) || this;
        _this.chushi();
        return _this;
    }
    BeiJIngView.prototype.chushi = function () {
        var BJbitmap = new egret.Bitmap();
        BJbitmap.texture = RES.getRes("xingkong_png");
        this.addChild(BJbitmap);
        this._yunduo = new egret.Bitmap();
        this._yunduo.texture = RES.getRes("yunduo_png");
        this.addChild(this._yunduo);
        this._yunduo.y = 200;
        this.zuoyi();
        var chuangtai = new egret.Bitmap();
        chuangtai.texture = RES.getRes("chuangtai_png");
        this.addChild(chuangtai);
    };
    BeiJIngView.prototype.zuoyi = function () {
        egret.Tween.get(this._yunduo).to({ x: 50 }, 5000, egret.Ease.sineIn).call(this.youyi, this);
    };
    BeiJIngView.prototype.youyi = function () {
        egret.Tween.get(this._yunduo).to({ x: -50 }, 5000, egret.Ease.sineIn).call(this.zuoyi, this);
    };
    return BeiJIngView;
}(egret.Sprite));
__reflect(BeiJIngView.prototype, "BeiJIngView");
//# sourceMappingURL=BeiJIngView.js.map