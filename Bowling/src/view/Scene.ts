//场景
class Scene extends egret.Sprite{

	public stoneLayer:egret.Sprite;

	public constructor() {
		super();
		

		let bg = DisplayUtil.createBitmapByName("bg_png");
		this.addChild(bg);
	}

}