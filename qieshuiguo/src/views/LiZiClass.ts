class LiZiClass extends egret.Sprite {
	private _texture:egret.Texture;
	private _conf:any;
	private system:particle.GravityParticleSystem;
	public constructor() {
		super();
		
		
		this._texture=RES.getRes("rock_png");
		this._conf=RES.getRes("sun_json");

 	

	

	}
	
	private begin(e:egret.TouchEvent):void{
		//this.system.start();
		var s:OneLiZi=new OneLiZi();
		this.addChild(s);
		s.init();
		s.x=e.stageX;
		s.y=e.stageY;
	}
	public move(e:egret.TouchEvent):void{
		var s:OneLiZi=new OneLiZi();
		this.addChild(s);
		s.init();
		s.x=e.stageX;
		s.y=e.stageY;
	}
	private end(e:egret.TouchEvent):void{
		//this.system.stop();
	}
}