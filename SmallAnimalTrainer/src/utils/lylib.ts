// TypeScript file
class MathUtil {
	
	/**
	 * 将弧度转换成角度
	 * @param radian	弧度
	 * @return 角度
	 */
	public static R2D(radian:number):number
	{
		return radian * 180 / Math.PI;
	}

	/**
	 * 将角度转换成弧度
	 * @param degress		角度
	 * @return  弧度
	 */
	public static D2R(degress:number):number
	{
		return degress * Math.PI / 180;
	}


	/**
	 * 计算圆周运动
	 * @param centerX		圆心的x坐标
	 * @param centerY		圆心的y坐标
	 * @param radius		圆的半径
	 * @param angle		角度（弧度制）
	 * @return  			返回一个对象{x,y}
	 */
	public static circle(centerX:number, centerY:number, radius:number, angle:number):egret.Point
	{
		let _x = centerX + Math.cos(angle) * radius;
		let _y = centerY + Math.sin(angle) * radius;
		return new egret.Point(_x,  _y);
	}


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
	public static oval(centerX:number, centerY:number, radiusX:number, radiusY:number, angle:number):Object
	{
		let _x = centerX + Math.cos(angle) * radiusX;
		let _y = centerY + Math.sin(angle) * radiusY;
		return {x: _x, y: _y};
	}



	/**
	 * 计算两点之间距离
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 * @return
	 */
	public static distance(x1:number, y1:number, x2:number, y2:number):number
	{
		let dx=x2 - x1;
		let dy=y2 - y1;
		return Math.sqrt(dx * dx + dy * dy);
	}
	
	public static distanceByPoint(p1:egret.Point, p2:egret.Point):number
	{
		return MathUtil.distance(p1.x,p1.y, p2.x, p2.y);
	}


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
	public static getAngleByPoint(ox:number, oy:number, px:number, py:number):number
	{
		return MathUtil.R2D(MathUtil.getRadianByPoint(ox, oy, px, py));
	}
	
	/**
	 * 以ox，oy为原点，计算两个点的夹角（弧度）
	 * @param ox	原点x
	 * @param oy	原点y
	 * @param px
	 * @param py
	 * @return 	一个弧度
	 *
	 */
	public static getRadianByPoint(ox:number, oy:number, px:number, py:number):number
	{
		let dx=px - ox;
		let dy=py - oy;
		return Math.atan2(dy, dx);
	}

	/**
	 * 获点到线的交点
	 * @param p1	直线上的点
	 * @param p2	直线上的点
	 * @param p3	直线外的点
	 * @return 	交点
	 *
	 */
	public static getPointToLineIntersect(p1:egret.Point, p2:egret.Point, p3:egret.Point):egret.Point
	{
		let point = new egret.Point();
		//如果p1.x==p2.x 说明是条竖着的线
		if(p1.x-p2.x==0)
		{
			point.x=p1.x;
			point.y=p3.y;
		}
		else
		{
			let A=(p1.y-p2.y)/(p1.x-p2.x)
			let B=p1.y-A*p1.x
			let m=p3.x+A*p3.y
	
			point.x=(m-A*B)/(A*A+1)
			point.y=A*point.x+B
		}
		return point;
	}

	/**
	 * 获点到线的距离
	 * @param p1	直线上的点
	 * @param p2	直线上的点
	 * @param p3	直线外的点
	 * @return 	距离
	 *
	 */
	public static getPointToLineDistance(p1:egret.Point, p2:egret.Point, p3:egret.Point):number
	{
		let len;
  
		//如果p1.x==p2.x 说明是条竖着的线
		if(p1.x-p2.x==0)
		{
			len=Math.abs(p3.x-p1.x)
		}
		else
		{
			let A=(p1.y-p2.y)/(p1.x-p2.x)
			let B=p1.y-A*p1.x
			
			len=Math.abs((A*p3.x+B-p3.y)/Math.sqrt(A*A+1))
		}
		
		return len
	}

	public static random(nMinimum:number, nMaximum:number=0, nRoundToInterval:number=1):number
	{
		if (nMinimum > nMaximum)
		{
			let nTemp=nMinimum;
			nMinimum=nMaximum;
			nMaximum=nTemp;
		}
		let nDeltaRange = (nMaximum - nMinimum) + (1 * nRoundToInterval);
		let nRandomNumber = Math.random() * nDeltaRange;
		nRandomNumber += nMinimum;
		return MathUtil.floor(nRandomNumber, nRoundToInterval);
	}

	public static floor(nNumber:number, nRoundToInterval:number=1):number
	{
		return Math.floor(nNumber / nRoundToInterval) * nRoundToInterval;
	}
}




