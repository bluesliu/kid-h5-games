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
//场景
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        var _this = _super.call(this) || this;
        _this.m_speedX = 0;
        _this.m_bg = DisplayUtil.createBitmapByName("bg_png");
        _this.addChild(_this.m_bg);
        _this.m_left = new EButton(_this, "arrow_png", _this.onLeft, _this.touchEnd);
        _this.addChild(_this.m_left);
        _this.m_left.x = 0;
        _this.m_left.y = Game.instance.stageH - _this.m_left.height;
        _this.m_right = new EButton(_this, "arrow2_png", _this.onRight, _this.touchEnd);
        _this.addChild(_this.m_right);
        _this.m_right.x = Game.instance.stageW - _this.m_right.width;
        _this.m_right.y = _this.m_left.y;
        _this.m_area = new egret.Sprite();
        _this.addChild(_this.m_area);
        _this.m_area.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onAreaDown, _this);
        _this.m_area1 = new egret.Sprite();
        _this.m_area1.graphics.beginFill(0xff0000, 0.0);
        _this.m_area1.graphics.drawRect(0, 0, 310, 352);
        _this.m_area1.graphics.endFill();
        _this.m_area1.x = 726;
        _this.m_area1.y = 104;
        _this.m_area.addChild(_this.m_area1);
        _this.m_area1.touchEnabled = true;
        _this.m_area2 = new egret.Sprite();
        _this.m_area2.graphics.beginFill(0xff0000, 0.0);
        _this.m_area2.graphics.drawRect(0, 0, 310, 352);
        _this.m_area2.graphics.endFill();
        _this.m_area2.x = 1059;
        _this.m_area2.y = 104;
        _this.m_area.addChild(_this.m_area2);
        _this.m_area2.touchEnabled = true;
        _this.m_area3 = new egret.Sprite();
        _this.m_area3.graphics.beginFill(0xff0000, 0.0);
        _this.m_area3.graphics.drawRect(0, 0, 310, 352);
        _this.m_area3.graphics.endFill();
        _this.m_area3.x = 696;
        _this.m_area3.y = 463;
        _this.m_area.addChild(_this.m_area3);
        _this.m_area3.touchEnabled = true;
        _this.m_area4 = new egret.Sprite();
        _this.m_area4.graphics.beginFill(0xff0000, 0.0);
        _this.m_area4.graphics.drawRect(0, 0, 310, 352);
        _this.m_area4.graphics.endFill();
        _this.m_area4.x = 1022;
        _this.m_area4.y = 463;
        _this.m_area.addChild(_this.m_area4);
        _this.m_area4.touchEnabled = true;
        return _this;
    }
    Scene.prototype.onAreaDown = function (e) {
        if (e.target == this.m_area1) {
            this.curDownIdx = 0;
        }
        else if (e.target == this.m_area2) {
            this.curDownIdx = 1;
        }
        else if (e.target == this.m_area3) {
            this.curDownIdx = 2;
        }
        else if (e.target == this.m_area4) {
            this.curDownIdx = 3;
        }
        this.m_area.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onAreaMove, this);
        this.m_area.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onAreaUp, this);
        this.dragImg = DisplayUtil.createBitmapByName(Game.instance.question.getQuestionAt(this.curDownIdx).image);
        Game.instance.uiLayer.addChild(this.dragImg);
        DisplayUtil.setSize(this.dragImg, 200, 200);
        this.dragImg.x = e.stageX - this.dragImg.width / 2;
        this.dragImg.y = e.stageY - this.dragImg.height / 2;
    };
    Scene.prototype.onAreaMove = function (e) {
        this.dragImg.x = e.stageX - this.dragImg.width / 2;
        this.dragImg.y = e.stageY - this.dragImg.height / 2;
    };
    Scene.prototype.onAreaUp = function (e) {
        this.m_area.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onAreaMove, this);
        this.m_area.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onAreaUp, this);
        DisplayUtil.remove(this.dragImg);
        this.dragImg = null;
        var evt = new egret.Event("DRAG");
        evt.data = { point: new egret.Point(e.stageX, e.stageY), index: this.curDownIdx };
        this.dispatchEvent(evt);
    };
    Scene.prototype.onLeft = function () {
        this.m_speedX = 5;
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    Scene.prototype.onRight = function () {
        this.m_speedX = -5;
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    Scene.prototype.touchEnd = function () {
        this.m_speedX = 0;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    Scene.prototype.onEnterFrame = function (e) {
        if (this.m_bg.x + this.m_speedX >= 0) {
            this.m_bg.x = 0;
        }
        else if (this.m_bg.x + this.m_speedX <= Game.instance.stageW - this.m_bg.width) {
            this.m_bg.x = Game.instance.stageW - this.m_bg.width;
        }
        else {
            this.m_bg.x += this.m_speedX;
            this.m_area.x += this.m_speedX;
        }
    };
    return Scene;
}(egret.Sprite));
__reflect(Scene.prototype, "Scene");
//# sourceMappingURL=Scene.js.map