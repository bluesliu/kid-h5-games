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
var ShenMingView = (function (_super) {
    __extends(ShenMingView, _super);
    function ShenMingView() {
        var _this = _super.call(this) || this;
        _this._xingArr = [];
        _this._id = 2;
        _this.chushi();
        return _this;
    }
    ShenMingView.prototype.chushi = function () {
        this._kuang = new egret.Bitmap();
        this._kuang.texture = RES.getRes("xingxing_kuang_png");
        this.addChild(this._kuang);
        for (var i = 0; i < 3; i++) {
            var huixing = new egret.Bitmap();
            huixing.texture = RES.getRes("huixin_png");
            this.addChild(huixing);
            huixing.x = i * 80 + 20;
            huixing.y = 10;
            var hongXing = new egret.Bitmap();
            hongXing.texture = RES.getRes("hongXin_png");
            this.addChild(hongXing);
            hongXing.x = i * 80 + 20;
            hongXing.y = 10;
            this._xingArr.push(hongXing);
            // hongXing.visible=false;
        }
    };
    /**
     * 玩家死亡一次
     */
    ShenMingView.prototype.siwang = function () {
        this._xingArr[this._id].visible = false;
        this._id--;
        if (this._id == -1) {
            this.dispatchEvent(new egret.Event(egret.Event.CLOSE));
        }
    };
    ShenMingView.prototype.reset = function () {
        this._id = 2;
        for (var i = 0; i < 3; i++) {
            this._xingArr[i].visible = true;
        }
    };
    return ShenMingView;
}(egret.Sprite));
__reflect(ShenMingView.prototype, "ShenMingView");
//# sourceMappingURL=ShenMingView.js.map