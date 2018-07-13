class MainContent extends egret.Sprite {

	private _shenming:ShenMingView;
	private _jifen:JiFenView;
	private _dataArr:any=[];
	private _youxi:YouXi;
	private _guanQiaID:any=0;
	private _kaiShi:egret.Bitmap;
	private _sp:egret.Sprite;
	private _chengong:ChengGong;
	private _shibai:ShiBai;
	private _zhezhao:egret.Bitmap;
	private _sound:SoundPlayer;
	public constructor() {
		super();
	//	this.init();
	}
	public init(str:string){
		var bj:egret.Bitmap=new egret.Bitmap();
		bj.texture=RES.getRes("beijing_png");
		this.addChild(bj);

		this._shenming=new ShenMingView();
		this._shenming.x=182;
		this._shenming.y=11;
	
		this.addChild(this._shenming);
		this._shenming.addEventListener(egret.Event.CLOSE,this.youXiJieShu,this);
		
		this._dataArr=RES.getRes(str+"_json");
		console.log(this._dataArr[1].xuanXiang)
		this._jifen=new JiFenView();
		this._jifen.chushi(this._dataArr.length-1);
		this.addChild(this._jifen);
		this._jifen.y=10;
		this._jifen.x=1300-this._jifen.width;

		this._youxi=new YouXi();
		this.addChild(this._youxi);
		
		console.log(this._dataArr[0].type)
        this._youxi._youxiType=this._dataArr[0].type;
		this._youxi._dataArr=this._dataArr;
		this._youxi.addEventListener(egret.Event.COMPLETE,this.onYouXiCom,this);
		this._youxi.addEventListener(egret.Event.CLOSE,this.onClose,this);
		this._youxi.init();
	  //  setTimeout(this.kaishi,500);
	 

      

	  this._sp=new egret.Sprite();
	  this.addChild(this._sp);
	  this._kaiShi=new egret.Bitmap();
      this._kaiShi.texture=RES.getRes("kaishi_png");
	  this._sp.addChild(this._kaiShi);
	  this._sp.touchEnabled=true;
      this._sp.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onKaiShi,this);
      this._sp.x=(1366-this._kaiShi.width)/2;
	  this._sp.y=(1024-this._kaiShi.height)/2;

	  this._shibai=new ShiBai();
	  this._shibai.visible=false;
	  this.addChild(this._shibai);
	  this._shibai.x=(1366-this._shibai.width)/2;
	  this._shibai.y=(1024-this._shibai.height)/2;
      this._shibai.touchEnabled=true;
	  this._shibai.addEventListener(egret.TouchEvent.TOUCH_TAP,this.ChongLai,this);


	  this._chengong=new ChengGong();
	  this._chengong.visible=false;
	  this.addChild(this._chengong);
	  this._chengong.x=(1366-this._chengong.width)/2;
	  this._chengong.y=(1024-this._chengong.height)/2;
      

	}
	private onKaiShi(e:egret.TouchEvent){
		   this._sound=new SoundPlayer();
		      this._sound.playRes("bgmusic_mp3",1000);
		this._sp.visible=false;
       this.kaishi();
	}
	private kaishi(){
		setTimeout(this._youxi.setID(0),500);
    
	}

	//口渴  基尔
    /**
	 * 游戏一关成功了
	 */
    private onYouXiCom(e:egret.Event):void{
		console.log("chenggong")
		this._jifen.chengong();
		this._guanQiaID++;
		if(this._guanQiaID<this._dataArr.length-1){
				this._youxi.setID(this._guanQiaID);
		}else{
		this._chengong.visible=true;
	  this.addChild(this._chengong);
		}
	}
	/**
	 * 游戏一关失败了
	 */
	private onClose(e:egret.Event):void{
		// console
       this._shenming.siwang();
	   if(this._shenming._id!=-1){
          this._youxi.setID(this._guanQiaID);
	   }
	  
	}

	/**
	 * 游戏失败，结束
	 */
	private youXiJieShu(e:egret.Event){
		 this._shibai.visible=true;
	  this.addChild(this._shibai);
	}
	private ChongLai(e:egret.TouchEvent):void{
 		this._shibai.visible=false;

		 this._shenming.reset();
		 this._jifen.reset();
		 this._guanQiaID=0;
		 	this._youxi.setID(this._guanQiaID);
	}
}