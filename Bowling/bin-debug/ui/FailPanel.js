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
var FailPanel = (function (_super) {
    __extends(FailPanel, _super);
    function FailPanel(thisObj) {
        var _this = _super.call(this) || this;
        _this.m_thisObj = thisObj;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xff0000, 0);
        bg.graphics.drawRect(0, 0, Game.instance.stageW, Game.instance.stageH);
        _this.addChild(bg);
        var star = DisplayUtil.createBitmapByName("fail_2_png");
        _this.addChild(star);
        star.x = (Game.instance.stageW - star.width) / 2;
        star.y = (Game.instance.stageH - star.height) / 2 - 100;
        var role = DisplayUtil.createBitmapByName("fail_1_png");
        _this.addChild(role);
        role.x = star.x - 100;
        role.y = star.y + star.height / 2;
        _this.m_tryAgainBtn = new EButton(_this, "tryAgainBtn_png", null, _this.onTryAgainClick);
        _this.addChild(_this.m_tryAgainBtn);
        _this.m_tryAgainBtn.y = star.y + star.height;
        _this.m_tryAgainBtn.x = (Game.instance.stageW - _this.m_tryAgainBtn.width) / 2;
        return _this;
    }
    FailPanel.prototype.show = function () {
        _super.prototype.show.call(this, true, BoxAlign.center);
    };
    FailPanel.prototype.onTryAgainClick = function () {
        this.hide();
        this.onTryAgain.call(this.m_thisObj);
    };
    return FailPanel;
}(BaseBox));
__reflect(FailPanel.prototype, "FailPanel");
//# sourceMappingURL=FailPanel.js.map