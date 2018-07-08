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
var CardListView = (function (_super) {
    __extends(CardListView, _super);
    function CardListView() {
        var _this = _super.call(this) || this;
        _this.m_posArr = [[146.25, 101], [523, 101], [901.75, 101], [1281, 101]];
        _this.m_cardArr = new Array();
        _this.m_sound = new SoundPlayer();
        var bg = DisplayUtil.createBitmapByName("cardList_png");
        _this.addChild(bg);
        var conf = RES.getRes("config_json");
        for (var i = 0; i < 4; i++) {
            var card = new CardView(conf.list[i]);
            DisplayUtil.setSize(card, 184, 184);
            _this.m_cardArr.push(card);
            card.touchEnabled = true;
            card.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchCard, _this);
        }
        return _this;
    }
    //出场景
    //出场景
    CardListView.prototype.goOut = function () {
        egret.Tween.get(this).to({ x: -2120 }, 5000);
    };
    CardListView.prototype.hideCard = function (cardName) {
        for (var i = 0; i < this.m_cardArr.length; i++) {
            var card = this.m_cardArr[i];
            if (card.cardName == cardName) {
                DisplayUtil.remove(card);
            }
        }
    };
    CardListView.prototype.hideAllCard = function () {
        for (var i = 0; i < this.m_cardArr.length; i++) {
            var card = this.m_cardArr[i];
            DisplayUtil.remove(card);
        }
    };
    CardListView.prototype.refresh = function () {
        this.clear();
        ArrayUtil.randomSort(this.m_cardArr);
        for (var i = 0; i < this.m_cardArr.length; i++) {
            var card = this.m_cardArr[i];
            card.x = this.m_posArr[i][0];
            card.y = this.m_posArr[i][1];
            this.addChild(card);
            card.alpha = 0;
            egret.Tween.get(card).to({ alpha: 1 }, 300);
        }
    };
    CardListView.prototype.clear = function () {
        for (var i = 0; i < this.m_cardArr.length; i++) {
            DisplayUtil.remove(this.m_cardArr[i]);
        }
    };
    CardListView.prototype.onTouchCard = function (e) {
        this.m_sound.clear();
        this.m_sound.playRes("U1SNS01_mp3");
        var evt = new egret.Event("TOUCH_CARD");
        evt.data = e.currentTarget;
        this.dispatchEvent(evt);
    };
    return CardListView;
}(egret.Sprite));
__reflect(CardListView.prototype, "CardListView");
//# sourceMappingURL=CardListView.js.map