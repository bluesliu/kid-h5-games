class CardView extends egret.Sprite{

	public speedY = 0;			
	public speedX = 0;

	private m_bg:egret.MovieClip;
	private m_content:egret.Bitmap;
	private container:egret.Sprite;
	
	public question:Question;

	public constructor(q:Question) {
		super();
		this.question = q;
		
		this.container = new egret.Sprite();
		this.addChild(this.container);

		this.m_bg = DisplayUtil.createMovieClipByName("card");
		this.m_bg.stop();
		this.container.addChild(this.m_bg);
		this.m_bg.x = -8;
		this.m_bg.y = -4;

		//图片
		this.m_content = DisplayUtil.createBitmapByName(q.image);
		DisplayUtil.setSize(this.m_content, 170, 170);
		this.m_content.x = -93;
		this.m_content.y = -242;
		this.container.addChild(this.m_content);

	}

	//重置
	public reset(){
		this.m_content.filters = [];
		this.touchEnabled = true;
	}

	//答错 抖动
	public wrong(){
		EffectUtils.shakeObj(this.container, ()=>{
			EffectUtils.shakeObj(this.container,null);
		});
	}

	public right(){
		this.m_content.y -= 100;
		EffectUtils.flyObj(this.m_content, 300);
		this.m_bg.play(1);
	}

	public get content(){return this.m_content;}

	public dispose(){
		egret.Tween.removeTweens(this.container);
		this.question = null;
		this.m_content = null;
	}

	public get cardName(){return this.question.name;}
}