class ArrayUtil {
	public constructor() {
	}

	public static randomSort(array:Array<any>)
	{
		let tempArr:Array<any> = array.concat();
		array.length = 0;
			
		while(tempArr.length>0)
		{
			let outIdx = MathUtil.random(0,tempArr.length-1);
			let obj:Object = tempArr.splice(outIdx,1)[0];
			array.push(obj);
		}
	}


	
	public static equal(arr1:Array<any>, arr2:Array<any>, func:Function = null):boolean{
		if(arr1.length != arr2.length){return false;}
		for(let i=0; i<arr1.length; i++){
			if(func != null){
				if(func(arr1[i],arr2[i])==false){
					return false;
				}
			}
			else{
				if( arr1[i] != arr2[i] ){
					return false;
				}
			}
		}
		return true;
	}
	
	public static getLastItem(arr:Array<any>, offset=0):any{
		if(arr.length==0){
			return null;
		}
		if(offset>=0){
			return arr[arr.length-1-offset];
		}
		else{
			return arr[-offset-1];
		}
	}

	public static getRandomItem(arr:Array<any>):any{
		if(arr.length==0){
			return null;
		}
		return arr[MathUtil.random(0,arr.length-1,1)];
	}
}




class DisplayUtil {
	public constructor() {
	}

	public static createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public static createMovieClipByName(name:string): egret.MovieClip{
        let data = RES.getRes(name+"_json");
		let txtr = RES.getRes(name+"_png");
		let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
		return new egret.MovieClip( mcFactory.generateMovieClipData( name ) );
    }

    public static remove(obj:egret.DisplayObject){
        if(obj!=null && obj.parent!=null){
            obj.parent.removeChild(obj);
        }
    }

	public static setScale(obj:egret.DisplayObject, scale:number){
		let w = obj.width * scale;
		let h = obj.height * scale;
		DisplayUtil.setSize(obj, w, h);
	}
    public static setSize(obj:egret.DisplayObject, w:number=NaN, h:number=NaN){
        if(obj instanceof egret.Bitmap){
            obj.width = w;
            obj.height = h;
        }
        else{
            let scaleX = obj.scaleX;
            let scaleY = obj.scaleY;
            if(!isNaN(w)){
                scaleX = w / obj.width;
            }
            if(!isNaN(h)){
                scaleY = h / obj.height;
            }
            obj.scaleX = scaleX;
            obj.scaleY = scaleY;
        }
    }

    public static bringFront(obj:egret.DisplayObject){
        if(obj!=null && obj.parent!=null){
            obj.parent.addChild(obj);
        }
    }
}




module EffectUtils {

    // 存储旋转对象
    var rotationArr: Array<any> = [];
    //对象旋转特效
    //obj   旋转对象
    //time  旋转一周用时，毫秒
    export function rotationEffect(obj, time: number = 1000): void {
        if (this.rotationArr == null) {
            this.rotationArr = [];
        }
        if (this.rotationArr[obj.hashCode]) {
            return;
        }
        if ((this.rotationArr[obj.hashCode] == null) || !this.rotationArr[obj.hashCode]) {
            this.rotationArr[obj.hashCode] = true;
        }
        var onComplete1: Function = function () {
            if (this.rotationArr[obj.hashCode] && (obj != null)) {
                obj.rotation = 0;
                egret.Tween.get(obj).to({ rotation: 360 }, time).call(onComplete1, this);
            }
        };
        obj.rotation = 0;
        egret.Tween.get(obj).to({ rotation: 360 }, time).call(onComplete1, this);
    }

    //取消对象旋转
    //obj    旋转对象
    export function removeRotationEffect(obj): void {
        if (this.rotationArr == null) {
            this.rotationArr = [];
        }
        this.rotationArr[obj.hashCode] = false;
    }


