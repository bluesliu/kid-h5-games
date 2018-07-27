class CardView extends egret.Sprite{

	// public speedY = 0;			
	// public speedX = 0;
	public angle = 0;
	public speed = 0;

	public bg:egret.Bitmap;
	private m_content:egret.Bitmap;
	
	public question:Question;

	public constructor(q:Question) {
		super();
		this.question = q;
		
		this.bg = DisplayUtil.createBitmapByName("card_png");
		this.addChild(this.bg);
		this.bg.x = -this.bg.width/2;
		this.bg.y = -this.bg.height;

		//图片
		this.m_content = DisplayUtil.createBitmapByName(q.image);
		DisplayUtil.setSize(this.m_content, 170, 170);
		this.m_content.x = -this.m_content.width/2;
		this.m_content.y = -this.m_content.height - 240;
		this.addChild(this.m_content);

	}

	public setPosition(p:egret.Point){
		this.x = p.x;
		this.y = p.y;
		this.scaleX = this.scaleY =  0.3+this.y / (Game.instance.stageH + 200);
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
		EffectUtils.flyObj(this.m_content, 300);
	}


	public dispose(){
		egret.Tween.removeTweens(this);
		egret.Tween.removeTweens(this.m_content);
		this.question = null;
		this.m_content = null;
	}

	public get cardName(){return this.question.name;}
}