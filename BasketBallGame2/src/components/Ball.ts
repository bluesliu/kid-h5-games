class Ball extends egret.Sprite{
	private _ball:egret.Bitmap;
	public constructor() {
		super();
		this.createView();
    }

	private createView():void 
	{
		this._ball=Source.createBitmapByName("ball_png");
        this.addChild(this._ball);
		// this._ball.anchorOffsetX=43.5;
		// this._ball.anchorOffsetY=43.5;
	}

	public play()
	{
		 egret.Tween.get( this._ball, { loop:true} )
		 .to( {y:70},400)
		 .to( {y:0},400)
		// .to( {x:203.4},(1366-203.4)*this._time*1000/1366);

	}

	public stop()
	{
		egret.Tween.removeTweens(this._ball);
	}
}