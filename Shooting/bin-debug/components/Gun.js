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
var Gun = (function (_super) {
    __extends(Gun, _super);
    function Gun() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    Gun.prototype.createView = function () {
        var base0 = this.createBitmapByName("炮弹底座下_png");
        this.addChild(base0);
        base0.anchorOffsetX = 12.95;
        base0.anchorOffsetY = -169.65;
        this._barrel_sp = new egret.Sprite();
        this.addChild(this._barrel_sp);
        this._barrel_sp.x = 74;
        this._barrel_sp.y = 198;
        this._barrel = this.createBitmapByName("大炮_png");
        this._barrel_sp.addChild(this._barrel);
        // this._barrel.x=74;
        // this._barrel.y=198;
        this._barrel.anchorOffsetX = 74;
        this._barrel.anchorOffsetY = 198;
        var base1 = this.createBitmapByName("炮弹底座上_png");
        this.addChild(base1);
        base1.anchorOffsetX = -22.05;
        base1.anchorOffsetY = -180.25;
        var huohua = this.createBitmapByName("炮弹火花_png");
        this._barrel_sp.addChild(huohua);
        huohua.name = "huohua";
        huohua.visible = false;
        huohua.x = -70;
        huohua.y = -290;
        // base1.anchorOffsetX = -22.05;
        // base1.anchorOffsetY = -180.25;
    };
    Gun.prototype.setRotate = function (num) {
        //this._barrel.rotation=90+num;
        egret.Tween.get(this._barrel_sp).to({ rotation: 90 + num }, 300);
    };
    Gun.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Gun.prototype.createDisobj = function (array) {
        var result = new egret.Sprite();
        for (var i = 0; i < array.length; i++) {
            result.addChild(array[i]);
        }
        return result;
    };
    Gun.prototype.showHuohua = function () {
        var _this = this;
        this._barrel_sp.getChildByName("huohua").visible = true;
        setTimeout(function () { _this._barrel_sp.getChildByName("huohua").visible = false; }, 200);
    };
    return Gun;
}(egret.Sprite));
__reflect(Gun.prototype, "Gun");
//# sourceMappingURL=Gun.js.map