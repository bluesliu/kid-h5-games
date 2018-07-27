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
        _this.canMove = true;
        _this.m_cardArr = new Array();
        _this.m_historyArr = new Array();
        return _this;
    }
    CardManager.prototype.onRender = function () {
        if (!this.canMove) {
            return;
        }
        this.moveCard();
        if (ArrayUtil.getLastItem(this.m_cardArr) != null) {
            var card = ArrayUtil.getLastItem(this.m_cardArr);
            if (card.x < 910) {
                this.addCard();
            }
        }
        else if (this.m_cardArr.length == 0) {
            this.addCard();
        }
    };
    CardManager.prototype.addCard = function () {
        var q;
        //如果最后两个不是答案，就添加一个正确答案
        if (this.m_cardArr.length >= 3
            && this.m_cardArr[this.m_cardArr.length - 1].cardName != Game.instance.question.curQuestion.name
            && this.m_cardArr[this.m_cardArr.length - 2].cardName != Game.instance.question.curQuestion.name
            && this.m_cardArr[this.m_cardArr.length - 3].cardName != Game.instance.question.curQuestion.name) {
            q = Game.instance.question.curQuestion;
        }
        else {
            var hasQuestion = false;
            do {
                q = ArrayUtil.getRandomItem(Game.instance.question.$qList);
                hasQuestion = false;
                for (var i = 0; i < Game.instance.question.$qList.length - 1; i++) {
                    var idx = this.m_historyArr.length - i - 1;
                    if (idx < 0) {
                        break;
                    }
                    var historyQ = this.m_historyArr[idx];
                    if (historyQ.name == q.name) {
                        hasQuestion = true;
                        break;
                    }
                }
            } while (hasQuestion);
        }
        var card = new CardView(q);
        card.x = 1293;
        card.y = 682;
        card.speedX = -2.5;
        Game.instance.scene.cardLayer.addChild(card);
        this.m_cardArr.push(card);
        this.m_historyArr.push(q);
    };
    CardManager.prototype.start = function () {
        this.canMove = true;
        this.reset();
    };
    CardManager.prototype.moveCard = function () {
        for (var i = this.m_cardArr.length - 1; i >= 0; i--) {
            var card = this.m_cardArr[i];
            card.x += card.speedX;
            if (card.x <= 70) {
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
    CardManager.prototype.getHitCard = function (x) {
        for (var i = this.m_cardArr.length - 1; i >= 0; i--) {
            var card = this.m_cardArr[i];
            if (Math.abs(card.x - x) < 150) {
                return card;
            }
        }
        return null;
    };
    return CardManager;
}(egret.EventDispatcher));
__reflect(CardManager.prototype, "CardManager");
//# sourceMappingURL=CardManager.js.map