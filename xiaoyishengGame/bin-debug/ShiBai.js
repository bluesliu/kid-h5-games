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
var ShiBai = (function (_super) {
    __extends(ShiBai, _super);
    function ShiBai() {
        var _this = _super.call(this) || this;
        var bmp = new egret.Bitmap();
        bmp.texture = RES.getRes("game_over_png");
        _this.addChild(bmp);
        var sp = new egret.Sprite();
        _this.addChild(sp);
        var bmp1 = new egret.Bitmap();
        bmp1.texture = RES.getRes("tryagain_png");
        sp.addChild(bmp1);
        sp.x = 100;
        sp.y = bmp.height + 50;
        return _this;
    }
    return ShiBai;
}(egret.Sprite));
__reflect(ShiBai.prototype, "ShiBai");
//# sourceMappingURL=ShiBai.js.map