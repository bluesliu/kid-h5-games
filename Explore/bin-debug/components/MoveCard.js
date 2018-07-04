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
var MoveCard = (function (_super) {
    __extends(MoveCard, _super);
    function MoveCard() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    MoveCard.prototype.createView = function () {
        //   let yellow_box= this.createBitmapByName("yellow_box_png");
        //  let violet_box= this.createBitmapByName("violet_box_png");
        //  let blue_box= this.createBitmapByName("blue_box_png");
        //  let red_box= this.createBitmapByName("red_box_png");
        //      this.addChildCenter(yellow_box);
        //      this.addChildCenter(violet_box);
        //      this.addChildCenter(blue_box);
        //      this.addChildCenter(red_box);
    };
    return MoveCard;
}(egret.Sprite));
__reflect(MoveCard.prototype, "MoveCard");
//# sourceMappingURL=MoveCard.js.map