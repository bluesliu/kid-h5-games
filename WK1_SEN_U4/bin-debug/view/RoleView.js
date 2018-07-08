// 角色
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
var RoleState;
(function (RoleState) {
    RoleState[RoleState["idle"] = 0] = "idle";
    RoleState[RoleState["happy"] = 1] = "happy";
    RoleState[RoleState["happy_mouth"] = 2] = "happy_mouth";
    RoleState[RoleState["sad"] = 3] = "sad";
    RoleState[RoleState["sad_mouth"] = 4] = "sad_mouth";
    RoleState[RoleState["celebrate"] = 5] = "celebrate";
    RoleState[RoleState["celebrate_mouth"] = 6] = "celebrate_mouth";
    RoleState[RoleState["fail"] = 7] = "fail";
})(RoleState || (RoleState = {}));
var RoleView = (function (_super) {
    __extends(RoleView, _super);
    function RoleView() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        _this.m_hand = DisplayUtil.createMovieClipByName("hand");
        _this.m_hand.gotoAndStop(5);
        _this.addChild(_this.m_hand);
        _this.m_roleIdle = DisplayUtil.createMovieClipByName("role_idle");
        _this.m_roleIdle.stop();
        _this.addChild(_this.m_roleIdle);
        _this.m_roleHappy = DisplayUtil.createMovieClipByName("role_happy");
        _this.m_roleHappy.stop();
        _this.m_roleSad = DisplayUtil.createMovieClipByName("role_sad");
        _this.m_roleSad.stop();
        _this.m_roleCelebrate = DisplayUtil.createMovieClipByName("role_celebrate");
        _this.m_roleCelebrate.stop();
        return _this;
    }
    RoleView.prototype.setHand = function (value) {
        this.m_hand.gotoAndStop(value);
    };
    RoleView.prototype.getHand = function () {
        return this.m_hand.currentFrame;
    };
    Object.defineProperty(RoleView.prototype, "state", {
        get: function () {
            return this.m_state;
        },
        set: function (value) {
            this.m_isChangeState = this.m_state != value;
            this.m_state = value;
            //如果状态改变了，就动态调用状态方法
            if (this.m_isChangeState) {
                this.m_isChangeState = false;
                this.reset();
                this[RoleState[this.m_state]]();
            }
        },
        enumerable: true,
        configurable: true
    });
    RoleView.prototype.reset = function () {
        this.m_roleIdle.stop();
        DisplayUtil.remove(this.m_roleIdle);
        this.m_roleHappy.stop();
        DisplayUtil.remove(this.m_roleHappy);
        this.m_roleSad.stop();
        DisplayUtil.remove(this.m_roleSad);
        this.m_roleCelebrate.stop();
        DisplayUtil.remove(this.m_roleCelebrate);
        this.m_hand.visible = true;
    };
    // -------------------  以下是人物状态方法，方法名与枚举名保持一致 ----------------
    RoleView.prototype.idle = function () {
        this.addChild(this.m_roleIdle);
        this.m_roleIdle.gotoAndPlay(RoleState[RoleState.idle], -1);
    };
    RoleView.prototype.happy = function () {
        this.addChild(this.m_roleHappy);
        this.m_roleHappy.gotoAndStop(RoleState[RoleState.happy]);
    };
    RoleView.prototype.happy_mouth = function () {
        this.addChild(this.m_roleHappy);
        this.m_roleHappy.gotoAndPlay(RoleState[RoleState.happy_mouth], -1);
    };
    RoleView.prototype.sad = function () {
        this.addChild(this.m_roleSad);
        this.m_roleSad.gotoAndStop(RoleState[RoleState.sad]);
    };
    RoleView.prototype.sad_mouth = function () {
        this.addChild(this.m_roleSad);
        this.m_roleSad.gotoAndPlay(RoleState[RoleState.sad_mouth], -1);
    };
    RoleView.prototype.celebrate = function () {
        this.addChild(this.m_roleCelebrate);
        this.m_roleCelebrate.gotoAndStop(RoleState[RoleState.celebrate]);
        this.m_hand.visible = false;
    };
    RoleView.prototype.celebrate_mouth = function () {
        this.addChild(this.m_roleCelebrate);
        this.m_roleCelebrate.gotoAndPlay(RoleState[RoleState.celebrate_mouth], -1);
        this.m_hand.visible = false;
    };
    RoleView.prototype.fail = function () {
        this.addChild(this.m_roleSad);
        this.m_roleSad.gotoAndPlay(RoleState[RoleState.fail], -1);
        this.m_hand.visible = false;
    };
    return RoleView;
}(egret.Sprite));
__reflect(RoleView.prototype, "RoleView");
//# sourceMappingURL=RoleView.js.map