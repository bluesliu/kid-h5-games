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
// 答题区域
// events: CHECK
var WordArea = (function (_super) {
    __extends(WordArea, _super);
    function WordArea() {
        var _this = _super.call(this) || this;
        _this.m_items = [];
        _this.m_dragItems = [];
        _this.m_area1 = new egret.Sprite();
        _this.m_area1.graphics.beginFill(0xff0000, Game.isDebug ? 0.5 : 0);
        _this.m_area1.graphics.drawRect(0, 0, 1248, 126);
        _this.m_area1.graphics.endFill();
        _this.addChild(_this.m_area1);
        _this.m_area2 = new egret.Sprite();
        _this.m_area2.graphics.beginFill(0xff0000, Game.isDebug ? 0.5 : 0);
        _this.m_area2.graphics.drawRect(0, 0, 1248, 126);
        _this.m_area2.graphics.endFill();
        _this.m_area2.y = 150;
        _this.addChild(_this.m_area2);
        //将检查的结果派发
        _this.m_checkBtn = new EButton(_this, "checkBtn_png", null, function () {
            var evt = new egret.Event("CHECK");
            evt.data = _this.check();
            _this.dispatchEvent(evt);
            _this.m_checkBtn.visible = false;
        });
        _this.addChild(_this.m_checkBtn);
        _this.m_checkBtn.visible = false;
        _this.m_checkBtn.x = 516;
        _this.m_checkBtn.y = 324;
        return _this;
    }
    WordArea.prototype.setQuestion = function (q) {
        this.reset();
        this.m_question = q;
        var words = q.name.split(" ");
        var wordsCopy = words.concat();
        ArrayUtil.randomSort(words);
        //防止顺序不变
        while (ArrayUtil.equal(words, wordsCopy)) {
            ArrayUtil.randomSort(words);
        }
        var nextX = 85;
        for (var i = 0; i < words.length; i++) {
            var item = new WordItem(words[i]);
            item.setPosition(this.m_area1.x + nextX, (this.m_area1.height - item.height) / 2);
            this.addChild(item);
            this.m_items.push(item);
            nextX = item.x + item.width + 10;
            item.addEventListener("DRAG_END", this.onDragEnd, this);
        }
    };
    WordArea.prototype.onDragEnd = function (e) {
        var item = e.target;
        var point = e.data;
        if (this.m_area2.hitTestPoint(point.x, point.y)) {
            //拖拽到区域
            var endY = this.m_area2.y + (this.m_area2.height - item.height) / 2;
            var endX = 85;
            //避免重复添加
            var idx2 = this.m_dragItems.indexOf(item);
            if (idx2 == -1) {
                var lastItem = this.m_dragItems[this.m_dragItems.length - 1];
                if (lastItem) {
                    endX = lastItem.x + lastItem.width + 10;
                }
                this.m_dragItems.push(item);
            }
            else {
                var lastItem2 = this.m_dragItems[idx2 - 1];
                if (lastItem2) {
                    endX = lastItem2.x + lastItem2.width + 10;
                }
            }
            item.x = endX;
            item.y = endY;
        }
        else {
            //回到原来的位置
            item.x = item.position.x;
            item.y = item.position.y;
            var idx = this.m_dragItems.indexOf(item);
            if (idx != -1) {
                this.m_dragItems.splice(idx, 1);
            }
            //重新排列
            var nextX = 85;
            for (var i = 0; i < this.m_dragItems.length; i++) {
                var item_1 = this.m_dragItems[i];
                item_1.x = nextX;
                this.addChild(item_1);
                nextX = item_1.x + item_1.width + 10;
            }
        }
        this.m_checkBtn.visible = this.m_dragItems.length == this.m_items.length;
    };
    WordArea.prototype.check = function () {
        var words = this.m_question.name.split(" ");
        for (var i = 0; i < words.length; i++) {
            if (i >= this.m_dragItems.length) {
                return false;
            }
            if (this.m_dragItems[i].text != words[i]) {
                return false;
            }
        }
        return true;
    };
    WordArea.prototype.reset = function () {
        for (var i = 0; i < this.m_items.length; i++) {
            this.m_items[i].dispose();
            DisplayUtil.remove(this.m_items[i]);
        }
        this.m_items.length = 0;
        this.m_dragItems.length = 0;
        this.m_checkBtn.visible = false;
    };
    WordArea.prototype.resetQuestion = function () {
        for (var i = 0; i < this.m_items.length; i++) {
            this.m_items[i].x = this.m_items[i].position.x;
            this.m_items[i].y = this.m_items[i].position.y;
        }
        this.m_dragItems.length = 0;
    };
    return WordArea;
}(egret.Sprite));
__reflect(WordArea.prototype, "WordArea");
//单词项
//events: DRAG_END
var WordItem = (function (_super) {
    __extends(WordItem, _super);
    function WordItem(text) {
        var _this = _super.call(this) || this;
        _this.m_text = text;
        _this.m_bg = DisplayUtil.createBitmapByName("wordBG_png");
        _this.addChild(_this.m_bg);
        _this.m_tf = new egret.TextField();
        _this.m_tf.textColor = 0xffffff;
        _this.m_tf.bold = true;
        _this.m_tf.text = text;
        _this.m_tf.size = 46;
        if (Game.isDebug) {
            _this.m_tf.border = true;
        }
        _this.addChild(_this.m_tf);
        //修正背景宽度
        _this.m_bg.width = Math.max(101, _this.m_tf.width + 40);
        _this.m_tf.y = (_this.m_bg.height - _this.m_tf.height) / 2;
        _this.m_tf.x = (_this.m_bg.width - _this.m_tf.width) / 2;
        //可拖拽
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
        return _this;
    }
    WordItem.prototype.setPosition = function (x, y) {
        this.m_pos = new egret.Point(x, y);
        this.x = x;
        this.y = y;
    };
    WordItem.prototype.onTouchBegin = function (e) {
        if (Game.instance.checking) {
            return;
        }
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        DisplayUtil.bringFront(e.currentTarget);
    };
    WordItem.prototype.onTouchMove = function (e) {
        var point = this.parent.globalToLocal(e.stageX, e.stageY);
        this.x = point.x - this.width / 2;
        this.y = point.y - this.height / 2;
    };
    WordItem.prototype.onTouchEnd = function (e) {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        var evt = new egret.Event("DRAG_END");
        evt.data = new egret.Point(e.stageX, e.stageY);
        this.dispatchEvent(evt);
    };
    WordItem.prototype.dispose = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.m_bg = null;
        this.m_pos = null;
        this.m_tf = null;
    };
    Object.defineProperty(WordItem.prototype, "position", {
        get: function () {
            return this.m_pos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WordItem.prototype, "text", {
        get: function () { return this.m_text; },
        enumerable: true,
        configurable: true
    });
    return WordItem;
}(egret.Sprite));
__reflect(WordItem.prototype, "WordItem");
//# sourceMappingURL=WordArea.js.map