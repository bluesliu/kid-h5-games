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
var SpaceAdventure = (function (_super) {
    __extends(SpaceAdventure, _super);
    function SpaceAdventure() {
        var _this = _super.call(this) || this;
        _this._qwdSpeed = 10;
        _this._cardSpeed = 6;
        //题目索引
        _this._questionIndex = 0;
        _this._showNum = 3;
        _this._randomHeight = [110 + 153, 559, 859];
        _this._testDis = 200;
        _this.createView();
        return _this;
    }
    SpaceAdventure.prototype.createView = function () {
        this._bg = new Bg();
        this.addChild(this._bg);
        this._qwd = Source.createBitmapByName("spaceadventure_4_png");
        this.addChild(this._qwd);
        this._qwd.anchorOffsetX = this._qwd.width * 0.5;
        this._qwd.anchorOffsetY = this._qwd.height * 0.5;
        this._qwd.x = 3 + this._qwd.width * 0.5;
        this._qwd.y = 399 + this._qwd.height * 0.5;
        ;
        // this._queation=new QuestionCompoment();
        //  this.addChild(this._queation);
        this._questionSp = new egret.Sprite();
        this.addChild(this._questionSp);
        for (var i = 0; i < this._showNum; i++) {
            var card = new CardComponent(i + 1);
            this._questionSp.addChild(card);
            card.x = 1366;
        }
        this._questionSound = new SoundPlayer();
        this._loves = new CountLoves();
        this.addChild(this._loves);
        this._loves.x = 182.5;
        this._loves.y = 11.5;
        this._stars = new CountStars();
        this.addChild(this._stars);
        this._stars.x = 749;
        this._stars.y = 22.5;
        this._upBtn = new EButton(this, "btn_up_png", this.onUpBtnBegin, this.onUpBtnEnd, "", 30, 3, null);
        PublicTool.setXY(this._upBtn, 31.7, 837.75);
        this.addChild(this._upBtn);
        this._downBtn = new EButton(this, "btn_down_png", this.onDownBtnBegin, this.onDownBtnEnd, "", 30, 3, null);
        PublicTool.setXY(this._downBtn, 1176.6, 837.75);
        this.addChild(this._downBtn);
        this._overPage = new OverPage();
        this.addChild(this._overPage);
        // this._queation.hitTestFun=this.hitTest;
        this.initListener();
    };
    SpaceAdventure.prototype.initListener = function () {
        this._overPage.addEventListener(egret.Event.COMPLETE, this.again, this);
        this._overPage.addEventListener(egret.Event.CHANGE, this.start, this);
    };
    SpaceAdventure.prototype.startQuestion = function (id) {
        var randomArr = Source.randomIndex(this._showNum);
        for (var j = 0; j < this._showNum; j++) {
            var card = this._questionSp.getChildAt(j);
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
            //egret.Tween.get(card,{loop:true}).to({x:-420}, 1000*10);
        }
        this.read(id);
    };
    SpaceAdventure.prototype.read = function (id) {
        this._answer = Source.list[id % Source.images.length].title;
        //egret.log("this.answer:",this._answer);
        this._questionSound.clear();
        this._questionSound.playRes(Source.list[id % Source.images.length].audio);
    };
    SpaceAdventure.prototype.onCardMove = function (e) {
        var card = e.target;
        card.x -= this._cardSpeed;
        if (card.x <= -300) {
            card.x = 1366 + Math.random() * 300;
        }
        this._point = this._questionSp.localToGlobal(card.x, card.y);
        //let isTrue=this._qwd.hitTestPoint(this._point.x,this._point.y,true);
        //this._point.
        var distance = egret.Point.distance(this._point, new egret.Point(this._qwd.x, this._qwd.y));
        if (distance < this._testDis) {
            this.stopMove();
            egret.log("card.name:", card.name);
            egret.log("this._answer", this._answer);
            if (card.name == this._answer) {
                this._stars.add();
                if (this._stars.count >= SpaceAdventure.WINNUM) {
                    egret.log("win");
                    this._qwd.visible = false;
                    this.addChild(this._loves);
                    this.addChild(this._stars);
                    this._questionSp.visible = false;
                    this._overPage.visible = true;
                    this._overPage.showWin(true);
                    return;
                }
            }
            else {
                this._loves.cut();
                if (this._loves.count <= 0) {
                    egret.log("fail");
                    this._qwd.visible = false;
                    this.addChild(this._loves);
                    this.addChild(this._stars);
                    this._questionSp.visible = false;
                    this._overPage.visible = true;
                    this._overPage.showWin(false);
                    return;
                }
            }
            // egret.log(this._stars.count);
            this._questionIndex++;
            this.startQuestion(this._questionIndex);
        }
    };
    SpaceAdventure.prototype.stopMove = function () {
        for (var j = 0; j < this._showNum; j++) {
            var card = this._questionSp.getChildAt(j);
            card.removeEventListener(egret.Event.ENTER_FRAME, this.onCardMove, this);
        }
    };
    SpaceAdventure.prototype.again = function (e) {
        this._qwd.x = 3 + this._qwd.width * 0.5;
        this._qwd.y = 399 + this._qwd.height * 0.5;
        ;
        this._questionIndex = 0;
        this._qwd.visible = true;
        this._loves.reset();
        this._stars.reset();
        this._overPage.visible = false;
        this._questionSp.visible = true;
        this.startQuestion(this._questionIndex);
    };
    SpaceAdventure.prototype.start = function (e) {
        this.startQuestion(this._questionIndex);
        this._overPage.visible = false;
    };
    SpaceAdventure.prototype.onUpBtnBegin = function (event) {
        this._isUp = true;
        this.addEventListener(egret.Event.ENTER_FRAME, this.onBoatMove, this);
    };
    SpaceAdventure.prototype.onUpBtnEnd = function (event) {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onBoatMove, this);
    };
    SpaceAdventure.prototype.onDownBtnBegin = function (event) {
        this._isUp = false;
        this.addEventListener(egret.Event.ENTER_FRAME, this.onBoatMove, this);
    };
    SpaceAdventure.prototype.onDownBtnEnd = function (event) {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onBoatMove, this);
    };
    SpaceAdventure.prototype.onBoatMove = function (e) {
        if (this._isUp) {
            if (this._qwd.y >= this._qwd.height * 0.5) {
                this._qwd.y -= this._qwdSpeed;
            }
        }
        else {
            if (this._qwd.y <= 1024 - this._qwd.height * 0.5) {
                this._qwd.y += this._qwdSpeed;
            }
        }
    };
    SpaceAdventure.WINNUM = 10;
    SpaceAdventure.FAILNUM = 3;
    return SpaceAdventure;
}(egret.Sprite));
__reflect(SpaceAdventure.prototype, "SpaceAdventure");
//# sourceMappingURL=SpaceAdventure.js.map