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
        _this._cardDis = 412;
        _this.initContent();
        return _this;
    }
    QuestionCompoment.prototype.initContent = function () {
        for (var i = 0; i < Source.images.length; i++) {
            var card = new CardComponent();
            card.name = "card_" + i;
            card.touchEnabled = true;
            this.addChild(card);
            card.x = 154 + this._cardDis * i;
            card.y = 335.5;
            card.addImg(Source.images[i]);
            card.tag = Source.list[i].name;
        }
        this._questionSound = new SoundPlayer();
    };
    QuestionCompoment.prototype.startQuestion = function (id) {
        // for(var i:number=0;i<Source.images.length;i++)
        // {
        // 	let card=this.getChildByName("card_"+i)as CardComponent;
        // 	card.addImg(Source.images[Source.questionList[id][i]]);
        // 	card.tag=Source.list[Source.questionList[id][i]].title;
        // 	 card.x=154+this._cardDis*i;
        // 	 card.y=335.5;
        // 	 card.show();
        // }
        this.read(id);
    };
    QuestionCompoment.prototype.read = function (id) {
        this.answer = Source.list[id].name;
        this._questionSound.clear();
        this._questionSound.playRes(Source.list[id].audio);
        // this.answer=Source.list[id%Source.images.length].title;
        // this._questionSound.clear();
        // this._questionSound.playRes(Source.list[id%Source.images.length].audio);
    };
    QuestionCompoment.prototype.move = function () {
        for (var i = 0; i < Source.images.length; i++) {
            var card = this.getChildByName("card_" + i);
            card.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        }
    };
    QuestionCompoment.prototype.onEnterFrame = function (e) {
        var card = e.target;
        var id = card.name.split("_")[1];
        card.x -= this._moveSpeed;
        if (card.x <= -card.width) {
            var prevCard = void 0;
            //egret.log(card.name);
            if (id == 0) {
                prevCard = this.getChildByName("card_" + (Source.images.length - 1));
            }
            else {
                prevCard = this.getChildByName("card_" + (id - 1));
            }
            card.x = prevCard.x + this._cardDis;
            card.show();
        }
    };
    QuestionCompoment.prototype.stop = function () {
        for (var i = 0; i < Source.images.length; i++) {
            var card = this.getChildByName("card_" + i);
            card.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        }
    };
    QuestionCompoment.prototype.reset = function () {
        for (var i = 0; i < Source.images.length; i++) {
            var card = this.getChildByName("card_" + i);
            card.x = 154 + this._cardDis * i;
            card.y = 335.5;
            card.show();
        }
    };
    return QuestionCompoment;
}(egret.Sprite));
__reflect(QuestionCompoment.prototype, "QuestionCompoment");
//# sourceMappingURL=QuestionCompoment.js.map