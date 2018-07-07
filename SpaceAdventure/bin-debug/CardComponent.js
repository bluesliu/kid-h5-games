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
    function CardComponent(id) {
        var _this = _super.call(this) || this;
        //this.qID=qID;
        //this.initContent(id,bitmap);
        //this.once(egret.Event.REMOVED_FROM_STAGE,this.onREMOVED_FROM_STAGE,this);
        _this._bg = PublicTool.createBitmapByName("spaceadventure_" + id + "_png");
        _this.addChild(_this._bg);
        _this._bg.anchorOffsetX = 120;
        _this._bg.anchorOffsetY = _this._bg.height * 0.5;
        return _this;
        //this._qwd.x=3+this._qwd.width*0.5;
        //this._qwd.y=399+this._qwd.height*0.5;
    }
    CardComponent.prototype.addImg = function (img) {
        while (this.numChildren > 1) {
            this.removeChildAt(1);
        }
        this.addChild(img);
        img.x = 30 - 120;
        img.y = 50 - this._bg.height * 0.5;
    };
    CardComponent.prototype.initContent = function (id, bitmap) {
        // this._bg=PublicTool.createBitmapByName("card"+id+"_png");
        // this.addChild(this._bg);
        // this._img=bitmap;
        // this._img.x=(this._bg.width-this._img.width)*0.5;
        // this._img.y=(this._bg.height-this._img.height)*0.5;
        // this.addChild(this._img);
        // var rt:egret.RenderTexture = new egret.RenderTexture;
        // let rectClip:egret.Rectangle=new egret.Rectangle(0,0,this._bg.width,this._bg.height);
        // rt.drawToTexture( this,rectClip );
        // this._conSP=new egret.Bitmap();
        // this._conSP.texture = rt;
        // this.removeChild(this._bg);
        // this.removeChild(this._img);
        // this.addChild(this._conSP);
        // this.hitObj=new egret.Sprite;
        // this.hitObj.graphics.beginFill(0,0);
        // this.hitObj.graphics.drawRect(0,0,this._bg.width*0.5,this._bg.height*0.5);
        // this.hitObj.graphics.endFill();		
        // this.hitObj.x=this._bg.width*0.25;
        // this.hitObj.y=this._bg.height*0.25;
        // this.hitObj.cacheAsBitmap=true;
        // this.addChild(this.hitObj);
    };
    return CardComponent;
}(egret.Sprite));
__reflect(CardComponent.prototype, "CardComponent");
//# sourceMappingURL=CardComponent.js.map