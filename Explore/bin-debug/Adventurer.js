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
var Adventurer = (function (_super) {
    __extends(Adventurer, _super);
    function Adventurer() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this._move = false;
        _this._speedX = 5;
        if (_this.stage) {
            _this.initContent();
        }
        else {
            var timer = new egret.Timer(100, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, _this.timerFunc, _this);
            timer.start();
        }
        return _this;
    }
    Adventurer.prototype.timerFunc = function (event) {
        if (this.stage) {
            //  this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            event.currentTarget.stop();
            this.initContent();
        }
    };
    Adventurer.prototype.initContent = function () {
        this._bg = new Bg();
        this.addChild(this._bg);
        this._question = new QuestionCompoment();
        this.addChild(this._question);
        this._qwd = new Qieadi();
        this.addChild(this._qwd);
        this._qwd.x = 474;
        this._qwd.y = 660;
        this._loves = new CountLoves();
        this.addChild(this._loves);
        this._loves.x = 200;
        this._loves.y = 16;
        this._stars = new CountStars();
        this.addChild(this._stars);
        this._stars.x = 755;
        this._stars.y = 24;
        var caidai = Source.createBitmapByName("success_2_png");
        var qwd2 = Source.createBitmapByName("success_0_png");
        var qwd3 = Source.createBitmapByName("fail_1_png");
        var successStar = Source.createBitmapByName("success_1_png");
        var failStar = Source.createBitmapByName("fail_2_png");
        this._tryAgain = Source.createBitmapByName("fail_0_png");
        this._topSp = new egret.Sprite();
        this.addChild(this._topSp);
        this._topSp.graphics.beginFill(0x000000, 0.5);
        this._topSp.graphics.drawRect(0, 0, 1366, 1024);
        this._topSp.graphics.endFill();
        this._topSp.visible = false;
        this._topSp.$touchEnabled = true;
        this._topSp.addChild(caidai);
        caidai.name = "caidai";
        caidai.y = 68.48;
        caidai.visible = false;
        this._topSp.addChild(qwd2);
        qwd2.name = "qwd2";
        qwd2.x = 45 + 798;
        qwd2.y = -66 + 695;
        qwd2.visible = false;
        this._topSp.addChild(qwd3);
        qwd3.name = "qwd3";
        qwd3.x = 45 + 798;
        qwd3.y = -66 + 695;
        qwd3.visible = false;
        this._topSp.addChild(successStar);
        successStar.name = "successStar";
        successStar.x = 324;
        successStar.y = 157;
        successStar.visible = false;
        successStar.touchEnabled = true;
        this._topSp.addChild(failStar);
        failStar.name = "failStar";
        failStar.x = 324;
        failStar.y = 157;
        failStar.visible = false;
        this._topSp.addChild(this._tryAgain);
        this._tryAgain.name = "tryAgain";
        this._tryAgain.x = 568;
        this._tryAgain.y = 787;
        this._tryAgain.visible = false;
        this._tryAgain.$touchEnabled = true;
        this._startBG = new egret.Sprite();
        this._startBG.graphics.beginFill(0, 0.5);
        this._startBG.graphics.drawRect(0, 0, PublicTool.stageWidth, PublicTool.stageHeight);
        this._startBG.graphics.endFill();
        this._startBG.touchEnabled = true;
        this.addChild(this._startBG);
        this._startBtn = new EButton(this, "start_png", null, null, "", 30, 3, null);
        this._startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnClick, this);
        this._startBtn.x = (PublicTool.stageWidth - this._startBtn.width) * 0.5;
        this._startBtn.y = (PublicTool.stageHeight - this._startBtn.height) * 0.5;
        this._startBG.addChild(this._startBtn);
        this.m_bgSound = new SoundPlayer();
        this._question.clickFun = this.cardClick;
        this.initListener();
    };
    Adventurer.prototype.initListener = function () {
        // this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        // this._cards.addEventListener(egret.Event.COMPLETE, this.boxShow, this);
        //this._question.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cardClick, this);
        this._tryAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.replay, this);
    };
    Adventurer.prototype.replay = function (e) {
        e.stopImmediatePropagation();
        Source.reArrange();
        this._topSp.visible = false;
        for (var i = 0; i < this._topSp.numChildren; i++) {
            this._topSp.getChildAt(i).visible = false;
        }
        this.m_bgSound.clear();
        this.m_bgSound.playRes("bgmusic_mp3", 0, 0.1);
        this._qwd.visible = true;
        this._qwd.scaleX = 1;
        this._qwd.x = 474;
        this._qwd.y = 660;
        this._index = 0;
        // this._countArr=[];
        this._loves.reset();
        this._stars.reset();
        // this._quit.visible=true;
        //this._next.visible = false;
        // this.m_repeatBtn.visible = true;
        // this.start();
        this._question.reset();
        this._question.visible = true;
        this._question.createQuestion(this._index);
    };
    Adventurer.prototype.cardClick = function (pX, pY) {
        if (this._move)
            return;
        if (this._qwd.x >= pX) {
            this._left = true;
            if (this._qwd.scaleX != 1) {
                this._qwd.scaleX = 1;
                this._qwd.x = this._qwd.x - this._qwd.width;
            }
        }
        else {
            this._left = false;
            if (this._qwd.scaleX == 1) {
                this._qwd.scaleX = -1;
                this._qwd.x = this._qwd.x + this._qwd.width;
            }
        }
        this._cardX = pX;
        this._move = true;
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame0, this);
    };
    Adventurer.prototype.onEnterFrame0 = function (event) {
        var _this = this;
        if (this._left) {
            this._qwd.x -= this._speedX;
            if (this._qwd.x <= this._cardX) {
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame0, this);
                this._qwd.gotoAndStop(1);
                this._move = false;
                if (this._question.answer) {
                    this._stars.add();
                }
                else {
                    this._loves.cut();
                }
                setTimeout(function () {
                    _this._qwd.gotoAndStop(0);
                    _this._index++;
                    if (_this._index == 10) {
                        _this._question.visible = false;
                        _this._qwd.visible = false;
                        _this.addChild(_this._loves);
                        _this.addChild(_this._stars);
                        _this.addChild(_this._qwd);
                        _this._topSp.visible = true;
                        _this._topSp.getChildByName("caidai").visible = true;
                        _this._topSp.getChildByName("successStar").visible = true;
                        _this._topSp.getChildByName("tryAgain").visible = true;
                        _this._topSp.getChildByName("qwd2").visible = true;
                        _this._question.reset();
                        _this.m_bgSound.clear();
                        return;
                    }
                    _this._question.createQuestion(_this._index);
                }, 500);
            }
        }
        else {
            this._qwd.x += this._speedX;
            if (this._qwd.x >= this._cardX + 270) {
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame0, this);
                this._qwd.gotoAndStop(1);
                this._move = false;
                if (this._question.answer) {
                    this._stars.add();
                }
                else {
                    this._loves.cut();
                }
                setTimeout(function () {
                    _this._qwd.gotoAndStop(0);
                    _this._index++;
                    if (_this._index >= 10) {
                        _this._question.visible = false;
                        _this._qwd.visible = false;
                        _this.addChild(_this._loves);
                        _this.addChild(_this._stars);
                        _this.addChild(_this._qwd);
                        _this._topSp.visible = true;
                        _this._topSp.getChildByName("caidai").visible = true;
                        _this._topSp.getChildByName("successStar").visible = true;
                        _this._topSp.getChildByName("tryAgain").visible = true;
                        _this._topSp.getChildByName("qwd2").visible = true;
                        _this._question.reset();
                        _this.m_bgSound.clear();
                        return;
                    }
                    _this._question.createQuestion(_this._index);
                }, 500);
            }
        }
        egret.log(event.target);
    };
    Adventurer.prototype.onStartBtnClick = function (event) {
        this.m_bgSound.clear();
        this.m_bgSound.playRes("bgmusic_mp3", 0, 0.1);
        var onComplete = function () {
            //this.showQuestion();
            this._question.createQuestion(this._index);
        };
        if (this._startBG.visible) {
            egret.Tween.get(this._startBG).to({ alpha: 0, visible: false }, 800).call(onComplete, this);
        }
    };
    return Adventurer;
}(egret.Sprite));
__reflect(Adventurer.prototype, "Adventurer");
//# sourceMappingURL=Adventurer.js.map