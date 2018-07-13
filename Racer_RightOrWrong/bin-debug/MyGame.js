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
        _this.m_curRolePos = 0; // -1 or 0 or 1
        _this.m_qIdx = 0; //1 or 2
        return _this;
    }
    MyGame.prototype.run = function () {
        this.m_cardManager = new CardManager();
        this.m_scene = new Scene();
        this.m_sceneLayer.addChild(this.m_scene);
        this.m_role = new RoleView("role");
        this.m_uiLayer.addChild(this.m_role);
        this.m_role.x = 681;
        this.m_role.y = 1020;
        this.m_leftArrow = new EButton(this, "leftArrow_png", this.onTouchLeft);
        this.m_leftArrow.x = 33;
        this.m_leftArrow.y = 841;
        this.m_uiLayer.addChild(this.m_leftArrow);
        this.m_rightArrow = new EButton(this, "rightArrow_png", this.onTouchRight);
        this.m_rightArrow.x = 1180;
        this.m_rightArrow.y = 841;
        this.m_uiLayer.addChild(this.m_rightArrow);
        this.m_repeat = new EButton(this, "repeat_png", null, this.onRepeat);
        //this.m_uiLayer.addChild(this.m_repeat);
        this.m_repeat.x = Game.instance.stageW - this.m_repeat.width - 50;
        this.m_repeat.y = Game.instance.stageH - this.m_repeat.height - 80;
        this.m_gameStartBox.show(true);
    };
    //开始游戏
    MyGame.prototype.gamePlay = function () {
        _super.prototype.gamePlay.call(this);
        this.setRolePos(0);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    MyGame.prototype.onEnterFrame = function (e) {
        var _this = this;
        if (this.m_checking) {
            return;
        }
        this.m_cardManager.onRender();
        var hitType = this.m_cardManager.hitType(this.m_role.x, this.m_role.y - 150);
        if (hitType != -1) {
            this.m_checking = true;
            this.m_cardManager.canMove = false;
            if (hitType == this.m_qIdx) {
                Println("正确");
                this.m_cardManager.right(hitType);
                this.m_qSound.clear();
                this.m_qSound.playRes(this.question.curQuestion["a" + hitType]);
                this.m_qSound.exec(function () {
                    _this.right();
                }, this);
            }
            else {
                Println("错误");
                this.m_cardManager.wrong(hitType);
                this.m_qSound.clear();
                this.m_qSound.playRes("chacha_mp3");
                this.m_qSound.exec(function () {
                    _this.wrong();
                }, this);
            }
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
        var q = this.m_question.newQuestion;
        if (Math.random() > 0.5) {
            //正确
            this.m_qIdx = 1;
        }
        else {
            //错误
            this.m_qIdx = 2;
        }
        this.m_cardManager.reset();
        this.m_cardManager.canMove = true;
        this.m_cardManager.addCard(q);
        this.onRepeat();
    };
    MyGame.prototype.onGameOver = function (isWin) {
        this.m_cardManager.canMove = false;
        this.m_cardManager.reset();
        this.stopBGMusic();
        this.submit(isWin);
    };
    MyGame.prototype.onTouchLeft = function () {
        if (this.checking)
            return;
        if (this.m_curRolePos == -1)
            return;
        this.setRolePos(this.m_curRolePos - 1);
    };
    MyGame.prototype.onTouchRight = function () {
        if (this.checking)
            return;
        if (this.m_curRolePos == 1)
            return;
        this.setRolePos(this.m_curRolePos + 1);
    };
    MyGame.prototype.setRolePos = function (pos) {
        this.m_curRolePos = pos;
        egret.Tween.removeTweens(this.m_role);
        var endX = 681 + pos * 500;
        egret.Tween.get(this.m_role).to({ x: endX }, 200);
        this.m_leftArrow.visible = pos != -1;
        this.m_rightArrow.visible = pos != 1;
    };
    MyGame.prototype.onRepeat = function () {
        this.m_qSound.clear();
        var audio = this.question.curQuestion["q" + this.m_qIdx];
        this.m_qSound.playRes(audio);
    };
    return MyGame;
}(Game));
__reflect(MyGame.prototype, "MyGame");
//# sourceMappingURL=MyGame.js.map