class YouXiView extends egret.Sprite {

	private arr:any[];
	private _id:number;
	private _sp:egret.Sprite;
	private _linShiArr:any[]=[];
	private _nameArr:any[]=[];

	private _isChengGong:Boolean=false;
	private _isShiBai:boolean=false;
	private _isTouch:Boolean=false;
	private _chongboTime:egret.Timer;

	private _chuxianTime:egret.Timer;
	private _nowArr:any[];
	private _ren:Ren;
	private _zuoyou:ZuoYouButton;

	private _isJianCe:boolean=true;
	private _isJieShu:boolean=false;
	public constructor() {
		super();
		this.chushi();
	}

	private chushi():void{
		this._sp=new egret.Sprite();
		this.addChild(this._sp);

		this._chongboTime=new egret.Timer(10000);
		this._chongboTime.addEventListener(egret.TimerEvent.TIMER,this.chongboshenying,this);

		this._chuxianTime=new egret.Timer(1500);
		this._chuxianTime.addEventListener(egret.TimerEvent.TIMER,this.onChuXian,this);
		this._nowArr=[];

		this._ren=new Ren();
	
		this.addChild(this._ren);

		this._ren.anchorOffsetX=this._ren.width/2;
		this._ren.anchorOffsetY=this._ren.height/2;
		this._ren.y=1024-this._ren.height+this._ren.height/2;;
		this._ren.x=(1366)/2;
		
		this._zuoyou=new ZuoYouButton();
		
		this.addChild(this._zuoyou);
		this._zuoyou.x=(1366-this._zuoyou.width)/2;
		this._zuoyou.y=1024-this._zuoyou.height-20;
		this._zuoyou.addEventListener(egret.Event.COMPLETE,this.onZuoYouCom,this);

		this.addEventListener(egret.Event.ENTER_FRAME,this.jianCePengZhuang,this);
		
	}
	/**
	 * 检测碰撞
	 */
	private jianCePengZhuang(e:egret.Event):void{
		
		
		if(!this._isJianCe){
			return;
		}
		for(var n:number=0;n<this._nowArr.length;n++){
		
			
			var isHit:boolean = this._nowArr[n].hitTestPoint( this._ren.x, this._ren.y, false);
			if(isHit){
				
				this.zhuangShangl(n);
				
			}
		}
	}
	/**
	 * 碰撞上了
	 * 1 判断是否是正确的判断
	 * 2 停止生成卡片  停止卡片动画
	 */
	private zhuangShangl(c:number):void{
		var xuhao:any=((<KaPianData>this._nowArr[c]).name.split("_")[1]);
		//停止检测
		this._isJianCe=false;
		
		//停止所有动画
		for(var n:number=0;n<this._nowArr.length;n++){
			egret.Tween.pauseTweens((<KaPianData>this._nowArr[n]));
		}

		//停止生成卡片
		this._chuxianTime.stop();
		//判断是否是正确的卡片
		if(xuhao==this._id){
			egret.Tween.get(this.arr[xuhao]).to({x:500,y:200,scaleX:2,scaleY:2},500,egret.Ease.sineIn).wait( 1000 )
			.to({y:-500},500,egret.Ease.sineIn);
			this._isChengGong=true;
			this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
			this._ren.kaixin();
		}else{
			egret.Tween.get(this.arr[xuhao]).to({alpha:0},500,egret.Ease.sineIn).wait( 10 )
			.to({alpha:1,y:1500},500,egret.Ease.sineIn);
			this._isChengGong=false;
			this._ren.shibail();
			this.dispatchEvent(new egret.Event(egret.Event.CLOSE));
		}
		this._nowArr.splice(c,1);
		egret.setTimeout(this.wangcheng,this,2500);

	}

	private wangcheng():void{
		if(this._isJieShu){
			return;
		}
		//开始检测
		this._isJianCe=true;
		//恢复动画
		for(var n:number=0;n<this._nowArr.length;n++){
			egret.Tween.resumeTweens((<KaPianData>this._nowArr[n]));
		}
	

		if(this._isChengGong){
			// this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
		}else{
			// this.dispatchEvent(new egret.Event(egret.Event.CLOSE));
			this.chongboshenying(null);
		}
		//恢复出现新卡片
		this._chuxianTime.start();
		this._ren.pingchang();
	}
	private onZuoYouCom(e:egret.Event):void{
		this._ren.x+=25*(this._zuoyou._fangXiang);
		this._ren.scaleX=-this._zuoyou._fangXiang;
	}
	private onChuXian(e:egret.TimerEvent):void{
		for(var i:number=0;i<1;i++){
			var kaPian:KaPianData=this.tiaoXuan();
			if(kaPian==null){
				i--;
			}
		}

		this._nowArr.push(kaPian);
		this._sp.addChild(kaPian);
		kaPian.y=-300;
		kaPian.scaleX=kaPian.scaleY=1;
		kaPian.x=Math.random()*1000+10;
		egret.Tween.get(kaPian).to({y:1100},4000,egret.Ease.sineIn).call(this.tweenEnd,this,[kaPian])
	}
	private tweenEnd(e:any):void{
		var n:number=this._nowArr.indexOf(e);
		this._nowArr.splice(n,1);
		
	}
	/**
	 * 挑选一个合适的卡片
	 * 如果此题的答案不在显示区域内，则挑选该题的答案
	 */
	private tiaoXuan():any{
		if(this._nowArr.indexOf(this.arr[this._id])==-1){
			var n:number=Math.random();
			if(n<0.3){
				return this.arr[this._id];
			}
			
		}

		var n:number=Math.floor(Math.random()*this.arr.length);
		if(this._nowArr.indexOf(this.arr[n])==-1){
			return this.arr[n];
		}else{
           return null;
		}
		
	}

	/**
	 * 结束游戏
	 */
	private jishu():void{

		console.log("jieshuyouxi+++++++++++++++++++++++++++");
		this._isJieShu=true;
		//停止检测
		this._isJianCe=false;
		
		//停止所有动画
		for(var n:number=0;n<this._nowArr.length;n++){
			(<KaPianData>this._nowArr[n]).y=-1500;
			egret.Tween.pauseTweens((<KaPianData>this._nowArr[n]));
		}
    //    this._nowArr=[];
		//停止生成卡片
		this._chuxianTime.stop();

		//停止声音
		this._chongboTime.stop();
	}
	

	/**
	 * 重播一次声音
	 */
	private chongboshenying(e:egret.TimerEvent):void{
		(<KaPianData>this.arr[this._id]).sound.play(0,1);
	}
	public setArr(arr:any):void{
		this.arr=arr;
		
		
	}
	public setID(id:number):void{
		this._id=id;
		this._chuxianTime.start();
		this._isJianCe=true;
		(<KaPianData>this.arr[this._id]).sound.play(0,1);
	}

	public chenggong():void{
		this._ren.chenggongl();
		this.jishu();
	}
	public shibai():void{
		this._ren.jieshu();
		this.jishu();
	}


	public stop():void{
		
		this._chongboTime.stop();
	}
	public kashi():void{
		this._isJieShu=false;
		this._chongboTime.reset();
		// this._chongboTime.start();
		this._isJianCe=true;
	}
}