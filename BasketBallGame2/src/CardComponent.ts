class CardComponent extends egret.Sprite {
	
	
	private _bg:egret.Bitmap;
	// private _shadow:egret.Bitmap;
	private _imgSp:egret.Sprite;
	public tag:string;

	public constructor() {
		super();
		this.initContent();
	}


	private initContent()
	{
		this._bg=PublicTool.createBitmapByName("backboard_png");
		this.addChild(this._bg);

		// this._shadow=PublicTool.createBitmapByName("archery_9_png");
		// this.addChild(this._shadow);
		// this._shadow.x=42;
		// this._shadow.y=444;

		this._imgSp=new egret.Sprite();
		this.addChild(this._imgSp);
	}


	public addImg(img:egret.Bitmap)
	{
		while(this._imgSp.numChildren>0)
		{
			this._imgSp.removeChildAt(0);
		}
		this._imgSp.addChild(img);
		this._imgSp.alpha=0;
		this._imgSp.scaleX=this._imgSp.scaleY=0.2;
		this._imgSp.x=150;
		this._imgSp.y=105-10;
	}

	public hide()
	{
		//this._imgSp.visible=false;
		egret.Tween.removeTweens(this._imgSp);
		egret.Tween.get( this._imgSp)
		 .to( {alpha:0,scaleX:0.2,scaleY:0.2},500);
	}
	
	public show()
	{
		//this._imgSp.visible=true;
		egret.Tween.removeTweens(this._imgSp);
		 egret.Tween.get( this._imgSp)
		 .to( {alpha:1,scaleX:1,scaleY:1},500);
	}
}