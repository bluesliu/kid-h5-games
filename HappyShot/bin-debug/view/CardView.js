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
        _this.speedY = 0;
        _this.speedX = 0;
        _this.question = q;
        _this.container = new egret.Sprite();
        _this.addChild(_this.container);
        _this.m_bg = DisplayUtil.createMovieClipByName("card");
        _this.m_bg.stop();
        _this.container.addChild(_this.m_bg);
        _this.m_bg.x = -8;
        _this.m_bg.y = -4;
        //图片
        _this.m_content = DisplayUtil.createBitmapByName(q.image);
        DisplayUtil.setSize(_this.m_content, 170, 170);
        _this.m_content.x = -93;
        _this.m_content.y = -242;
        _this.container.addChild(_this.m_content);
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
        EffectUtils.shakeObj(this.container, function () {
            EffectUtils.shakeObj(_this.container, null);
        });
    };
    CardView.prototype.right = function () {
        this.m_content.y -= 100;
        EffectUtils.flyObj(this.m_content, 300);
        this.m_bg.play(1);
    };
    Object.defineProperty(CardView.prototype, "content", {
        get: function () { return this.m_content; },
        enumerable: true,
        configurable: true
    });
    CardView.prototype.dispose = function () {
        egret.Tween.removeTweens(this.container);
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