    //抖动对象特效
    //类似ios密码输入错误的特效
    export function shakeObj(obj, callback:Function): void {
        var shakeNum = 80;
        var oldX: number = obj.x;
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
            
            egret.Tween.get(obj).to({ x: oldX }, shakeNum).call(()=>{
                
                if(callback!=null){
                callback();
            }

            },this);
            
        }, this, shakeNum * 5);
    }



    //========================== a lot of effect will coming! ============================

    var isPlayEffectPlay: Boolean = false;
    /**
    * 给显示对象增加特效
    * obj           对象
    * cartoonType   动画类型 1:【可爱】按下变小，放开弹大 2:按下变小，放开轻微弹大 3：按下变小，放开变大
    */
    export function playEffect(obj, cartoonType: number = 1): void {
        if (this.isPlayEffectPlay) {
            return;
        }
        this.isPlayEffectPlay = true;
        var onComplete2: Function = function () {
            this.isPlayEffectPlay = false;
        };
        var onComplete1: Function = function () {
            if (cartoonType == 1) {
                egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, egret.Ease.elasticOut).call(onComplete2, this);
            } else if (cartoonType == 2) {
                egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, egret.Ease.backOut).call(onComplete2, this);
            } else if (cartoonType == 3) {
                egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 100).call(onComplete2, this);
            }
        };
        egret.Tween.get(obj).to({ scaleX: 0.5, scaleY: 0.5, x: obj.x + obj.width / 4, y: obj.y + obj.height / 4 }, 100, egret.Ease.sineIn).call(onComplete1, this);
    }


    /**
    * 给显示对象增加持续放大特效
    * obj           对象
    */
    export function playScaleEffect(obj): void {
        var onComplete1: Function = function () {
            if (obj != null) {
                var onComplete2: Function = function () {
                    obj.scaleX = 1;
                    obj.scaleY = 1;
                    egret.Tween.get(obj).to({ alpha: 1 }, 1000).call(onComplete1, self)
                };
                obj.alpha = 1;
                egret.Tween.get(obj).to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 1000).call(onComplete2, self)
            }
        };

        onComplete1();

    }

    /**
    * 显示对象上线浮动特效
    * obj           对象
    * time          浮动时间 毫秒
    * space         浮动高度
    * todo          多个对象跳动
    */
    export function flyObj(obj, time, space: number = 50): void {
        var onComplete1: Function = function () {
            if (obj != null) {
                var onComplete2: Function = function () {
                    egret.Tween.get(obj).to({ y: obj.y - space }, time).call(onComplete1, this);
                };
                egret.Tween.get(obj).to({ y: obj.y + space }, time).call(onComplete2, this);
            }
        };
        onComplete1();
    }

    /**
    * 显示对象摇头特效
    * obj           对象
    * time          浮动时间 毫秒
    * space         摇头幅度
    * todo          多个对象摇头
    * 注意：需要将对象的注册点位置：0.5,1
    */
    export function rockObj(obj, time, space: number = 20): void {
        var onComplete1: Function = function () {
            if (obj != null) {
                var onComplete2: Function = function () {
                    egret.Tween.get(obj).to({ rotation: -space }, time).call(onComplete1, this);
                };
                egret.Tween.get(obj).to({ rotation: space }, time).call(onComplete2, this);
            }
        };
        onComplete1();
    }

    /**
    * 文字打字机效果
    * obj           文本对象
    * content       文字
    * interval      打字间隔 毫秒
    */
    export function typerEffect(obj, content: string = "", interval: number = 200): void {
        var strArr: Array<any> = content.split("");
        var len: number = strArr.length;
        for (var i = 0; i < len; i++) {
            egret.setTimeout(function () {
                obj.appendText(strArr[Number(this)]);
            }, i, interval * i);
        }
    }
}


enum StepType{
	wait,
	exec,
	block
}


class Step {

    protected m_waitting : boolean;
    protected m_taskList : Array<any>;
	protected m_timeId : number;

	public constructor() {
		this.m_taskList = [];
	}

	/**
	 * 等待
	 */
	public wait(delay:number) : Step
	{
		this.m_taskList.push({type:StepType.wait, data:delay});
		
		//下一帧执行
		egret.setTimeout(()=>{
			this.check();
		}, this, 0);

		return this;
	}

	/**
	 * 执行func，结束后会跳到下一步
	 */
	public exec( func:Function , thisObj:any) : Step {
		this.m_taskList.push({type:StepType.exec, data:{func:func, thisObj:thisObj}});
		
		//下一帧执行
		egret.setTimeout(()=>{
			this.check();
		}, this, 0);

		return this;
	}

	/**
	 * 阻塞执行，func调用结束后，不会跳到下一步
	 */
	public block( func:Function, thisObj:any ) : Step {
		this.m_taskList.push({type:StepType.block, data:{func:func, thisObj:thisObj}});
		
		//下一帧执行
		egret.setTimeout(()=>{
			this.check();
		}, this, 0);

		return this;
	}
	
	public next(){
		this.m_waitting = false;
		egret.clearTimeout(this.m_timeId);
		this.check();
	}

	public clear(){
		this.m_waitting = false;
		egret.clearTimeout(this.m_timeId);
		this.m_taskList.length = 0;
	}

	protected check() {
		
		if(this.m_waitting)return;

		if(this.m_taskList.length > 0){
			let task = this.m_taskList.shift();
			this.checkTask(task);
		}
		else{
			//没有任务了

		}
	}

