class Bg extends egret.Sprite {
    private _plane:egret.Bitmap;
	 private _cloud1:egret.Bitmap;
  private _cloud2:egret.Bitmap;
  private _cloud3:egret.Bitmap;
    public constructor() {
        super();
        this.createView();
    }

    private textField:egret.TextField;

    private createView():void {

		let sky = Source.createBitmapByName("天空_png");
        this.addChild(sky);

		this._plane = Source.createBitmapByName("飞机_png");
        this.addChild(this._plane);
		this._plane.x=-121;
		this._plane.y=244;

		this._cloud1 = Source.createBitmapByName("云_png");
        this.addChild(this._cloud1);
		this._cloud1.scaleX=this._cloud1.scaleY=1.2;
		this._cloud1.x=1066.6;
		this._cloud1.y=100+6.7;

		this._cloud2 = Source.createBitmapByName("云_png");
        this.addChild(this._cloud2);
		this._cloud2.alpha=0.8;
		this._cloud2.x=-240;
		this._cloud2.y=202;

		this._cloud3 = Source.createBitmapByName("云_png");
        this.addChild(this._cloud3);
		this._cloud3.scaleX=this._cloud3.scaleY=0.8;
		this._cloud3.alpha=0.5;
		this._cloud3.x=1366;
		this._cloud3.y=255;

		let land = Source.createBitmapByName("草地_png");
        this.addChild(land);
		land.y=192.45;

		this.start();
	}

	public start()
	{
		egret.Tween.get( this._plane, { loop:true} )
			.to( {x:1780, y:76},40000, egret.Ease.sineIn  )
			.wait(1000*10);	

		egret.Tween.get( this._cloud1, { loop:true} )
			.to( {x:-240},60000, egret.Ease.sineIn  )
			 .to( {x:1366.6},0, egret.Ease.sineIn  )
			.wait(500*10)
			.to( {x:1066.6},36000, egret.Ease.sineIn  );

			egret.Tween.get( this._cloud2, { loop:true} )
			.to( {x:1366},60000, egret.Ease.sineIn  )
			 .to( {x:1366.6},0, egret.Ease.sineIn  )
			.wait(800*10);

			egret.Tween.get( this._cloud3, { loop:true} )
			.wait(200*10)
			.to( {x:-240},60000, egret.Ease.sineIn  )
			.wait(200*10);
				
	}

	public stop()
	{
		egret.Tween.removeTweens(this._plane);
egret.Tween.removeTweens(this._cloud1);
egret.Tween.removeTweens(this._cloud2);
egret.Tween.removeTweens(this._cloud3);
		
	}
}