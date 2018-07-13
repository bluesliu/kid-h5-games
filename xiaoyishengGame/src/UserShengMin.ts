class UserShengMin extends egret.Sprite{


   private sp:egret.Sprite;
   private sp_mask:egret.Sprite;
	public constructor() {
		super();
		this.init();
	}


    
	private init():void{


		var bg:egret.Bitmap=new egret.Bitmap();
        var bmp:egret.Texture=RES.getRes("hongXin_png");
        bg.texture=bmp;
		this.sp=new egret.Sprite();
		this.addChild(this.sp);
		this.sp.addChild(bg);
		this.sp.height=20;
		
		console.log(this.sp.height);
		
		
		
		// this.sp_mask=new egret.Sprite();
		// this.sp_mask.graphics.beginFill(0xfff000,1);
		// this.sp_mask.graphics.drawRect(0,0,this.sp.width,200);
		// this.sp_mask.graphics.endFill();
		// this.addChild(this.sp_mask);
		// this.sp.mask=this.sp_mask;
		// this.addEventListener(egret.Event.ENTER_FRAME,this.onEnter,this);

	}

	private onEnter(e:egret.Event):void{
		this.sp_mask.scaleX=this.sp_mask.scaleX-0.01;
		console.log(this.sp_mask.width,this.sp_mask.scaleX);
		this.sp.height=20;
		// this.sp.mask=this.sp_mask;
		if(this.sp_mask.scaleX<0.01){
			this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnter,this);
		}
	}
}