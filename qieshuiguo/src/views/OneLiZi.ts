class OneLiZi extends egret.Sprite {
	private _texture:egret.Texture;
	private _conf:any;
	private system:particle.GravityParticleSystem;
	public constructor() {
		super();
		
	}
	public init():void{
		this._texture=RES.getRes("leaftexiao_png");
		this._conf=RES.getRes("sun_json");
		this.system = new particle.GravityParticleSystem(this._texture, this._conf);
        this.addChild(this.system);
		this.system.start();
		//this.system.stop();
		egret.setTimeout(this.clear,this,100);
	}

	private clear():void{
		this.system.stop();
	}
}