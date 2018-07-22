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
//Yes No
//events: DRAG_END
var DragItem = (function (_super) {
    __extends(DragItem, _super);
    function DragItem(type) {
        var _this = _super.call(this) || this;
        _this.m_type = type;
        _this.m_bg = DisplayUtil.createBitmapByName("item_png");
        _this.addChild(_this.m_bg);
        var content = DisplayUtil.createBitmapByName(type);
        _this.addChild(content);
        DisplayUtil.setSize(content, 437, 150);
        content.x = 23;
        content.y = 5;
        //可拖拽
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
        return _this;
    }
    DragItem.prototype.setPosition = function (x, y) {
        this.m_pos = new egret.Point(x, y);
        this.x = x;
        this.y = y;
    };
    DragItem.prototype.onTouchBegin = function (e) {
        if (Game.instance.checking) {
            return;
        }
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        DisplayUtil.bringFront(e.currentTarget);
    };
    DragItem.prototype.onTouchMove = function (e) {
        var point = this.parent.globalToLocal(e.stageX, e.stageY);
        this.x = point.x - this.width / 2;
        this.y = point.y - this.height / 2;
    };
    DragItem.prototype.onTouchEnd = function (e) {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        var evt = new egret.Event("DRAG_END");
        evt.data = new egret.Point(e.stageX, e.stageY);
        this.dispatchEvent(evt);
    };
    DragItem.prototype.dispose = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.m_bg = null;
        this.m_pos = null;
    };
    Object.defineProperty(DragItem.prototype, "position", {
        get: function () {
            return this.m_pos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragItem.prototype, "type", {
        get: function () { return this.m_type; },
        enumerable: true,
        configurable: true
    });
    return DragItem;
}(egret.Sprite));
__reflect(DragItem.prototype, "DragItem");
//# sourceMappingURL=DragItem.js.map