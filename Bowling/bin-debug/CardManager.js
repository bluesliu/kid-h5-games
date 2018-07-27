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
        _this.m_startPoint0 = new egret.Point(379, 148);
        _this.m_startPoint1 = new egret.Point(679, 148);
        _this.m_startPoint2 = new egret.Point(979, 148);
        _this.m_cardArr = Array();
        return _this;
    }
    CardManager.prototype.addCard = function (q) {
        var qArr = new Array();
        var q1;
        var q2;
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
        var card0 = new CardView(qArr[0]);
        card0.x = this.m_startPoint0.x;
        card0.y = this.m_startPoint0.y;
        Game.instance.sceneLayer.addChild(card0);
        this.m_cardArr.push(card0);
        var card1 = new CardView(qArr[1]);
        card1.x = this.m_startPoint1.x;
        card1.y = this.m_startPoint1.y;
        Game.instance.sceneLayer.addChild(card1);
        this.m_cardArr.push(card1);
        var card2 = new CardView(qArr[2]);
        card2.x = this.m_startPoint2.x;
        card2.y = this.m_startPoint2.y;
        Game.instance.sceneLayer.addChild(card2);
        this.m_cardArr.push(card2);
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