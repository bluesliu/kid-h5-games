class DaoJiShi extends egret.DisplayObjectContainer {

	private zhushiBtmp:egret.Bitmap;
	private shuzi1:egret.Bitmap;
	private shuzi2:egret.Bitmap;
	private shuzi3:egret.Bitmap;
	private id:number=0;
	private jiShiTime:egret.Timer;
	public constructor() {
		super();
		this.chushi();
	}

	/**
	 * 初始化内部对象
	 */
	private chushi():void{
		this.zhushiBtmp=new egret.Bitmap();
		this.zhushiBtmp.texture=RES.getRes("zhuangshi_png");
		this.addChild(this.zhushiBtmp);
		console.log('zhuangshi');
		

		this.shuzi1=new egret.Bitmap();
		this.shuzi1.texture=RES.getRes("shuZi1_png");
		this.addChild(this.shuzi1);
		this.shuzi1.visible=false;
        this.shuzi1.x=120;
		this.shuzi1.y=120;


		this.shuzi2=new egret.Bitmap();
		this.shuzi2.texture=RES.getRes("shuZi2_png");
		this.addChild(this.shuzi2);
		this.shuzi2.visible=false;
		this.shuzi2.x=120;
		this.shuzi2.y=120;


		this.shuzi3=new egret.Bitmap();
		this.shuzi3.texture=RES.getRes("shuZi3_png");
		this.addChild(this.shuzi3);
		this.shuzi3.visible=false;
		this.shuzi3.x=120;
		this.shuzi3.y=120;

		this.jiShiTime=new egret.Timer(1000);
        this.jiShiTime.addEventListener(egret.TimerEvent.TIMER,this.onTimeCom,this);
		
	}
    private onTimeCom(e:egret.TimerEvent):void{
		
		this.clearAll();
		this.id+=1;
		console.log(this.id);
		
		if(this.id==4){
			this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
			this.jiShiTime.stop();
			return;
		}
		if(this.id==3){
			this.shuzi1.visible=true;
		
		}
		if(this.id==2){
		
			this.shuzi2.visible=true;
		
		}
		if(this.id==1){
		
			this.shuzi3.visible=true;	
		}
		
	}
	private clearAll():void{
		this.shuzi1.visible=false;
		this.shuzi2.visible=false;
		this.shuzi3.visible=false;
	}
	/**
	 * 
	 * 开始倒计时
	 */
	public init():void{
		this.jiShiTime.start();
	}
}