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
var ChengGong = (function (_super) {
    __extends(ChengGong, _super);
    function ChengGong() {
        var _this = _super.call(this) || this;
        var bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes("Level_Completed_png");
        _this.addChild(bitmap);
        return _this;
    }
    return ChengGong;
}(egret.Sprite));
__reflect(ChengGong.prototype, "ChengGong");
//# sourceMappingURL=ChengGong.js.map