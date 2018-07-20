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
var CountStars = (function (_super) {
    __extends(CountStars, _super);
    function CountStars() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this.initContent();
        return _this;
    }
    CountStars.prototype.initContent = function () {
        var gstars = this.createBitmapByName("gstars_png");
        this.addChild(gstars);
        this._stars = this.createBitmapByName("stars_png");
        this.addChild(this._stars);
        this._topMask = new egret.Shape();
        this.addChild(this._topMask);
        this._topMask.graphics.beginFill(0x000000, 1);
        this._topMask.graphics.drawRect(0, 0, CountStars.MOVEDIS * CountStars.NUM, 51);
        this._topMask.graphics.endFill();
        this._stars.mask = this._topMask;
        //	this._topMask.x=(this.count-CountStars.NUM)*CountStars.MOVEDIS;
        this._stars.x = (this.count + CountStars.NUM) * CountStars.MOVEDIS;
    };
    CountStars.prototype.add = function () {
        if (this.count >= CountStars.NUM)
            return;
        this.count++;
        // this._topMask.x=(this.count-CountStars.NUM)*CountStars.MOVEDIS;
        // if(_count>=_num)return;
        // _count++;
        //			_res.stars.x=(_count-_num)*_moveDis;
        this._stars.x -= CountStars.MOVEDIS;
    };
    CountStars.prototype.cut = function () {
        if (this.count <= 0)
            return;
        this.count--;
        this._stars.x = (this.count - CountStars.NUM) * CountStars.MOVEDIS;
    };
    CountStars.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    CountStars.prototype.createDisobj = function (array) {
        var result = new egret.Sprite();
        for (var i = 0; i < array.length; i++) {
            result.addChild(array[i]);
        }
        return result;
    };
    CountStars.prototype.reset = function () {
        this.count = 0;
        this._stars.x = (this.count + CountStars.NUM) * CountStars.MOVEDIS;
        //_count=0;
        //	_res.stars.x=(_count+_num)*_moveDis;
    };
    CountStars.NUM = 10;
    CountStars.MOVEDIS = 60;
    return CountStars;
}(egret.Sprite));
__reflect(CountStars.prototype, "CountStars");
//# sourceMappingURL=CountStars.js.map