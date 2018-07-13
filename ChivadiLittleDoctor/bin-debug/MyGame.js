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
        this.m_scene = new Scene();
        this.m_sceneLayer.addChild(this.m_scene);
        this.m_pingZi = new PingZi();
        this.m_sceneLayer.addChild(this.m_pingZi);
        this.m_pingZi.x = 447;
        this.m_pingZi.y = 800;
        this.m_wordArea = new WordArea();
        this.m_sceneLayer.addChild(this.m_wordArea);
        this.m_wordArea.x = 57;
        this.m_wordArea.y = 114;
        this.m_wordArea.addEventListener("CHECK", this.onCheck, this);
        this.m_role = new RoleView("role");
        this.m_sceneLayer.addChild(this.m_role);
        this.m_role.x = 233;
        this.m_role.y = 955;
        this.m_repeat = new EButton(this, "repeat_png", null, this.onRepeat);
        this.m_uiLayer.addChild(this.m_repeat);
        this.m_repeat.x = Game.instance.stageW - this.m_repeat.width - 50;
        this.m_repeat.y = Game.instance.stageH - this.m_repeat.height - 80;
        this.m_gameStartBox.show(true);
    };
    //开始游戏
    MyGame.prototype.gamePlay = function () {
        this.m_wordArea.reset();
        _super.prototype.gamePlay.call(this);
    };
    MyGame.prototype.nextQuestion = function () {
        _super.prototype.nextQuestion.call(this);
        this.m_checking = false;
        this.m_wordArea.setQuestion(this.question.curQuestion);
        this.m_role.state = RoleState.idle;
        this.m_pingZi.reset();
    };
    MyGame.prototype.onCheck = function (e) {
        if (this.m_checking) {
            return;
        }
        this.m_checking = true;
        //随机导入一种药水
        var index = MathUtil.random(1, 6, 1);
        this.m_pingZi.setPingZi(index);
        var isRight = e.data;
        if (isRight) {
            this.answerRight();
        }
        else {
            this.answerWrong();
        }
    };
    MyGame.prototype.answerRight = function () {
        var _this = this;
        var step = new Step();
        step.exec(function () {
            _this.m_pingZi.showRightEff();
            _this.m_role.state = RoleState.right;
        }, this);
        step.wait(2000);
        step.exec(function () {
            _this.right();
        }, this);
    };
    MyGame.prototype.answerWrong = function () {
        var _this = this;
        var step = new Step();
        step.exec(function () {
            _this.m_pingZi.showWrongEff();
            _this.m_role.state = RoleState.wrong;
        }, this);
        step.wait(2000);
        step.exec(function () {
            _this.m_checking = false;
            _this.wrong();
        }, this);
    };
    MyGame.prototype.wrong = function () {
        this.lifeCount -= 1;
        if (this.lifeCount <= 0) {
            //游戏结束，失败
            this.onGameOver(false);
        }
        else {
            this.m_pingZi.reset();
            this.m_wordArea.resetQuestion();
            this.m_role.state = RoleState.idle;
            this.onRepeat();
        }
    };
    MyGame.prototype.onGameOver = function (isWin) {
        this.submit(isWin);
    };
    MyGame.prototype.onRepeat = function () {
        this.m_qSound.clear();
        this.m_qSound.playRes(this.m_question.curQuestion.audio);
    };
    return MyGame;
}(Game));
__reflect(MyGame.prototype, "MyGame");
//# sourceMappingURL=MyGame.js.map