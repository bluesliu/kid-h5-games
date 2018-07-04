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
var HookSp = (function (_super) {
    __extends(HookSp, _super);
    function HookSp() {
        var _this = _super.call(this) || this;
        _this.tempX = 0;
        _this.tempY = 0;
        _this.initContent();
        return _this;
    }
    HookSp.prototype.initContent = function () {
        this.graphics.beginFill(0xffffff, 0);
        this.graphics.drawRect(0, 0, 461, 262);
        this.graphics.endFill();
        var sp = new egret.Sprite();
        this.addChild(sp);
        sp.x = 5;
        sp.y = 8;
        sp.graphics.lineStyle(2, 0x333333);
        sp.graphics.moveTo(0, 0);
        sp.graphics.lineTo(0, 300);
        this.line = new egret.Sprite();
        this.addChild(this.line);
        this.line.x = 5;
        this.line.y = 308;
        this._hook = Source.createBitmapByName("鱼钩_png");
        this.addChild(this._hook);
        this._hook.anchorOffsetX = 14;
        this._hook.anchorOffsetY = 5;
        this._hook.x = 5;
        this._hook.y = 308;
        this.tempX = this.line.x;
    };
    HookSp.prototype.start = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.lineIn, this);
    };
    HookSp.prototype.stop = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.lineIn, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.lineBack, this);
    };
    HookSp.prototype.lineIn = function (e) {
        this.tempY += HookSp.SPEEDY;
        if (this.tempY >= HookSp.LINEDEPTH) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.lineIn, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.lineBack, this);
        }
        this.line.graphics.clear();
        this.line.graphics.lineStyle(2, 0);
        this.line.graphics.moveTo(0, 0);
        this.line.graphics.lineTo(0, this.tempY);
        this._hook.y = 300 + this.tempY;
        this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
    };
    HookSp.prototype.lineBack = function (e) {
        this.tempY -= HookSp.SPEEDY;
        if (this.tempY <= 0) {
            this.tempY = 0;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.lineBack, this);
            this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
        }
        this.line.graphics.clear();
        this.line.graphics.lineStyle(2, 0);
        this.line.graphics.moveTo(0, 0);
        this.line.graphics.lineTo(0, this.tempY);
        this._hook.y = 300 + this.tempY;
        this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
    };
    HookSp.SPEEDY = 5;
    HookSp.LINEDEPTH = 200;
    return HookSp;
}(egret.Sprite));
__reflect(HookSp.prototype, "HookSp");
//# sourceMappingURL=HookSp.js.map