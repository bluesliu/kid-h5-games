class YouXi extends egret.Sprite {
	public _youxiType:string;   //游戏类别  由资源的类型决定
	private _youXiData:any;	  // 游戏一个关卡的资源
	private _timuID:number;
	private _yaoPingArr:any=[];   //游戏题目的备选项   药瓶子
	private _yaoPinSP:egret.Sprite;
	public _dataArr:any;
	private _isDianJi:boolean=false;
    private _time:egret.Timer=new egret.Timer(2000);
	private _isJieGuo:boolean=true;
	private _daTiBan:egret.Bitmap;
	private _bmp:egret.Bitmap;
	private _txt:egret.TextField;
	private _sound:SoundPlayer;

	private _ren:Ren;
	private _dog:Dog;
	private _timuBmp:egret.Bitmap;
	public constructor() {
		super();

	}
	public init():void{
		this._yaoPinSP=new egret.Sprite();
		this.addChild(this._yaoPinSP);
		// this._yaoPinSP.x=150;
		this._yaoPinSP.x=-1000;
		this._yaoPinSP.y=110;
		this._yaoPinSP.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTap,this);


		this._daTiBan=new egret.Bitmap();
		console.log(this._youxiType)
		
		if(this._youxiType=="changImage"){
			this._daTiBan.texture=RES.getRes("daTi_1_png");
           this.addChild(this._daTiBan);
		   this._daTiBan.x=(1366-this._daTiBan.width)/2;
		   this._daTiBan.y=(1024-this._daTiBan.height)-50;
		   this._txt=new egret.TextField();
		   this._txt.width=300;
		   this._txt.textColor=0x000000;
		   this._txt.size=40;
	       this._txt.bold=true;
	       this.addChild(this._txt);
		   this._txt.x=this._daTiBan.x+140;
		   this._txt.y=this._daTiBan.y+50;
		}else{
			this._daTiBan.texture=RES.getRes("daTi_2_png");
           this.addChild(this._daTiBan);
		   this._daTiBan.x=(1366-this._daTiBan.width)/2;
		   this._daTiBan.y=(1024-this._daTiBan.height)-50;
			this._txt=new egret.TextField();
		   this._txt.width=300;
		   this._txt.textColor=0x000000;
		   this._txt.size=40;
	       this._txt.bold=true;
	       this.addChild(this._txt);
		   this._txt.x=this._daTiBan.x+150;
		   this._txt.y=this._daTiBan.y+330;
		}
		


		this._time.addEventListener(egret.TimerEvent.TIMER,this.tuiChang,this);
        this._sound=new SoundPlayer();

		this._ren=new Ren();
		this.addChild(this._ren);
		this._ren.x=50;
		this._ren.y=500;

		this._dog=new Dog();
		this.addChild(this._dog);
		this._dog.x=1000;
		this._dog.y=600;

		this._timuBmp=new egret.Bitmap();
		
	
	}
	public setID(id:number):void{
		this.reset();
        this._ren.pingchang();
		this._dog.shangxin();

	    this._timuID=id;
		this._yaoPingArr=[];
	
         this._txt.text=this._dataArr[id+1].tiMu;
		if(this._youxiType!="changImage"){
			this._timuBmp.texture=RES.getRes(this._dataArr[id+1].tupian);
			this.addChild(this._timuBmp);
			this._timuBmp.width=200;
			this._timuBmp.height=250;
			this._timuBmp.x=580;
			this._timuBmp.y=560;
		}
		
		for(var i:any=0;i<(this._dataArr[id+1].xuanXiang as any).length;i++){
		
			var yaoping:YaoPingView=new YaoPingView();
			yaoping.setStr(this._dataArr[id+1].xuanXiang[i]);
			this._yaoPingArr.push(yaoping);
			this._yaoPinSP.addChild(yaoping);
			yaoping.x=i*290;
			yaoping.name="btn_"+i;
			yaoping.touchEnabled=true;
		}
		// egret.Tween.get(this._linShiArr[n]).to({y:300},500,egret.Ease.sineIn).call(this.donghuaCom,this);
		if(this._youxiType=="changImage"){
           egret.Tween.get(this._yaoPinSP).to({x:150},500,egret.Ease.sineIn).call(this.playMusic,this);
		}else{
			  egret.Tween.get(this._yaoPinSP).to({x:150},500,egret.Ease.sineIn).call(this.playMusic,this);
		}
		
       
	}
    /**
	 * 播放声音并打开点击事件
	 */
	private playMusic():void{
      this._isDianJi=true;
	  console.log(this._dataArr[this._timuID+1].shengyin)
	  this._sound.playRes(this._dataArr[this._timuID+1].shengyin)
	}
	private touchTap(e:egret.TouchEvent):void{
		if(this._isDianJi==false)return;
		var n:number=<number>e.target.name.split("_")[1];

		this._isDianJi=false;
	    var x:number=this._yaoPingArr[n].x;
		 var y:number=this._yaoPingArr[n].y+120;
	   this._bmp=this._yaoPingArr[n].bmp;
	   this.addChild(this._bmp);
	   this._bmp.x=this._yaoPinSP.x+x;
	    this._bmp.y=this._yaoPinSP.y+y;
		if(n==<number>this._dataArr[this._timuID+1].daAn){
			console.log("zhegnque")
			this._isJieGuo=true;
			if(this._youxiType=="changImage"){
				  egret.Tween.get(this._bmp).to({x:620,y:720},500,egret.Ease.sineIn);
			}else{
				  egret.Tween.get(this._bmp).to({x:650,y:840},500,egret.Ease.sineIn);
			}
		 
		    this._ren.kaixin();
		   this._dog.kaixin();
		}else{
			console.log("cuowu")
			this._isJieGuo=false;
			  egret.Tween.get(this._bmp).to({y:-720},500,egret.Ease.sineIn);
			   this._ren.shangxin();
		      this._dog.shangxin();
		
		}
	
		
      
		// this.tuiChang();
		this._time.start();
	}
   
	/**
	 * 退场
	 */
	private tuiChang(e:egret.TimerEvent):void{
		this._time.stop();
		this.tuichangDongHua();
      
	}
	private tuichangDongHua():void{
          egret.Tween.get(this._yaoPinSP).to({x:-1500},500,egret.Ease.sineIn).call(this.tuichangCom,this);
	}
	/**
	 * 退场完成
	 */
	private tuichangCom(){
		console.log("qingchu")
		var n:number=this._yaoPinSP.numChildren;
		for(var i:number=0;i<n;i++){
			this._yaoPinSP.removeChildAt(0);
		}
		if(this._isJieGuo){
	        this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
		}else{
	       this.dispatchEvent(new egret.Event(egret.Event.CLOSE));
		}
	}

	private reset():void{
		if(this._bmp!=null){
			this._bmp.x=-500;
		}
	}

}