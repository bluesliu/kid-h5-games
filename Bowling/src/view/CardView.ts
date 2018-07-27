class CardView extends egret.Sprite{

	public bg:egret.Bitmap;
	private m_content:egret.Bitmap;
	
	public question:Question;

	public constructor(q:Question) {
		super();
		this.question = q;
		
		this.bg = DisplayUtil.createBitmapByName("card_png");
		this.addChild(this.bg);

		//图片
		this.m_content = DisplayUtil.createBitmapByName(q.image);
		DisplayUtil.setSize(this.m_content, 170, 170);
		this.m_content.x = 18.5;
		this.m_content.y = 5.5;
		this.addChild(this.m_content);

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
		egret.Tween.removeTweens(this.m_content);
		this.question = null;
		this.m_content = null;
	}

	public get cardName(){return this.question.name;}
}