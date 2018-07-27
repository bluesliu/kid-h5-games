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
        _this.m_soundQuestion = new Question();
        _this.m_isYes = false;
        return _this;
    }
    MyGame.prototype.run = function () {
        this.m_scene = new Scene();
        this.m_sceneLayer.addChild(this.m_scene);
        this.m_repeat = new EButton(this, "repeat_png", null, this.onRepeat);
        //this.m_uiLayer.addChild(this.m_repeat);
        this.m_repeat.x = Game.instance.stageW - this.m_repeat.width - 50;
        this.m_repeat.y = Game.instance.stageH - this.m_repeat.height - 80;
        this.m_tf = new egret.TextField();
        this.m_tf.border = Game.isDebug;
        this.m_tf.x = 188;
        this.m_tf.y = 236;
        this.m_tf.width = 992;
        this.m_tf.height = 80;
        this.m_tf.size = 50;
        this.m_tf.bold = true;
        this.m_tf.textColor = 0x000000;
        this.m_tf.textAlign = egret.HorizontalAlign.CENTER;
        this.uiLayer.addChild(this.m_tf);
        this.m_yesBtn = new EButton(this, this.question.yesImage, null, this.onTouchYes);
        this.m_yesBtn.x = 296;
        this.m_yesBtn.y = 414;
        this.m_sceneLayer.addChild(this.m_yesBtn);
        this.m_noBtn = new EButton(this, this.question.noImage, null, this.onTouchNo);
        this.m_noBtn.x = 720;
        this.m_noBtn.y = 414;
        this.m_sceneLayer.addChild(this.m_noBtn);
        this.m_card = new CardView();
        this.m_card.x = 1070;
        this.m_card.y = 700;
        this.m_sceneLayer.addChild(this.m_card);
        this.m_role = new RoleView("role");
        this.m_role.x = 43;
        this.m_role.y = 578;
        this.m_sceneLayer.addChild(this.m_role);
        this.m_gameStartBox.show(true);
    };
    MyGame.prototype.onTouchYes = function () {
        var _this = this;
        if (this.m_checking)
            return;
        this.m_checking = true;
        this.m_role.setState(RoleState.answer, function () {
            if (_this.m_isYes) {
                //正确
                _this.m_card.right();
                _this.m_role.state = RoleState.happy;
                _this.m_effSound.clear();
                _this.m_effSound.playRes("dingdong_mp3").playRes(_this.question.yesAudio).exec(function () {
                    _this.m_checking = false;
                    _this.right();
                }, _this);
            }
            else {
                //错误
                _this.m_card.wrong();
                _this.m_role.state = RoleState.sad;
                _this.m_yesBtn.filters = [FilterUtil.getDarkFilter()];
                _this.m_effSound.clear();
                _this.m_effSound.playRes("chacha_mp3").exec(function () {
                    _this.m_checking = false;
                    _this.wrong();
                }, _this);
            }
        }, this);
    };
    MyGame.prototype.onTouchNo = function () {
        var _this = this;
        if (this.m_checking)
            return;
        this.m_checking = true;
        this.m_role.setState(RoleState.answer, function () {
            if (!_this.m_isYes) {
                //正确
                _this.m_card.right();
                _this.m_role.state = RoleState.happy;
                _this.m_effSound.clear();
                _this.m_effSound.playRes("dingdong_mp3").playRes(_this.question.noAudio).exec(function () {
                    _this.m_checking = false;
                    _this.right();
                }, _this);
            }
            else {
                //错误
                _this.m_card.wrong();
                _this.m_role.state = RoleState.sad;
                _this.m_noBtn.filters = [FilterUtil.getDarkFilter()];
                _this.m_effSound.clear();
                _this.m_effSound.playRes("chacha_mp3").exec(function () {
                    _this.m_checking = false;
                    _this.wrong();
                }, _this);
            }
        }, this);
    };
    //开始游戏
    MyGame.prototype.gamePlay = function () {
        _super.prototype.gamePlay.call(this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    MyGame.prototype.onEnterFrame = function (e) {
        if (this.m_checking) {
            return;
        }
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
    MyGame.prototype.nextQuestion = function () {
        this.m_checking = false;
        this.m_role.state = RoleState.idle;
        //回复按钮颜色
        this.m_yesBtn.filters = [];
        this.m_noBtn.filters = [];
        var q = this.m_question.newQuestion;
        var soundQuestion = ArrayUtil.getRandomItem(this.question.$qList);
        //50%概率是yes
        if (Math.random() > 0.5) {
            soundQuestion = q;
            this.m_isYes = true;
        }
        else {
            soundQuestion = ArrayUtil.getRandomItem(this.question.$qList);
            while (soundQuestion.name == q.name || soundQuestion.name == this.m_soundQuestion.name) {
                soundQuestion = ArrayUtil.getRandomItem(this.question.$qList);
            }
            this.m_isYes = false;
        }
        this.m_soundQuestion = soundQuestion;
        this.m_tf.text = this.m_soundQuestion.text;
        this.m_card.question = q;
        this.m_card.x = 1070;
        this.m_card.y = 700;
        this.onRepeat();
    };
    MyGame.prototype.onGameOver = function (isWin) {
        this.m_role.state = RoleState.idle;
        this.stopBGMusic();
        this.submit(isWin);
    };
    MyGame.prototype.onRepeat = function () {
        this.m_qSound.clear();
        var audio = this.m_soundQuestion.sound;
        this.m_qSound.playRes(audio);
    };
    return MyGame;
}(Game));
__reflect(MyGame.prototype, "MyGame");
//# sourceMappingURL=MyGame.js.map