class CardView extends egret.Sprite{

	private m_content:egret.Bitmap;
	private m_star:egret.Bitmap;

	public image:string;
	public audio:string;
	public cardName:string;
	private m_data:any;

	public constructor(data:any) {
		super();
		this.m_data = data;
		this.image = data.image;
		this.audio = data.audio;
		this.cardName = data.cardName;

		//BG
		var shape = new egret.Shape();
		shape.graphics.beginFill(0xffffff,0.5);
		shape.graphics.drawCircle(0,0,124);
		shape.graphics.endFill();
		this.addChild(shape);
		
		this.m_content = DisplayUtil.createBitmapByName(this.image);
		this.m_content.x = -this.m_content.width/2;
		this.m_content.y = -this.m_content.height/2;
		this.addChild(this.m_content);

		this.m_star = DisplayUtil.createBitmapByName("star_png");
		this.m_star.x = - this.m_star.width/2;
		this.m_star.y = - this.m_star.height/2;
		this.addChild(this.m_star);
	}

	//重置
	public reset(){
		DisplayUtil.remove(this.m_star);
	}

	//答错 抖动
	public wrong(){
		EffectUtils.shakeObj(this.m_content, ()=>{
			EffectUtils.shakeObj(this.m_content,null);
		});
	}

	//答对
	public right(){
		this.addChild(this.m_star);
	}
}