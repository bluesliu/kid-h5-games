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
var BasketBall = (function (_super) {
    __extends(BasketBall, _super);
    function BasketBall() {
        var _this = _super.call(this) || this;
        _this._questionIndex = 0;
        _this._positionArr = [new egret.Point(244, 236), new egret.Point(640, 236), new egret.Point(1038, 236)];
        if (_this.stage) {
            _this.createView();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    BasketBall.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.createView();
    };
    BasketBall.prototype.createView = function () {
        this._bg = new Bg();
        this.addChild(this._bg);
        this._queation = new QuestionCompoment();
        this.addChild(this._queation);
        this._qwd = new Qieadi();
        this.addChild(this._qwd);
        this._qwd.x = 1006;
        this._qwd.y = 525;
        this._ball = new Ball();
        this.addChild(this._ball);
        this._ball.x = 1030;
        this._ball.y = 820;
        this._net = Source.createBitmapByName("basketballStands1_png");
        this.addChild(this._net);
        this._net.x = 220 - 1;
        this._net.y = 438 - 2;
        this._net.visible = false;
        this._loves = new CountLoves();
        this.addChild(this._loves);
        this._loves.x = 182.5;
        this._loves.y = 11.5;
        this._stars = new CountStars();
        this.addChild(this._stars);
        this._stars.x = 749;
        this._stars.y = 22.5;
        this._overPage = new OverPage();
        this.addChild(this._overPage);
        this._rightSound = new SoundPlayer();
        this._wrongSound = new SoundPlayer();
        this.initListener();
    };
    BasketBall.prototype.initListener = function () {
        this._overPage.addEventListener(egret.Event.COMPLETE, this.again, this);
        this._overPage.addEventListener(egret.Event.CHANGE, this.start, this);
    };
    BasketBall.prototype.again = function (e) {
        this._questionIndex = 0;
        this._ball.visible = true;
        this._ball.x = 1030;
        this._ball.y = 820;
        this._ball.play();
        this._qwd.visible = true;
        this._qwd.gotoAndStop(1);
        this._loves.reset();
        this._stars.reset();
        this._overPage.visible = false;
        Source.reArrange();
        //  this._queation.reset();
        this._queation.startQuestion(this._questionIndex);
        this._queation.once(egret.TouchEvent.TOUCH_TAP, this.onStageTouchBegin, this);
        //    this._queation.move();
    };
    BasketBall.prototype.onStageTouchBegin = function (e) {
        var _this = this;
        if (e.target.name.split("_")[0] == "card") {
            var card_1 = e.target;
            var id = e.target.name.split("_")[1];
            this._net.visible = false;
            this._ball.stop();
            egret.Tween.get(this._ball).to({ x: this._positionArr[id].x, y: this._positionArr[id].y }, 1500).call(function () { _this._net.visible = true; })
                .to({ x: this._positionArr[id].x, y: 750 }, 800).call(function () {
                _this._ball.play();
                _this._net.visible = false;
                if (_this._queation.answer == card_1.tag) {
                    _this._qwd.gotoAndStop(2);
                    _this._rightSound.clear();
                    _this._rightSound.playRes("dingdong_mp3").exec(function () {
                        _this._queation.hide();
                        _this._stars.add();
                        if (_this._stars.count >= BasketBall.WINNUM) {
                            _this._ball.visible = false;
                            _this._ball.stop();
                            _this._qwd.visible = false;
                            _this.addChild(_this._loves);
                            _this.addChild(_this._stars);
                            _this._overPage.visible = true;
                            _this._overPage.showWin(true);
                            return;
                        }
                        setTimeout(function () {
                            _this._ball.x = 1030;
                            _this._ball.y = 820;
                            _this._ball.play();
                            _this._questionIndex++;
                            _this._qwd.gotoAndStop(1);
                            _this._queation.once(egret.TouchEvent.TOUCH_TAP, _this.onStageTouchBegin, _this);
                            _this._queation.startQuestion(_this._questionIndex);
                        }, 1000);
                    }, _this);
                }
                else {
                    _this._wrongSound.clear();
                    EffectUtils.shakeObj(card_1);
                    _this._qwd.gotoAndStop(3);
                    _this._wrongSound.playRes("chacha_mp3").exec(function () {
                        _this._queation.hide();
                        _this._ball.play();
                        _this._loves.cut();
                        if (_this._loves.count <= 0) {
                            _this._ball.visible = false;
                            _this._ball.stop();
                            _this._qwd.visible = false;
                            _this.addChild(_this._loves);
                            _this.addChild(_this._stars);
                            _this._overPage.visible = true;
                            _this._overPage.showWin(false);
                            return;
                        }
                        setTimeout(function () {
                            _this._ball.x = 1030;
                            _this._ball.y = 820;
                            _this._ball.play();
                            _this._questionIndex++;
                            _this._qwd.gotoAndStop(1);
                            _this._queation.once(egret.TouchEvent.TOUCH_TAP, _this.onStageTouchBegin, _this);
                            _this._queation.startQuestion(_this._questionIndex);
                        }, 1000);
                    }, _this);
                }
            });
        }
    };
    BasketBall.prototype.next = function () {
        this._ball.x = 1030;
        this._ball.y = 820;
        this._ball.play();
        this._questionIndex++;
        this._qwd.gotoAndStop(1);
        this._queation.once(egret.TouchEvent.TOUCH_TAP, this.onStageTouchBegin, this);
        this._queation.startQuestion(this._questionIndex);
    };
    BasketBall.prototype.start = function (e) {
        this._ball.play();
        this._queation.startQuestion(this._questionIndex);
        this._overPage.visible = false;
        // this._queation.move();
        this._queation.once(egret.TouchEvent.TOUCH_TAP, this.onStageTouchBegin, this);
    };
    BasketBall.WINNUM = 10;
    BasketBall.FAILNUM = 3;
    return BasketBall;
}(egret.Sprite));
__reflect(BasketBall.prototype, "BasketBall");
//# sourceMappingURL=BasketBall.js.map