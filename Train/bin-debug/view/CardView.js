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
    function CardView(index, q) {
        var _this = _super.call(this) || this;
        _this.speedY = 0;
        _this.speedX = 0;
        _this.question = q;
        _this.m_bg = DisplayUtil.createBitmapByName("card" + (index + 1) + "_png");
        _this.addChild(_this.m_bg);
        _this.m_bg.x = -_this.m_bg.width / 2;
        _this.m_bg.y = -_this.m_bg.height / 2;
        //图片
        _this.m_content = DisplayUtil.createBitmapByName(q.image);
        DisplayUtil.setSize(_this.m_content, 170, 170);
        _this.m_content.x = -_this.m_content.width / 2;
        _this.m_content.y = -_this.m_content.height / 2;
        _this.addChild(_this.m_content);
        // //遮罩
        // let maskShape = new egret.Shape();
        // maskShape.graphics.beginFill(0xffffff, 1);
        // maskShape.graphics.drawCircle(0,0,110);
        // maskShape.graphics.endFill();
        // maskShape.x = this.m_content.x + this.m_content.width/2;
        // maskShape.y = this.m_content.y + this.m_content.height/2;
        // this.addChild(maskShape);
        // this.m_content.mask = maskShape;
        _this.touchEnabled = true;
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
    CardView.prototype.right = function () {
        EffectUtils.flyObj(this, 300);
    };
    CardView.prototype.dispose = function () {
        egret.Tween.removeTweens(this);
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