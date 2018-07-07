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
        _this._showNum = 3;
        _this._randomHeight = [110, 406, 706];
        _this.initContent();
        return _this;
    }
    QuestionCompoment.prototype.initContent = function () {
        for (var i = 0; i < this._showNum; i++) {
            var card = new CardComponent(i + 1);
            this.addChild(card);
            card.x = 1366;
        }
        this._questionSound = new SoundPlayer();
    };
    QuestionCompoment.prototype.startQuestion = function (id) {
        var randomArr = Source.randomIndex(this._showNum);
        for (var j = 0; j < 1; j++) {
            var card = this.getChildAt(j);
            if (j > 0) {
                var index = Source.questionList[id][j - 1];
                card.addImg(Source.images[index]);
                card.name = Source.list[index].title;
                //egret.log(j,index,card.name);
            }
            else {
                card.name = "";
            }
            card.x = 1366 + Math.random() * 300;
            card.y = this._randomHeight[randomArr[j]];
            card.addEventListener(egret.Event.ENTER_FRAME, this.onCardMove, this);
            egret.Tween.get(card, { loop: true }).to({ x: -420 }, 1000 * 10);
        }
        this.read(id);
    };
    QuestionCompoment.prototype.read = function (id) {
        this.answer = Source.list[id % Source.images.length].title;
        egret.log("this.answer:", this.answer);
        this._questionSound.clear();
        this._questionSound.playRes(Source.list[id % Source.images.length].audio);
    };
    QuestionCompoment.prototype.onCardMove = function (e) {
        var card = e.target;
        //card.x-=5;
        // if(card.x<=-300)
        // {
        // 	card.x=1366+Math.random()*300;
        // }
        //egret.log("card.name:",card.name);
        if (this.hitTestFun) {
            var p = this.localToGlobal(card.x, card.y);
            this.hitTestFun.apply(this.parent, [p.x, p.y, card]);
        }
    };
    QuestionCompoment.prototype.stop = function () {
        for (var j = 0; j < this.numChildren; j++) {
            var card = this.getChildAt(j);
            egret.Tween.pauseTweens(card);
            if (card.hasEventListener(egret.Event.ENTER_FRAME)) {
                card.removeEventListener(egret.Event.ENTER_FRAME, this.onCardMove, this);
            }
        }
    };
    return QuestionCompoment;
}(egret.Sprite));
__reflect(QuestionCompoment.prototype, "QuestionCompoment");
//# sourceMappingURL=QuestionCompoment.js.map