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
var Archery = (function (_super) {
    __extends(Archery, _super);
    function Archery() {
        var _this = _super.call(this) || this;
        _this._questionIndex = 0;
        if (_this.stage) {
            _this.createView();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    Archery.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.createView();
    };
    Archery.prototype.createView = function () {
        this._bg = new Bg();
        this.addChild(this._bg);
        this._queation = new QuestionCompoment();
        this.addChild(this._queation);
        var flower = Source.createBitmapByName("archery_2_png");
        this.addChild(flower);
        flower.y = 787.7;
        this._qwd = new Qieadi();
        this.addChild(this._qwd);
        this._qwd.x = 1014;
        this._qwd.y = 637;
        this._arrow = new Arrow();
        this.addChild(this._arrow);
        this._arrow.x = 1018;
        this._arrow.y = 809;
        this._arrow.rotation = -72.5;
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
    Archery.prototype.initListener = function () {
        this._overPage.addEventListener(egret.Event.COMPLETE, this.again, this);
        this._overPage.addEventListener(egret.Event.CHANGE, this.start, this);
    };
    Archery.prototype.again = function (e) {
        this._questionIndex = 0;
        this._arrow.visible = true;
        this._qwd.visible = true;
        this._loves.reset();
        this._stars.reset();
        this._overPage.visible = false;
        Source.reArrange();
        this._queation.reset();
        this._queation.startQuestion(Source.questionList[this._questionIndex]);
        this._queation.once(egret.TouchEvent.TOUCH_TAP, this.onStageTouchBegin, this);
        this._queation.move();
        this.arrowReset();
    };
    Archery.prototype.onStageTouchBegin = function (e) {
        var _this = this;
        if (e.target.name.split("_")[0] == "card") {
            var card_1 = e.target;
            this._queation.stop();
            var rotate = -Math.atan2((this._arrow.y + 10 - e.stageY), (e.stageX - (this._arrow.x + 65))) * 180 / Math.PI;
            this._arrow.rotation = 90 + rotate;
            egret.Tween.get(this._arrow).to({ x: e.stageX, y: e.stageY }, 300, egret.Ease.sineIn);
            setTimeout(function () {
                egret.log(_this._queation.answer, card_1.tag);
                if (_this._queation.answer == card_1.tag) {
                    _this.arrowReset();
                    card_1.hide();
                    _this._rightSound.clear();
                    _this._rightSound.playRes("dingdong_mp3").exec(function () {
                        _this._stars.add();
                        if (_this._stars.count >= Archery.WINNUM) {
                            _this._arrow.visible = false;
                            _this._qwd.visible = false;
                            _this.addChild(_this._loves);
                            _this.addChild(_this._stars);
                            _this._overPage.visible = true;
                            _this._overPage.showWin(true);
                            return;
                        }
                        _this._questionIndex++;
                        _this._queation.once(egret.TouchEvent.TOUCH_TAP, _this.onStageTouchBegin, _this);
                        _this._queation.startQuestion(Source.questionList[_this._questionIndex]);
                        _this._queation.move();
                        _this.arrowReset();
                    }, _this);
                }
                else {
                    _this.arrowDrop();
                    _this._wrongSound.clear();
                    EffectUtils.shakeObj(card_1);
                    _this._wrongSound.playRes("chacha_mp3").exec(function () {
                        _this._loves.cut();
                        if (_this._loves.count <= 0) {
                            _this._arrow.visible = false;
                            _this._qwd.visible = false;
                            _this.addChild(_this._loves);
                            _this.addChild(_this._stars);
                            _this._overPage.visible = true;
                            _this._overPage.showWin(false);
                            return;
                        }
                        _this._questionIndex++;
                        _this._queation.once(egret.TouchEvent.TOUCH_TAP, _this.onStageTouchBegin, _this);
                        _this._queation.startQuestion(Source.questionList[_this._questionIndex]);
                        _this._queation.move();
                        _this.arrowReset();
                    }, _this);
                }
            }, 1000, this);
        }
    };
    Archery.prototype.start = function (e) {
        this._queation.startQuestion(Source.questionList[this._questionIndex]);
        this._overPage.visible = false;
        this._queation.move();
        this._queation.once(egret.TouchEvent.TOUCH_TAP, this.onStageTouchBegin, this);
    };
    Archery.prototype.arrowReset = function () {
        this._arrow.x = 1018;
        this._arrow.y = 809;
        this._arrow.rotation = -72.5;
    };
    Archery.prototype.arrowDrop = function () {
        egret.Tween.get(this._arrow).to({ rotation: 120, y: 900 }, 300, egret.Ease.sineIn);
    };
    Archery.WINNUM = 10;
    Archery.FAILNUM = 3;
    return Archery;
}(egret.Sprite));
__reflect(Archery.prototype, "Archery");
//# sourceMappingURL=Archery.js.map