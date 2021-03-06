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
var ConstructionWorker = (function (_super) {
    __extends(ConstructionWorker, _super);
    function ConstructionWorker() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this.createView();
        return _this;
    }
    ConstructionWorker.prototype.createView = function () {
        this._bg = new Bg();
        this.addChild(this._bg);
        this._qwd = Source.createBitmapByName("jzgr_18_png");
        this.addChild(this._qwd);
        this._qwd.x = 148.5;
        this._qwd.y = 307;
        this._loves = new CountLoves();
        this.addChild(this._loves);
        this._loves.x = 182.5;
        this._loves.y = 11.5;
        this._stars = new CountStars();
        this.addChild(this._stars);
        this._stars.x = 749;
        this._stars.y = 22.5;
        this._blocks = new Blocks();
        this.addChild(this._blocks);
        this._blocks.x = 523;
        this._blocks.y = 254.5;
        this._quit = Source.createBitmapByName("jzgr_0_png");
        // this.addChild(this._quit);
        this._quit.x = 20;
        this._quit.y = 12;
        this._quit.touchEnabled = true;
        this._optionSp = new egret.Sprite();
        this.addChild(this._optionSp);
        this._optionSp.x = 173;
        this._optionSp.y = 742;
        var bg = Source.createBitmapByName("jzgr_4_png");
        this._optionSp.addChild(bg);
        this._overPage = new OverPage();
        this.addChild(this._overPage);
        this._tipsSound = new SoundPlayer();
        for (var i = 0; i < Source.images.length; i++) {
            var box = Source.images[i];
            box.touchEnabled = true;
            box.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
        //  this.setQuestion(this._index);
        this._rightSound = new SoundPlayer();
        this._wrongSound = new SoundPlayer();
        this.initListener();
    };
    ConstructionWorker.prototype.initListener = function () {
        this._overPage.addEventListener(egret.Event.COMPLETE, this.again, this);
        this._overPage.addEventListener(egret.Event.CHANGE, this.start, this);
        this._quit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuit, this);
    };
    ConstructionWorker.prototype.start = function (e) {
        // this._bgSound.clear();
        // this._bgSound.playRes("bgmusic_mp3",10000,0.1);
        this.setQuestion(this._index);
        this._overPage.visible = false;
    };
    ConstructionWorker.prototype.onQuit = function (e) {
        this.dispatchEvent(new egret.Event(egret.Event.CLOSE));
    };
    ConstructionWorker.prototype.again = function (e) {
        this._index = 0;
        this._blocks.scaleX = this._blocks.scaleY = 1;
        this._blocks.x = 523;
        this._blocks.y = 254.5;
        this._qwd.visible = true;
        this._blocks.reset();
        this._loves.reset();
        this._stars.reset();
        this._overPage.visible = false;
        this._optionSp.visible = true;
        this.setQuestion(this._index);
    };
    ConstructionWorker.prototype.onClick = function (e) {
        var _this = this;
        //egret.log(e.target.name,this._index);
        if (e.target.name.split("_")[0] == "box") {
            var card = e.target;
            var id = e.target.name.split("_")[1];
            //  egret.log("this._index:",this._index,"id:",id);
            if (id == (this._index % Source.images.length)) {
                this._index++;
                this._rightSound.clear();
                this._rightSound.playRes("dingdong_mp3").exec(function () {
                    _this._blocks.showBlock(_this._index);
                    _this._stars.add();
                    if (_this._stars.count >= 10) {
                        _this._blocks.hideBg();
                        _this.addChild(_this._blocks);
                        _this._blocks.scaleX = _this._blocks.scaleY = 0.5;
                        _this._blocks.x = 523 + 410;
                        _this._blocks.y = 254.5 + 484;
                        _this._qwd.visible = false;
                        //this.addChild(this._quit);
                        _this.addChild(_this._loves);
                        _this.addChild(_this._stars);
                        _this._optionSp.visible = false;
                        _this._overPage.visible = true;
                        _this._overPage.showWin(true);
                        return;
                    }
                    //this.next(this._index);  
                    setTimeout(function () {
                        var count = 0;
                        for (var i = 1; i < 4; i++) {
                            egret.log("this._optionSp.getChildAt(i)as Box:", _this._optionSp.getChildAt(i));
                            var box = _this._optionSp.getChildAt(i);
                            egret.Tween.get(box).wait(100 * i).to({ scaleX: 0.2, scaleY: 0.2, alpha: 0 }, 500, egret.Ease.cubicIn).call(function () {
                                //  egret.log("aa");
                                count++;
                                if (count >= 3) {
                                    _this.setQuestion(_this._index);
                                }
                            });
                        }
                    }, 500);
                }, this);
            }
            else {
                // egret.log(this._loves.count);
                Source.changeQusetion(this._index);
                EffectUtils.shakeObj(card, null);
                this._wrongSound.clear();
                this._wrongSound.playRes("chacha_mp3").exec(function () {
                    _this._loves.cut();
                    if (_this._loves.count <= 0) {
                        _this._blocks.hideBg();
                        _this.addChild(_this._blocks);
                        _this._blocks.scaleX = _this._blocks.scaleY = 0.5;
                        _this._blocks.x = 523 + 410;
                        _this._blocks.y = 254.5 + 484;
                        _this._qwd.visible = false;
                        // this.addChild(this._quit);
                        _this.addChild(_this._loves);
                        _this.addChild(_this._stars);
                        _this._optionSp.visible = false;
                        _this._overPage.visible = true;
                        _this._overPage.showWin(false);
                        return;
                    }
                    setTimeout(function () {
                        var count = 0;
                        for (var i = 1; i < 4; i++) {
                            egret.log("this._optionSp.getChildAt(i)as Box:", _this._optionSp.getChildAt(i));
                            var box = _this._optionSp.getChildAt(i);
                            egret.Tween.get(box).wait(100 * i).to({ scaleX: 0.2, scaleY: 0.2, alpha: 0 }, 500, egret.Ease.cubicIn).call(function () {
                                //  egret.log("aa");
                                count++;
                                if (count >= 3) {
                                    _this.setQuestion(_this._index);
                                }
                            });
                        }
                    }, 500);
                }, this);
                // egret.log(this._optionSp);
            }
        }
    };
    ConstructionWorker.prototype.setQuestion = function (id) {
        this._tipsSound.clear();
        this._tipsSound.playRes(Source.list[id % Source.images.length].audio);
        while (this._optionSp.numChildren > 1) {
            this._optionSp.removeChildAt(1);
        }
        egret.log(id, "Source.list[id%Source.images.length].audio:", Source.list[id % Source.images.length].audio);
        for (var i = 0; i < Source.questionList[id].length; i++) {
            egret.log("id:", id, "Source.questionList[id][i]:", Source.questionList[id][i]);
            var box = Source.images[Source.questionList[id][i]];
            this._optionSp.addChild(box);
            box.x = 175 + 340 * i;
            box.y = 145;
            box.alpha = 0;
            box.visible = true;
            box.scaleX = box.scaleY = 0.2;
            egret.Tween.removeTweens(box);
            egret.Tween.get(box).wait(100 * i).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 500, egret.Ease.cubicIn);
        }
    };
    return ConstructionWorker;
}(egret.Sprite));
__reflect(ConstructionWorker.prototype, "ConstructionWorker");
//# sourceMappingURL=ConstructionWorker.js.map