	protected checkTask(task:any){
		if(task.type==StepType.wait){
			this.doWait(task);
		}
		else if(task.type==StepType.exec){
			this.doExec(task);
		}
		else if(task.type==StepType.block){
			this.doBlock(task);
		}
	}

	private doWait(task:any){
		let delay:number = task.data;
		this.m_waitting = true;				//设置为等待中
		this.m_timeId = egret.setTimeout(()=>{
			this.m_waitting = false;		//等待结束
			this.check();
		}, this, delay);
	}

	private doExec(task:any){
		let func:Function = task.data.func;
		let thisObj:any = task.data.thisObj;
		func.call(thisObj);
		this.check();
	}

	private doBlock(task:any){
		this.m_waitting = true;
		let func:Function = task.data.func;
		let thisObj:any = task.data.thisObj;
		func.call(thisObj);
	}

}




class Workflow {
	
	private m_step:Step;
	private m_list:Array<any>;

	public constructor() {
		this.m_step = new Step();
		this.m_list = [];
	}

	public addWait(delay){
		this.m_list.push({type:StepType.wait, data:delay});
	}

	public addExec(func:Function , thisObj:any){
		this.m_list.push({type:StepType.exec, data:{func:func, thisObj:thisObj}});
	}

	public addBlock( func:Function, thisObj:any ) {
		this.m_list.push({type:StepType.block, data:{func:func, thisObj:thisObj}});
	}

	public run(){
		this.m_step.clear();
		for(let i=0; i<this.m_list.length; i++)
		{
			let item = this.m_list[i];
			if(item.type == StepType.wait){
				this.m_step.wait(item.data);
			}
			else if(item.type == StepType.exec){
				this.m_step.exec(item.func, item.thisObj);
			}
			else if(item.type == StepType.block){
				this.m_step.block(item.func, item.thisObj);
			}
		}
	}

	public next(){
		this.m_step.next();
	}
}


class SoundPlayer extends Step{

	private _sound: egret.Sound;
    private _channel: egret.SoundChannel;
	private _loop:number;
    private _volume:number;

	public constructor() {
        super();
	}

    /**
	 * 执行func，结束后会跳到下一步
	 */
	public exec( func:Function , thisObj:any) : SoundPlayer {
		this.m_taskList.push({type:StepType.exec, data:{func:func, thisObj:thisObj}});
		
		//下一帧执行
		egret.setTimeout(()=>{
			this.check();
		}, this, 0);

		return this;
	}

    public playResRandom(keys:Array<string>, loop=1, volume=1) : SoundPlayer {
        let index = MathUtil.random(0, keys.length-1, 1);
        return this.playRes(keys[index], loop, volume);
    }

    public playRes(key:string, loop=1, volume=1) : SoundPlayer 
    {
        
        let task = {type:"playRes", data:{key:key, loop:loop, volume:volume}};

        if(this.m_waitting)
        {
            this.m_taskList.push(task);
		
            //下一帧执行
            egret.setTimeout(()=>{
                this.check();
            }, this, 0);
        }
        else
        {
           //不要等到下一帧，因为safari会禁止自动播放音频
           this.doPlayRes(task);
        }

		return this;
    }


    protected checkTask(task:any) {
        super.checkTask(task);
        if(task.type=="playRes"){
			this.doPlayRes(task);
		}
    }

    private doPlayRes(task:any) {
        this.m_waitting = true;
		let key:string = task.data.key;
        this._loop = task.data.loop;
        this._volume = task.data.volume;
	
        this.stopSound();
        this._sound = RES.getRes(key);
        this._channel = this._sound.play(0, this._loop);
        this._channel.volume = this._volume;
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
    }

	
    private stopSound():void {
        if (this._channel) {
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
            this._channel.stop();
            this._channel = null;
        }
    }

	//播放完成
    private onPlayComplete(e:egret.Event):void {
        this.stopSound();
		this.m_waitting = false;		//等待结束
		this.check();
    }


    public clear(){
        super.clear();
        this.stopSound();
    }
}

/**
 * 滤镜工具类
 */
class FilterUtil{

	/**
	 * 返回一个灰化滤镜
	 */
	static getDarkFilter():egret.ColorMatrixFilter{
		let matrix = [
			0.212671, 0.71516, 0.072169, 0, 0, 
			0.212671, 0.71516, 0.072169, 0, 0, 
			0.212671, 0.71516, 0.072169, 0, 0, 
			0, 0, 0, 1, 0
			];
		return new egret.ColorMatrixFilter(matrix);
	}
}