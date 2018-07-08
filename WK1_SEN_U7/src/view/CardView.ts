class CardView extends egret.Sprite{

	private m_content:egret.Bitmap;
	private m_star:egret.Bitmap;

	public id:number;
	public image:string;
	public audio:string;
	public cardName:string;
	private m_data:any;

	public constructor(data:any) {
		super();
		this.m_data = data;
		this.image = data.image;
		this.audio = data.audio;
		this.cardName = data.name;

		//BG
		var shape = new egret.Shape();
		shape.graphics.beginFill(0xffffff,0.5);
		shape.graphics.drawRoundRect(0,0,250,250,40);
		shape.graphics.endFill();
		shape.x = -shape.width/2;
		shape.y = -shape.height/2;
		this.addChild(shape);

		var bg = DisplayUtil.createBitmapByName("card_png");
		bg.x = -bg.width/2;
		bg.y = -bg.height/2;
		this.addChild(bg);
		
		this.m_content = DisplayUtil.createBitmapByName(this.image);
		DisplayUtil.setSize(this.m_content, 250, 250);
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
		this.m_content.filters = [];
		this.touchEnabled = true;
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

	public light(){
		this.m_content.filters = [];
		this.touchEnabled = true;
	}

	public dark(){
		let matrix = [1,0,0,0,-89.25,
					  0,1,0,0,-89.25,
					  0,0,1,0,-89.25,
					  0,0,0,1,0];
		this.m_content.filters = [new egret.ColorMatrixFilter(matrix)];
		this.touchEnabled = false;
	}
}