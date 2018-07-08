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
var CardView = (function (_super) {
    __extends(CardView, _super);
    function CardView(data) {
        var _this = _super.call(this) || this;
        _this.m_data = data;
        _this.image = data.image;
        _this.audio = data.audio;
        _this.cardName = data.name;
        //BG
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xffffff, 0.5);
        shape.graphics.drawRoundRect(0, 0, 250, 250, 40);
        shape.graphics.endFill();
        shape.x = -shape.width / 2;
        shape.y = -shape.height / 2;
        _this.addChild(shape);
        var bg = DisplayUtil.createBitmapByName("card_png");
        bg.x = -bg.width / 2;
        bg.y = -bg.height / 2;
        _this.addChild(bg);
        _this.m_content = DisplayUtil.createBitmapByName(_this.image);
        DisplayUtil.setSize(_this.m_content, 250, 250);
        _this.m_content.x = -_this.m_content.width / 2;
        _this.m_content.y = -_this.m_content.height / 2;
        _this.addChild(_this.m_content);
        _this.m_star = DisplayUtil.createBitmapByName("star_png");
        _this.m_star.x = -_this.m_star.width / 2;
        _this.m_star.y = -_this.m_star.height / 2;
        _this.addChild(_this.m_star);
        return _this;
    }
    //重置
    CardView.prototype.reset = function () {
        DisplayUtil.remove(this.m_star);
        this.m_content.filters = [];
        this.touchEnabled = true;
    };
    //答错 抖动
    CardView.prototype.wrong = function () {
        var _this = this;
        EffectUtils.shakeObj(this.m_content, function () {
            EffectUtils.shakeObj(_this.m_content, null);
        });
    };
    //答对
    CardView.prototype.right = function () {
        this.addChild(this.m_star);
    };
    CardView.prototype.light = function () {
        this.m_content.filters = [];
        this.touchEnabled = true;
    };
    CardView.prototype.dark = function () {
        var matrix = [1, 0, 0, 0, -89.25,
            0, 1, 0, 0, -89.25,
            0, 0, 1, 0, -89.25,
            0, 0, 0, 1, 0];
        this.m_content.filters = [new egret.ColorMatrixFilter(matrix)];
        this.touchEnabled = false;
    };
    return CardView;
}(egret.Sprite));
__reflect(CardView.prototype, "CardView");
//# sourceMappingURL=CardView.js.map