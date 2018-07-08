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
//游戏场景
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.m_paopaoPos = [new egret.Point(399, 454), new egret.Point(779, 198), new egret.Point(1239, 410),
            new egret.Point(1673, 218), new egret.Point(703, 815), new egret.Point(1501, 859)];
        //背景
        _this.m_bg = DisplayUtil.createBitmapByName("scene_jpg");
        _this.addChild(_this.m_bg);
        _this.m_lamp = DisplayUtil.createMovieClipByName("lamp");
        DisplayUtil.setSize(_this.m_lamp, 1838, 207);
        _this.m_lamp.x = 24;
        _this.m_lamp.y = 112;
        _this.m_paopaoArr = new Array();
        _this.m_black = new egret.Sprite();
        _this.m_black.graphics.beginFill(0x333333);
        _this.m_black.graphics.drawRect(0, 0, 1920, 1080);
        _this.m_black.graphics.endFill();
        return _this;
    }
    GameScene.prototype.showLamp = function () {
        this.reset();
        this.addChild(this.m_lamp);
        this.m_lamp.gotoAndPlay("flash", -1);
        var _loop_1 = function (i) {
            var paopao = DisplayUtil.createMovieClipByName("paopao");
            paopao.x = this_1.m_paopaoPos[i].x;
            paopao.y = this_1.m_paopaoPos[i].y;
            paopao.scaleX = paopao.scaleY = MathUtil.random(0.5, 1.5, 0.1);
            this_1.m_paopaoArr.push(paopao);
            this_1.addChild(paopao);
            egret.Tween.get(paopao).wait(MathUtil.random(0, 1000, 100)).call(function () {
                var color = MathUtil.random(1, 2, 1);
                paopao.gotoAndPlay("color" + color, -1);
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < this.m_paopaoPos.length; i++) {
            _loop_1(i);
        }
    };
    GameScene.prototype.black = function () {
        this.reset();
        this.addChild(this.m_black);
    };
    GameScene.prototype.reset = function () {
        DisplayUtil.remove(this.m_lamp);
        this.m_lamp.stop();
        for (var i = 0; i < this.m_paopaoArr.length; i++) {
            var paopao = this.m_paopaoArr[i];
            paopao.stop();
            DisplayUtil.remove(paopao);
            egret.Tween.removeTweens(paopao);
        }
        this.m_paopaoArr.length = 0;
        DisplayUtil.remove(this.m_black);
    };
    return GameScene;
}(egret.Sprite));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map