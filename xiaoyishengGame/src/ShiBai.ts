class ShiBai extends egret.Sprite {
	public constructor() {
		super();
		var bmp:egret.Bitmap=new egret.Bitmap();
		bmp.texture=RES.getRes("game_over_png");
		this.addChild(bmp);


		var sp:egret.Sprite=new egret.Sprite();
		this.addChild(sp);
		
		var bmp1:egret.Bitmap=new egret.Bitmap();
		bmp1.texture=RES.getRes("tryagain_png");
		sp.addChild(bmp1);
		sp.x=100;
		sp.y=bmp.height+50;
	}
}