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
var LifeBoard = (function (_super) {
    __extends(LifeBoard, _super);
    function LifeBoard() {
        var _this = _super.call(this) || this;
        var bg = DisplayUtil.createBitmapByName("lifeBoard_png");
        _this.addChild(bg);
        for (var i = 0; i < Game.LIFE_NUM; i++) {
            var star = DisplayUtil.createBitmapByName("heartDark_png");
            star.name = "star" + i;
            star.y = 15;
            star.x = 25 + i * (star.width + 14);
            _this.addChild(star);
        }
        return _this;
    }
    //设置分数
    LifeBoard.prototype.setScore = function (value) {
        for (var i = 0; i < Game.LIFE_NUM; i++) {
            var star = this.getChildByName("star" + i);
            var texture = void 0;
            if (value >= i + 1) {
                texture = RES.getRes("heartLight_png");
            }
            else {
                texture = RES.getRes("heartDark_png");
            }
            star.texture = texture;
        }
    };
    return LifeBoard;
}(BaseBox));
__reflect(LifeBoard.prototype, "LifeBoard");
//# sourceMappingURL=LifeBoard.js.map