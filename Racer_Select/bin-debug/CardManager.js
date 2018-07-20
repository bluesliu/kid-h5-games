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
        _this.m_startPoint0 = new egret.Point(1366 / 2, -100);
        _this.m_startPoint1 = new egret.Point(1366 / 2 - 100, -100);
        _this.m_startPoint2 = new egret.Point(1366 / 2 + 100, -100);
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
        var q2;
        //left 卡片
        while (true) {
            var idx = MathUtil.random(0, Game.instance.question.$qList.length - 1, 1);
            q1 = Game.instance.question.$qList[idx];
            if (q1.name != q.name) {
                break;
            }
        }
        while (true) {
            var idx = MathUtil.random(0, Game.instance.question.$qList.length - 1, 1);
            q2 = Game.instance.question.$qList[idx];
            if (q2.name != q.name && q2.name != q1.name) {
                break;
            }
        }
        qArr.push(q);
        qArr.push(q1);
        qArr.push(q2);
        ArrayUtil.randomSort(qArr);
        var card = new CardView(qArr[0]);
        card.x = this.m_startPoint0.x;
        card.y = this.m_startPoint0.y;
        card.speedY = 4;
        card.speedX = 0;
        Game.instance.sceneLayer.addChild(card);
        this.m_cardArr.push(card);
        var card1 = new CardView(qArr[1]);
        card1.x = this.m_startPoint1.x;
        card1.y = this.m_startPoint1.y;
        card1.speedY = 4;
        card1.speedX = -1.6;
        Game.instance.sceneLayer.addChild(card1);
        this.m_cardArr.push(card1);
        //right 卡片
        var card2 = new CardView(qArr[2]);
        card2.x = this.m_startPoint2.x;
        card2.y = this.m_startPoint2.y;
        card2.speedY = 4;
        card2.speedX = 1.6;
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
            card.x += card.speedX;
            card.y += card.speedY;
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
    CardManager.prototype.wrong = function (hitCardName) {
        for (var i = 0; i < this.m_cardArr.length; i++) {
            if (this.m_cardArr[i].cardName == hitCardName) {
                this.m_cardArr[i].wrong();
            }
        }
    };
    CardManager.prototype.right = function (hitCardName) {
        for (var i = 0; i < this.m_cardArr.length; i++) {
            if (this.m_cardArr[i].cardName == hitCardName) {
                this.m_cardArr[i].right();
            }
        }
    };
    CardManager.prototype.hideCard = function () {
        for (var i = this.m_cardArr.length - 1; i >= 0; i--) {
            var card = this.m_cardArr[i];
            card.visible = false;
        }
    };
    CardManager.prototype.hitCardName = function (x, y) {
        for (var i = this.m_cardArr.length - 1; i >= 0; i--) {
            var card = this.m_cardArr[i];
            if (card.hitTestPoint(x, y)) {
                return card.cardName;
            }
        }
        return "";
    };
    return CardManager;
}(egret.EventDispatcher));
__reflect(CardManager.prototype, "CardManager");
//# sourceMappingURL=CardManager.js.map