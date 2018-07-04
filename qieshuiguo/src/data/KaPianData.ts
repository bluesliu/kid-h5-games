class KaPianData extends egret.Sprite {
	private imageUrl:string;
	private soundUrl:string; 
	private imageLoader:egret.ImageLoader;
	private soundLoader:egret.URLLoader;
	private image:egret.Bitmap;
    public sound:egret.Sound;
	public isPlay:boolean=true;
	public constructor() {
		super();

		this.imageLoader=new egret.ImageLoader();
		this.imageLoader.addEventListener(egret.Event.COMPLETE,this.imageCom,this);

		this.soundLoader=new egret.URLLoader();
		this.soundLoader.addEventListener(egret.Event.COMPLETE,this.soundCom,this);

		this.image=new egret.Bitmap();
		this.addChild(this.image);

		this.sound=new egret.Sound();
		this.sound.addEventListener(egret.Event.COMPLETE,this.soundCom,this);

		this.touchEnabled=true;
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onThisTouchMove,this);
		// this.addEventListener(egret.TouchEvent.tou,this.onThisTouchEnd,this)
	
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.inStage,this);

	}
	private inStage(e:egret.Event):void{
			this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onThisTouchEnd,this);
	}
	private onThisTouchEnd(e:egret.TouchEvent):void{
		console.log("chumojieshu")
		this.dispatchEvent(new egret.Event(egret.Event.CLOSE));
	}
	private onThisTouchMove(e:egret.TouchEvent):void{
	
		
		this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
	}
	public setUrl(url1:string,url2:string,name:string):void{
		this.name=name;
		this.imageUrl=url1;
		this.soundUrl=url2;
		// this.imageLoader.load(this.imageUrl);

		  this.image.texture=RES.getRes(this.imageUrl);
		  this.image.width=200;
		  this.image.height=200;
		this.addChild(this.image);

		this.sound=<any>RES.getRes(this.soundUrl);

	}
	public imageCom(e:egret.Event):void{
		
		
		this.image.texture=e.target.data;
		this.addChild(this.image);

		
		this.soundLoader.dataFormat=egret.URLLoaderDataFormat.SOUND;
		var req:egret.URLRequest=new egret.URLRequest();
		req.url=this.soundUrl;
		
        this.sound.load(this.soundUrl);
	}
	private soundCom(e:egret.Event):void{
		console.log("bofangwanc")
		this.isPlay=true;
		this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
	}
}