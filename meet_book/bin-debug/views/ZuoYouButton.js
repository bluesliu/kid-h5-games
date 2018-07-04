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
var ZuoYouButton = (function (_super) {
    __extends(ZuoYouButton, _super);
    function ZuoYouButton() {
        var _this = _super.call(this) || this;
        _this._fangXiang = -1;
        _this.chushi();
        return _this;
    }
    ZuoYouButton.prototype.chushi = function () {
        var _this = this;
        this._btn = new egret.Bitmap();
        this._btn.texture = RES.getRes("zuoyou_png");
        this.addChild(this._btn);
        this._zuo = new egret.Sprite();
        this._zuo.graphics.beginFill(0xfff000, 0);
        this._zuo.graphics.drawRect(0, 0, 200, 220);
        this._zuo.graphics.endFill();
        this.addChild(this._zuo);
        this._you = new egret.Sprite();
        this._you.graphics.beginFill(0xfff000, 0);
        this._you.graphics.drawRect(0, 0, 200, 220);
        this._you.graphics.endFill();
        this._you.x = 800;
        this.addChild(this._you);
        this._zuo.touchEnabled = true;
        this._you.touchEnabled = true;
        this._zuo.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            _this._fangXiang = -1;
            _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
        }, this);
        this._zuo.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            _this.removeEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
        }, this);
        this._you.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            _this._fangXiang = 1;
            _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
        }, this);
        this._you.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            _this.removeEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
        }, this);
    };
    ZuoYouButton.prototype.onEnterFrame = function (e) {
        this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
    };
    return ZuoYouButton;
}(egret.Sprite));
__reflect(ZuoYouButton.prototype, "ZuoYouButton");
//# sourceMappingURL=ZuoYouButton.js.map