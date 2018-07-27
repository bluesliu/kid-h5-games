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
        if (q === void 0) { q = null; }
        var _this = _super.call(this) || this;
        //图片
        _this.m_content = new egret.Bitmap();
        _this.addChild(_this.m_content);
        _this.question = q;
        return _this;
    }
    Object.defineProperty(CardView.prototype, "question", {
        get: function () { return this.m_question; },
        set: function (value) {
            egret.Tween.removeTweens(this);
            egret.Tween.removeTweens(this.m_content);
            this.m_question = value;
            if (this.m_question != null) {
                this.m_content.texture = RES.getRes(this.m_question.image);
                DisplayUtil.setSize(this.m_content, 170, 170);
            }
        },
        enumerable: true,
        configurable: true
    });
    //答错 抖动
    CardView.prototype.wrong = function () {
        var _this = this;
        EffectUtils.shakeObj(this, function () {
            EffectUtils.shakeObj(_this, null);
        });
    };
    CardView.prototype.right = function () {
        EffectUtils.flyObj(this, 500);
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