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
var SuccessPanel = (function (_super) {
    __extends(SuccessPanel, _super);
    function SuccessPanel(thisObj) {
        var _this = _super.call(this) || this;
        _this.m_thisObj = thisObj;
        var bg = DisplayUtil.createBitmapByName("success_2_png");
        _this.addChild(bg);
        bg.x = (Game.instance.stageW - bg.width) / 2;
        bg.y = (Game.instance.stageH - bg.height) / 2;
        var star = DisplayUtil.createBitmapByName("success_1_png");
        _this.addChild(star);
        star.x = (Game.instance.stageW - star.width) / 2;
        star.y = (Game.instance.stageH - star.height) / 2 - 100;
        var role = DisplayUtil.createBitmapByName("success_0_png");
        _this.addChild(role);
        role.x = star.x - 100;
        role.y = star.y + star.height / 2;
        _this.m_tryAgainBtn = new EButton(_this, "tryAgainBtn_png", null, _this.onTryAgainClick);
        _this.addChild(_this.m_tryAgainBtn);
        _this.m_tryAgainBtn.y = star.y + star.height;
        _this.m_tryAgainBtn.x = (Game.instance.stageW - _this.m_tryAgainBtn.width) / 2;
        _this.m_nextBtn = new EButton(_this, "nextBtn_png", null, _this.onNextClick);
        _this.m_nextBtn.x = Game.instance.stageW - _this.m_nextBtn.width - 50;
        _this.m_nextBtn.y = Game.instance.stageH - _this.m_nextBtn.height - 100;
        return _this;
    }
    SuccessPanel.prototype.show = function () {
        _super.prototype.show.call(this, true, BoxAlign.center);
        var obj = GetRequestObject();
        if (obj == null || obj.taskId != 0) {
            //从任务入口打开,没有下一关
            DisplayUtil.remove(this.m_nextBtn);
        }
        else {
            //有下一关
            this.addChild(this.m_nextBtn);
        }
    };
    SuccessPanel.prototype.onTryAgainClick = function () {
        this.hide();
        this.onTryAgain.call(this.m_thisObj);
    };
    SuccessPanel.prototype.onNextClick = function () {
        NextLevel();
    };
    return SuccessPanel;
}(BaseBox));
__reflect(SuccessPanel.prototype, "SuccessPanel");
//# sourceMappingURL=SuccessPanel.js.map