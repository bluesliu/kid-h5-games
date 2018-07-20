class Arrow extends egret.Sprite{
	private _arrow:egret.Bitmap;
	public constructor() {
		super();
		this.createView();
    }

	private createView():void 
	{
		this._arrow=Source.createBitmapByName("arrow_png");
        this.addChild(this._arrow);
		this._arrow.anchorOffsetX=65;
		this._arrow.anchorOffsetY=10;
	}
}