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
var LongSwfView = (function (_super) {
    __extends(LongSwfView, _super);
    function LongSwfView() {
        return _super.call(this) || this;
    }
    LongSwfView.prototype.init = function () {
        this._mcData = RES.getRes("Long_swf_json");
        this._mcTexture = RES.getRes("Long_swf_png");
        var mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
        var role = new egret.MovieClip(mcDataFactory.generateMovieClipData("attack"));
        this.addChild(role);
        role.gotoAndPlay(1, 300);
    };
    return LongSwfView;
}(egret.Sprite));
__reflect(LongSwfView.prototype, "LongSwfView");
//# sourceMappingURL=LongSwfView.js.map