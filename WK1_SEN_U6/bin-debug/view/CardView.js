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
        _this.m_content = DisplayUtil.createBitmapByName(_this.image);
        _this.m_content.x = -_this.m_content.width / 2;
        _this.m_content.y = -_this.m_content.height / 2;
        _this.addChild(_this.m_content);
        _this.m_shake = DisplayUtil.createBitmapByName("shake_png");
        _this.m_shake.scaleX = _this.m_shake.scaleY = 2;
        _this.m_shake.x = -_this.m_shake.width / 2 - 150;
        _this.m_shake.y = -_this.m_shake.height / 2 - 100;
        return _this;
        //this.addChild(this.m_shake);
        //this.m_shake.visible = false;
    }
    //答错 抖动
    CardView.prototype.wrong = function () {
        var _this = this;
        this.addChild(this.m_shake);
        EffectUtils.shakeObj(this, function () {
            EffectUtils.shakeObj(_this, null);
            DisplayUtil.remove(_this.m_shake);
        });
    };
    Object.defineProperty(CardView.prototype, "data", {
        get: function () { return this.m_data; },
        enumerable: true,
        configurable: true
    });
    return CardView;
}(egret.Sprite));
__reflect(CardView.prototype, "CardView");
//# sourceMappingURL=CardView.js.map