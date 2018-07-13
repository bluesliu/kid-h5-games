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
var Car = (function (_super) {
    __extends(Car, _super);
    function Car() {
        var _this = _super.call(this) || this;
        _this.m_pos = [[121, 101], [246, 101], [183, 101],
            [91, 22], [208, 22], [149, 22], [267, 22],
            [91, -43], [254, -43], [171, -43]];
        _this.m_imgArr = new Array();
        _this.m_bg = DisplayUtil.createBitmapByName("car_png");
        _this.addChild(_this.m_bg);
        _this.m_container = new egret.Sprite();
        _this.addChildAt(_this.m_container, 0);
        return _this;
    }
    Car.prototype.reset = function () {
        for (var i = 0; i < this.m_imgArr.length; i++) {
            DisplayUtil.remove(this.m_imgArr[i]);
        }
        this.m_imgArr.length = 0;
    };
    Car.prototype.addItem = function (q) {
        var index = this.m_imgArr.length;
        if (index >= this.m_pos.length) {
            return;
        }
        var img = DisplayUtil.createBitmapByName(q.image);
        DisplayUtil.setSize(img, 100, 100);
        img.x = this.m_pos[index][0];
        img.y = this.m_pos[index][1];
        this.m_container.addChild(img);
        this.m_imgArr.push(img);
    };
    return Car;
}(egret.Sprite));
__reflect(Car.prototype, "Car");
//# sourceMappingURL=Car.js.map