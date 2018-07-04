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
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddStage, _this);
        return _this;
    }
    Main.prototype.onAddStage = function (e) {
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        RES.loadConfig("resource/default.res.json", "resource/");
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.configCom, this);
    };
    Main.prototype.configCom = function (e) {
        RES.loadGroup("preload");
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.configCom, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupCom, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        // RES.addEventListener(RES.ResourceEvent.)
    };
    // ?assetsName=HC2_T1U1
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal + 1);
        }
    };
    Main.prototype.onGroupCom = function (e) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupCom, this);
        var requestObj = GetRequestObject();
        var assetsName;
        if (requestObj == null) {
            // Println("请求数据为null，无法加载相应单元的数据");
            return;
        }
        else if (requestObj.assetsName == null || requestObj.assetsName == undefined || requestObj.assetsName == "") {
            // Println("请求的assetsName为null，无法加载相应单元的数据");
            return;
        }
        else {
            assetsName = requestObj.assetsName;
        }
        this.assetsName = assetsName;
        RES.loadGroup(assetsName);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.ziLiaoCom, this);
        //   this._userData=new UserDate();
        //   this._userData.addEventListener(egret.Event.COMPLETE,this.DataCom1,this);
    };
    Main.prototype.ziLiaoCom = function (e) {
        this._userData = new UserDate();
        this._userData.init(this.assetsName);
        this._userData.addEventListener(egret.Event.COMPLETE, this.DataCom1, this);
        this.loadingView.visible = false;
        this.DataCom1(null);
    };
    Main.prototype.DataCom1 = function (e) {
        this.loadingView.visible = false;
        var bg = new egret.Bitmap();
        var bmp = RES.getRes("bg_png");
        bg.texture = bmp;
        this.addChild(bg);
        this._kaiShiSP = new egret.Sprite();
        this.addChild(this._kaiShiSP);
        this._kaiShiSP.touchEnabled = true;
        var bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes("kaishi_png");
        this._kaiShiSP.addChild(bitmap);
        this._kaiShiSP.x = (1366 - bitmap.width) / 2;
        this._kaiShiSP.y = (1024 - bitmap.height) / 2;
        this._kaiShiSP.addEventListener(egret.TouchEvent.TOUCH_END, this.kaishi, this);
    };
    Main.prototype.kaishi = function () {
        this._kaiShiSP.visible = false;
        var sound = RES.getRes("bgmusic_mp3");
        var shall = sound.play(0, 200);
        shall.volume = 0.2;
        this._mainContent = new MainContent();
        this.addChild(this._mainContent);
        this._mainContent.setArr(this._userData.kaPianArr);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map