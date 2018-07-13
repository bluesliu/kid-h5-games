class YaoPingView extends egret.Sprite {
	private _bj:egret.Bitmap;
	public bmp:egret.Bitmap;
	public constructor() {
		super();
		this._bj=new egret.Bitmap();
		this.addChild(this._bj);
		this._bj.texture=RES.getRes("yaopin_png");

	}
	public setStr(str:string):void{
		this.bmp=new egret.Bitmap();
		console.log(str);
		this.bmp.texture=RES.getRes(str);
		this.addChild(this.bmp);
	
		this.bmp.scaleX=this.bmp.scaleY=Math.min(170/this.bmp.width,120/this.bmp.height);
	
		this.bmp.y=155;
		this.bmp.x=(this._bj.width-this.bmp.width*this.bmp.scaleY)/2;
	}
	// public clear():void{
	// 	this.bmp
	// }

}