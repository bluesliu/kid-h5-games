class CardView extends egret.Sprite{

	public speedY = 0;			
	public speedX = 0;

	private m_bg:egret.Bitmap;
	private m_content:egret.Bitmap;
	
	public question:Question;

	public constructor(index:number, q:Question) {
		super();
		this.question = q;

		this.m_bg = DisplayUtil.createBitmapByName("card"+(index+1)+"_png");
		this.addChild(this.m_bg);
		this.m_bg.x = -this.m_bg.width/2;
		this.m_bg.y = -this.m_bg.height/2;

		//图片
		this.m_content = DisplayUtil.createBitmapByName(q.image);
		DisplayUtil.setSize(this.m_content, 170, 170);
		this.m_content.x = -this.m_content.width/2;
		this.m_content.y = -this.m_content.height/2;
		this.addChild(this.m_content);

		// //遮罩
		// let maskShape = new egret.Shape();
		// maskShape.graphics.beginFill(0xffffff, 1);
		// maskShape.graphics.drawCircle(0,0,110);
		// maskShape.graphics.endFill();
		// maskShape.x = this.m_content.x + this.m_content.width/2;
		// maskShape.y = this.m_content.y + this.m_content.height/2;
		// this.addChild(maskShape);
		// this.m_content.mask = maskShape;

		this.touchEnabled = true;

	}

	//重置
	public reset(){
		this.m_content.filters = [];
		this.touchEnabled = true;
	}

	//答错 抖动
	public wrong(){
		EffectUtils.shakeObj(this, ()=>{
			EffectUtils.shakeObj(this,null);
		});
	}

	public right(){
		EffectUtils.flyObj(this, 300);
	}


	public dispose(){
		egret.Tween.removeTweens(this);
		this.question = null;
		this.m_content = null;
	}

	public get cardName(){return this.question.name;}
}