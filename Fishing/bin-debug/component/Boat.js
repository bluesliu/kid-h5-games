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
var Boat = (function (_super) {
    __extends(Boat, _super);
    function Boat() {
        var _this = _super.call(this) || this;
        _this.initContent();
        return _this;
    }
    Boat.prototype.initContent = function () {
        var boat = Source.createBitmapByName("buyu_7_png");
        this.addChild(boat);
        var face1_png = Source.createBitmapByName("face1_png");
        this.addChild(face1_png);
        face1_png.x = 211.5;
        var face2_png = Source.createBitmapByName("face2_png");
        this.addChild(face2_png);
        face2_png.x = 210.5;
        face2_png.y = 4;
        face2_png.visible = false;
        var face3_png = Source.createBitmapByName("face3_png");
        this.addChild(face3_png);
        face3_png.x = 208.5;
        face3_png.y = 7;
        face3_png.visible = false;
    };
    Boat.prototype.gotoAndStop = function (id) {
        for (var i = 1; i < this.numChildren; i++) {
            this.getChildAt(i).visible = false;
        }
        this.getChildAt(id).visible = true;
    };
    Boat.LINEDEPTH = 300;
    return Boat;
}(egret.Sprite));
__reflect(Boat.prototype, "Boat");
//# sourceMappingURL=Boat.js.map