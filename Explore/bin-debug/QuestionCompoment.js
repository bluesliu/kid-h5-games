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
        _this._allList = new Array();
        _this._imgList = new Array();
        _this._qIDArr = new Array();
        _this._nowIDArr = new Array();
        _this._itemArr = new Array();
        _this._answerID = -1;
        _this.root = "data/";
        /**
        * 对应要加载的资源组名称
        */
        _this.resGroupName = "unit1";
        _this.isResourceLoadEnd = false;
        _this._isStart = false;
        _this.answer = false;
        _this._index = 0;
        _this.initContent();
        return _this;
    }
    QuestionCompoment.prototype.initContent = function () {
        this.m_tipsSound = new SoundPlayer();
    };
    QuestionCompoment.prototype.createQuestion = function (id) {
        this._index = id;
        egret.log("this._index:", this._index);
        this._isStart = true;
        var tim = 250 * this.numChildren;
        for (var j = 0; j < this.numChildren; j++) {
            egret.Tween.get(this.getChildAt(j)).to({ y: 514 + 50, alpha: 0 }, 1000, egret.Ease.quadInOut);
        }
        egret.setTimeout(this.newQuestion, this, tim);
    };
    QuestionCompoment.prototype.newQuestion = function () {
        var _this = this;
        while (this.numChildren > 0) {
            this.removeChildAt(0);
        }
        var _loop_1 = function (i) {
            var qid = Source.questionList[this_1._index][i];
            var bmp = Source.images[qid];
            var item = new CardComponent(i + 1, bmp, qid);
            item.name = "item_" + qid;
            item.x = 120 + 400 * i;
            item.y = 150;
            item.alpha = 0;
            //item.y=514+50;
            this_1.addChild(item);
            item.$touchEnabled = true;
            item.addEventListener(egret.TouchEvent.TOUCH_TAP, this_1.cardClick, this_1);
            egret.setTimeout(function (a) {
                egret.Tween.get(item).to({ y: 100, alpha: 1 }, 1000, egret.Ease.quadInOut).call(function () {
                    item.move();
                }, _this);
            }, this_1, 100 * i);
        };
        var this_1 = this;
        for (var i = 0; i < Source.questionList[this._index].length; i++) {
            _loop_1(i);
        }
        // let copyArr:Array<any>=this._qIDArr.slice();
        // this._nowIDArr.length=0;
        // //egret.log("----",this._qIDArr.length);
        // for(let i:number=0;i<4&&i<this._qIDArr.length;i++){
        // 	this._nowIDArr.push(this.getRandomArr(copyArr));
        // 	let qid=this._nowIDArr[i];
        // 	let bmp=this._imgList[qid];			
        // 	let item:CardComponent=new CardComponent(i,bmp,qid);
        // 	item.name="item_"+qid;
        // 	item.x=120+308*i;
        // 	item.y=514;
        // 	item.alpha=0;
        // 	item.y=514+50;
        // 	this.addChild(item);
        // 	egret.setTimeout(a=>{
        // 		egret.Tween.get(item).to({y: 514,alpha:1}, 1000, egret.Ease.quadInOut);
        // 	},this,100*i)
        // 	//egret.log("----",item.x);
        // 	//this._itemArr.push(item);
        // }
        // copyArr=this._nowIDArr.slice();
        // if(copyArr.indexOf(this._answerID)!=-1){
        // 	copyArr.splice(copyArr.indexOf(this._answerID),1);
        // }
        this._answerID = this._index % Source.images.length;
        this.repeat();
    };
    QuestionCompoment.prototype.repeat = function () {
        this.m_tipsSound.clear();
        this.m_tipsSound.playRes(Source.list[this._answerID].audio);
    };
    QuestionCompoment.prototype.cardClick = function (event) {
        if (this._answerID == event.target.name.split("_")[1]) {
            this.answer = true;
        }
        else {
            this.answer = false;
        }
        if (this.clickFun) {
            //var p:egret.Point=this.localToGlobal(event.stageX,event.stageY);
            var p = this.localToGlobal(event.target.x, event.target.y);
            this.clickFun.apply(this.parent, [p.x, p.y]);
        }
        //egret.log(event.target);
    };
    QuestionCompoment.prototype.reset = function () {
        while (this.numChildren > 0) {
            this.removeChildAt(0);
        }
    };
    return QuestionCompoment;
}(egret.Sprite));
__reflect(QuestionCompoment.prototype, "QuestionCompoment");
//# sourceMappingURL=QuestionCompoment.js.map