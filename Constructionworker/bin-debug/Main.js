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
        var constructionWorker = new ConstructionWorker();
        this.addChild(constructionWorker);
    };
    Main.sourceName = "";
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map