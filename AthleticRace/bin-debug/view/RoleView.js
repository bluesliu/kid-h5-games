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
    RoleState[RoleState["run"] = 1] = "run";
    RoleState[RoleState["jump"] = 2] = "jump";
})(RoleState || (RoleState = {}));
//events ： JUMP_END
var RoleView = (function (_super) {
    __extends(RoleView, _super);
    function RoleView(roleName) {
        var _this = _super.call(this) || this;
        _this.m_sound = new SoundPlayer();
        _this.m_jumpSpeed = 0;
        _this.m_shadow = new egret.Sprite();
        _this.m_shadow.graphics.beginFill(0x000000, 1);
        _this.m_shadow.graphics.drawCircle(0, 0, 120);
        _this.m_shadow.graphics.endFill();
        _this.m_shadow.alpha = 0.5;
        _this.addChild(_this.m_shadow);
        _this.m_shadow.scaleY = 0.5;
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
        if (this.state == RoleState.jump) {
            this.jumpRender();
        }
    };
    RoleView.prototype.jumpRender = function () {
        if (this.m_jumpSpeed == 0) {
            this.m_jumpSpeed = -10;
        }
        this.m_role.y += this.m_jumpSpeed;
        if (this.m_role.y < -300) {
            //跳到了顶点
            this.m_role.y = -300;
            this.m_jumpSpeed = 10;
        }
        else if (this.m_role.y >= 0 && this.m_jumpSpeed > 0) {
            //落地
            this.m_role.y = 0;
            this.m_jumpSpeed = 0;
            this.state = RoleState.run;
            this.dispatchEvent(new egret.Event("JUMP_END"));
        }
        if (this.m_jumpSpeed < 0) {
            this.m_shadow.alpha -= 0.02;
        }
        else if (this.m_jumpSpeed > 0) {
            this.m_shadow.alpha += 0.02;
        }
    };
    // -------------------  以下是人物状态方法，方法名与枚举名保持一致 ----------------
    RoleView.prototype.idle = function () {
        this.m_role.gotoAndStop(RoleState[RoleState.idle]);
    };
    RoleView.prototype.run = function () {
        this.m_role.gotoAndPlay(RoleState[RoleState.run], -1);
    };
    RoleView.prototype.jump = function () {
        this.m_role.gotoAndStop(RoleState[RoleState.jump]);
    };
    return RoleView;
}(egret.Sprite));
__reflect(RoleView.prototype, "RoleView");
//# sourceMappingURL=RoleView.js.map