class LifeBoard extends BaseBox{
	public constructor() {
		super();

		let bg = DisplayUtil.createBitmapByName("lifeBoard_png");
		this.addChild(bg);

		for(let i=0; i<Game.LIFE_NUM; i++)
		{
			let star = DisplayUtil.createBitmapByName("heartDark_png");
			star.name = "star"+i;
			star.y = 15;
			star.x =  25+ i * (star.width + 14);
			this.addChild(star);
		}
	}

	//设置分数
	public setScore(value:number)
	{
		for(let i=0; i<Game.LIFE_NUM; i++)
		{
			let star = this.getChildByName("star"+i) as egret.Bitmap;
			let texture: egret.Texture;
			if(value >= i+1)
			{
				texture = RES.getRes("heartLight_png");
			}
			else{
				texture = RES.getRes("heartDark_png");
			}
			star.texture = texture;
		}
	}
}