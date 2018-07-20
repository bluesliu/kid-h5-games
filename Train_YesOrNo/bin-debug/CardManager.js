// event: TOUCH_CARD
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
var CardManager = (function (_super) {
    __extends(CardManager, _super);
    function CardManager() {
        var _this = _super.call(this) || this;
        _this.m_startPoint0 = new egret.Point(384, 581);
        //private m_startPoint1 = new egret.Point(683,483);
        _this.m_startPoint2 = new egret.Point(981, 577);
        _this.m_cardArr = Array();
        return _this;
    }
    CardManager.prototype.addCard = function (q) {
        var card = new CardView(0, q.image1, q.audio1);
        card.x = this.m_startPoint0.x;
        card.y = this.m_startPoint0.y;
        Game.instance.sceneLayer.addChild(card);
        this.m_cardArr.push(card);
        card.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapCard, this);
        var card1 = new CardView(1, q.image2, q.audio2);
        card1.x = this.m_startPoint2.x;
        card1.y = this.m_startPoint2.y;
        Game.instance.sceneLayer.addChild(card1);
        this.m_cardArr.push(card1);
        card1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapCard, this);
    };
    CardManager.prototype.onTapCard = function (e) {
        var card = e.currentTarget;
        var evt = new egret.Event("TOUCH_CARD");
        evt.data = card;
        this.dispatchEvent(evt);
    };
    CardManager.prototype.start = function () {
        this.reset();
    };
    CardManager.prototype.reset = function () {
        //移除全部
        for (var i = this.m_cardArr.length - 1; i >= 0; i--) {
            var card = this.m_cardArr[i];
            DisplayUtil.remove(card);
            card.dispose();
        }
        this.m_cardArr.length = 0;
    };
    return CardManager;
}(egret.EventDispatcher));
__reflect(CardManager.prototype, "CardManager");
//# sourceMappingURL=CardManager.js.map