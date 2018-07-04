class JiXiangWu extends egret.Sprite {
	private _pingchang:egret.Bitmap;
	private _jieshu:egret.Bitmap;
	private _chenggong:egret.Bitmap;
	private _kaixin:egret.Bitmap;
	private _bukaixin:egret.Bitmap;
	private _time:egret.Timer;
	public constructor() {
		super();
		this.chushi();
	}
	private chushi():void{
		this._pingchang=new egret.Bitmap();
		this._pingchang.texture=RES.getRes("kaTong_png");
		this.addChild(this._pingchang);

		this._jieshu=new egret.Bitmap();
		this._jieshu.texture=RES.getRes("Long_shiBai_png");
		this.addChild(this._jieshu);
		this._jieshu.visible=false;
		this._jieshu.x=120;

		this._chenggong=new egret.Bitmap();
		this._chenggong.texture=RES.getRes("Long_chenggong_png");
		this.addChild(this._chenggong);
		this._chenggong.visible=false;

		this._kaixin=new egret.Bitmap();
		this._kaixin.texture=RES.getRes("kaixin_png");
		this.addChild(this._kaixin);
		this._kaixin.visible=false;

		
		this._bukaixin=new egret.Bitmap();
		this._bukaixin.texture=RES.getRes("shibai_png");
		this.addChild(this._bukaixin);
		this._bukaixin.visible=false;

		this._time=new egret.Timer(5000);
		this._time.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
	}
    public clear():void{
		this._pingchang.visible=false;
		this._jieshu.visible=false;
		this._chenggong.visible=false;
		this._kaixin.visible=false;
		this._bukaixin.visible=false;
	}
    /**
	 * 显示平常
	 */
	public pingchang():void{
		this.clear();
		this._pingchang.visible=true;
	}
	/**
	 * 显示开心
	 */
	public kaixin():void{
		this.clear();
		this._kaixin.visible=true;
		this._time.reset();
		this._time.start();
	}
	/**
	 * 显示不开心
	 */
	public shibail():void{
		this.clear();
		this._bukaixin.visible=true;
		this._time.reset();
		this._time.start();
	}
	/**
	 * 显示失败了
	 */
	public jieshu():void{
		this.clear();
		this._jieshu.visible=true;
		
	}

	/**
	 * 显示成功了
	 */
	public chenggongl():void{
		this.clear();
		this._chenggong.visible=true;
	}
	private onTimer(e:egret.TimerEvent):void{
		this.pingchang();
		this._time.stop();
	}
}