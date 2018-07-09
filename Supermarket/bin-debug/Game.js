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
var Game = (function (_super) {
    __extends(Game, _super);
    function Game(assetsName, stageW, stageH) {
        var _this = _super.call(this) || this;
        //答对数量
        _this.m_rightCount = 0;
        //错误数量
        _this.m_wrongCount = 0;
        _this.m_question = new QuestionUtil();
        _this.m_question.init(assetsName, 4);
        _this.m_stageW = stageW;
        _this.m_stageH = stageH;
        Game.instance = _this;
        _this.m_bgSound = new SoundPlayer();
        _this.m_qSound = new SoundPlayer();
        _this.m_effSound = new SoundPlayer();
        //场景层
        _this.m_sceneLayer = new egret.Sprite();
        _this.addChild(_this.m_sceneLayer);
        //UI层
        _this.m_uiLayer = new egret.Sprite();
        _this.m_uiLayer.touchEnabled = _this.m_uiLayer.touchChildren = true;
        _this.addChild(_this.m_uiLayer);
        //显示开始按钮
        _this.m_gameStartBox = new GameStartBox();
        _this.m_gameStartBox.once("START", _this.gamePlay, _this);
        //计分板
        _this.m_scoreBoard = new ScoreBoard();
        _this.m_scoreBoard.show(false, BoxAlign.right_top, new egret.Point(-20, 20));
        //生命面板
        _this.m_lifeBoard = new LifeBoard();
        _this.m_lifeBoard.show(false, BoxAlign.left_top, new egret.Point(200, 16));
        _this.m_successPanel = new SuccessPanel(_this);
        _this.m_successPanel.onTryAgain = _this.gamePlay;
        _this.m_failPanel = new FailPanel(_this);
        _this.m_failPanel.onTryAgain = _this.gamePlay;
        return _this;
    }
    Game.prototype.run = function () {
    };
    //开始游戏
    Game.prototype.gamePlay = function () {
        this.rightCount = 0;
        this.lifeCount = Game.LIFE_NUM;
        this.m_question.reset();
        this.nextQuestion();
    };
    Game.prototype.nextQuestion = function () {
        this.m_qSound.playRes(this.m_question.newQuestion.audio);
    };
    //回答正确
    Game.prototype.right = function () {
        this.rightCount += 1;
        if (this.rightCount >= Game.WIN_NUM) {
            //游戏结束，胜利
            this.onGameOver(true);
        }
        else {
            //下一题
            this.nextQuestion();
        }
    };
    //回答错误
    Game.prototype.wrong = function () {
        this.lifeCount -= 1;
        if (this.lifeCount <= 0) {
            //游戏结束，失败
            this.onGameOver(false);
        }
    };
    Game.prototype.onGameOver = function (isWin) {
    };
    //提交游戏结果
    Game.prototype.submit = function (isComplete) {
        var _this = this;
        if (Game.isDebug) {
            if (isComplete) {
                this.m_successPanel.show(); //显示成功UI
            }
            else {
                this.m_failPanel.show(); //显示失败UI
            }
        }
        else {
            GameOver(isComplete, function () {
                if (isComplete) {
                    _this.m_successPanel.show(); //显示成功UI
                }
                else {
                    _this.m_failPanel.show(); //显示失败UI
                }
            });
        }
    };
    Object.defineProperty(Game.prototype, "rightCount", {
        get: function () { return this.m_rightCount; },
        set: function (value) {
            this.m_rightCount = value;
            this.m_scoreBoard.setScore(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "lifeCount", {
        get: function () { return Game.LIFE_NUM - this.m_wrongCount; },
        set: function (value) {
            this.m_wrongCount = Game.LIFE_NUM - value;
            this.m_lifeBoard.setScore(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "uiLayer", {
        get: function () { return this.m_uiLayer; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "stageW", {
        get: function () { return this.m_stageW; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "stageH", {
        get: function () { return this.m_stageH; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "question", {
        get: function () { return this.m_question; },
        enumerable: true,
        configurable: true
    });
    Game.isDebug = false;
    Game.WIN_NUM = 10;
    Game.LIFE_NUM = 3;
    return Game;
}(egret.Sprite));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map