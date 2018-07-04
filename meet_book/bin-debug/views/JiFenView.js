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
var JiFenView = (function (_super) {
    __extends(JiFenView, _super);
    function JiFenView() {
        var _this = _super.call(this) || this;
        _this._xingArr = [];
        _this._id = 0;
        _this._guanshu = 0;
        return _this;
        //this.chushi();
    }
    JiFenView.prototype.chushi = function (n) {
        this._guanshu = n;
        for (var i = 0; i < n; i++) {
            var huixing = new egret.Bitmap();
            huixing.texture = RES.getRes("huo_hong_png");
            this.addChild(huixing);
            huixing.x = i * 50;
            var hongXing = new egret.Bitmap();
            hongXing.texture = RES.getRes("huo_hui_png");
            this.addChild(hongXing);
            hongXing.x = i * 50;
            this._xingArr.push(hongXing);
            // hongXing.visible=false;
        }
    };
    /**
     * 玩家通过一关
     */
    JiFenView.prototype.chengong = function () {
        this._xingArr[this._id].visible = false;
        this._id++;
        if (this._id == this._guanshu) {
            this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
        }
    };
    JiFenView.prototype.reset = function () {
        this._id = 0;
        for (var i = 0; i < this._guanshu; i++) {
            this._xingArr[i].visible = true;
        }
    };
    return JiFenView;
}(egret.Sprite));
__reflect(JiFenView.prototype, "JiFenView");
//# sourceMappingURL=JiFenView.js.map