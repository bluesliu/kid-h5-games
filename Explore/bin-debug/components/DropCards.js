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
var DropCards = (function (_super) {
    __extends(DropCards, _super);
    function DropCards() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    DropCards.prototype.createView = function () {
        for (var i = 0; i < DropCards.NUM; i++) {
            var card = new DropCard();
            this.addChild(card);
            card.name = "card_" + i;
            card.setType(i);
            card.x = 200 + 308 * i;
            card.y = -150;
        }
    };
    DropCards.prototype.setType = function (id) {
        if (id === void 0) { id = 0; }
        for (var i = 0; i < this.numChildren; i++) {
            this.getChildAt(i).visible = false;
        }
        this.getChildAt(id).visible = false;
    };
    DropCards.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    DropCards.prototype.getChildren = function (id) {
        return this.getChildAt(id);
    };
    DropCards.prototype.init = function (bmpArr) {
        var _this = this;
        var count = 0;
        for (var i = 0; i < bmpArr.length; i++) {
            var card = this.getChildAt(i);
            card.add(bmpArr[i]);
            card.name = bmpArr[i].name;
            card.x = 200 + 308 * i;
            card.y = -150;
            card.visible = true;
            egret.Tween.get(card).wait(100 * i).to({ y: 250 + Math.random() * 150 }, 500, egret.Ease.cubicIn).call(function () {
                count++;
                if (count >= _this.numChildren) {
                    _this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                }
            });
        }
    };
    DropCards.prototype.next = function (bmpArr, id, waitTime) {
        var _this = this;
        var count = 0;
        var _loop_1 = function (i) {
            var card = this_1.getChildAt(i);
            if (i == id) {
                card.visible = true;
                egret.Tween.get(card).wait(100 * i).to({}, 500, egret.Ease.backOut)
                    .wait(waitTime)
                    .to({ y: -300 }, 0)
                    .call(function () { card.visible = true; card.add(bmpArr[i]); card.name = bmpArr[i].name; })
                    .wait(100 * i).to({ y: 250 + Math.random() * 150 }, 500, egret.Ease.cubicIn).call(function () {
                    count++;
                    if (count >= _this.numChildren) {
                        _this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                    }
                });
            }
            else {
                egret.Tween.get(card).wait(100 * i).to({ y: 1200 }, 500, egret.Ease.backOut)
                    .wait(waitTime)
                    .to({ y: -300 }, 0)
                    .call(function () { card.visible = true; card.add(bmpArr[i]); card.name = bmpArr[i].name; })
                    .wait(100 * i).to({ y: 250 + Math.random() * 150 }, 500, egret.Ease.cubicIn).call(function () {
                    count++;
                    if (count >= _this.numChildren) {
                        _this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                    }
                });
            }
        };
        var this_1 = this;
        for (var i = 0; i < bmpArr.length; i++) {
            _loop_1(i);
        }
    };
    DropCards.NUM = 3;
    return DropCards;
}(egret.Sprite));
__reflect(DropCards.prototype, "DropCards");
//# sourceMappingURL=DropCards.js.map