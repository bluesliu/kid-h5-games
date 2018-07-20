class Bg extends egret.Sprite {
    private _qwd:egret.Bitmap;
	private _cloud1:egret.Bitmap;
    private _cloud2:egret.Bitmap;
    private _cloud3:egret.Bitmap;
    private _time:number=80;
    public constructor() {
        super();
        this.createView();
    }

    private textField:egret.TextField;

    private createView():void {

	
        let bg = Source.createBitmapByName("archery_10_png");
        this.addChild(bg);
		

        this._cloud1 = Source.createBitmapByName("cloud_1_png");
        this.addChild(this._cloud1);
		this._cloud1.x=203.4;
		this._cloud1.y=64;

		this._cloud2 = Source.createBitmapByName("cloud_2_png");
        this.addChild(this._cloud2);
		this._cloud2.x=682.7;
		this._cloud2.y=90.4;

		this._cloud3 = Source.createBitmapByName("cloud_3_png");
        this.addChild(this._cloud3);
		this._cloud3.x=1066.5;
		this._cloud3.y=110.4;

		let bg0 = Source.createBitmapByName("bg_0_png");
        this.addChild(bg0);
        bg0.y=74;


		this.start();
	}

	public start()
	{
		egret.Tween.get( this._cloud1, { loop:true} )
		.to( {x:-this._cloud1.width},(203.4+this._cloud1.width)*this._time*1000/1366)
		.to( {x:1366},0)
		.to( {x:203.4},(1366-203.4)*this._time*1000/1366);

		egret.Tween.get( this._cloud2, { loop:true} )
		.to( {x:-this._cloud2.width},(682.7+this._cloud2.width)*this._time*1000/1366)
		.to( {x:1366},0)
		.to( {x:682.7},(1366-682.7)*this._time*1000/1366);

		egret.Tween.get( this._cloud3, { loop:true} )
		.to( {x:-this._cloud3.width},(1066.5+this._cloud3.width)*this._time*1000/1366)
		.to( {x:1366},0)
		.to( {x:1066.5},(1366-1066.5)*this._time*1000/1366);

	
	}

	public reset()
	{
		
	}
}