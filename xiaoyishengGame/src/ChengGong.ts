class ChengGong extends egret.Sprite {
	public constructor() {
		super();
		var bitmap:egret.Bitmap=new egret.Bitmap();
		bitmap.texture=RES.getRes("Level_Completed_png");
		this.addChild(bitmap);
	}
}