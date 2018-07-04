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
            //assetsName = requestObj.assetsName;
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
        var adv = new Adventurer();
        this.addChild(adv);
        // let stageW = this.stage.stageWidth;
        // let stageH = this.stage.stageHeight;
        // this._bg=new Bg();
        // this.addChild(this._bg);
        // // this._bullet=Source.createBitmapByName("炮弹_png");
        // // this.addChild(this._bullet);
        // // this._bullet.x=681;
        // // this._bullet.y=957;
        // // this._bullet.anchorOffsetX = 17.5;
        // // this._bullet.anchorOffsetY = 23;
        // // this._gun=new Gun();
        // // this.addChild(this._gun);
        // // this._gun.x=607;
        // // this._gun.y=759;
        // this._cards=new DropCards();
        // this.addChild(this._cards);
        // // let caidai= Source.createBitmapByName("success_2_png");
        // // let successStar = Source.createBitmapByName("success_1_png");    
        // // let failStar= Source.createBitmapByName("fail_2_png");   
        // // this._tryAgain= Source.createBitmapByName("fail_0_png");
        // this._loves=new CountLoves();
        // this.addChild(this._loves);
        // this._loves.x=200;
        // this._loves.y=16;
        // this._stars=new CountStars();
        // this.addChild(this._stars);
        // this._stars.x=755;
        // this._stars.y=24;
        // // this._qwd=new Qieadi();  
        // // this.addChild(this._qwd);
        // // this._qwd.x=798;
        // // this._qwd.y=695;
        // // // this._quit= Source.createBitmapByName("quit_png");
        // // // this.addChild(this._quit);
        // // // this._quit.$touchEnabled=true;
        // // // this._quit.x=90;
        // // // this._quit.y=852+89;
        // // this._next= Source.createBitmapByName("next_png");
        // // this.addChild(this._next);
        // // this._next.$touchEnabled=true;
        // // this._next.x=this.stage.stageWidth-this._next.width - 50;
        // // this._next.y=940;
        // // this._next.visible = false;
        // // this.m_repeatBtn= Source.createBitmapByName("repeat_png");
        // // this.addChild(this.m_repeatBtn);
        // // this.m_repeatBtn.$touchEnabled=true;
        // // this.m_repeatBtn.x=this._next.x;
        // // this.m_repeatBtn.y=this._next.y - 90;
        // // this.m_repeatBtn.visible = false;
        // this._topSp = new egret.Sprite();
        // this.addChild( this._topSp);
        // this._topSp.graphics.beginFill(0x000000, 0.5);
        // this._topSp.graphics.drawRect(0, 0, 1366, 1024);
        // this._topSp.graphics.endFill();
        // this._topSp.visible=false; 
        //  this._topSp.$touchEnabled=true;
        // //   this._topSp.addChild(caidai);
        // // caidai.name="caidai";
        // // caidai.y=68.48;
        // // caidai.visible=false; 
        // // this._topSp.addChild(successStar);
        // // successStar.name="successStar";
        // // successStar.x=324;
        // // successStar.y=157;
        // // successStar.visible=false; 
        // // successStar.touchEnabled = true;
        // // this._topSp.addChild(failStar);
        // // failStar.name="failStar";
        // // failStar.x=324;
        // // failStar.y=157;
        // // failStar.visible=false; 
        // // this._topSp.addChild(this._tryAgain);
        // // this._tryAgain.name="tryAgain";
        // // this._tryAgain.x=568;
        // // this._tryAgain.y=787;
        // // this._tryAgain.visible=false; 
        // // this._tryAgain.$touchEnabled=true;
        // this._start= Source.createBitmapByName("start_png");
        // this.addChild(this._start);
        // this._start.$touchEnabled=true;
        // this._start.x=(stageW-this._start.width)*0.5;
        // this._start.y=(stageH-this._start.height)*0.5;
        // this.m_tipsSound = new SoundPlayer();
        // this._timer=new egret.Timer(10000,0);
        //  this.m_bgSound = new SoundPlayer();
        // this.m_gunSound = new SoundPlayer();
        // this._topSp.visible=true; 
        //   this.initListener();
    };
    Main.sourceName = "";
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map