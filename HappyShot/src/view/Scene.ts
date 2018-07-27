//场景
class Scene extends egret.Sprite{

	private m_bg:egret.Bitmap;
	public cardLayer:egret.Sprite;

	public constructor() {
		super();
		this.m_bg = DisplayUtil.createBitmapByName("bg_png");
		this.addChild(this.m_bg);

		this.cardLayer = new egret.Sprite();
		this.addChild(this.cardLayer);

		let maskMC = new egret.Sprite();
		maskMC.graphics.beginFill(0xff0000);
		maskMC.graphics.drawRect(182,304,1002,377);
		this.addChild(maskMC);
		this.cardLayer.mask = maskMC;

	}

}