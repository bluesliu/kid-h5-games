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
        _this.m_curRolePos = 0;
        return _this;
    }
    MyGame.prototype.run = function () {
        this.m_cardManager = new CardManager();
        this.m_cardManager.addEventListener("TOUCH_CARD", this.onTouchCard, this);
        this.m_train = new TrainView();
        this.m_train.stop();
        this.m_scene = new Scene();
        this.m_sceneLayer.addChild(this.m_scene);
        this.m_box = DisplayUtil.createMovieClipByName("box");
        this.m_box.gotoAndStop("close");
        this.m_box.x = 540;
        this.m_box.y = 606;
        this.sceneLayer.addChild(this.m_box);
        this.m_repeat = new EButton(this, "repeat_png", null, this.onRepeat);
        this.m_uiLayer.addChild(this.m_repeat);
        this.m_repeat.x = Game.instance.stageW - this.m_repeat.width - 50;
        this.m_repeat.y = Game.instance.stageH - this.m_repeat.height - 80;
        this.m_gameStartBox.show(true);
        this.m_sceneLayer.addChild(this.m_train);
    };
    MyGame.prototype.onTouchCard = function (e) {
        var _this = this;
        var card = e.data;
        if (card.audioName == this.m_curAudioName) {
            //正确
            card.right();
            this.m_effSound.clear();
            this.m_effSound.playRes("dingdong_mp3").exec(function () {
                _this.right();
            }, this);
        }
        else {
            //错误
            card.wrong();
            this.m_effSound.clear();
            this.m_effSound.playRes("chacha_mp3").exec(function () {
                _this.wrong();
            }, this);
        }
    };
    //开始游戏
    MyGame.prototype.gamePlay = function () {
        _super.prototype.gamePlay.call(this);
        this.m_train.play();
        this.m_train.rightCount = this.rightCount;
        this.m_box.gotoAndStop("open");
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    MyGame.prototype.onEnterFrame = function (e) {
        if (this.m_checking) {
            return;
        }
        this.m_train.onRender();
    };
    //回答错误
    MyGame.prototype.wrong = function () {
        this.lifeCount -= 1;
        if (this.lifeCount <= 0) {
            //游戏结束，失败
            this.onGameOver(false);
        }
        else {
            this.nextQuestion();
        }
    };
    //回答正确
    MyGame.prototype.right = function () {
        this.rightCount += 1;
        this.m_train.rightCount = this.rightCount;
        if (this.rightCount >= Game.WIN_NUM) {
            //游戏结束，胜利
            this.onGameOver(true);
        }
        else {
            //下一题
            this.nextQuestion();
        }
    };
    MyGame.prototype.nextQuestion = function () {
        this.m_checking = false;
        var q = this.m_question.newQuestion;
        //随机朗读yes或no语音
        this.m_curAudioName = Math.random() > 0.5 ? q.audio1 : q.audio2;
        this.m_cardManager.reset();
        this.m_cardManager.addCard(q);
        this.onRepeat();
    };
    MyGame.prototype.onGameOver = function (isWin) {
        this.m_curAudioName = "";
        this.m_cardManager.reset();
        this.stopBGMusic();
        this.m_box.gotoAndStop("close");
        this.submit(isWin);
    };
    MyGame.prototype.onRepeat = function () {
        if (this.m_curAudioName == null || this.m_curAudioName.length == 0) {
            return;
        }
        this.m_qSound.clear();
        this.m_qSound.playRes(this.m_curAudioName);
    };
    return MyGame;
}(Game));
__reflect(MyGame.prototype, "MyGame");
//# sourceMappingURL=MyGame.js.map