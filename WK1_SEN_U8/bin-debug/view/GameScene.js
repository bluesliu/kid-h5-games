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
        //背景
        _this.m_bg = DisplayUtil.createBitmapByName("scene_jpg");
        _this.addChild(_this.m_bg);
        _this.roleContainer = new egret.Sprite();
        _this.addChild(_this.roleContainer);
        _this.cardContainer = new egret.Sprite();
        _this.addChild(_this.cardContainer);
        _this.m_ribbon = DisplayUtil.createBitmapByName("ribbon_png");
        return _this;
    }
    GameScene.prototype.showRibbon = function () {
        this.addChild(this.m_ribbon);
        this.m_ribbon.alpha = 0;
        this.m_ribbon.x = (Game.instance.stageW - this.m_ribbon.width) / 2;
        this.m_ribbon.y = 150;
        egret.Tween.removeTweens(this.m_ribbon);
        egret.Tween.get(this.m_ribbon).to({ alpha: 1, y: 0 }, 2000).wait(500).to({ alpha: 0, y: 150 }, 2000);
    };
    GameScene.prototype.reset = function () {
        DisplayUtil.remove(this.m_ribbon);
    };
    return GameScene;
}(egret.Sprite));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map