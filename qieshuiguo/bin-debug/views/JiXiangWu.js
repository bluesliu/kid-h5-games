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
        this._jieshu = new egret.Bitmap();
        this._jieshu.texture = RES.getRes("Long_shiBai_png");
        this.addChild(this._jieshu);
        this._jieshu.visible = false;
        this._jieshu.x = 120;
        this._chenggong = new egret.Bitmap();
        this._chenggong.texture = RES.getRes("Long_chenggong_png");
        this.addChild(this._chenggong);
        this._chenggong.visible = false;
        this._kaixin = new egret.Bitmap();
        this._kaixin.texture = RES.getRes("kaixin_png");
        this.addChild(this._kaixin);
        this._kaixin.visible = false;
        this._bukaixin = new egret.Bitmap();
        this._bukaixin.texture = RES.getRes("shibai_png");
        this.addChild(this._bukaixin);
        this._bukaixin.visible = false;
        this._time = new egret.Timer(5000);
        this._time.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
    };
    JiXiangWu.prototype.clear = function () {
        this._pingchang.visible = false;
        this._jieshu.visible = false;
        this._chenggong.visible = false;
        this._kaixin.visible = false;
        this._bukaixin.visible = false;
    };
    /**
     * 显示平常
     */
    JiXiangWu.prototype.pingchang = function () {
        this.clear();
        this._pingchang.visible = true;
    };
    /**
     * 显示开心
     */
    JiXiangWu.prototype.kaixin = function () {
        this.clear();
        this._kaixin.visible = true;
        this._time.reset();
        this._time.start();
    };
    /**
     * 显示不开心
     */
    JiXiangWu.prototype.shibail = function () {
        this.clear();
        this._bukaixin.visible = true;
        this._time.reset();
        this._time.start();
    };
    /**
     * 显示失败了
     */
    JiXiangWu.prototype.jieshu = function () {
        this.clear();
        this._jieshu.visible = true;
    };
    /**
     * 显示成功了
     */
    JiXiangWu.prototype.chenggongl = function () {
        this.clear();
        this._chenggong.visible = true;
    };
    JiXiangWu.prototype.onTimer = function (e) {
        this.pingchang();
        this._time.stop();
    };
    return JiXiangWu;
}(egret.Sprite));
__reflect(JiXiangWu.prototype, "JiXiangWu");
//# sourceMappingURL=JiXiangWu.js.map