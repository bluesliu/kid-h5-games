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
var LiZiClass = (function (_super) {
    __extends(LiZiClass, _super);
    function LiZiClass() {
        var _this = _super.call(this) || this;
        _this._texture = RES.getRes("rock_png");
        _this._conf = RES.getRes("sun_json");
        return _this;
    }
    LiZiClass.prototype.begin = function (e) {
        //this.system.start();
        var s = new OneLiZi();
        this.addChild(s);
        s.init();
        s.x = e.stageX;
        s.y = e.stageY;
    };
    LiZiClass.prototype.move = function (e) {
        var s = new OneLiZi();
        this.addChild(s);
        s.init();
        s.x = e.stageX;
        s.y = e.stageY;
    };
    LiZiClass.prototype.end = function (e) {
        //this.system.stop();
    };
    return LiZiClass;
}(egret.Sprite));
__reflect(LiZiClass.prototype, "LiZiClass");
//# sourceMappingURL=LiZiClass.js.map