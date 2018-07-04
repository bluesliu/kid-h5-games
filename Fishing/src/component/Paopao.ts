class Paopao extends egret.Sprite {

	
	public constructor() {
		super();
		this.initContent();
	}

	private initContent()
	{
		for(let i:number=0;i<10;i++)
		{
			let r:number=Math.round(Math.random()*10)+10;
			let paopao=Source.createBitmapByName("泡泡_png");
			this.addChild(paopao);
		}
		this.start()
	}

	public start()
	{
		for(let i:number=0;i<this.numChildren;i++)
		{
			let paopao:egret.Bitmap=this.getChildAt(i)as egret.Bitmap;
			paopao.alpha=0;
			paopao.scaleX=paopao.scaleY=0.6+Math.random()*4*0.1;
			paopao.x=Math.random()*1266+100;
			paopao.y=Math.random()*200+800;
			egret.Tween.get(paopao,{loop:true})
			.wait(Math.round(Math.random()*10)*1000)
			.to({alpha:1},300)
			.to({y:Math.random()*100+350},3000+Math.round(Math.random()*5)*1000)
			.to({alpha:0},300);
		}
	}

		public stop()
	{
		for(let i:number=0;i<this.numChildren;i++)
		{
			let paopao:egret.Bitmap=this.getChildAt(i)as egret.Bitmap;
			egret.Tween.removeTweens(paopao);
			// paopao.alpha=0;
			// paopao.x=Math.random()*1266+100;
			// paopao.y=Math.random()*200+800;
			// egret.Tween.get(paopao,{loop:true})
			// .wait(Math.round(Math.random()*10)*1000)
			// .to({alpha:1},300)
			// .to({y:Math.random()*100+100},5000+Math.round(Math.random()*5)*1000)
			// .to({alpha:0},300);
		}
	}
}