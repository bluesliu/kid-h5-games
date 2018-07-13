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
var PingZi = (function (_super) {
    __extends(PingZi, _super);
    function PingZi() {
        var _this = _super.call(this) || this;
        _this.m_pingZi123 = DisplayUtil.createMovieClipByName("pingZi123");
        _this.addChild(_this.m_pingZi123);
        _this.m_pingZi123.x = 0;
        _this.m_pingZi4 = DisplayUtil.createMovieClipByName("pingZi4");
        _this.addChild(_this.m_pingZi4);
        _this.m_pingZi4.x = 240;
        _this.m_pingZi5 = DisplayUtil.createMovieClipByName("pingZi5");
        _this.addChild(_this.m_pingZi5);
        _this.m_pingZi5.x = 384;
        _this.m_pingZi6 = DisplayUtil.createMovieClipByName("pingZi6");
        _this.addChild(_this.m_pingZi6);
        _this.m_pingZi6.x = 506;
        _this.m_jiuJingDeng = DisplayUtil.createMovieClipByName("jiuJingDeng");
        _this.addChild(_this.m_jiuJingDeng);
        _this.m_jiuJingDeng.x = 641;
        _this.m_jiuJingDeng.play(-1);
        _this.m_shaoBei = DisplayUtil.createMovieClipByName("shaoBei");
        //this.addChild(this.m_shaoBei);
        _this.m_shaoBei.x = 641;
        _this.m_rightEff = DisplayUtil.createMovieClipByName("rightEff");
        _this.m_rightEff.x = 641;
        _this.m_wrongEff = DisplayUtil.createMovieClipByName("wrongEff");
        _this.m_wrongEff.x = 641;
        return _this;
    }
    PingZi.prototype.reset = function () {
        this.m_pingZi123.gotoAndStop("idle");
        this.m_pingZi4.gotoAndStop("idle");
        this.m_pingZi5.gotoAndStop("idle");
        this.m_pingZi6.gotoAndStop("idle");
        DisplayUtil.remove(this.m_shaoBei);
        DisplayUtil.remove(this.m_rightEff);
        DisplayUtil.remove(this.m_wrongEff);
    };
    PingZi.prototype.setPingZi = function (value) {
        this.reset();
        var pingZi;
        if (value >= 1 && value <= 3) {
            pingZi = this.m_pingZi123;
        }
        else if (value == 4) {
            pingZi = this.m_pingZi4;
        }
        else if (value == 5) {
            pingZi = this.m_pingZi5;
        }
        else if (value == 6) {
            pingZi = this.m_pingZi6;
        }
        pingZi.gotoAndStop("state" + value);
        this.addChildAt(this.m_shaoBei, 0);
        this.m_shaoBei.gotoAndStop("state" + value);
    };
    PingZi.prototype.showRightEff = function () {
        this.addChildAt(this.m_rightEff, 0);
        this.m_rightEff.play(-1);
        DisplayUtil.remove(this.m_wrongEff);
    };
    PingZi.prototype.showWrongEff = function () {
        this.addChild(this.m_wrongEff);
        this.m_wrongEff.play(1);
        DisplayUtil.remove(this.m_rightEff);
    };
    return PingZi;
}(egret.Sprite));
__reflect(PingZi.prototype, "PingZi");
//# sourceMappingURL=PingZi.js.map