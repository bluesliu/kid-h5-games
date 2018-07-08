//火车
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
var TrainView = (function (_super) {
    __extends(TrainView, _super);
    function TrainView() {
        var _this = _super.call(this) || this;
        _this.m_windowPos = [[584.5, 272.5], [883.5, 273.5], [1184.5, 273.5], [1485.5, 273.5], [1786.5, 273.5]];
        _this.m_windows = [];
        _this.m_sound = new SoundPlayer();
        //影子
        var shadow = DisplayUtil.createBitmapByName("shadow_png");
        shadow.x = 17;
        shadow.y = 458;
        _this.addChild(shadow);
        //车头
        _this.m_locomotive = DisplayUtil.createBitmapByName("train1_png");
        _this.m_locomotive.x = 0;
        _this.m_locomotive.y = 130;
        _this.addChild(_this.m_locomotive);
        //车尾
        var tail = DisplayUtil.createBitmapByName("train2_png");
        tail.x = 1033;
        tail.y = 130;
        _this.addChild(tail);
        //前轮
        _this.m_wheel1 = DisplayUtil.createBitmapByName("wheel_png");
        _this.m_wheel1.x = 160;
        _this.m_wheel1.y = 415;
        _this.addChild(_this.m_wheel1);
        //后轮
        _this.m_wheel2 = DisplayUtil.createBitmapByName("wheel_png");
        _this.m_wheel2.x = 288;
        _this.m_wheel2.y = 415;
        _this.addChild(_this.m_wheel2);
        //其它轮子
        var wheel = DisplayUtil.createBitmapByName("wheels_png");
        wheel.x = 478;
        wheel.y = 415;
        _this.addChild(wheel);
        //烟
        _this.m_smoke = DisplayUtil.createMovieClipByName("smoke");
        _this.m_smoke.stop();
        //蒸汽
        _this.m_chimney = DisplayUtil.createMovieClipByName("chimney");
        _this.m_chimney.stop();
        //窗户闪烁
        _this.m_flash = DisplayUtil.createMovieClipByName("flash");
        _this.m_flash.stop();
        return _this;
    }
    //坏掉了
    TrainView.prototype.bad = function () {
        this.reset();
        //两个轮子飞出去
        egret.Tween.get(this.m_wheel1).to({ x: -80 }, 400);
        egret.Tween.get(this.m_wheel2).wait(400).to({ x: -80 }, 600);
        //车头坏掉
        egret.Tween.get(this.m_locomotive).wait(1000).to({ y: 150 }, 300);
        egret.Tween.get(this.m_role).wait(1000).to({ y: 2 }, 300);
        //冒烟
        this.m_smoke.gotoAndPlay(2, -1);
        this.addChild(this.m_smoke);
        //故障音频
        this.m_sound.playRes("guzhang_mp3");
    };
    //进场景
    TrainView.prototype.goIn = function (callback, thisObj) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        if (thisObj === void 0) { thisObj = null; }
        this.reset();
        this.x = 1920;
        egret.Tween.get(this).to({ x: 2 }, 4000).call(function () {
            _this.m_sound.clear();
            _this.m_chimney.stop();
            DisplayUtil.remove(_this.m_chimney);
            if (callback != null) {
                callback.call(thisObj);
            }
        }, this);
        this.m_chimney.gotoAndPlay(2, -1);
        this.addChild(this.m_chimney);
        //进入音频
        this.m_sound.playRes("goIn_mp3", 0);
    };
    //出场景
    TrainView.prototype.goOut = function (callback, thisObj) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        if (thisObj === void 0) { thisObj = null; }
        this.reset();
        this.x = 2;
        this.m_chimney.gotoAndPlay(2, -1);
        this.addChild(this.m_chimney);
        this.m_sound.playRes("wuwu_mp3");
        this.m_sound.exec(function () {
            egret.Tween.get(_this).to({ x: -2120 }, 5000).call(function () {
                _this.m_sound.clear();
                _this.m_chimney.stop();
                DisplayUtil.remove(_this.m_chimney);
                if (callback != null) {
                    callback.call(thisObj);
                }
            }, _this);
        }, this);
        this.m_sound.playRes("goIn_mp3", 0);
    };
    //闪烁
    TrainView.prototype.flash = function () {
        this.reset();
        var index = this.m_windows.length;
        this.addChild(this.m_flash);
        this.m_flash.gotoAndPlay(2, -1);
        this.m_flash.x = this.m_windowPos[index][0];
        this.m_flash.y = this.m_windowPos[index][1];
    };
    //添加一个卡片
    TrainView.prototype.addCard = function (data) {
        this.reset();
        var index = this.m_windows.length;
        var card = new CardView(data);
        DisplayUtil.setSize(card, 184, 184);
        card.x = this.m_windowPos[index][0];
        card.y = this.m_windowPos[index][1];
        this.addChild(card);
        this.m_windows.push(card);
    };
    TrainView.prototype.addRole = function (role) {
        role.y = -22;
        this.addChild(role);
        this.m_role = role;
    };
    TrainView.prototype.reset = function () {
        this.m_sound.clear();
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this.m_wheel1);
        egret.Tween.removeTweens(this.m_wheel2);
        egret.Tween.removeTweens(this.m_locomotive);
        this.m_wheel1.x = 160;
        this.m_wheel2.x = 288;
        this.m_locomotive.y = 130;
        DisplayUtil.remove(this.m_smoke);
        this.m_smoke.stop();
        DisplayUtil.remove(this.m_chimney);
        this.m_chimney.stop();
        DisplayUtil.remove(this.m_flash);
        this.m_flash.stop();
        this.m_role.y = -22;
    };
    TrainView.prototype.clear = function () {
        for (var i = 0; i < this.m_windows.length; i++) {
            DisplayUtil.remove(this.m_windows[i]);
        }
        this.m_windows.length = 0;
    };
    return TrainView;
}(egret.Sprite));
__reflect(TrainView.prototype, "TrainView");
//# sourceMappingURL=TrainView.js.map