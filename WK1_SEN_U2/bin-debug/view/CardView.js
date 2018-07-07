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
        _this.speedY = 0;
        _this.speedX = 0;
        _this.m_data = data;
        _this.image = data.image;
        _this.audio = data.audio;
        _this.cardName = data.name;
        //影子
        var shape = new egret.Shape();
        shape.graphics.beginFill(0x000000, 0.3);
        shape.graphics.drawCircle(0, 0, 120);
        shape.graphics.endFill();
        shape.scaleY = 0.3;
        _this.addChild(shape);
        //气球
        _this.m_balloon = DisplayUtil.createMovieClipByName("balloon");
        _this.m_balloon.gotoAndStop("idle");
        _this.addChild(_this.m_balloon);
        //图片
        _this.m_content = DisplayUtil.createBitmapByName(_this.image);
        DisplayUtil.setSize(_this.m_content, 240, 240);
        _this.m_content.x = -_this.m_content.width / 2;
        _this.m_content.y = -_this.m_content.height / 2 - 360;
        _this.addChild(_this.m_content);
        //遮罩
        var maskShape = new egret.Shape();
        maskShape.graphics.beginFill(0xffffff, 1);
        maskShape.graphics.drawCircle(0, 0, 110);
        maskShape.graphics.endFill();
        maskShape.x = _this.m_content.x + _this.m_content.width / 2;
        maskShape.y = _this.m_content.y + _this.m_content.height / 2;
        _this.addChild(maskShape);
        _this.m_content.mask = maskShape;
        return _this;
    }
    //重置
    CardView.prototype.reset = function () {
        this.m_content.filters = [];
        this.touchEnabled = true;
    };
    //答错 抖动
    CardView.prototype.wrong = function () {
        var _this = this;
        EffectUtils.shakeObj(this, function () {
            EffectUtils.shakeObj(_this, null);
        });
    };
    //答对
    CardView.prototype.right = function () {
        this.m_balloon.gotoAndPlay("light", -1);
        DisplayUtil.remove(this.m_content);
    };
    CardView.prototype.dispose = function () {
        egret.Tween.removeTweens(this);
        this.m_data = null;
        this.m_content = null;
    };
    return CardView;
}(egret.Sprite));
__reflect(CardView.prototype, "CardView");
//# sourceMappingURL=CardView.js.map