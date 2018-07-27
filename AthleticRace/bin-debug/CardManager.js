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
        _this.m_startPoint1 = new egret.Point(611, 0);
        _this.m_startPoint2 = new egret.Point(762, 0);
        _this.canMove = true;
        _this.m_cardArr = Array();
        return _this;
    }
    CardManager.prototype.onRender = function () {
        if (this.canMove) {
            this.moveCard();
        }
    };
    CardManager.prototype.addCard = function (q) {
        var qArr = new Array();
        var q1;
        //left 卡片
        while (true) {
            var idx = MathUtil.random(0, Game.instance.question.$qList.length - 1, 1);
            q1 = Game.instance.question.$qList[idx];
            if (q1.name != q.name) {
                break;
            }
        }
        qArr.push(q);
        qArr.push(q1);
        ArrayUtil.randomSort(qArr);
        var card1 = new CardView(qArr[0]);
        card1.setPosition(this.m_startPoint1);
        card1.speed = 4;
        card1.angle = 102;
        Game.instance.sceneLayer.addChild(card1);
        this.m_cardArr.push(card1);
        //right 卡片
        var card2 = new CardView(qArr[1]);
        card2.setPosition(this.m_startPoint2);
        card2.speed = 4;
        card2.angle = 80;
        card2.bg.scaleX = -1;
        card2.bg.x = card2.bg.width / 2;
        Game.instance.sceneLayer.addChild(card2);
        this.m_cardArr.push(card2);
    };
    CardManager.prototype.start = function () {
        this.canMove = true;
        this.reset();
    };
    CardManager.prototype.moveCard = function () {
        for (var i = this.m_cardArr.length - 1; i >= 0; i--) {
            var card = this.m_cardArr[i];
            var p = MathUtil.circle(card.x, card.y, card.speed, MathUtil.D2R(card.angle));
            card.setPosition(p);
            if (card.y >= 1580) {
                DisplayUtil.remove(card);
                this.m_cardArr.splice(i, 1);
                card.dispose();
            }
        }
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
    CardManager.prototype.hideCard = function () {
        for (var i = this.m_cardArr.length - 1; i >= 0; i--) {
            var card = this.m_cardArr[i];
            card.visible = false;
        }
    };
    return CardManager;
}(egret.EventDispatcher));
__reflect(CardManager.prototype, "CardManager");
//# sourceMappingURL=CardManager.js.map