class ZuoYouButton extends egret.Sprite{
	private _btn:egret.Bitmap;
	private _zuo:egret.Sprite;
	private _you:egret.Sprite;
	public _fangXiang:number=-1;
	public constructor() {
		super();
		this.chushi();
	}
	private chushi():void{
		this._btn=new egret.Bitmap();
		this._btn.texture=RES.getRes("zuoyou_png");
		this.addChild(this._btn);

		this._zuo=new egret.Sprite();
		this._zuo.graphics.beginFill(0xfff000,0);
		this._zuo.graphics.drawRect(0,0,200,220);
		this._zuo.graphics.endFill();
		this.addChild(this._zuo);

		this._you=new egret.Sprite();
		this._you.graphics.beginFill(0xfff000,0);
		this._you.graphics.drawRect(0,0,200,220);
		this._you.graphics.endFill();
		this._you.x=800;
		this.addChild(this._you);

		this._zuo.touchEnabled=true;
		this._you.touchEnabled=true;

		this._zuo.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
			this._fangXiang=-1;
			this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		},this);
		this._zuo.addEventListener(egret.TouchEvent.TOUCH_END,()=>{
			
			this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		},this);


		this._you.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
			this._fangXiang=1;
			this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		},this);
		this._you.addEventListener(egret.TouchEvent.TOUCH_END,()=>{
			this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		},this);

	}

	private onEnterFrame(e:egret.Event):void{
		this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
	}
}