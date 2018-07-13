class Dog extends egret.Sprite {
	private _bmp:egret.Bitmap;
	public constructor() {
		super();
		this._bmp=new egret.Bitmap();
		this.addChild(this._bmp)

	}
	public kaixin():void{
		this._bmp.texture=RES.getRes("dogkx_png");
	}
	public shangxin():void{
		this._bmp.texture=RES.getRes("dogSX_png");
	}
}