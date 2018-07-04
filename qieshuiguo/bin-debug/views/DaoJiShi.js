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
var DaoJiShi = (function (_super) {
    __extends(DaoJiShi, _super);
    function DaoJiShi() {
        var _this = _super.call(this) || this;
        _this.id = 0;
        _this.chushi();
        return _this;
    }
    /**
     * 初始化内部对象
     */
    DaoJiShi.prototype.chushi = function () {
        this.zhushiBtmp = new egret.Bitmap();
        this.zhushiBtmp.texture = RES.getRes("zhuangshi_png");
        this.addChild(this.zhushiBtmp);
        console.log('zhuangshi');
        this.shuzi1 = new egret.Bitmap();
        this.shuzi1.texture = RES.getRes("shuZi1_png");
        this.addChild(this.shuzi1);
        this.shuzi1.visible = false;
        this.shuzi1.x = 120;
        this.shuzi1.y = 120;
        this.shuzi2 = new egret.Bitmap();
        this.shuzi2.texture = RES.getRes("shuZi2_png");
        this.addChild(this.shuzi2);
        this.shuzi2.visible = false;
        this.shuzi2.x = 120;
        this.shuzi2.y = 120;
        this.shuzi3 = new egret.Bitmap();
        this.shuzi3.texture = RES.getRes("shuZi3_png");
        this.addChild(this.shuzi3);
        this.shuzi3.visible = false;
        this.shuzi3.x = 120;
        this.shuzi3.y = 120;
        this.jiShiTime = new egret.Timer(1000);
        this.jiShiTime.addEventListener(egret.TimerEvent.TIMER, this.onTimeCom, this);
    };
    DaoJiShi.prototype.onTimeCom = function (e) {
        this.clearAll();
        this.id += 1;
        console.log(this.id);
        if (this.id == 4) {
            this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
            this.jiShiTime.stop();
            return;
        }
        if (this.id == 3) {
            this.shuzi1.visible = true;
        }
        if (this.id == 2) {
            this.shuzi2.visible = true;
        }
        if (this.id == 1) {
            this.shuzi3.visible = true;
        }
    };
    DaoJiShi.prototype.clearAll = function () {
        this.shuzi1.visible = false;
        this.shuzi2.visible = false;
        this.shuzi3.visible = false;
    };
    /**
     *
     * 开始倒计时
     */
    DaoJiShi.prototype.init = function () {
        this.jiShiTime.start();
    };
    return DaoJiShi;
}(egret.DisplayObjectContainer));
__reflect(DaoJiShi.prototype, "DaoJiShi");
//# sourceMappingURL=DaoJiShi.js.map