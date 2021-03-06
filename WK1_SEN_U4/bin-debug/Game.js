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
        //错误的数量
        _this.m_failCount = 0;
        _this.laveHand = Array();
        _this.laveHand2 = Array();
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
        this.m_roleLayer = new egret.Sprite();
        this.addChild(this.m_roleLayer);
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
        this.m_role1 = new RoleView();
        this.m_role1.x = 213;
        this.m_role1.y = 567;
        this.m_roleLayer.addChild(this.m_role1);
        //计分板
        this.m_scoreBoard = new ScoreBoard();
        this.m_scoreBoard.show(false, BoxAlign.right_top, new egret.Point(-50, 50));
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
        this.m_failCount = 0;
        this.m_scoreBoard.setScore(0);
        //重置题目
        this.m_laveList = this.m_qList.concat();
        ArrayUtil.randomSort(this.m_laveList);
        //发射卡牌
        this.m_cardManager.reset();
        this.m_cardManager.start();
        //提问
        this.question();
    };
    //提问一个新问题
    Game.prototype.question = function () {
        this.m_answering = false;
        this.m_repeatBtn.visible = true;
        this.m_playAgainBtn.visible = false;
        this.m_tryAgainBtn.visible = false;
        if (this.m_laveList.length == 0) {
            this.m_laveList = this.m_qList.concat();
            ArrayUtil.randomSort(this.m_laveList);
        }
        this.m_curQuestion = this.m_laveList.shift();
        //播放题目语音
        this.m_qSound.playRes(this.m_curQuestion.audio);
        //卡牌重新排序
        this.m_cardManager.sortCard();
        this.handRandom();
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
        this.stopTimer();
        //回答正确
        if (this.m_curCardView.cardName == this.m_curQuestion.name) {
            this.answerRight();
        }
        else {
            this.answerWrong();
        }
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
                _this.m_cardManager.hideCard();
                _this.m_gameScene.showLamp(); //显示灯光
                _this.m_role1.state = RoleState.celebrate; //庆祝
                _this.m_effSound.playRes("hualala_mp3"); //哗啦啦的音效
                _this.m_effSound.exec(function () {
                    _this.m_role1.state = RoleState.celebrate_mouth; //庆祝表情 + 说话
                }, _this);
                _this.m_effSound.playRes("U1SNS-OS05_mp3").playRes("U1SNS-OS06_mp3");
                _this.m_effSound.exec(function () {
                    _this.m_role1.state = RoleState.celebrate;
                    _this.m_playAgainBtn.visible = true;
                    _this.submit(true);
                }, _this);
            }
            else {
                _this.m_role1.state = RoleState.happy_mouth; //开心的说话
                _this.m_effSound.playResRandom(["U1SNS-OS01_mp3", "U1SNS-OS02_mp3"]);
                _this.m_effSound.exec(function () {
                    //继续答题
                    _this.question();
                    _this.m_role1.state = RoleState.idle;
                }, _this);
            }
        }, this);
    };
    //回答错误
    Game.prototype.answerWrong = function () {
        var _this = this;
        this.m_failCount += 1;
        this.m_role1.state = RoleState.sad; //难过
        this.m_curCardView.wrong();
        this.m_effSound.clear();
        this.m_effSound.playRes("chacha_mp3"); //答错音效
        this.m_effSound.exec(function () {
            if (_this.m_failCount >= Game.FAIL_NUM) {
                //游戏结束
                _this.m_state = Game.GAME_OVER;
                _this.m_qSound.clear();
                _this.m_cardManager.hideCard();
                //啪 关灯
                _this.m_gameScene.black();
                _this.m_role1.state = RoleState.fail;
                _this.m_effSound.playRes("pa_mp3");
                _this.m_effSound.playRes("U1SNS-OS07_mp3").playRes("U1SNS-OS08_mp3");
                _this.m_effSound.exec(function () {
                    //弹出失败窗口
                    _this.submit(false);
                    _this.m_tryAgainBtn.visible = true;
                }, _this);
            }
            else {
                _this.m_role1.state = RoleState.sad_mouth; //难过+说话
                _this.m_effSound.playResRandom(["U1SNS-OS03_mp3", "U1SNS-OS04_mp3"]);
                _this.m_effSound.exec(function () {
                    //继续答题，重新朗读题目
                    _this.m_role1.state = RoleState.idle;
                    _this.m_qSound.playRes(_this.m_curQuestion.audio).exec(function () {
                        _this.m_repeatBtn.visible = true;
                        _this.handRandom();
                    }, self);
                    _this.m_answering = false;
                }, _this);
            }
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
            this.m_timer.removeEventListener(egret.TimerEvent.COMPLETE, this.onTimerComplete, this);
            this.m_timer.stop();
            this.m_timer = null;
        }
    };
    Game.prototype.startTimer = function () {
        this.stopTimer();
        this.m_timer = new egret.Timer(3000, 1);
        this.m_timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.m_timer.start();
    };
    Game.prototype.onTimerComplete = function (e) {
        this.handRandom();
    };
    Game.prototype.handRandom = function () {
        this.stopTimer();
        if (this.laveHand.length == 0) {
            this.laveHand = [1, 2, 3, 4];
            ArrayUtil.randomSort(this.laveHand);
            while (this.laveHand2[3] == this.laveHand[0]) {
                ArrayUtil.randomSort(this.laveHand);
            }
        }
        this.laveHand2 = this.laveHand.concat();
        var frame = this.laveHand.shift();
        this.m_role1.setHand(frame);
        this.m_cardManager.setLight(frame);
        this.startTimer();
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
    Object.defineProperty(Game.prototype, "sceneLayer", {
        get: function () { return this.m_sceneLayer; },
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
    Game.FAIL_NUM = 3;
    Game.GAME_INIT = "game_init";
    Game.GAME_PLAY = "game_play";
    Game.GAME_OVER = "game_over";
    return Game;
}(egret.Sprite));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map