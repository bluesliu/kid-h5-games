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
var QuestionCompoment = (function (_super) {
    __extends(QuestionCompoment, _super);
    function QuestionCompoment() {
        var _this = _super.call(this) || this;
        _this._moveSpeed = 5;
        _this._cardDis = 798;
        _this.initContent();
        return _this;
    }
    QuestionCompoment.prototype.initContent = function () {
        for (var i = 0; i < Source.showNum; i++) {
            var card = new CardComponent();
            card.name = "card_" + i;
            card.touchEnabled = true;
            this.addChild(card);
            card.x = 120.0 + this._cardDis * i;
            card.y = 247.4;
        }
        this._questionSound = new SoundPlayer();
    };
    QuestionCompoment.prototype.startQuestion = function (id) {
        var count = Math.round(Math.random());
        for (var i = 0; i < Source.showNum; i++) {
            var card = this.getChildByName("card_" + i);
            if (i == 0) {
                card.addImg(Source.images[Source.questionList[id]][count]);
                card.tag = Source.images[Source.questionList[id]][count].name;
            }
            else {
                card.addImg(Source.images[Source.questionList[id]][1 - count]);
                card.tag = Source.images[Source.questionList[id]][1 - count].name;
            }
            card.show();
        }
        this.read(Source.questionList[id]);
    };
    QuestionCompoment.prototype.read = function (id) {
        this.answer = Source.list[id].name;
        this._questionSound.clear();
        this._questionSound.playRes(Source.list[id].audio);
    };
    QuestionCompoment.prototype.hide = function () {
        for (var i = 0; i < Source.showNum; i++) {
            var card = this.getChildByName("card_" + i);
            card.hide();
        }
    };
    return QuestionCompoment;
}(egret.Sprite));
__reflect(QuestionCompoment.prototype, "QuestionCompoment");
//# sourceMappingURL=QuestionCompoment.js.map