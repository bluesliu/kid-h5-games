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
	private _isJianCe:Boolean=true;
	public constructor() {
		super();
		this.chushi();
	}

	private chushi():void{
		this._sp=new egret.Sprite();
		this.addChild(this._sp);

		this._chongboTime=new egret.Timer(10000);
		this._chongboTime.addEventListener(egret.TimerEvent.TIMER,this.chongboshenying,this);
	
	}
	private clear():void{
		var n:number=this._sp.numChildren;
		for(var i:number=0;i<n;i++){
			this._sp.removeChildAt(0);
		}
		this._linShiArr=[];
	}
	public setID(id:number):void{
	
		this._id=id;
		this._isJianCe=true;
		this._isTouch=true;
		this.clear();
		this._chongboTime.reset();
		this._chongboTime.start();
		this._linShiArr.push(this.arr[this._id]);
        for(var i:number=0;i<3;i++){
			var kapian:KaPianData=this.tiaoXuan();
		
			if(this._linShiArr.indexOf(kapian)==-1){
				var a:number=Math.random();
		
				
				if(a>0.5){
					kapian.scaleX=kapian.scaleY=1;
					this._linShiArr.push(kapian);
				}else{
					kapian.scaleX=kapian.scaleY=1;
					this._linShiArr.splice(0,0,kapian);
				}
			
			}else{
				i--;
			}
			
		}
		console.log(this._linShiArr.length);
		

		for(var c:number=0;c<4;c++){
		
			
		}

		for(var n:number=0;n<this._linShiArr.length;n++){
		
			this._sp.addChild(<KaPianData>this._linShiArr[n]);
			(<KaPianData>this._linShiArr[n]).x=n*300+135;
			(<KaPianData>this._linShiArr[n]).y=1300;
			if(n==this._linShiArr.length-1){
				egret.Tween.get(this._linShiArr[n]).to({y:300},500,egret.Ease.sineIn).call(this.donghuaCom,this);
			}else{
				egret.Tween.get(this._linShiArr[n]).to({y:300},500,egret.Ease.sineIn)
			}
			
			
		}

	}
	private donghuaCom():void{
		(<KaPianData>this.arr[this._id]).sound.play(0,1);
	}
	private tiaoXuan():any{
		 var i:number=Math.floor(Math.random()*this.arr.length);
	
		 return this.arr[i];

	}
	private onKaPianChange(e:egret.Event):void{
		if(this._isJianCe==false){
			return;
		}
		var str:string=e.target.name;
		if(str.split("_")[0]=="kapian"&&(<any>(str.split("_")[1]))!=this._id){
			this._isShiBai=true;
			this._isJianCe=false;
			
		}
		if(str.split("_")[0]=="kapian"&&(<any>(str.split("_")[1]))==this._id){
			this._isChengGong=true;
			this._isJianCe=false;
		}
		(<KaPianData>this.arr[(<any>(str.split("_")[1]))]).scaleX=(<KaPianData>this.arr[(<any>(str.split("_")[1]))]).scaleY=1.1;
	}

	private onKaPianClose(e:egret.Event):void{
		this._chongboTime.reset();
		this._chongboTime.start();
		if(this._isChengGong&&!this._isShiBai&&this._isTouch){
			this._isTouch=false;
			this.tuichang("chenggong");
			egret.Tween.get(this.arr[this._id]).to({x:500,y:300,scaleX:2,scaleY:2},500,egret.Ease.sineIn);
			this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
			egret.setTimeout(()=>{
				
				egret.Tween.get(this.arr[this._id]).to({y:-500,scaleX:1,scaleY:1},300,egret.Ease.sineIn).call(this.tuichangCom,this,["chenggong"]);
			},
			this,3000);
		}
		/**
		 * 失败了  再播放一次音乐  再来一次
		 */
		if(this._isShiBai){
			egret.setTimeout(()=>{
				
					// (<KaPianData>this.arr[this._id]).sound.play(0,1);
					this.dispatchEvent(new egret.Event(egret.Event.CLOSE));
			},
			this,1000);
			//  this.dispatchEvent(new egret.Event(egret.Event.CLOSE));
			for(var n:number=0;n<this._linShiArr.length;n++){
				egret.Tween.get(this._linShiArr[n]).to({y:-300,},500,egret.Ease.sineIn);
			
			
			
		}
			
		}
		this._isChengGong=false;
		this._isShiBai=false;


	}
	private tuichang(str:string):void{
		// egret.setTimeout(this.tuichangCom,this,500);
			
		for(var n:number=0;n<this._linShiArr.length;n++){
			if(this._linShiArr[n]!=this.arr[this._id]){
				egret.Tween.get(this._linShiArr[n]).to({y:-300,},500,egret.Ease.sineIn);
			}
			
			
		}
	}

	private tuichangCom(str:string):void{
	
		//this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
		// if(str=="chenggong"){
		// 	this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
		// }
		// if(str=="shibai"){
		// 	this.dispatchEvent(new egret.Event(egret.Event.CLOSE));
		// }
	}
	/**
	 * 重播一次声音
	 */
	private chongboshenying(e:egret.TimerEvent):void{
		(<KaPianData>this.arr[this._id]).sound.play(0,1);
	}
	public setArr(arr:any):void{
		this.arr=arr;
		for(var i:number=0;i<this.arr.length;i++){
			(<KaPianData>this.arr[i]).addEventListener(egret.Event.CHANGE,this.onKaPianChange,this);
			(<KaPianData>this.arr[i]).addEventListener(egret.Event.CLOSE,this.onKaPianClose,this);
		}
		
	}

	public stop():void{
		this._chongboTime.stop();
	}
	public kashi():void{
		this._chongboTime.reset();
		this._chongboTime.start();
	}
}