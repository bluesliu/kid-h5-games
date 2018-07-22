//热气球
class BalloonView extends egret.Sprite{

	private container:egret.Sprite;
	private m_question:Question;

	/**
	 * 是否开启上下浮动的效果
	 */
	public isFloat:boolean;

	

	public constructor() {
		super();

		this.container = new egret.Sprite();
		this.addChild(this.container);

		let bg = DisplayUtil.createBitmapByName("balloon_png");
		bg.x = - bg.width/2;
		bg.y = - bg.height;
		this.container.addChild(bg);

	}

	public onRender(){
		if(this.isFloat){
			//上下浮动的效果
			this.container.y += Math.sin(egret.getTimer()/1000)/2;
		}
	}

	public reset(){
		this.container.y = 0;
	}

}