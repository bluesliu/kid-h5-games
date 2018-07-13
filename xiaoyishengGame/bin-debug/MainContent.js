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
var MainContent = (function (_super) {
    __extends(MainContent, _super);
    function MainContent() {
        var _this = _super.call(this) || this;
        _this._dataArr = [];
        _this._guanQiaID = 0;
        return _this;
        //	this.init();
    }
    MainContent.prototype.init = function (str) {
        var bj = new egret.Bitmap();
        bj.texture = RES.getRes("beijing_png");
        this.addChild(bj);
        this._shenming = new ShenMingView();
        this._shenming.x = 182;
        this._shenming.y = 11;
        this.addChild(this._shenming);
        this._shenming.addEventListener(egret.Event.CLOSE, this.youXiJieShu, this);
        this._dataArr = RES.getRes(str + "_json");
        console.log(this._dataArr[1].xuanXiang);
        this._jifen = new JiFenView();
        this._jifen.chushi(this._dataArr.length - 1);
        this.addChild(this._jifen);
        this._jifen.y = 10;
        this._jifen.x = 1300 - this._jifen.width;
        this._youxi = new YouXi();
        this.addChild(this._youxi);
        console.log(this._dataArr[0].type);
        this._youxi._youxiType = this._dataArr[0].type;
        this._youxi._dataArr = this._dataArr;
        this._youxi.addEventListener(egret.Event.COMPLETE, this.onYouXiCom, this);
        this._youxi.addEventListener(egret.Event.CLOSE, this.onClose, this);
        this._youxi.init();
        //  setTimeout(this.kaishi,500);
        this._sp = new egret.Sprite();
        this.addChild(this._sp);
        this._kaiShi = new egret.Bitmap();
        this._kaiShi.texture = RES.getRes("kaishi_png");
        this._sp.addChild(this._kaiShi);
        this._sp.touchEnabled = true;
        this._sp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onKaiShi, this);
        this._sp.x = (1366 - this._kaiShi.width) / 2;
        this._sp.y = (1024 - this._kaiShi.height) / 2;
        this._shibai = new ShiBai();
        this._shibai.visible = false;
        this.addChild(this._shibai);
        this._shibai.x = (1366 - this._shibai.width) / 2;
        this._shibai.y = (1024 - this._shibai.height) / 2;
        this._shibai.touchEnabled = true;
        this._shibai.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ChongLai, this);
        this._chengong = new ChengGong();
        this._chengong.visible = false;
        this.addChild(this._chengong);
        this._chengong.x = (1366 - this._chengong.width) / 2;
        this._chengong.y = (1024 - this._chengong.height) / 2;
    };
    MainContent.prototype.onKaiShi = function (e) {
        this._sound = new SoundPlayer();
        this._sound.playRes("bgmusic_mp3", 1000);
        this._sp.visible = false;
        this.kaishi();
    };
    MainContent.prototype.kaishi = function () {
        setTimeout(this._youxi.setID(0), 500);
    };
    //口渴  基尔
    /**
     * 游戏一关成功了
     */
    MainContent.prototype.onYouXiCom = function (e) {
        console.log("chenggong");
        this._jifen.chengong();
        this._guanQiaID++;
        if (this._guanQiaID < this._dataArr.length - 1) {
            this._youxi.setID(this._guanQiaID);
        }
        else {
            this._chengong.visible = true;
            this.addChild(this._chengong);
        }
    };
    /**
     * 游戏一关失败了
     */
    MainContent.prototype.onClose = function (e) {
        // console
        this._shenming.siwang();
        if (this._shenming._id != -1) {
            this._youxi.setID(this._guanQiaID);
        }
    };
    /**
     * 游戏失败，结束
     */
    MainContent.prototype.youXiJieShu = function (e) {
        this._shibai.visible = true;
        this.addChild(this._shibai);
    };
    MainContent.prototype.ChongLai = function (e) {
        this._shibai.visible = false;
        this._shenming.reset();
        this._jifen.reset();
        this._guanQiaID = 0;
        this._youxi.setID(this._guanQiaID);
    };
    return MainContent;
}(egret.Sprite));
__reflect(MainContent.prototype, "MainContent");
//# sourceMappingURL=MainContent.js.map