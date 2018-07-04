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
var MouseView = (function (_super) {
    __extends(MouseView, _super);
    function MouseView() {
        var _this = _super.call(this) || this;
        _this.chushi();
        return _this;
    }
    MouseView.prototype.chushi = function () {
        // this.touchEnabled=true;
        // this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onmove,this);
    };
    MouseView.prototype.onmove = function (e) {
        console.log(e.stageX);
        var bichu = new BiChuView();
        this.addChild(bichu);
        bichu.x = e.stageX;
        bichu.y = e.stageY;
    };
    return MouseView;
}(egret.Sprite));
__reflect(MouseView.prototype, "MouseView");
//# sourceMappingURL=MouseView.js.map