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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        /**
         * 加载进度界面
         * loading process interface
         */
        _this._loadCount = 0;
        _this._speedY = 40;
        // private _bmpArr:Array<egret.Bitmap>=new Array<egret.Bitmap>();
        _this._count = 0;
        _this._resultArr = [0, 2, 3, 1, 2, 0, 0, 2, 1, 3];
        _this._countArr = [];
        _this.isResourceLoadEnd = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        // egret.lifecycle.addLifecycleListener((context) => {
        //     // custom lifecycle plugin
        //     context.onUpdate = () => {
        //     }
        // })
        // egret.lifecycle.onPause = () => {
        //     egret.ticker.pause();
        // }
        // egret.lifecycle.onResume = () => {
        //     egret.ticker.resume();
        // }
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.loadingView.x = (this.stage.stageWidth - this.loadingView.width) / 2;
        this.loadingView.y = (this.stage.stageHeight - this.loadingView.height) / 2;
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onSceneLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload"); //加载场景资源
    };
    /**
     * 场景资源组加载完成
     */
    Main.prototype.onSceneLoadComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onSceneLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onUnitLoadComplete, this);
        var requestObj = GetRequestObject();
        var assetsName;
        if (requestObj == null) {
            Println("请求数据为null，无法加载相应单元的数据");
            return;
        }
        else if (requestObj.assetsName == null || requestObj.assetsName == undefined || requestObj.assetsName == "") {
            Println("请求的assetsName为null，无法加载相应单元的数据");
            return;
        }
        else {
            assetsName = requestObj.assetsName;
        }
        Main.sourceName = assetsName;
        RES.loadGroup(assetsName);
    };
    Main.prototype.onUnitLoadComplete = function (event) {
        this.stage.removeChild(this.loadingView);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onUnitLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        this.isResourceLoadEnd = true;
        Source.init();
        this.startCreateScene();
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        Println("Url:" + event.resItem.url + " has failed to load");
    };
    Main.prototype.onResourceLoadError = function (event) {
        Println("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onSceneLoadComplete(event);
    };
    Main.prototype.onResourceProgress = function (event) {
        this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.startCreateScene = function () {
        this.stage.maxTouches = 1;
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        this._bg = new Bg();
        this.addChild(this._bg);
        this._bullet = Source.createBitmapByName("炮弹_png");
        this.addChild(this._bullet);
        this._bullet.x = 681;
        this._bullet.y = 957;
        this._bullet.anchorOffsetX = 17.5;
        this._bullet.anchorOffsetY = 23;
        this._gun = new Gun();
        this.addChild(this._gun);
        this._gun.x = 607;
        this._gun.y = 759;
        this._cards = new DropCards();
        this.addChild(this._cards);
        var caidai = Source.createBitmapByName("success_2_png");
        var successStar = Source.createBitmapByName("success_1_png");
        var failStar = Source.createBitmapByName("fail_2_png");
        this._tryAgain = Source.createBitmapByName("fail_0_png");
        this._loves = new CountLoves();
        this.addChild(this._loves);
        this._loves.x = 200;
        this._loves.y = 16;
        this._stars = new CountStars();
        this.addChild(this._stars);
        this._stars.x = 755;
        this._stars.y = 24;
        this._qwd = new Qieadi();
        this.addChild(this._qwd);
        this._qwd.x = 798;
        this._qwd.y = 695;
        // this._quit= Source.createBitmapByName("quit_png");
        // this.addChild(this._quit);
        // this._quit.$touchEnabled=true;
        // this._quit.x=90;
        // this._quit.y=852+89;
        this._next = Source.createBitmapByName("next_png");
        this.addChild(this._next);
        this._next.$touchEnabled = true;
        this._next.x = this.stage.stageWidth - this._next.width - 50;
        this._next.y = 940;
        this._next.visible = false;
        this.m_repeatBtn = Source.createBitmapByName("repeat_png");
        this.addChild(this.m_repeatBtn);
        this.m_repeatBtn.$touchEnabled = true;
        this.m_repeatBtn.x = this._next.x;
        this.m_repeatBtn.y = this._next.y - 90;
        this.m_repeatBtn.visible = false;
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
        this._start = Source.createBitmapByName("start_png");
        this.addChild(this._start);
        this._start.$touchEnabled = true;
        this._start.x = (stageW - this._start.width) * 0.5;
        this._start.y = (stageH - this._start.height) * 0.5;
        this.m_tipsSound = new SoundPlayer();
        this._timer = new egret.Timer(10000, 0);
        this.initListener();
        this.m_bgSound = new SoundPlayer();
        this.m_gunSound = new SoundPlayer();
        this._topSp.visible = true;
    };
    Main.prototype.initListener = function () {
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this._cards.addEventListener(egret.Event.COMPLETE, this.boxShow, this);
        this._tryAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.replay, this);
        // this._quit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuit, this);
        this._start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
        this._topSp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStopEvent, this);
        this._next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapSuccessStar, this);
        this.m_repeatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.repeat, this);
    };
    // private onQuit(e:egret.TouchEvent)
    // {
    //     e.stopImmediatePropagation();
    // 	exit();
    // }
    Main.prototype.onStopEvent = function (e) {
        e.stopImmediatePropagation();
    };
    Main.prototype.onTapSuccessStar = function (e) {
        e.stopImmediatePropagation();
        NextLevel();
    };
    Main.prototype.replay = function (e) {
        e.stopImmediatePropagation();
        Source.reArrange();
        this._topSp.visible = false;
        for (var i = 0; i < this._topSp.numChildren; i++) {
            this._topSp.getChildAt(i).visible = false;
        }
        this.m_bgSound.clear();
        this.m_bgSound.playRes("bgmusic_mp3", 0, 0.1);
        this._qwd.gotoAndStop(0);
        this._count = 0;
        this._countArr = [];
        this._loves.reset();
        this._stars.reset();
        // this._quit.visible=true;
        this._next.visible = false;
        this.m_repeatBtn.visible = true;
        this.start();
    };
    Main.prototype.boxShow = function () {
        this._clickEnable = true;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStageTouchBegin, this);
    };
    Main.prototype.start = function () {
        this._topSp.visible = false;
        this._start.visible = false;
        this.m_repeatBtn.visible = true;
        // this._tipsSound.load(Source.root+Source.list[this._count%Source.images.length].audio);
        this.m_tipsSound.clear();
        this.m_tipsSound.playRes(Source.list[this._count % Source.images.length].audio);
        var arr = [];
        for (var i = 0; i < Source.images.length; i++) {
            arr.push(Source.images[Source.questionList[this._count][i]]);
        }
        this._cards.init(arr);
        this._timer.start();
        this.m_bgSound.playRes("bgmusic_mp3", 0, 0.1);
    };
    Main.prototype.timerFunc = function (event) {
        this.repeat(null);
    };
    Main.prototype.repeat = function (e) {
        if (e === void 0) { e = null; }
        if (e != null) {
            e.stopImmediatePropagation();
        }
        this._timer.reset();
        this.m_tipsSound.clear();
        this.m_tipsSound.playRes(Source.list[this._count % Source.images.length].audio);
    };
    Main.prototype.next = function () {
        var _this = this;
        this._clickEnable = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageTouchBegin, this);
        if (this._countArr[this._count] == undefined) {
            this._loves.cut();
            if (this._loves.count == 0) {
                setTimeout(function () {
                    _this.addChild(_this._loves);
                    _this.addChild(_this._stars);
                    _this.addChild(_this._qwd);
                    //    this.addChild(this._quit);
                    _this.addChild(_this._next);
                    _this._topSp.visible = true;
                    _this._topSp.getChildByName("failStar").visible = true;
                    _this._topSp.getChildByName("tryAgain").visible = true;
                    //this._quit.visible=false;
                    _this._qwd.gotoAndStop(2);
                    _this.m_bgSound.clear();
                }, 200);
                this._timer.stop();
                return;
            }
        }
        this._count++;
        if (this._count >= Source.NUM) {
            //提交胜利
            console.log("提交胜利... ...");
            GameOver(true, function () {
                console.log("提交胜利complete");
            });
            this._next.visible = GetRequestObject().taskId == 0;
            this.m_repeatBtn.visible = false;
            this._timer.stop();
            setTimeout(function () {
                _this.addChild(_this._loves);
                _this.addChild(_this._stars);
                _this.addChild(_this._qwd);
                //    this.addChild(this._quit);
                _this.addChild(_this._next);
                _this._topSp.visible = true;
                _this._topSp.getChildByName("caidai").visible = true;
                _this._topSp.getChildByName("successStar").visible = true;
                _this._topSp.getChildByName("tryAgain").visible = true;
                _this._qwd.gotoAndStop(1);
                _this.m_bgSound.clear();
            }, 200);
            return;
        }
        var arr = [];
        for (var i = 0; i < Source.images.length; i++) {
            arr.push(Source.images[Source.questionList[this._count][i]]);
        }
        var time = this.rightIndex == -1 ? 1500 : 4000;
        this._cards.next(arr, this.rightIndex, time - 1500);
        setTimeout(function () {
            _this._qwd.gotoAndStop(0);
            //this._tipsSound.load(Source.root+Source.list[this._count%Source.images.length].audio);
            _this.m_tipsSound.clear();
            _this.m_tipsSound.playRes(Source.list[_this._count % Source.images.length].audio);
        }, time);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    // private createBitmapByName(name: string): egret.Bitmap {
    //     let result = new egret.Bitmap();
    //     let texture: egret.Texture = RES.getRes(name);
    //     result.texture = texture;
    //     return result;
    // }
    Main.prototype.createDisobj = function (array) {
        var result = new egret.Sprite();
        for (var i = 0; i < array.length; i++) {
            result.addChild(array[i]);
        }
        return result;
    };
    Main.prototype.onStageTouchBegin = function (e) {
        var _this = this;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageTouchBegin, this);
        this._speedX = -this._speedY * (e.stageX - (this._gun.x + 74)) / (this._gun.y + 198 - e.stageY);
        var rotate = -Math.atan2((this._gun.y + 198 - e.stageY), (e.stageX - (this._gun.x + 74))) * 180 / Math.PI;
        this._gun.setRotate(rotate);
        this._bullet.rotation = 90 + rotate;
        // this.stage.once(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        setTimeout(function () { _this._gun.showHuohua(); }, 100);
    };
    // private onStageTouchEnd(e: egret.TouchEvent):void {
    // }
    Main.prototype.onEnterFrame = function (e) {
        var _this = this;
        if (this._bullet.y > 0) {
            this._bullet.y -= this._speedY;
            this._bullet.x -= this._speedX;
            for (var i = 0; i < 4; i++) {
                var card = this._cards.getChildren(i);
                var bResult = card.hitTestPoint(this._bullet.x, this._bullet.y, true);
                if (bResult && card.visible && this._clickEnable) {
                    //开枪音效
                    this.m_gunSound.clear();
                    this.m_gunSound.playRes("8367_mp3");
                    //   card.visible=false;
                    this._bullet.visible = false;
                    this.rightIndex = Source.questionList[this._count].indexOf(this._count % Source.images.length);
                    //egret.log("card.name:",card.name,String(this._count%Source.images.length));
                    egret.log("this.rightIndex:", this.rightIndex);
                    if (card.name == this.getCurQuestionName()) {
                        this._countArr[this._count] = 1;
                        this._stars.add();
                        this._qwd.gotoAndStop(4);
                    }
                    else {
                        this.rightIndex = -1;
                        card.visible = false;
                        this._countArr[this._count] = 0;
                        this._loves.cut();
                        this._qwd.gotoAndStop(3);
                        if (this._loves.count == 0) {
                            //提交失败
                            console.log("提交失败... ...");
                            GameOver(false, function () {
                                console.log("提交失败complete");
                            });
                            this.m_repeatBtn.visible = false;
                            setTimeout(function () {
                                _this.addChild(_this._loves);
                                _this.addChild(_this._stars);
                                _this.addChild(_this._qwd);
                                // this.addChild(this._quit);
                                _this.addChild(_this._next);
                                _this._topSp.visible = true;
                                _this._topSp.getChildByName("failStar").visible = true;
                                _this._topSp.getChildByName("tryAgain").visible = true;
                                // this._quit.visible=false;
                                _this._qwd.gotoAndStop(2);
                                _this.m_bgSound.clear();
                            }, 200);
                            this._timer.stop();
                            this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageTouchBegin, this);
                            return;
                        }
                    }
                    setTimeout(function () {
                        _this._timer.reset();
                        _this._timer.start();
                        _this.next();
                    }, 500);
                    this._bullet.visible = true;
                    this._bullet.x = 681;
                    this._bullet.y = 957;
                    this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                }
            }
        }
        else {
            if (this._countArr[this._count] == undefined) {
                this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStageTouchBegin, this);
            }
            this._bullet.visible = true;
            this._bullet.x = 681;
            this._bullet.y = 957;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        }
    };
    Main.prototype.getCurQuestionName = function () {
        return Source.list[this._count % Source.images.length].name;
    };
    Main.sourceName = "";
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map