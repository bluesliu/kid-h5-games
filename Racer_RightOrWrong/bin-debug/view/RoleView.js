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
    RoleState[RoleState["right"] = 1] = "right";
    RoleState[RoleState["wrong"] = 2] = "wrong";
})(RoleState || (RoleState = {}));
var RoleView = (function (_super) {
    __extends(RoleView, _super);
    function RoleView(roleName) {
        var _this = _super.call(this) || this;
        _this.m_sound = new SoundPlayer();
        _this.m_roleName = roleName;
        var data = RES.getRes(roleName + "_json");
        var txtr = RES.getRes(roleName + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        _this.m_role = new egret.MovieClip(mcFactory.generateMovieClipData(roleName));
        _this.m_role.stop();
        _this.addChild(_this.m_role);
        return _this;
    }
    Object.defineProperty(RoleView.prototype, "state", {
        get: function () {
            return this.m_state;
        },
        set: function (value) {
            this.m_isChangeState = this.m_state != value;
            this.m_state = value;
            //如果状态改变了，就动态调用状态方法
            if (this.m_isChangeState) {
                this.m_sound.clear();
                this.m_isChangeState = false;
                this[RoleState[this.m_state]]();
            }
        },
        enumerable: true,
        configurable: true
    });
    RoleView.prototype.onPlay = function () {
        this.m_role.play();
    };
    RoleView.prototype.onPause = function () {
        this.m_role.stop();
    };
    RoleView.prototype.onRender = function () {
    };
    // -------------------  以下是人物状态方法，方法名与枚举名保持一致 ----------------
    RoleView.prototype.idle = function () {
        this.m_role.gotoAndPlay(RoleState[RoleState.idle], -1);
    };
    RoleView.prototype.right = function () {
        this.m_role.gotoAndStop(RoleState[RoleState.right]);
    };
    RoleView.prototype.wrong = function () {
        this.m_role.gotoAndStop(RoleState[RoleState.wrong]);
    };
    return RoleView;
}(egret.Sprite));
__reflect(RoleView.prototype, "RoleView");
//# sourceMappingURL=RoleView.js.map