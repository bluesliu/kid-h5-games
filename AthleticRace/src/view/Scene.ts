//场景
class Scene extends egret.Sprite{

	public stoneLayer:egret.Sprite;

	public constructor() {
		super();
		this.graphics.beginFill(0x8DC917);
		this.graphics.drawRect(0,0,Game.instance.stageW,Game.instance.stageH);
		this.graphics.endFill();

		this.stoneLayer = new egret.Sprite();
		this.addChild(this.stoneLayer);

		let track = DisplayUtil.createBitmapByName("track_png");
		this.addChild(track);
	}

}