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
var MyGame = (function (_super) {
    __extends(MyGame, _super);
    function MyGame(assetsName, stageW, stageH) {
        var _this = _super.call(this, assetsName, stageW, stageH) || this;
        _this.questionAudio = "";
        return _this;
    }
    MyGame.prototype.run = function () {
        this.m_scene = new Scene();
        this.m_sceneLayer.addChild(this.m_scene);
        this.m_yesBtn = new EButton(this, null, this.onTouchYes, null);
        this.m_yesBtn.x = 280;
        this.m_yesBtn.y = 400;
        this.uiLayer.addChild(this.m_yesBtn);
        this.m_noBtn = new EButton(this, null, this.onTouchNo, null);
        this.m_noBtn.x = 280;
        this.m_noBtn.y = 620;
        this.uiLayer.addChild(this.m_noBtn);
        this.m_repeat = new EButton(this, "repeat_png", null, this.onRepeat);
        this.m_uiLayer.addChild(this.m_repeat);
        this.m_repeat.x = Game.instance.stageW - this.m_repeat.width - 50;
        this.m_repeat.y = Game.instance.stageH - this.m_repeat.height - 80;
        this.m_balloonManager = new BalloonManager();
        this.m_tf = new egret.TextField();
        this.m_tf.x = 220;
        this.m_tf.y = 257;
        this.m_tf.width = 400;
        this.m_tf.height = 150;
        this.m_tf.size = 50;
        this.m_tf.textColor = 0x000000;
        this.m_tf.lineSpacing = 20;
        this.m_tf.bold = true;
        this.m_tf.textAlign = egret.HorizontalAlign.LEFT;
        this.m_tf.wordWrap = true;
        this.uiLayer.addChild(this.m_tf);
        this.m_tf.border = Game.isDebug;
        this.m_gameStartBox.show(true);
    };
    MyGame.prototype.onTouchYes = function () {
        var _this = this;
        if (this.m_checking)
            return;
        this.m_checking = true;
        this.m_qSound.clear();
        if (this.m_yesBtn.audio == this.questionAudio) {
            //正确
            this.m_effSound.playRes("dingdong_mp3").exec(function () {
                _this.right();
            }, this);
        }
        else {
            //错误
            this.wrong();
        }
    };
    MyGame.prototype.onTouchNo = function () {
        var _this = this;
        if (this.m_checking)
            return;
        this.m_checking = true;
        this.m_qSound.clear();
        if (this.m_noBtn.audio == this.questionAudio) {
            this.m_effSound.playRes("dingdong_mp3").exec(function () {
                //正确
                _this.right();
            }, this);
        }
        else {
            //错误
            this.wrong();
        }
    };
    //开始游戏
    MyGame.prototype.gamePlay = function () {
        _super.prototype.gamePlay.call(this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onRender, this);
    };
    MyGame.prototype.onRender = function (e) {
        this.m_balloonManager.onRender();
    };
    MyGame.prototype.nextQuestion = function () {
        var _this = this;
        this.m_checking = false;
        var q = this.m_question.newQuestion;
        if (Math.random() > 0.5) {
            this.questionAudio = q.audio1;
        }
        else {
            this.questionAudio = q.audio2;
        }
        this.m_yesBtn.btnImg.texture = RES.getRes(q.image1);
        this.m_yesBtn.audio = q.audio1;
        this.m_noBtn.btnImg.texture = RES.getRes(q.image2);
        this.m_noBtn.audio = q.audio2;
        this.m_tf.text = q.text;
        this.m_checking = true;
        this.onRepeat(function () {
            _this.m_checking = false;
        });
    };
    //回答正确
    MyGame.prototype.right = function () {
        var _this = this;
        this.rightCount += 1;
        this.m_balloonManager.rightCount = this.rightCount;
        if (this.rightCount >= Game.WIN_NUM) {
            //等待气球飞到天上
            this.m_effSound.playRes("huanhu_mp3").exec(function () {
                //游戏结束，胜利
                _this.m_checking = false;
                _this.onGameOver(true);
            }, this);
        }
        else {
            //下一题
            this.nextQuestion();
        }
    };
    //回答错误
    MyGame.prototype.wrong = function () {
        var _this = this;
        this.lifeCount -= 1;
        EffectUtils.shakeObj(this.m_balloonManager.balloon, null);
        this.m_effSound.clear();
        this.m_effSound.playRes("chacha_mp3").exec(function () {
            if (_this.lifeCount <= 0) {
                //游戏结束，失败
                _this.onGameOver(false);
            }
            else {
                _this.m_checking = false;
                _this.onRepeat();
            }
        }, this);
    };
    MyGame.prototype.onGameOver = function (isWin) {
        this.m_balloonManager.reset();
        this.m_tf.text = "";
        egret.Tween.removeTweens(this.m_balloonManager.balloon);
        this.m_qSound.clear();
        this.m_effSound.clear();
        this.submit(isWin);
    };
    MyGame.prototype.onRepeat = function (callback, thisObj) {
        if (callback === void 0) { callback = null; }
        if (thisObj === void 0) { thisObj = null; }
        this.m_qSound.clear();
        this.m_qSound.playRes(this.questionAudio).exec(function () {
            if (callback != null) {
                callback.call(thisObj);
            }
        }, thisObj);
    };
    return MyGame;
}(Game));
__reflect(MyGame.prototype, "MyGame");
//# sourceMappingURL=MyGame.js.map