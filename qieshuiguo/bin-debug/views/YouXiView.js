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
var YouXiView = (function (_super) {
    __extends(YouXiView, _super);
    function YouXiView() {
        var _this = _super.call(this) || this;
        _this._linShiArr = [];
        _this._nameArr = [];
        _this._isChengGong = false;
        _this._isShiBai = false;
        _this._isTouch = false;
        _this._isJianCe = true;
        _this.chushi();
        return _this;
    }
    YouXiView.prototype.chushi = function () {
        this._sp = new egret.Sprite();
        this.addChild(this._sp);
        this._chongboTime = new egret.Timer(10000);
        this._chongboTime.addEventListener(egret.TimerEvent.TIMER, this.chongboshenying, this);
    };
    YouXiView.prototype.clear = function () {
        var n = this._sp.numChildren;
        for (var i = 0; i < n; i++) {
            this._sp.removeChildAt(0);
        }
        this._linShiArr = [];
    };
    YouXiView.prototype.setID = function (id) {
        this._id = id;
        this._isJianCe = true;
        this._isTouch = true;
        this.clear();
        this._chongboTime.reset();
        this._chongboTime.start();
        this._linShiArr.push(this.arr[this._id]);
        for (var i = 0; i < 3; i++) {
            var kapian = this.tiaoXuan();
            if (this._linShiArr.indexOf(kapian) == -1) {
                var a = Math.random();
                if (a > 0.5) {
                    kapian.scaleX = kapian.scaleY = 1;
                    this._linShiArr.push(kapian);
                }
                else {
                    kapian.scaleX = kapian.scaleY = 1;
                    this._linShiArr.splice(0, 0, kapian);
                }
            }
            else {
                i--;
            }
        }
        console.log(this._linShiArr.length);
        for (var c = 0; c < 4; c++) {
        }
        for (var n = 0; n < this._linShiArr.length; n++) {
            this._sp.addChild(this._linShiArr[n]);
            this._linShiArr[n].x = n * 300 + 135;
            this._linShiArr[n].y = 1300;
            if (n == this._linShiArr.length - 1) {
                egret.Tween.get(this._linShiArr[n]).to({ y: 300 }, 500, egret.Ease.sineIn).call(this.donghuaCom, this);
            }
            else {
                egret.Tween.get(this._linShiArr[n]).to({ y: 300 }, 500, egret.Ease.sineIn);
            }
        }
    };
    YouXiView.prototype.donghuaCom = function () {
        this.arr[this._id].sound.play(0, 1);
    };
    YouXiView.prototype.tiaoXuan = function () {
        var i = Math.floor(Math.random() * this.arr.length);
        return this.arr[i];
    };
    YouXiView.prototype.onKaPianChange = function (e) {
        if (this._isJianCe == false) {
            return;
        }
        var str = e.target.name;
        if (str.split("_")[0] == "kapian" && (str.split("_")[1]) != this._id) {
            this._isShiBai = true;
            this._isJianCe = false;
        }
        if (str.split("_")[0] == "kapian" && (str.split("_")[1]) == this._id) {
            this._isChengGong = true;
            this._isJianCe = false;
        }
        this.arr[(str.split("_")[1])].scaleX = this.arr[(str.split("_")[1])].scaleY = 1.1;
    };
    YouXiView.prototype.onKaPianClose = function (e) {
        var _this = this;
        this._chongboTime.reset();
        this._chongboTime.start();
        if (this._isChengGong && !this._isShiBai && this._isTouch) {
            this._isTouch = false;
            this.tuichang("chenggong");
            egret.Tween.get(this.arr[this._id]).to({ x: 500, y: 300, scaleX: 2, scaleY: 2 }, 500, egret.Ease.sineIn);
            this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
            egret.setTimeout(function () {
                egret.Tween.get(_this.arr[_this._id]).to({ y: -500, scaleX: 1, scaleY: 1 }, 300, egret.Ease.sineIn).call(_this.tuichangCom, _this, ["chenggong"]);
            }, this, 3000);
        }
        /**
         * 失败了  再播放一次音乐  再来一次
         */
        if (this._isShiBai) {
            egret.setTimeout(function () {
                // (<KaPianData>this.arr[this._id]).sound.play(0,1);
                _this.dispatchEvent(new egret.Event(egret.Event.CLOSE));
            }, this, 1000);
            //  this.dispatchEvent(new egret.Event(egret.Event.CLOSE));
            for (var n = 0; n < this._linShiArr.length; n++) {
                egret.Tween.get(this._linShiArr[n]).to({ y: -300, }, 500, egret.Ease.sineIn);
            }
        }
        this._isChengGong = false;
        this._isShiBai = false;
    };
    YouXiView.prototype.tuichang = function (str) {
        // egret.setTimeout(this.tuichangCom,this,500);
        for (var n = 0; n < this._linShiArr.length; n++) {
            if (this._linShiArr[n] != this.arr[this._id]) {
                egret.Tween.get(this._linShiArr[n]).to({ y: -300, }, 500, egret.Ease.sineIn);
            }
        }
    };
    YouXiView.prototype.tuichangCom = function (str) {
        //this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
        // if(str=="chenggong"){
        // 	this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
        // }
        // if(str=="shibai"){
        // 	this.dispatchEvent(new egret.Event(egret.Event.CLOSE));
        // }
    };
    /**
     * 重播一次声音
     */
    YouXiView.prototype.chongboshenying = function (e) {
        this.arr[this._id].sound.play(0, 1);
    };
    YouXiView.prototype.setArr = function (arr) {
        this.arr = arr;
        for (var i = 0; i < this.arr.length; i++) {
            this.arr[i].addEventListener(egret.Event.CHANGE, this.onKaPianChange, this);
            this.arr[i].addEventListener(egret.Event.CLOSE, this.onKaPianClose, this);
        }
    };
    YouXiView.prototype.stop = function () {
        this._chongboTime.stop();
    };
    YouXiView.prototype.kashi = function () {
        this._chongboTime.reset();
        this._chongboTime.start();
    };
    return YouXiView;
}(egret.Sprite));
__reflect(YouXiView.prototype, "YouXiView");
//# sourceMappingURL=YouXiView.js.map