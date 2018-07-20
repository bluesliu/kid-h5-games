//热气球
class BalloonView extends egret.Sprite{

	private container:egret.Sprite;
	private content:egret.Bitmap;
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

		this.content = new egret.Bitmap();
		this.container.addChild(this.content);
	}

	public onRender(){
		if(this.isFloat){
			//上下浮动的效果
			this.container.y += Math.sin(egret.getTimer()/1000)/2;
		}
	}

	public reset(){
		this.container.y = 0;
		this.content.texture = null;
	}

	public get question(){return this.m_question;}
	public set question(value:Question){
		this.m_question = value;
		let texture:egret.Texture = RES.getRes(value.image);
		this.content.texture = texture;
		this.content.x = - this.content.width/2;
		this.content.y = -365 - this.content.height/2;
	} 

}