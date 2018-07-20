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
var Blocks = (function (_super) {
    __extends(Blocks, _super);
    function Blocks() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    Blocks.prototype.createView = function () {
        this._bg = Source.createBitmapByName("jzgr_7_png");
        this.addChild(this._bg);
        var block1 = Source.createBitmapByName("jzgr_16_png");
        this.addChild(block1);
        block1.name = "block_1";
        block1.x = 2.5;
        block1.y = 234;
        // block1.anchorOffsetX=0;
        var block2 = Source.createBitmapByName("jzgr_17_png");
        this.addChild(block2);
        block2.name = "block_2";
        block2.x = 138.85;
        block2.y = 354;
        var block3 = Source.createBitmapByName("jzgr_14_png");
        this.addChild(block3);
        block3.name = "block_3";
        block3.x = 473;
        block3.y = 355;
        var block4 = Source.createBitmapByName("jzgr_10_png");
        block4.name = "block_4";
        block4.x = 633.5;
        block4.y = 247;
        var block5 = Source.createBitmapByName("jzgr_13_png");
        this.addChild(block5);
        block5.name = "block_5";
        block5.x = 137;
        block5.y = 287.5;
        var block6 = Source.createBitmapByName("jzgr_15_png");
        this.addChild(block6);
        block6.name = "block_6";
        block6.x = 2.5;
        block6.y = 198.5;
        var block7 = Source.createBitmapByName("jzgr_11_png");
        this.addChild(block7);
        block7.name = "block_7";
        block7.x = 137;
        block7.y = 192.35;
        var block8 = Source.createBitmapByName("jzgr_12_png");
        this.addChild(block8);
        block8.name = "block_8";
        block8.x = 473.5;
        block8.y = 193.5;
        var block9 = Source.createBitmapByName("jzgr_9_png");
        block9.name = "block_9";
        block9.x = 633.5;
        block9.y = 213;
        var block10 = Source.createBitmapByName("jzgr_8_png");
        this.addChild(block10);
        block10.name = "block_10";
        block10.x = 136;
        this.addChild(block4);
        this.addChild(block9);
        this.reset();
        //  this.showBlock(2);
    };
    Blocks.prototype.reset = function () {
        for (var i = 1; i < 11; i++) {
            this.getChildByName("block_" + i).visible = false;
        }
        this._bg.visible = true;
    };
    Blocks.prototype.showBlock = function (id) {
        this.getChildByName("block_" + id).visible = true;
    };
    Blocks.prototype.hideBg = function () {
        this._bg.visible = false;
    };
    return Blocks;
}(egret.Sprite));
__reflect(Blocks.prototype, "Blocks");
//# sourceMappingURL=Blocks.js.map