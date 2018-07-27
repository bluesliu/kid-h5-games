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
        return _super.call(this, assetsName, stageW, stageH) || this;
    }
    MyGame.prototype.run = function () {
        this.m_cardManager = new CardManager();
        this.m_scene = new Scene();
        this.m_sceneLayer.addChild(this.m_scene);
        // this.m_role = new RoleView("role");
        // this.m_uiLayer.addChild(this.m_role);
        // this.m_role.x = 681;
        // this.m_role.y = 1020;
        this.m_leftArrow = new EButton(this, "leftArrow_png", this.onLeftDown, this.onLeftUp);
        this.m_leftArrow.x = 33;
        this.m_leftArrow.y = 841;
        this.m_uiLayer.addChild(this.m_leftArrow);
        this.m_rightArrow = new EButton(this, "rightArrow_png", this.onRightDown, this.onRightUp);
        this.m_rightArrow.x = 1180;
        this.m_rightArrow.y = 841;
        this.m_uiLayer.addChild(this.m_rightArrow);
        this.m_shotBtn = new EButton(this, "shotBtn_png", this.onShotDown);
        this.m_shotBtn.x = 628;
        this.m_shotBtn.y = 900;
        this.m_uiLayer.addChild(this.m_shotBtn);
        this.m_gun = new GunView();
        this.m_gun.x = this.stageW / 2;
        this.m_gun.y = 788;
        this.uiLayer.addChild(this.m_gun);
        this.m_repeat = new EButton(this, "repeat_png", null, this.onRepeat);
        //this.m_uiLayer.addChild(this.m_repeat);
        this.m_repeat.x = Game.instance.stageW - this.m_repeat.width - 50;
        this.m_repeat.y = Game.instance.stageH - this.m_repeat.height - 80;
        this.m_gameStartBox.show(true);
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
        this.m_gun.x += this.m_gun.speed;
        if (this.m_gun.x <= 320) {
            this.m_gun.x = 320;
        }
        else if (this.m_gun.x >= 1045) {
            this.m_gun.x = 1045;
        }
        this.m_cardManager.onRender();
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
        var q = this.m_question.newQuestion;
        this.m_cardManager.canMove = true;
        this.onRepeat();
    };
    MyGame.prototype.onGameOver = function (isWin) {
        this.m_cardManager.canMove = false;
        this.m_cardManager.reset();
        this.stopBGMusic();
        this.submit(isWin);
    };
    MyGame.prototype.onLeftDown = function () {
        this.m_gun.speed = -6;
    };
    MyGame.prototype.onLeftUp = function () {
        this.m_gun.speed = 0;
    };
    MyGame.prototype.onRightDown = function () {
        this.m_gun.speed = 6;
    };
    MyGame.prototype.onRightUp = function () {
        this.m_gun.speed = 0;
    };
    MyGame.prototype.onShotDown = function () {
        var _this = this;
        this.m_gun.shot(function () {
            var card = _this.m_cardManager.getHitCard(_this.m_gun.x);
            if (!card) {
                return;
            }
            _this.m_checking = true;
            _this.m_effSound.clear();
            if (card.cardName == _this.question.curQuestion.name) {
                card.right();
                _this.m_effSound.playRes("dingdong_mp3").exec(function () {
                    _this.m_checking = false;
                    card.content.visible = false;
                    _this.right();
                }, _this);
            }
            else {
                card.wrong();
                _this.m_effSound.playRes("chacha_mp3").exec(function () {
                    _this.m_checking = false;
                    _this.wrong();
                }, _this);
            }
        }, this);
    };
    MyGame.prototype.onRepeat = function () {
        this.m_qSound.clear();
        var audio = this.question.curQuestion.sound;
        this.m_qSound.playRes(audio);
    };
    return MyGame;
}(Game));
__reflect(MyGame.prototype, "MyGame");
//# sourceMappingURL=MyGame.js.map