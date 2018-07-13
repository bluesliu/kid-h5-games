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
var UserShengMin = (function (_super) {
    __extends(UserShengMin, _super);
    function UserShengMin() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    UserShengMin.prototype.init = function () {
        var bg = new egret.Bitmap();
        var bmp = RES.getRes("hongXin_png");
        bg.texture = bmp;
        this.sp = new egret.Sprite();
        this.addChild(this.sp);
        this.sp.addChild(bg);
        this.sp.height = 20;
        console.log(this.sp.height);
        // this.sp_mask=new egret.Sprite();
        // this.sp_mask.graphics.beginFill(0xfff000,1);
        // this.sp_mask.graphics.drawRect(0,0,this.sp.width,200);
        // this.sp_mask.graphics.endFill();
        // this.addChild(this.sp_mask);
        // this.sp.mask=this.sp_mask;
        // this.addEventListener(egret.Event.ENTER_FRAME,this.onEnter,this);
    };
    UserShengMin.prototype.onEnter = function (e) {
        this.sp_mask.scaleX = this.sp_mask.scaleX - 0.01;
        console.log(this.sp_mask.width, this.sp_mask.scaleX);
        this.sp.height = 20;
        // this.sp.mask=this.sp_mask;
        if (this.sp_mask.scaleX < 0.01) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnter, this);
        }
    };
    return UserShengMin;
}(egret.Sprite));
__reflect(UserShengMin.prototype, "UserShengMin");
//# sourceMappingURL=UserShengMin.js.map