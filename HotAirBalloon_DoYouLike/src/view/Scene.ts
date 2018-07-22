//场景
class Scene extends egret.Sprite{

	private m_bg:egret.Bitmap;
	

	public constructor() {
		super();
		this.m_bg = DisplayUtil.createBitmapByName("bg_png");
		this.addChild(this.m_bg);

	}

}