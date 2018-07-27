//Event:  SHOT_END
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
var BallManager = (function (_super) {
    __extends(BallManager, _super);
    function BallManager() {
        var _this = _super.call(this) || this;
        _this.state = 0; //0居中不动 1左右移动 2投球
        _this.ball = new BallView();
        Game.instance.sceneLayer.addChild(_this.ball);
        _this.reset();
        return _this;
    }
    BallManager.prototype.onRender = function () {
        if (this.state == 0) {
            return;
        }
        if (this.state == 1) {
            this.ball.x += this.ball.speedX;
            if (this.ball.x < 370) {
                this.ball.x = 370;
                this.ball.speedX *= -1;
            }
            else if (this.ball.x > 1235) {
                this.ball.x = 1235;
                this.ball.speedX *= -1;
            }
        }
        else if (this.state == 2) {
            this.ball.y += this.ball.speedY;
            if (this.ball.y < 402) {
                this.ball.y = 402;
                this.dispatchEvent(new egret.Event("SHOT_END"));
            }
            else {
                this.ball.rotation += 10;
            }
        }
        DisplayUtil.setScale(this.ball, 0.71 + (this.ball.y - 402) / (777 - 402) * 0.29);
    };
    BallManager.prototype.reset = function () {
        this.state = 0;
        this.ball.x = Game.instance.stageW / 2;
        this.ball.y = 777;
        this.ball.speedX = 0;
        this.ball.speedY = 0;
        this.ball.rotation = 0;
    };
    BallManager.prototype.moveLeftAndRight = function () {
        this.reset();
        this.ball.speedX = -5;
        this.state = 1;
        this.ball.touchEnabled = true;
        this.ball.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapBall, this);
    };
    BallManager.prototype.shot = function () {
        this.ball.speedX = 0;
        this.ball.speedY = -10;
        this.state = 2;
        this.ball.touchEnabled = false;
        this.ball.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapBall, this);
    };
    BallManager.prototype.onTapBall = function (e) {
        this.shot();
    };
    return BallManager;
}(egret.EventDispatcher));
__reflect(BallManager.prototype, "BallManager");
var BallView = (function (_super) {
    __extends(BallView, _super);
    function BallView() {
        var _this = _super.call(this) || this;
        _this.speedX = 0;
        _this.speedY = 0;
        _this.bg = DisplayUtil.createBitmapByName("ball_png");
        _this.addChild(_this.bg);
        _this.bg.x = -_this.bg.width / 2;
        _this.bg.y = -_this.bg.height / 2;
        return _this;
    }
    //答错 抖动
    BallView.prototype.wrong = function () {
        var _this = this;
        EffectUtils.shakeObj(this, function () {
            EffectUtils.shakeObj(_this, null);
        });
    };
    return BallView;
}(egret.Sprite));
__reflect(BallView.prototype, "BallView");
//# sourceMappingURL=BallManager.js.map