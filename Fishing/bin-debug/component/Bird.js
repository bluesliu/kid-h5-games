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
var Bird = (function (_super) {
    __extends(Bird, _super);
    function Bird() {
        var _this = _super.call(this) || this;
        _this.initContent();
        return _this;
    }
    Bird.prototype.initContent = function () {
        this.load(this.initMovieClip);
    };
    Bird.prototype.initMovieClip = function () {
        /*** 本示例关键代码段开始 ***/
        var mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
        var role = new egret.MovieClip(mcDataFactory.generateMovieClipData("海鸥2"));
        this.addChild(role);
        role.gotoAndPlay(1, -1);
        // role.x = 0;
        // role.y = 100;
        // role.scaleX=role.scaleY=0.2
        // role.addEventListener(egret.Event.COMPLETE, function (e:egret.Event):void {
        //     egret.log("play over!")
        // }, this);
        // var count:number = 0;
        // role.addEventListener(egret.Event.LOOP_COMPLETE, function (e:egret.Event):void {
        //     egret.log("play times:" + ++count);
        // }, this);
        // role.addEventListener(egret.MovieClipEvent.FRAME_LABEL, function (e:egret.MovieClipEvent):void {
        //     egret.log("frameLabel:" + e.frameLabel);
        // }, this);
        // this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent):void {
        //     count = 0;
        //     role.gotoAndPlay(1, 1);
        // }, this);
        /*** 本示例关键代码段结束 ***/
    };
    Bird.prototype.load = function (callback) {
        var count = 0;
        var self = this;
        var check = function () {
            count++;
            if (count == 2) {
                callback.call(self);
            }
        };
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;
            this._mcTexture = loader.data;
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        var request = new egret.URLRequest("resource/assets/mc/bird.png");
        loader.load(request);
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;
            this._mcData = JSON.parse(loader.data);
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request = new egret.URLRequest("resource/assets/mc/bird.json");
        loader.load(request);
    };
    return Bird;
}(egret.Sprite));
__reflect(Bird.prototype, "Bird");
//# sourceMappingURL=Bird.js.map