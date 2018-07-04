class BiChuView extends egret.Sprite {
	private _bichu:egret.Bitmap;
	public constructor() {
		super();
		this._bichu=new egret.Bitmap();
		this._bichu.texture=RES.getRes("bichu_png");
		this._bichu.scaleX=this._bichu.scaleY=2;
		this.addChild(this._bichu);
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onStage,this);
	}
	private onStage(e:egret.Event):void{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onStage,this);
		egret.setTimeout(this.qingchu,this,300);
	}
	private qingchu():void{
		this.removeChild(this._bichu);
		this.parent.removeChild(this);
		this._bichu=null;
	}

}