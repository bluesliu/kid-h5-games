//游戏场景
class GameScene extends egret.Sprite{

	public cardContainer:egret.Sprite;
	public roleContainer:egret.Sprite;

	private m_bg:egret.Bitmap;							//背景
	private m_ribbon:egret.Bitmap;

	public constructor() {
		super();

		//背景
		this.m_bg = DisplayUtil.createBitmapByName("scene_jpg");
        this.addChild(this.m_bg);

		this.roleContainer = new egret.Sprite();
		this.addChild(this.roleContainer);

		this.cardContainer = new egret.Sprite();
		this.addChild(this.cardContainer);

		this.m_ribbon = DisplayUtil.createBitmapByName("ribbon_png");
		
	}

	public showRibbon(){
		this.addChild(this.m_ribbon);
		this.m_ribbon.alpha = 0;
		this.m_ribbon.x = (Game.instance.stageW - this.m_ribbon.width)/2;
		this.m_ribbon.y = 150;
		egret.Tween.removeTweens(this.m_ribbon);
		egret.Tween.get(this.m_ribbon).to({alpha:1, y:0}, 2000).wait(500).to({alpha:0, y:150}, 2000)
	}

	public reset(){
		DisplayUtil.remove(this.m_ribbon);
	}
}