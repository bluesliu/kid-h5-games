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
var TrainView = (function (_super) {
    __extends(TrainView, _super);
    function TrainView() {
        var _this = _super.call(this) || this;
        _this.curFrame = 0;
        _this.bodys = new Array();
        _this.m_rightCount = 0;
        TrainView.json = RES.getRes("trainMoveData_json");
        TrainView.json2 = RES.getRes("trainMoveData2_json");
        for (var i = 0; i < 10; i++) {
            var car = new Car(9 - i);
            car.beginFrame = i * 28;
            _this.bodys.push(car);
            _this.addChild(car);
        }
        _this.head = new CarHead();
        _this.addChild(_this.head);
        _this.onRender();
        return _this;
    }
    TrainView.prototype.stop = function () {
        this.head.mc.stop();
        for (var i = 0; i < 10; i++) {
            this.bodys[i].mc.stop();
        }
    };
    TrainView.prototype.play = function () {
        this.head.mc.play(-1);
        for (var i = 0; i < 10; i++) {
            this.bodys[i].mc.play(-1);
        }
    };
    TrainView.prototype.onRender = function () {
        for (var i = 0; i < this.bodys.length; i++) {
            var car = this.bodys[i];
            car.render(this.curFrame);
            this.head.render(this.curFrame);
        }
        this.curFrame += 1;
    };
    Object.defineProperty(TrainView.prototype, "rightCount", {
        get: function () { return this.m_rightCount; },
        set: function (value) {
            this.m_rightCount = value;
            for (var i = 0; i < this.bodys.length; i++) {
                if (this.bodys[i].index < value) {
                    this.bodys[i].box.visible = true;
                }
                else {
                    this.bodys[i].box.visible = false;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return TrainView;
}(egret.Sprite));
__reflect(TrainView.prototype, "TrainView");
var CarHead = (function (_super) {
    __extends(CarHead, _super);
    function CarHead() {
        var _this = _super.call(this) || this;
        _this.mc = DisplayUtil.createMovieClipByName("carHead");
        _this.mc.y = 150;
        _this.mc.x = -30;
        _this.addChild(_this.mc);
        _this.mc.play(-1);
        return _this;
    }
    CarHead.prototype.render = function (frame) {
        frame = (257 + frame) % TrainView.json2.list.length;
        var obj = TrainView.json2.list[frame];
        this.x = obj.x;
        this.y = obj.y;
        this.rotation = obj.rotation;
    };
    return CarHead;
}(egret.Sprite));
__reflect(CarHead.prototype, "CarHead");
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(index) {
        var _this = _super.call(this) || this;
        _this.beginFrame = 0;
        _this.index = 0;
        _this.mc = DisplayUtil.createMovieClipByName("carBody");
        _this.addChild(_this.mc);
        _this.mc.play(-1);
        _this.index = index;
        _this.tf = new egret.TextField();
        _this.tf.textColor = 0xF79BB3;
        _this.tf.width = 66.5;
        _this.tf.height = 31;
        _this.tf.x = 10;
        _this.tf.y = -101;
        _this.tf.size = 40;
        _this.tf.textAlign = egret.HorizontalAlign.CENTER;
        _this.tf.text = String(index + 1);
        _this.addChild(_this.tf);
        _this.box = DisplayUtil.createBitmapByName("boxClose_png");
        DisplayUtil.setSize(_this.box, 136, 129);
        _this.addChildAt(_this.box, 0);
        _this.box.x = -26;
        _this.box.y = -193;
        _this.box.visible = false;
        return _this;
    }
    Car.prototype.render = function (frame) {
        frame = (this.beginFrame + frame) % TrainView.json.list.length;
        var obj = TrainView.json.list[frame];
        this.x = obj.x;
        this.y = obj.y;
        this.rotation = obj.rotation;
    };
    return Car;
}(egret.Sprite));
__reflect(Car.prototype, "Car");
//# sourceMappingURL=TrainView.js.map