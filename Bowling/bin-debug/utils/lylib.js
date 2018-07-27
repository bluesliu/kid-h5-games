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
// TypeScript file
var MathUtil = (function () {
    function MathUtil() {
    }
    /**
     * 将弧度转换成角度
     * @param radian	弧度
     * @return 角度
     */
    MathUtil.R2D = function (radian) {
        return radian * 180 / Math.PI;
    };
    /**
     * 将角度转换成弧度
     * @param degress		角度
     * @return  弧度
     */
    MathUtil.D2R = function (degress) {
        return degress * Math.PI / 180;
    };
    /**
     * 计算圆周运动
     * @param centerX		圆心的x坐标
     * @param centerY		圆心的y坐标
     * @param radius		圆的半径
     * @param angle		角度（弧度制）
     * @return  			返回一个对象{x,y}
     */
    MathUtil.circle = function (centerX, centerY, radius, angle) {
        var _x = centerX + Math.cos(angle) * radius;
        var _y = centerY + Math.sin(angle) * radius;
        return new egret.Point(_x, _y);
    };
    /**
     * 计算椭圆运动
     * @param centerX		圆心的x坐标
     * @param centerY		圆心的y坐标
     * @param radiusX		椭圆x半径
     * @param radiusY		椭圆y半径
     * @param angle		角度（弧度制）
     * @return 			返回一个对象{x,y}
     *
     */
    MathUtil.oval = function (centerX, centerY, radiusX, radiusY, angle) {
        var _x = centerX + Math.cos(angle) * radiusX;
        var _y = centerY + Math.sin(angle) * radiusY;
        return { x: _x, y: _y };
    };
    /**
     * 计算两点之间距离
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @return
     */
    MathUtil.distance = function (x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    };
    MathUtil.distanceByPoint = function (p1, p2) {
        return MathUtil.distance(p1.x, p1.y, p2.x, p2.y);
    };
    /**
     * 以ox，oy为原点，计算两个点的夹角，这个方法可以实行一个对象指向另一个对象
     * 比如想实现mc的角度一直指向鼠标：
     * mc.rotation = Trigonometry.getAngleBypoint(mc.x, mc.y, mouseX, mouseY);
     * @param ox	原点x
     * @param oy	原点y
     * @param px
     * @param py
     * @return 	一个角度
     *
     */
    MathUtil.getAngleByPoint = function (ox, oy, px, py) {
        return MathUtil.R2D(MathUtil.getRadianByPoint(ox, oy, px, py));
    };
    /**
     * 以ox，oy为原点，计算两个点的夹角（弧度）
     * @param ox	原点x
     * @param oy	原点y
     * @param px
     * @param py
     * @return 	一个弧度
     *
     */
    MathUtil.getRadianByPoint = function (ox, oy, px, py) {
        var dx = px - ox;
        var dy = py - oy;
        return Math.atan2(dy, dx);
    };
    /**
     * 获点到线的交点
     * @param p1	直线上的点
     * @param p2	直线上的点
     * @param p3	直线外的点
     * @return 	交点
     *
     */
    MathUtil.getPointToLineIntersect = function (p1, p2, p3) {
        var point = new egret.Point();
        //如果p1.x==p2.x 说明是条竖着的线
        if (p1.x - p2.x == 0) {
            point.x = p1.x;
            point.y = p3.y;
        }
        else {
            var A = (p1.y - p2.y) / (p1.x - p2.x);
            var B = p1.y - A * p1.x;
            var m = p3.x + A * p3.y;
            point.x = (m - A * B) / (A * A + 1);
            point.y = A * point.x + B;
        }
        return point;
    };
    /**
     * 获点到线的距离
     * @param p1	直线上的点
     * @param p2	直线上的点
     * @param p3	直线外的点
     * @return 	距离
     *
     */
    MathUtil.getPointToLineDistance = function (p1, p2, p3) {
        var len;
        //如果p1.x==p2.x 说明是条竖着的线
        if (p1.x - p2.x == 0) {
            len = Math.abs(p3.x - p1.x);
        }
        else {
            var A = (p1.y - p2.y) / (p1.x - p2.x);
            var B = p1.y - A * p1.x;
            len = Math.abs((A * p3.x + B - p3.y) / Math.sqrt(A * A + 1));
        }
        return len;
    };
    MathUtil.random = function (nMinimum, nMaximum, nRoundToInterval) {
        if (nMaximum === void 0) { nMaximum = 0; }
        if (nRoundToInterval === void 0) { nRoundToInterval = 1; }
        if (nMinimum > nMaximum) {
            var nTemp = nMinimum;
            nMinimum = nMaximum;
            nMaximum = nTemp;
        }
        var nDeltaRange = (nMaximum - nMinimum) + (1 * nRoundToInterval);
        var nRandomNumber = Math.random() * nDeltaRange;
        nRandomNumber += nMinimum;
        return MathUtil.floor(nRandomNumber, nRoundToInterval);
    };
    MathUtil.floor = function (nNumber, nRoundToInterval) {
        if (nRoundToInterval === void 0) { nRoundToInterval = 1; }
        return Math.floor(nNumber / nRoundToInterval) * nRoundToInterval;
    };
    return MathUtil;
}());
__reflect(MathUtil.prototype, "MathUtil");
var ArrayUtil = (function () {
    function ArrayUtil() {
    }
    ArrayUtil.randomSort = function (array) {
        var tempArr = array.concat();
        array.length = 0;
        while (tempArr.length > 0) {
            var outIdx = MathUtil.random(0, tempArr.length - 1);
            var obj = tempArr.splice(outIdx, 1)[0];
            array.push(obj);
        }
    };
    ArrayUtil.equal = function (arr1, arr2, func) {
        if (func === void 0) { func = null; }
        if (arr1.length != arr2.length) {
            return false;
        }
        for (var i = 0; i < arr1.length; i++) {
            if (func != null) {
                if (func(arr1[i], arr2[i]) == false) {
                    return false;
                }
            }
            else {
                if (arr1[i] != arr2[i]) {
                    return false;
                }
            }
        }
        return true;
    };
    ArrayUtil.getLastItem = function (arr, offset) {
        if (offset === void 0) { offset = 0; }
        if (arr.length == 0) {
            return null;
        }
        if (offset >= 0) {
            return arr[arr.length - 1 - offset];
        }
        else {
            return arr[-offset - 1];
        }
    };
    ArrayUtil.getRandomItem = function (arr) {
        if (arr.length == 0) {
            return null;
        }
        return arr[MathUtil.random(0, arr.length - 1, 1)];
    };
    return ArrayUtil;
}());
__reflect(ArrayUtil.prototype, "ArrayUtil");
var DisplayUtil = (function () {
    function DisplayUtil() {
    }
    DisplayUtil.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    DisplayUtil.createMovieClipByName = function (name) {
        var data = RES.getRes(name + "_json");
        var txtr = RES.getRes(name + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        return new egret.MovieClip(mcFactory.generateMovieClipData(name));
    };
    DisplayUtil.remove = function (obj) {
        if (obj != null && obj.parent != null) {
            obj.parent.removeChild(obj);
        }
    };
    DisplayUtil.setScale = function (obj, scale) {
        var w = obj.width * scale;
        var h = obj.height * scale;
        DisplayUtil.setSize(obj, w, h);
    };
    DisplayUtil.setSize = function (obj, w, h) {
        if (w === void 0) { w = NaN; }
        if (h === void 0) { h = NaN; }
        if (obj instanceof egret.Bitmap) {
            obj.width = w;
            obj.height = h;
        }
        else {
            var scaleX = obj.scaleX;
            var scaleY = obj.scaleY;
            if (!isNaN(w)) {
                scaleX = w / obj.width;
            }
            if (!isNaN(h)) {
                scaleY = h / obj.height;
            }
            obj.scaleX = scaleX;
            obj.scaleY = scaleY;
        }
    };
    DisplayUtil.bringFront = function (obj) {
        if (obj != null && obj.parent != null) {
            obj.parent.addChild(obj);
        }
    };
    return DisplayUtil;
}());
__reflect(DisplayUtil.prototype, "DisplayUtil");
var EffectUtils;
(function (EffectUtils) {
    // 存储旋转对象
    var rotationArr = [];
    //对象旋转特效
    //obj   旋转对象
    //time  旋转一周用时，毫秒
    function rotationEffect(obj, time) {
        if (time === void 0) { time = 1000; }
        if (this.rotationArr == null) {
            this.rotationArr = [];
        }
        if (this.rotationArr[obj.hashCode]) {
            return;
        }
        if ((this.rotationArr[obj.hashCode] == null) || !this.rotationArr[obj.hashCode]) {
            this.rotationArr[obj.hashCode] = true;
        }
        var onComplete1 = function () {
            if (this.rotationArr[obj.hashCode] && (obj != null)) {
                obj.rotation = 0;
                egret.Tween.get(obj).to({ rotation: 360 }, time).call(onComplete1, this);
            }
        };
        obj.rotation = 0;
        egret.Tween.get(obj).to({ rotation: 360 }, time).call(onComplete1, this);
    }
    EffectUtils.rotationEffect = rotationEffect;
    //取消对象旋转
    //obj    旋转对象
    function removeRotationEffect(obj) {
        if (this.rotationArr == null) {
            this.rotationArr = [];
        }
        this.rotationArr[obj.hashCode] = false;
    }
    EffectUtils.removeRotationEffect = removeRotationEffect;
    //抖动对象特效
    //类似ios密码输入错误的特效
    function shakeObj(obj, callback) {
        var shakeNum = 80;
        var oldX = obj.x;
        egret.Tween.get(obj).to({ x: obj.x - 10 }, shakeNum);
        egret.setTimeout(function () {
            egret.Tween.get(obj).to({ x: obj.x + 20 }, shakeNum);
        }, this, shakeNum * 2);
        egret.setTimeout(function () {
            egret.Tween.get(obj).to({ x: obj.x - 20 }, shakeNum);
        }, this, shakeNum * 3);
        egret.setTimeout(function () {
            egret.Tween.get(obj).to({ x: obj.x + 20 }, shakeNum);
        }, this, shakeNum * 4);
        egret.setTimeout(function () {
            egret.Tween.get(obj).to({ x: oldX }, shakeNum).call(function () {
                if (callback != null) {
                    callback();
                }
            }, this);
        }, this, shakeNum * 5);
    }
    EffectUtils.shakeObj = shakeObj;
    //========================== a lot of effect will coming! ============================
    var isPlayEffectPlay = false;
    /**
    * 给显示对象增加特效
    * obj           对象
    * cartoonType   动画类型 1:【可爱】按下变小，放开弹大 2:按下变小，放开轻微弹大 3：按下变小，放开变大
    */
    function playEffect(obj, cartoonType) {
        if (cartoonType === void 0) { cartoonType = 1; }
        if (this.isPlayEffectPlay) {
            return;
        }
        this.isPlayEffectPlay = true;
        var onComplete2 = function () {
            this.isPlayEffectPlay = false;
        };
        var onComplete1 = function () {
            if (cartoonType == 1) {
                egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, egret.Ease.elasticOut).call(onComplete2, this);
            }
            else if (cartoonType == 2) {
                egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, egret.Ease.backOut).call(onComplete2, this);
            }
            else if (cartoonType == 3) {
                egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 100).call(onComplete2, this);
            }
        };
        egret.Tween.get(obj).to({ scaleX: 0.5, scaleY: 0.5, x: obj.x + obj.width / 4, y: obj.y + obj.height / 4 }, 100, egret.Ease.sineIn).call(onComplete1, this);
    }
    EffectUtils.playEffect = playEffect;
    /**
    * 给显示对象增加持续放大特效
    * obj           对象
    */
    function playScaleEffect(obj) {
        var onComplete1 = function () {
            if (obj != null) {
                var onComplete2 = function () {
                    obj.scaleX = 1;
                    obj.scaleY = 1;
                    egret.Tween.get(obj).to({ alpha: 1 }, 1000).call(onComplete1, self);
                };
                obj.alpha = 1;
                egret.Tween.get(obj).to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 1000).call(onComplete2, self);
            }
        };
        onComplete1();
    }
    EffectUtils.playScaleEffect = playScaleEffect;
    /**
    * 显示对象上线浮动特效
    * obj           对象
    * time          浮动时间 毫秒
    * space         浮动高度
    * todo          多个对象跳动
    */
    function flyObj(obj, time, space) {
        if (space === void 0) { space = 50; }
        var onComplete1 = function () {
            if (obj != null) {
                var onComplete2 = function () {
                    egret.Tween.get(obj).to({ y: obj.y - space }, time).call(onComplete1, this);
                };
                egret.Tween.get(obj).to({ y: obj.y + space }, time).call(onComplete2, this);
            }
        };
        onComplete1();
    }
    EffectUtils.flyObj = flyObj;
    /**
    * 显示对象摇头特效
    * obj           对象
    * time          浮动时间 毫秒
    * space         摇头幅度
    * todo          多个对象摇头
    * 注意：需要将对象的注册点位置：0.5,1
    */
    function rockObj(obj, time, space) {
        if (space === void 0) { space = 20; }
        var onComplete1 = function () {
            if (obj != null) {
                var onComplete2 = function () {
                    egret.Tween.get(obj).to({ rotation: -space }, time).call(onComplete1, this);
                };
                egret.Tween.get(obj).to({ rotation: space }, time).call(onComplete2, this);
            }
        };
        onComplete1();
    }
    EffectUtils.rockObj = rockObj;
    /**
    * 文字打字机效果
    * obj           文本对象
    * content       文字
    * interval      打字间隔 毫秒
    */
    function typerEffect(obj, content, interval) {
        if (content === void 0) { content = ""; }
        if (interval === void 0) { interval = 200; }
        var strArr = content.split("");
        var len = strArr.length;
        for (var i = 0; i < len; i++) {
            egret.setTimeout(function () {
                obj.appendText(strArr[Number(this)]);
            }, i, interval * i);
        }
    }
    EffectUtils.typerEffect = typerEffect;
})(EffectUtils || (EffectUtils = {}));
var StepType;
(function (StepType) {
    StepType[StepType["wait"] = 0] = "wait";
    StepType[StepType["exec"] = 1] = "exec";
    StepType[StepType["block"] = 2] = "block";
})(StepType || (StepType = {}));
var Step = (function () {
    function Step() {
        this.m_taskList = [];
    }
    /**
     * 等待
     */
    Step.prototype.wait = function (delay) {
        var _this = this;
        this.m_taskList.push({ type: StepType.wait, data: delay });
        //下一帧执行
        egret.setTimeout(function () {
            _this.check();
        }, this, 0);
        return this;
    };
    /**
     * 执行func，结束后会跳到下一步
     */
    Step.prototype.exec = function (func, thisObj) {
        var _this = this;
        this.m_taskList.push({ type: StepType.exec, data: { func: func, thisObj: thisObj } });
        //下一帧执行
        egret.setTimeout(function () {
            _this.check();
        }, this, 0);
        return this;
    };
    /**
     * 阻塞执行，func调用结束后，不会跳到下一步
     */
    Step.prototype.block = function (func, thisObj) {
        var _this = this;
        this.m_taskList.push({ type: StepType.block, data: { func: func, thisObj: thisObj } });
        //下一帧执行
        egret.setTimeout(function () {
            _this.check();
        }, this, 0);
        return this;
    };
    Step.prototype.next = function () {
        this.m_waitting = false;
        egret.clearTimeout(this.m_timeId);
        this.check();
    };
    Step.prototype.clear = function () {
        this.m_waitting = false;
        egret.clearTimeout(this.m_timeId);
        this.m_taskList.length = 0;
    };
    Step.prototype.check = function () {
        if (this.m_waitting)
            return;
        if (this.m_taskList.length > 0) {
            var task = this.m_taskList.shift();
            this.checkTask(task);
        }
        else {
            //没有任务了
        }
    };
    Step.prototype.checkTask = function (task) {
        if (task.type == StepType.wait) {
            this.doWait(task);
        }
        else if (task.type == StepType.exec) {
            this.doExec(task);
        }
        else if (task.type == StepType.block) {
            this.doBlock(task);
        }
    };
    Step.prototype.doWait = function (task) {
        var _this = this;
        var delay = task.data;
        this.m_waitting = true; //设置为等待中
        this.m_timeId = egret.setTimeout(function () {
            _this.m_waitting = false; //等待结束
            _this.check();
        }, this, delay);
    };
    Step.prototype.doExec = function (task) {
        var func = task.data.func;
        var thisObj = task.data.thisObj;
        func.call(thisObj);
        this.check();
    };
    Step.prototype.doBlock = function (task) {
        this.m_waitting = true;
        var func = task.data.func;
        var thisObj = task.data.thisObj;
        func.call(thisObj);
    };
    return Step;
}());
__reflect(Step.prototype, "Step");
var Workflow = (function () {
    function Workflow() {
        this.m_step = new Step();
        this.m_list = [];
    }
    Workflow.prototype.addWait = function (delay) {
        this.m_list.push({ type: StepType.wait, data: delay });
    };
    Workflow.prototype.addExec = function (func, thisObj) {
        this.m_list.push({ type: StepType.exec, data: { func: func, thisObj: thisObj } });
    };
    Workflow.prototype.addBlock = function (func, thisObj) {
        this.m_list.push({ type: StepType.block, data: { func: func, thisObj: thisObj } });
    };
    Workflow.prototype.run = function () {
        this.m_step.clear();
        for (var i = 0; i < this.m_list.length; i++) {
            var item = this.m_list[i];
            if (item.type == StepType.wait) {
                this.m_step.wait(item.data);
            }
            else if (item.type == StepType.exec) {
                this.m_step.exec(item.func, item.thisObj);
            }
            else if (item.type == StepType.block) {
                this.m_step.block(item.func, item.thisObj);
            }
        }
    };
    Workflow.prototype.next = function () {
        this.m_step.next();
    };
    return Workflow;
}());
__reflect(Workflow.prototype, "Workflow");
var SoundPlayer = (function (_super) {
    __extends(SoundPlayer, _super);
    function SoundPlayer() {
        return _super.call(this) || this;
    }
    /**
     * 执行func，结束后会跳到下一步
     */
    SoundPlayer.prototype.exec = function (func, thisObj) {
        var _this = this;
        this.m_taskList.push({ type: StepType.exec, data: { func: func, thisObj: thisObj } });
        //下一帧执行
        egret.setTimeout(function () {
            _this.check();
        }, this, 0);
        return this;
    };
    SoundPlayer.prototype.playResRandom = function (keys, loop, volume) {
        if (loop === void 0) { loop = 1; }
        if (volume === void 0) { volume = 1; }
        var index = MathUtil.random(0, keys.length - 1, 1);
        return this.playRes(keys[index], loop, volume);
    };
    SoundPlayer.prototype.playRes = function (key, loop, volume) {
        var _this = this;
        if (loop === void 0) { loop = 1; }
        if (volume === void 0) { volume = 1; }
        var task = { type: "playRes", data: { key: key, loop: loop, volume: volume } };
        if (this.m_waitting) {
            this.m_taskList.push(task);
            //下一帧执行
            egret.setTimeout(function () {
                _this.check();
            }, this, 0);
        }
        else {
            //不要等到下一帧，因为safari会禁止自动播放音频
            this.doPlayRes(task);
        }
        return this;
    };
    SoundPlayer.prototype.checkTask = function (task) {
        _super.prototype.checkTask.call(this, task);
        if (task.type == "playRes") {
            this.doPlayRes(task);
        }
    };
    SoundPlayer.prototype.doPlayRes = function (task) {
        this.m_waitting = true;
        var key = task.data.key;
        this._loop = task.data.loop;
        this._volume = task.data.volume;
        this.stopSound();
        this._sound = RES.getRes(key);
        this._channel = this._sound.play(0, this._loop);
        this._channel.volume = this._volume;
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
    };
    SoundPlayer.prototype.stopSound = function () {
        if (this._channel) {
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
            this._channel.stop();
            this._channel = null;
        }
    };
    //播放完成
    SoundPlayer.prototype.onPlayComplete = function (e) {
        this.stopSound();
        this.m_waitting = false; //等待结束
        this.check();
    };
    SoundPlayer.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.stopSound();
    };
    return SoundPlayer;
}(Step));
__reflect(SoundPlayer.prototype, "SoundPlayer");
//# sourceMappingURL=lylib.js.map