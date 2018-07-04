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
        _this.tiMuID = 0;
        _this._id = 0;
        _this._isShiBai = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onStage, _this);
        return _this;
    }
    MainContent.prototype.onStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onStage, this);
    };
    MainContent.prototype.init = function () {
        this.daoJiShi = new DaoJiShi();
        this.addChild(this.daoJiShi);
        this.daoJiShi.init();
        this.daoJiShi.addEventListener(egret.Event.COMPLETE, this.daoJishiCom, this);
        this.daoJiShi.x = 500;
        this.daoJiShi.y = 200;
        this.youxi = new YouXiView();
        this.addChild(this.youxi);
        this.youxi.addEventListener(egret.Event.COMPLETE, this.youXiChengGong, this);
        this.youxi.addEventListener(egret.Event.CLOSE, this.youXiShiBai, this);
        this._shenming = new ShenMingView();
        this._shenming.x = 182;
        this._shenming.y = 11;
        this.addChild(this._shenming);
        this._shenming.addEventListener(egret.Event.CLOSE, this.youXiJieShu, this);
        this._jifen = new JiFenView();
        this._jifen.chushi(this.kaPianArr.length);
        this.addChild(this._jifen);
        this._jifen.y = 10;
        this._jifen.x = 1300 - this._jifen.width;
        this._jixiangwu = new JiXiangWu();
        this.addChild(this._jixiangwu);
        this._jixiangwu.x = 800;
        this._jixiangwu.y = 650;
        this._guoguanUI = new egret.Bitmap();
        this._guoguanUI.texture = RES.getRes("Level_Completed_png");
        this._shibaiUI = new egret.Bitmap();
        this._shibaiUI.texture = RES.getRes("game_over_png");
        this._tryAgen = new egret.Bitmap();
        this._tryAgen.texture = RES.getRes("tryagain_png");
        this._tryAgen.touchEnabled = true;
        this._tryAgen.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ontryAgen, this);
        this._mouseView = new MouseView();
        this.addChild(this._mouseView);
        this._lizi = new LiZiClass();
        this.addChild(this._lizi);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
    };
    /**
     * 触摸痕迹
     */
    MainContent.prototype.touchMove = function (e) {
        //this._mouseView.onmove(e);
        this._lizi.move(e);
    };
    /**
     * 倒计时结束
     */
    MainContent.prototype.daoJishiCom = function (e) {
        egret.setTimeout(this.youxiKaiShi, this, 500);
    };
    MainContent.prototype.youxiKaiShi = function () {
        this.daoJiShi.visible = false;
        this.youxi.setArr(this.kaPianArr);
        this.youxi.setID(0);
    };
    /**
     * 玩家通过一关
     */
    MainContent.prototype.youXiChengGong = function (e) {
        this._jixiangwu.kaixin();
        egret.setTimeout(this.xiayiguan, this, 3500);
    };
    MainContent.prototype.xiayiguan = function () {
        this._id++;
        this._jifen.chengong();
        this._jixiangwu.pingchang();
        if (this._id < this.kaPianArr.length) {
            this.youxi.setID(this._id);
        }
        else {
            this.chenggong();
        }
    };
    /**
     *
     * 玩家完成所有关卡  游戏成功
     */
    MainContent.prototype.chenggong = function () {
        this._jixiangwu.chenggongl();
        this.addChild(this._guoguanUI);
        this._guoguanUI.x = 500;
        this._guoguanUI.y = -500;
        egret.Tween.get(this._guoguanUI).to({ y: 200 }, 500, egret.Ease.backIn);
        this.youxi.stop();
    };
    /**
     * 玩家失误一次,再次播放此题
     */
    MainContent.prototype.youXiShiBai = function (e) {
        this._jixiangwu.shibail();
        this._shenming.siwang();
        if (!this._isShiBai) {
            this.youxi.setID(this._id);
        }
    };
    /**
     * 游戏结束
     */
    MainContent.prototype.youXiJieShu = function (e) {
        this._isShiBai = true;
        this._shibaiUI.visible = true;
        this._tryAgen.visible = true;
        this._jixiangwu.jieshu();
        this.addChild(this._shibaiUI);
        this._shibaiUI.x = 500;
        this._shibaiUI.y = -500;
        egret.Tween.get(this._shibaiUI).to({ y: 200 }, 500, egret.Ease.backIn);
        this._tryAgen.x = 600;
        this._tryAgen.y = 830;
        this.addChild(this._tryAgen);
        this.youxi.stop();
    };
    /**
     * 游戏重新开始
     */
    MainContent.prototype.ontryAgen = function (e) {
        this._shibaiUI.visible = false;
        this._tryAgen.visible = false;
        this._id = 0;
        this._jifen.chengong();
        this._jixiangwu.pingchang();
        this.youxi.setID(0);
        this._jifen.reset();
        this._shenming.reset();
        this._isShiBai = false;
        this.youxi.kashi();
    };
    /**
     * 所有题目的卡片
     */
    MainContent.prototype.setArr = function (arr) {
        this.kaPianArr = arr;
        this.init();
    };
    return MainContent;
}(egret.Sprite));
__reflect(MainContent.prototype, "MainContent");
//# sourceMappingURL=MainContent.js.map