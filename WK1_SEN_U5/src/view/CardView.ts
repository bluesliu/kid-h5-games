class CardView extends egret.Sprite{

	public speedY = 0;			
	public speedX = 0;

	private m_balloon:egret.MovieClip;
	private m_content:egret.Bitmap;
	
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
		
		// //影子
		// let shape = new egret.Shape();
		// shape.graphics.beginFill(0x000000, 0.3);
		// shape.graphics.drawCircle(0,0,120);
		// shape.graphics.endFill();
		// shape.scaleY = 0.3;
		// this.addChild(shape);

		//气球
		this.m_balloon = DisplayUtil.createMovieClipByName("balloon");
		this.m_balloon.gotoAndStop("idle");
		this.addChild(this.m_balloon);

		//图片
		this.m_content = DisplayUtil.createBitmapByName(this.image);
		DisplayUtil.setSize(this.m_content, 240, 240);
		this.m_content.x = -this.m_content.width/2;
		this.m_content.y = -this.m_content.height/2 - 360;
		this.addChild(this.m_content);

		//遮罩
		let maskShape = new egret.Shape();
		maskShape.graphics.beginFill(0xffffff, 1);
		maskShape.graphics.drawCircle(0,0,110);
		maskShape.graphics.endFill();
		maskShape.x = this.m_content.x + this.m_content.width/2;
		maskShape.y = this.m_content.y + this.m_content.height/2;
		this.addChild(maskShape);
		this.m_content.mask = maskShape;

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

	//答对
	public right(){
		this.m_balloon.gotoAndPlay("light", -1);
		DisplayUtil.remove(this.m_content);
	}

	

	public dispose(){
		egret.Tween.removeTweens(this);
		this.m_data = null;
		this.m_content = null;
	}
}