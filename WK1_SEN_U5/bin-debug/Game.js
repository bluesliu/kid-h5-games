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
    function Game() {
        var _this = _super.call(this) || this;
        _this.m_state = Game.GAME_INIT;
        //正确的数量
        _this.m_rightCount = 0;
        return _this;
    }
    Game.prototype.run = function () {
        var _this = this;
        Game.instance = this;
        var json = RES.getRes("config_json");
        this.m_qList = json.list;
        this.m_laveList = new Array();
        this.m_bgSound = new SoundPlayer();
        this.m_qSound = new SoundPlayer();
        this.m_effSound = new SoundPlayer();
        //场景层
        this.m_sceneLayer = new egret.Sprite();
        this.addChild(this.m_sceneLayer);
        //UI层
        this.m_uiLayer = new egret.Sprite();
        this.m_uiLayer.touchEnabled = this.m_uiLayer.touchChildren = true;
        this.addChild(this.m_uiLayer);
        //卡牌
        this.m_cardManager = new CardManager();
        this.m_cardManager.init(json);
        this.m_cardManager.addEventListener("TOUCH_CARD", this.onTouchCard, this);
        //游戏场景
        this.m_gameScene = new GameScene();
        this.m_sceneLayer.addChild(this.m_gameScene);
        //角色
        this.m_role1 = new RoleView("role");
        this.m_role1.x = Game.instance.stageW / 2;
        this.m_role1.y = 1000;
        this.m_role1.scaleX = this.m_role1.scaleY = 1.2;
        this.scene.roleContainer.addChild(this.m_role1);
        this.m_water = DisplayUtil.createMovieClipByName("water");
        this.m_water.stop();
        //计分板
        this.m_scoreBoard = new ScoreBoard();
        this.m_scoreBoard.show(false, BoxAlign.right_top, new egret.Point(-50, 50));
        //倒计时班
        this.m_clockBoard = new ClockBoard();
        this.m_clockBoard.show(false, BoxAlign.left_top, new egret.Point(50, 50));
        this.m_clockBoard.text = "" + Game.GAME_TIME;
        //音乐按钮
        this.m_musicBtn = new MusicBtn();
        this.m_musicBtn.show(false, BoxAlign.right_bottom, new egret.Point(-50, -50));
        this.m_musicBtn.addEventListener(egret.Event.CHANGE, this.updateBgMusic, this);
        //repeat按钮
        this.m_repeatBtn = DisplayUtil.createBitmapByName("repatBtn_png");
        this.m_repeatBtn.touchEnabled = true;
        this.m_repeatBtn.x = this.m_musicBtn.x;
        this.m_repeatBtn.y = this.m_musicBtn.y - 120;
        this.uiLayer.addChild(this.m_repeatBtn);
        this.m_repeatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (_this.m_curQuestion != null) {
                //this.m_qSound.playSync(this.m_curQuestion.audio);
                _this.m_qSound.clear();
                _this.m_qSound.playRes(_this.m_curQuestion.audio);
            }
        }, this);
        //playAgain按钮
        this.m_playAgainBtn = DisplayUtil.createBitmapByName("playAgainBtn_png");
        this.m_playAgainBtn.touchEnabled = true;
        this.m_playAgainBtn.x = this.m_repeatBtn.x;
        this.m_playAgainBtn.y = this.m_repeatBtn.y;
        this.m_playAgainBtn.visible = false;
        this.uiLayer.addChild(this.m_playAgainBtn);
        this.m_playAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.gamePlay();
        }, this);
        this.m_tryAgainBtn = DisplayUtil.createBitmapByName("tryAgainBtn_png");
        this.m_tryAgainBtn.touchEnabled = true;
        this.m_tryAgainBtn.x = this.m_repeatBtn.x;
        this.m_tryAgainBtn.y = this.m_repeatBtn.y;
        this.m_tryAgainBtn.visible = false;
        this.uiLayer.addChild(this.m_tryAgainBtn);
        this.m_tryAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.gamePlay();
        }, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onRender, this);
        //游戏初始状态
        this.m_state = Game.GAME_INIT;
        //显示开始按钮
        this.m_gameStartBox = new GameStartBox();
        this.m_gameStartBox.once("START", this.gamePlay, this);
        this.m_gameStartBox.show(true);
    };
    Game.prototype.onRender = function () {
        if (this.m_state == Game.GAME_PLAY) {
            this.m_cardManager.onRender();
        }
    };
    //开始游戏
    Game.prototype.gamePlay = function () {
        this.m_state = Game.GAME_PLAY;
        //隐藏开始按钮
        this.m_gameStartBox.hide();
        //人物设置为空闲状态
        this.m_role1.state = RoleState.idle;
        this.m_gameScene.reset();
        //播放背景音乐
        this.updateBgMusic();
        //重置分数
        this.m_rightCount = 0;
        this.m_scoreBoard.setScore(0);
        //重置题目
        this.m_laveList = this.m_qList.concat();
        ArrayUtil.randomSort(this.m_laveList);
        //发射卡牌
        this.m_cardManager.reset();
        this.m_cardManager.start();
        //提问
        this.question();
        //计时开始
        this.startTimer();
    };
    //提问一个新问题
    Game.prototype.question = function () {
        this.m_answering = false;
        this.m_repeatBtn.visible = true;
        this.m_playAgainBtn.visible = false;
        this.m_tryAgainBtn.visible = false;
        this.m_cardManager.canMove = true;
        if (this.m_laveList.length == 0) {
            this.m_laveList = this.m_qList.concat();
            ArrayUtil.randomSort(this.m_laveList);
        }
        this.m_curQuestion = this.m_laveList.shift();
        //播放题目语音
        this.m_qSound.playRes(this.m_curQuestion.audio);
    };
    //点击了卡牌
    Game.prototype.onTouchCard = function (e) {
        if (this.m_answering) {
            return;
        }
        this.m_answering = true;
        this.m_repeatBtn.visible = false;
        this.m_qSound.clear();
        this.m_curCardView = e.data;
        this.shoot();
    };
    Game.prototype.shoot = function () {
        var _this = this;
        this.m_cardManager.canMove = false;
        if (this.m_curCardView.x > this.m_role1.x) {
            this.m_role1.scaleX = -1.2;
        }
        else {
            this.m_role1.scaleX = 1.2;
        }
        //播放水花动画
        egret.Tween.removeTweens(this.m_water);
        this.m_sceneLayer.addChild(this.m_water);
        this.m_water.alpha = 1;
        this.m_water.x = this.m_curCardView.x;
        this.m_water.y = this.m_curCardView.y - 300;
        this.m_water.rotation = MathUtil.getAngleByPoint(this.m_role1.x, this.m_role1.y, this.m_curCardView.x, this.m_curCardView.y);
        this.m_water.play(1);
        this.m_water.once(egret.MovieClipEvent.COMPLETE, function () {
            egret.Tween.get(_this.m_water).wait(300).to({ alpha: 0 }, 300);
        }, this);
        //射击状态
        this.m_role1.state = RoleState.shoot;
        //水花音效
        this.m_effSound.clear();
        this.m_effSound.playRes("water_mp3").exec(function () {
            DisplayUtil.remove(_this.m_water);
            //回答正确
            if (_this.m_curCardView.cardName == _this.m_curQuestion.name) {
                _this.answerRight();
            }
            else {
                _this.answerWrong();
            }
        }, this);
    };
    //回答正确
    Game.prototype.answerRight = function () {
        var _this = this;
        //正确数+1
        this.m_rightCount += 1;
        //添加星星
        this.m_scoreBoard.setScore(this.m_rightCount);
        //开心
        this.m_role1.state = RoleState.happy;
        this.m_curCardView.right();
        //答对音效（叮咚）
        this.m_effSound.clear();
        this.m_effSound.playRes("dingdong_mp3");
        this.m_effSound.exec(function () {
            //全部答对
            if (_this.m_rightCount >= Game.WIN_NUM) {
                //游戏结束
                _this.m_state = Game.GAME_OVER;
                _this.stopTimer();
                _this.m_cardManager.hideCard();
                _this.m_role1.state = RoleState.dance; //跳舞
                _this.scene.showRibbon();
                _this.m_effSound.playRes("huanhu_mp3");
                _this.m_effSound.exec(function () {
                    _this.m_role1.state = RoleState.dance_mouth; //庆祝表情 + 说话
                }, _this);
                _this.m_effSound.playRes("U2SNS-OS01_mp3").playRes("U2SNS-OS02_mp3");
                _this.m_effSound.exec(function () {
                    _this.m_role1.state = RoleState.celebrate;
                    _this.m_playAgainBtn.visible = true;
                    _this.submit(true);
                }, _this);
            }
            else {
                //删除这个卡片
                DisplayUtil.remove(_this.m_curCardView);
                //继续答题
                _this.question();
                _this.m_role1.scaleX = 1.2;
                _this.m_role1.state = RoleState.idle;
            }
        }, this);
    };
    //回答错误
    Game.prototype.answerWrong = function () {
        var _this = this;
        this.m_role1.state = RoleState.sad; //难过
        this.m_curCardView.wrong();
        this.m_effSound.clear();
        this.m_effSound.playRes("chacha_mp3"); //答错音效
        this.m_effSound.exec(function () {
            //继续答题，重新朗读题目
            _this.m_role1.scaleX = 1.2;
            _this.m_role1.state = RoleState.idle;
            _this.question();
        }, this);
    };
    //点击音乐按钮
    Game.prototype.updateBgMusic = function () {
        if (this.m_musicBtn.state == 0) {
            Println("停止背景音乐");
            this.m_bgSound.clear();
        }
        else {
            Println("播放背景音乐");
            // this.m_bgSound.playSync("bgmusic_mp3",null,0);
            this.m_bgSound.playRes("bgmusic_mp3", 0);
        }
    };
    Game.prototype.stopTimer = function () {
        if (this.m_timer) {
            this.m_timer.stop();
            this.m_timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this.m_timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        }
        this.m_timer = null;
    };
    Game.prototype.startTimer = function () {
        this.stopTimer();
        this.m_timer = new egret.Timer(1000, Game.GAME_TIME);
        this.m_timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.m_timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.m_timer.start();
        this.onTimer(null); //首次更新一下文本框
    };
    Game.prototype.onTimer = function (e) {
        this.m_clockBoard.text = "" + (this.m_timer.repeatCount - this.m_timer.currentCount);
    };
    Game.prototype.onTimerComplete = function (e) {
        var _this = this;
        this.stopTimer();
        //游戏结束
        this.m_state = Game.GAME_OVER;
        this.m_effSound.clear();
        this.m_qSound.clear();
        this.m_cardManager.wrong();
        this.m_role1.state = RoleState.fail;
        this.m_effSound.clear();
        this.m_effSound.playRes("shuaijiao_mp3").playRes("shibai_mp3");
        this.m_effSound.exec(function () {
            _this.m_role1.state = RoleState.fail_mouth;
        }, this);
        this.m_effSound.playRes("U2SNS-OS03_mp3");
        this.m_effSound.exec(function () {
            _this.m_role1.state = RoleState.fail;
        }, this);
        //弹出失败窗口
        this.submit(false);
        this.m_tryAgainBtn.visible = true;
    };
    //提交游戏结果
    Game.prototype.submit = function (isComplete) {
        var theRequest = GetRequestObject();
        GameOver(isComplete, function () {
            //入口是任务中心，不需要显示任何UI
            if (theRequest.taskId != 0) {
                return;
            }
            if (isComplete) {
                SetSuccessPanelVisible(true); //显示成功UI
            }
            else {
                SetFailPanelVisible(true); //显示失败UI
            }
        });
    };
    Object.defineProperty(Game.prototype, "uiLayer", {
        get: function () { return this.m_uiLayer; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "scene", {
        //public get sceneLayer(){return this.m_sceneLayer;}
        get: function () { return this.m_gameScene; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "stageW", {
        get: function () { return this.stage.stageWidth; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "stageH", {
        get: function () { return this.stage.stageHeight; },
        enumerable: true,
        configurable: true
    });
    Game.WIN_NUM = 6;
    Game.GAME_TIME = 60;
    Game.GAME_INIT = "game_init";
    Game.GAME_PLAY = "game_play";
    Game.GAME_OVER = "game_over";
    return Game;
}(egret.Sprite));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map