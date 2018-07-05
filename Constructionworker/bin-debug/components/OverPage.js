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
var OverPage = (function (_super) {
    __extends(OverPage, _super);
    function OverPage() {
        var _this = _super.call(this) || this;
        //  this.createView();
        if (_this.stage) {
            _this.createView();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddStage, _this);
        }
        return _this;
    }
    OverPage.prototype.onAddStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddStage, this);
        this.createView();
    };
    OverPage.prototype.createView = function () {
        var caidai = Source.createBitmapByName("success_2_png");
        var successStar = Source.createBitmapByName("success_1_png");
        var failStar = Source.createBitmapByName("fail_2_png");
        this._tryAgain = Source.createBitmapByName("fail_0_png");
        var fail = Source.createBitmapByName("fail_1_png");
        var win = Source.createBitmapByName("success_0_png");
        var bg = new egret.Sprite();
        this.addChild(bg);
        bg.graphics.beginFill(0x000000, 0.5);
        bg.graphics.drawRect(0, 0, 1366, 1024);
        bg.graphics.endFill();
        this._failSp = new egret.Sprite();
        this.addChild(this._failSp);
        this._failSp.visible = false;
        this._winSp = new egret.Sprite();
        this.addChild(this._winSp);
        this._winSp.addChild(caidai);
        caidai.name = "caidai";
        caidai.y = 68.48;
        this._failSp.addChild(fail);
        fail.name = "fail";
        fail.x = 150;
        fail.y = 570;
        this._winSp.addChild(win);
        win.name = "win";
        win.x = 150;
        win.y = 570;
        this._winSp.addChild(successStar);
        successStar.name = "successStar";
        successStar.x = 324;
        successStar.y = 157;
        this._failSp.addChild(failStar);
        failStar.name = "failStar";
        failStar.x = 324;
        failStar.y = 157;
        this.addChild(this._tryAgain);
        this._tryAgain.name = "tryAgain";
        this._tryAgain.x = 568;
        this._tryAgain.y = 787;
        this._tryAgain.visible = false;
        this._tryAgain.$touchEnabled = true;
        this._winSp.visible = false;
        this._failSp.visible = false;
        this._winSp.visible = false;
        this._failSp.visible = false;
        this._start = Source.createBitmapByName("start_png");
        this.addChild(this._start);
        //this._start.visible=false; 
        this._start.$touchEnabled = true;
        this._start.x = (this.stage.stageWidth - this._start.width) * 0.5;
        this._start.y = (this.stage.stageHeight - this._start.height) * 0.5;
        this._bgSound = new SoundPlayer();
        this._tryAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tryAgain, this);
        this._start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
    };
    OverPage.prototype.start = function (e) {
        this._bgSound.clear();
        this._bgSound.playRes("bgmusic_mp3", 10000, 0.1);
        this._start.visible = false;
        this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
    };
    OverPage.prototype.tryAgain = function (e) {
        this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
    };
    OverPage.prototype.showWin = function (boo) {
        this._tryAgain.visible = true;
        if (boo) {
            this._winSp.visible = true;
            this._failSp.visible = false;
        }
        else {
            this._winSp.visible = false;
            this._failSp.visible = true;
        }
    };
    return OverPage;
}(egret.Sprite));
__reflect(OverPage.prototype, "OverPage");
//# sourceMappingURL=OverPage.js.map