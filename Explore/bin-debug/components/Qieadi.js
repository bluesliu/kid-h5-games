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
var Qieadi = (function (_super) {
    __extends(Qieadi, _super);
    function Qieadi() {
        var _this = _super.call(this) || this;
        _this.initContent();
        return _this;
    }
    Qieadi.prototype.initContent = function () {
        this._qwd = new egret.Sprite();
        this.addChild(this._qwd);
        this._qwd.y = 24;
        var qwd0 = this.createBitmapByName("qwd_png");
        this._qwd.addChild(qwd0);
        var qwd1 = this.createBitmapByName("qwd2_png");
        this._qwd.addChild(qwd1);
        this._net = new egret.Sprite();
        this.addChild(this._net);
        this._net.x = 204;
        this._net.y = -223 + 85;
        var net0 = this.createBitmapByName("net_png");
        this._net.addChild(net0);
        net0.x = -25;
        var net1 = this.createBitmapByName("net2_png");
        this._net.addChild(net1);
        net1.x = -209;
        net1.y = -165;
        this.addChild(this._qwd);
        this.gotoAndStop(0);
    };
    Qieadi.prototype.gotoAndStop = function (id) {
        for (var i = 0; i < this._qwd.numChildren; i++) {
            this._qwd.getChildAt(i).visible = false;
        }
        this._qwd.getChildAt(id).visible = true;
        for (var i = 0; i < this._net.numChildren; i++) {
            this._net.getChildAt(i).visible = false;
        }
        this._net.getChildAt(id).visible = true;
    };
    Qieadi.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Qieadi;
}(egret.Sprite));
__reflect(Qieadi.prototype, "Qieadi");
//# sourceMappingURL=Qieadi.js.map