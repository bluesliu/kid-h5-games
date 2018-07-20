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
var Qieadi = (function (_super) {
    __extends(Qieadi, _super);
    function Qieadi() {
        var _this = _super.call(this) || this;
        _this.initContent();
        return _this;
    }
    Qieadi.prototype.initContent = function () {
        var qwd1 = Source.createBitmapByName("qwd1_png");
        var qwd2 = Source.createBitmapByName("qwd2_png");
        var qwd3 = Source.createBitmapByName("qwd3_png");
        this.addChild(qwd1);
        this.addChild(qwd2);
        qwd2.visible = false;
        this.addChild(qwd3);
        qwd3.visible = false;
        //  this.addChild(qwd4);
        //   qwd4.visible=false;
        // qwd4.x=-19;
        // qwd4.y=8;
    };
    Qieadi.prototype.gotoAndStop = function (id) {
        for (var i = 0; i < this.numChildren; i++) {
            this.getChildAt(i).visible = false;
        }
        this.getChildAt(id - 1).visible = true;
    };
    return Qieadi;
}(egret.Sprite));
__reflect(Qieadi.prototype, "Qieadi");
//# sourceMappingURL=Qieadi.js.map