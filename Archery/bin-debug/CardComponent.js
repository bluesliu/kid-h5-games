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
var CardComponent = (function (_super) {
    __extends(CardComponent, _super);
    function CardComponent() {
        var _this = _super.call(this) || this;
        _this.initContent();
        return _this;
    }
    CardComponent.prototype.initContent = function () {
        this._bg = PublicTool.createBitmapByName("archery_8_png");
        this.addChild(this._bg);
        this._shadow = PublicTool.createBitmapByName("archery_9_png");
        this.addChild(this._shadow);
        this._shadow.x = 42;
        this._shadow.y = 444;
        this._imgSp = new egret.Sprite();
        this.addChild(this._imgSp);
    };
    CardComponent.prototype.addImg = function (img) {
        while (this._imgSp.numChildren > 0) {
            this._imgSp.removeChildAt(0);
        }
        this._imgSp.addChild(img);
        img.x = 33;
        img.y = 4;
    };
    CardComponent.prototype.hide = function () {
        this._bg.visible = false;
        this._imgSp.visible = false;
        this._shadow.visible = false;
    };
    CardComponent.prototype.show = function () {
        this._bg.visible = true;
        this._imgSp.visible = true;
        this._shadow.visible = true;
    };
    return CardComponent;
}(egret.Sprite));
__reflect(CardComponent.prototype, "CardComponent");
//# sourceMappingURL=CardComponent.js.map