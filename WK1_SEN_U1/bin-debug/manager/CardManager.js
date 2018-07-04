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
        _this._positionArr = [[474, 346], [824, 537], [1209, 462], [1566, 332]];
        _this.m_intervalTime = 3500; //间隔时间
        _this.m_lastTime = 0; //上一次添加的时间
        return _this;
    }
    CardManager.prototype.init = function (json) {
        this.m_json = json;
        this.m_lastTime = 0;
        this.m_touchSound = new SoundPlayer();
        this.m_cardArr = Array();
        for (var i = 0; i < this._positionArr.length; i++) {
            var card = new CardView(json.list[i]);
            this.m_cardArr.push(card);
        }
    };
    CardManager.prototype.onRender = function () {
        if (egret.getTimer() - this.m_lastTime > this.m_intervalTime) {
            this.sortCard();
        }
    };
    CardManager.prototype.sortCard = function () {
        this.m_lastTime = egret.getTimer();
        ArrayUtil.randomSort(this._positionArr);
        for (var i = 0; i < this.m_cardArr.length; i++) {
            var card = this.m_cardArr[i];
            card.x = this._positionArr[i][0] + 125;
            card.y = this._positionArr[i][1] + 125;
            Game.instance.sceneLayer.addChild(card);
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