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
var StoneManager = (function () {
    function StoneManager() {
        this.m_timestamp = 0;
        this.m_stoneArr = Array();
    }
    StoneManager.prototype.onRender = function () {
        if (!this.canMove) {
            return;
        }
        if (egret.getTimer() - this.m_timestamp > 3000) {
            this.addStone();
            this.m_timestamp = egret.getTimer();
        }
        this.moveCard();
    };
    StoneManager.prototype.addStone = function () {
        var type = Math.random() > 0.5 ? "left" : "right";
        var stone = new StoneView(type);
        stone.speed = 4;
        if (type == "left") {
            stone.angle = 116;
            stone.x = MathUtil.random(100, 490);
        }
        else {
            stone.angle = 64;
            stone.x = MathUtil.random(871, 1266);
        }
        this.m_stoneArr.push(stone);
        Game.instance.scene.stoneLayer.addChild(stone);
    };
    StoneManager.prototype.moveCard = function () {
        for (var i = this.m_stoneArr.length - 1; i >= 0; i--) {
            var stone = this.m_stoneArr[i];
            var p = MathUtil.circle(stone.x, stone.y, stone.speed, MathUtil.D2R(stone.angle));
            stone.setPosition(p);
            if (stone.y >= 1580) {
                DisplayUtil.remove(stone);
                this.m_stoneArr.splice(i, 1);
                stone.dispose();
            }
        }
    };
    StoneManager.prototype.reset = function () {
        //移除全部
        for (var i = this.m_stoneArr.length - 1; i >= 0; i--) {
            var stone = this.m_stoneArr[i];
            DisplayUtil.remove(stone);
            stone.dispose();
        }
        this.m_stoneArr.length = 0;
    };
    return StoneManager;
}());
__reflect(StoneManager.prototype, "StoneManager");
var StoneView = (function (_super) {
    __extends(StoneView, _super);
    function StoneView(type) {
        var _this = _super.call(this) || this;
        _this.speed = 0;
        _this.angle = 0;
        var bg = DisplayUtil.createBitmapByName("stone" + MathUtil.random(1, 2, 1) + "_png");
        _this.addChild(bg);
        //let scale = MathUtil.random(0.1, 0.3, 0.05);
        if (type == "left") {
            // DisplayUtil.setScale(bg, scale);
            bg.x = -bg.width;
        }
        else {
            // DisplayUtil.setScale(bg, -scale);
            bg.x = bg.width;
        }
        bg.y = -bg.height;
        return _this;
    }
    StoneView.prototype.setPosition = function (p) {
        this.x = p.x;
        this.y = p.y;
        this.scaleX = this.scaleY = 0.2 + this.y / 800;
    };
    StoneView.prototype.dispose = function () {
    };
    return StoneView;
}(egret.Sprite));
__reflect(StoneView.prototype, "StoneView");
//# sourceMappingURL=StoneManager.js.map