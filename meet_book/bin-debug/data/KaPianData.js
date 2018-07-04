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
var KaPianData = (function (_super) {
    __extends(KaPianData, _super);
    function KaPianData() {
        var _this = _super.call(this) || this;
        _this.imageLoader = new egret.ImageLoader();
        _this.imageLoader.addEventListener(egret.Event.COMPLETE, _this.imageCom, _this);
        _this.soundLoader = new egret.URLLoader();
        _this.soundLoader.addEventListener(egret.Event.COMPLETE, _this.soundCom, _this);
        _this.image = new egret.Bitmap();
        _this.addChild(_this.image);
        _this.sound = new egret.Sound();
        _this.sound.addEventListener(egret.Event.COMPLETE, _this.soundCom, _this);
        return _this;
        // this.touchEnabled=true;
        // this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onThisTouchMove,this);
        // this.addEventListener(egret.Event.ADDED_TO_STAGE,this.inStage,this);
    }
    KaPianData.prototype.inStage = function (e) {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onThisTouchEnd, this);
    };
    KaPianData.prototype.onThisTouchEnd = function (e) {
        this.dispatchEvent(new egret.Event(egret.Event.CLOSE));
    };
    KaPianData.prototype.onThisTouchMove = function (e) {
        this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
    };
    KaPianData.prototype.setUrl = function (url1, url2, name) {
        this.name = name;
        this.imageUrl = url1;
        this.soundUrl = url2;
        // this.imageLoader.load(this.imageUrl);
        this.image.texture = RES.getRes(this.imageUrl);
        this.image.width = 200;
        this.image.height = 200;
        this.addChild(this.image);
        this.sound = RES.getRes(this.soundUrl);
    };
    KaPianData.prototype.imageCom = function (e) {
        this.image.texture = e.target.data;
        this.addChild(this.image);
        this.soundLoader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        var req = new egret.URLRequest();
        req.url = this.soundUrl;
        this.sound.load(this.soundUrl);
    };
    KaPianData.prototype.soundCom = function (e) {
        this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
    };
    return KaPianData;
}(egret.Sprite));
__reflect(KaPianData.prototype, "KaPianData");
//# sourceMappingURL=KaPianData.js.map