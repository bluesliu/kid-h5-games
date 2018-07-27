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
    function CardView(q) {
        var _this = _super.call(this) || this;
        // public speedY = 0;			
        // public speedX = 0;
        _this.angle = 0;
        _this.speed = 0;
        _this.question = q;
        _this.bg = DisplayUtil.createBitmapByName("card_png");
        _this.addChild(_this.bg);
        _this.bg.x = -_this.bg.width / 2;
        _this.bg.y = -_this.bg.height;
        //图片
        _this.m_content = DisplayUtil.createBitmapByName(q.image);
        DisplayUtil.setSize(_this.m_content, 170, 170);
        _this.m_content.x = -_this.m_content.width / 2;
        _this.m_content.y = -_this.m_content.height - 240;
        _this.addChild(_this.m_content);
        return _this;
    }
    CardView.prototype.setPosition = function (p) {
        this.x = p.x;
        this.y = p.y;
        this.scaleX = this.scaleY = 0.3 + this.y / (Game.instance.stageH + 200);
    };
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
    CardView.prototype.right = function () {
        EffectUtils.flyObj(this.m_content, 300);
    };
    CardView.prototype.dispose = function () {
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this.m_content);
        this.question = null;
        this.m_content = null;
    };
    Object.defineProperty(CardView.prototype, "cardName", {
        get: function () { return this.question.name; },
        enumerable: true,
        configurable: true
    });
    return CardView;
}(egret.Sprite));
__reflect(CardView.prototype, "CardView");
//# sourceMappingURL=CardView.js.map