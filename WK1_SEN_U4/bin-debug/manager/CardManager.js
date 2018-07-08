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
var MyPosition = (function (_super) {
    __extends(MyPosition, _super);
    function MyPosition(x, y, id) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (id === void 0) { id = 0; }
        var _this = _super.call(this, x, y) || this;
        _this.id = id;
        return _this;
    }
    return MyPosition;
}(egret.Point));
__reflect(MyPosition.prototype, "MyPosition");
var CardManager = (function (_super) {
    __extends(CardManager, _super);
    function CardManager() {
        var _this = _super.call(this) || this;
        _this.POS_CONF = [new MyPosition(474, 346, 1), new MyPosition(824, 537, 2),
            new MyPosition(1209, 462, 3), new MyPosition(1566, 332, 4)];
        _this._positionArr = [];
        return _this;
    }
    CardManager.prototype.init = function (json) {
        this.m_json = json;
        this.m_touchSound = new SoundPlayer();
        this.m_cardArr = Array();
        for (var i = 0; i < this.POS_CONF.length; i++) {
            var card = new CardView(json.list[i]);
            card.touchEnabled = true;
            card.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCard, this);
            this.m_cardArr.push(card);
        }
    };
    CardManager.prototype.sortCard = function () {
        ArrayUtil.randomSort(this.POS_CONF);
        for (var i = 0; i < this.m_cardArr.length; i++) {
            var pos = this.POS_CONF[i];
            var card = this.m_cardArr[i];
            card.id = pos.id;
            card.x = pos.x + 125;
            card.y = pos.y + 125;
            Game.instance.sceneLayer.addChild(card);
            card.reset();
        }
    };
    CardManager.prototype.setLight = function (value) {
        for (var i = this.m_cardArr.length - 1; i >= 0; i--) {
            var card = this.m_cardArr[i];
            if (card.id == value) {
                card.light();
            }
            else {
                card.dark();
            }
        }
    };
    CardManager.prototype.start = function () {
        this.reset();
        this.sortCard();
    };
    CardManager.prototype.onTouchCard = function (e) {
        //播放点击卡片音效
        this.m_touchSound.clear();
        this.m_touchSound.playRes("U1SNS01_mp3");
        var evt = new egret.Event("TOUCH_CARD");
        evt.data = e.currentTarget;
        this.dispatchEvent(evt);
    };
    CardManager.prototype.reset = function () {
        for (var i = this.m_cardArr.length - 1; i >= 0; i--) {
            var card = this.m_cardArr[i];
            DisplayUtil.remove(card);
            card.reset();
        }
    };
    CardManager.prototype.wrong = function () {
        for (var i = this.m_cardArr.length - 1; i >= 0; i--) {
            var card = this.m_cardArr[i];
            card.wrong();
        }
    };
    CardManager.prototype.hideCard = function () {
        for (var i = 0; i < this.m_cardArr.length; i++) {
            var card = this.m_cardArr[i];
            DisplayUtil.remove(card);
        }
    };
    return CardManager;
}(egret.EventDispatcher));
__reflect(CardManager.prototype, "CardManager");
//# sourceMappingURL=CardManager.js.map