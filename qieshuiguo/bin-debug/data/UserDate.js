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
var UserDate = (function (_super) {
    __extends(UserDate, _super);
    function UserDate() {
        var _this = _super.call(this) || this;
        _this.id = 0;
        _this.kaPianArr = [];
        console.log("ddff");
        _this.chushi();
        return _this;
        // this.init();
    }
    UserDate.prototype.chushi = function () {
    };
    UserDate.prototype.init = function (str) {
        // ?assetsName=HC1_T1U2
        // var ldr:egret.URLLoader=new egret.URLLoader();
        // var req:egret.URLRequest=new egret.URLRequest();
        // req.url="data/unit1/conf.json";
        // ldr.load(req);
        // ldr.addEventListener(egret.Event.COMPLETE,this.ldrCom,this);
        this.ldrCom(str);
    };
    UserDate.prototype.ldrCom = function (str) {
        console.log(RES.getRes(str + "_json"));
        this.dataArr = RES.getRes(str + "_json");
        this.loadData();
    };
    UserDate.prototype.loadData = function () {
        for (var i = 0; i < this.dataArr.length; i++) {
            var kapian = new KaPianData();
            var n = "kapian_" + i;
            console.log(this.dataArr[i].image);
            kapian.setUrl(this.dataArr[i].image, this.dataArr[i].shengyin, n);
            kapian.width = 200;
            kapian.height = 200;
            this.addChild(kapian);
            kapian.x = i * 300;
            this.kaPianArr.push(kapian);
            kapian.addEventListener(egret.Event.COMPLETE, this.kapianCom, this);
        }
        this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
    };
    UserDate.prototype.kapianCom = function (e) {
        this.id++;
        if (this.id == this.dataArr.length) {
            // this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
        }
    };
    return UserDate;
}(egret.DisplayObjectContainer));
__reflect(UserDate.prototype, "UserDate");
//# sourceMappingURL=UserDate.js.map