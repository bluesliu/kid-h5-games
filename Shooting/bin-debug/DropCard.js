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
var DropCard = (function (_super) {
    __extends(DropCard, _super);
    function DropCard() {
        var _this = _super.call(this) || this;
        _this.count = 3;
        _this.createView();
        return _this;
    }
    DropCard.prototype.createView = function () {
        var yellow_box = this.createBitmapByName("yellow_box_png");
        var violet_box = this.createBitmapByName("violet_box_png");
        var blue_box = this.createBitmapByName("blue_box_png");
        var red_box = this.createBitmapByName("red_box_png");
        this.addChildCenter(yellow_box);
        this.addChildCenter(violet_box);
        this.addChildCenter(blue_box);
        this.addChildCenter(red_box);
    };
    DropCard.prototype.addChildCenter = function (bmp) {
        bmp.anchorOffsetX = bmp.width / 2;
        bmp.anchorOffsetY = bmp.height / 2;
        this.addChild(bmp);
    };
    DropCard.prototype.setType = function (id) {
        if (id === void 0) { id = 0; }
        for (var i = 0; i < this.numChildren; i++) {
            this.getChildAt(i).visible = false;
        }
        this.getChildAt(id).visible = true;
    };
    DropCard.prototype.add = function (bmp) {
        while (this.numChildren > 4) {
            this.removeChildAt(4);
        }
        bmp.width = bmp.height = 150;
        bmp.anchorOffsetX = bmp.width / 2;
        bmp.anchorOffsetY = bmp.height / 2;
        this.addChild(bmp);
    };
    DropCard.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return DropCard;
}(egret.Sprite));
__reflect(DropCard.prototype, "DropCard");
//# sourceMappingURL=DropCard.js.map