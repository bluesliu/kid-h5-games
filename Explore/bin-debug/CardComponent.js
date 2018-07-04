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
    /**
    *生成题目卡片，卡片背景有4种。
    * @param id		卡片背景索引，0--3；
    * @param bitmap	卡片题目的图片；
    * @param qID	本卡片在题目中的索引；用以判断答题是否正确；
    */
    function CardComponent(id, bitmap, qID) {
        var _this = _super.call(this) || this;
        _this.qID = qID;
        _this.initContent(id, bitmap);
        _this.once(egret.Event.REMOVED_FROM_STAGE, _this.onREMOVED_FROM_STAGE, _this);
        return _this;
    }
    CardComponent.prototype.initContent = function (id, bitmap) {
        this._bg = PublicTool.createBitmapByName("hudie" + id + "_png");
        this.addChild(this._bg);
        this._img = bitmap;
        switch (id) {
            case 1:
                {
                    this._img.x = 12;
                    this._img.y = 190;
                    break;
                }
            case 3:
                {
                    this._img.x = 61.5;
                    this._img.y = 140;
                    break;
                }
            case 2:
                {
                    this._img.x = 47;
                    this._img.y = 215;
                    break;
                }
            default:
                {
                    break;
                }
        }
        this.addChild(this._img);
        var rt = new egret.RenderTexture;
        var rectClip = new egret.Rectangle(0, 0, this._bg.width, this._bg.height);
        rt.drawToTexture(this, rectClip);
        this._conSP = new egret.Bitmap();
        this._conSP.texture = rt;
        this.removeChild(this._bg);
        this.removeChild(this._img);
        this.addChild(this._conSP);
        this.hitObj = new egret.Sprite;
        this.hitObj.graphics.beginFill(0, 0);
        this.hitObj.graphics.drawRect(0, 0, this._bg.width * 0.5, this._bg.height * 0.5);
        this.hitObj.graphics.endFill();
        this.hitObj.x = this._bg.width * 0.25;
        this.hitObj.y = this._bg.height * 0.25;
        this.hitObj.cacheAsBitmap = true;
        this.addChild(this.hitObj);
    };
    CardComponent.prototype.move = function () {
        var _this = this;
        var maxValue = Math.floor(Math.random() * 5 + 2);
        this.addEventListener(egret.Event.ENTER_FRAME, function () {
            _this.y += Math.sin(egret.getTimer() / 1000) / maxValue;
            //egret.log("move");
        }, this);
    };
    CardComponent.prototype.onREMOVED_FROM_STAGE = function (e) {
        //this=null;
        if (this._bg) {
            //this.removeChild(this._bg);
            //this._bg.texture.dispose();
        }
        if (this._img) {
            //this.removeChild(this._img);
            //this._img.texture.dispose();
        }
        this.removeChild(this.hitObj);
    };
    return CardComponent;
}(egret.Sprite));
__reflect(CardComponent.prototype, "CardComponent");
//# sourceMappingURL=CardComponent.js.map