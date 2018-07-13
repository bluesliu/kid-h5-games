class Ren extends egret.Sprite {
	private _bmp:egret.Bitmap;
	public constructor() {
		super();
		this._bmp=new egret.Bitmap();
		this.addChild(this._bmp);
	}
	public shangxin():void{
		this._bmp.texture=RES.getRes("renSX_png");
	}

	public pingchang():void{
		this._bmp.texture=RES.getRes("renPC_png");
	}

	public kaixin():void{
		this._bmp.texture=RES.getRes("renKX_png");
	}
}