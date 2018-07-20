class CardView extends egret.Sprite{

	public speedY = 0;			
	public speedX = 0;

	private m_bg:egret.Bitmap;
	private m_content:egret.Bitmap;
	
	private m_image:string;
	private m_audio:string;

	public constructor(index:number, image:string, audio:string) {
		super();
		this.m_image = image;
		this.m_audio = audio;

		this.m_bg = DisplayUtil.createBitmapByName("card"+(index+1)+"_png");
		this.addChild(this.m_bg);
		this.m_bg.x = -this.m_bg.width/2;
		this.m_bg.y = -this.m_bg.height/2;

		//图片
		this.m_content = DisplayUtil.createBitmapByName(image);
		DisplayUtil.setSize(this.m_content, 170, 170);
		this.m_content.x = -this.m_content.width/2;
		this.m_content.y = -this.m_content.height/2;
		this.addChild(this.m_content);

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
		this.m_content = null;
	}

	public get imageName(){return this.m_image;}
	public get audioName(){return this.m_audio;}
}