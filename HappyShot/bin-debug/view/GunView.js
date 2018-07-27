//水枪
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
var GunView = (function (_super) {
    __extends(GunView, _super);
    function GunView() {
        var _this = _super.call(this) || this;
        _this.speed = 0;
        _this.mc = DisplayUtil.createMovieClipByName("gun");
        _this.mc.gotoAndStop("idle");
        _this.addChild(_this.mc);
        return _this;
    }
    //播放开枪效果
    GunView.prototype.shot = function (callback, thisObj) {
        var _this = this;
        this.mc.gotoAndPlay("shot", 1);
        this.mc.once(egret.MovieClipEvent.COMPLETE, function () {
            _this.mc.gotoAndStop("idle");
            if (callback != null) {
                callback.call(thisObj);
            }
        }, this);
    };
    return GunView;
}(egret.Sprite));
__reflect(GunView.prototype, "GunView");
//# sourceMappingURL=GunView.js.map