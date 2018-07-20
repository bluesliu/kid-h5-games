class CardComponent extends egret.Sprite {
	
	
	private _bg:egret.Bitmap;
	private _shadow:egret.Bitmap;
	private _imgSp:egret.Sprite;
	public tag:string;

	public constructor() {
		super();
		this.initContent();
	}


	private initContent()
	{
		this._bg=PublicTool.createBitmapByName("archery_8_png");
		this.addChild(this._bg);

		this._shadow=PublicTool.createBitmapByName("archery_9_png");
		this.addChild(this._shadow);
		this._shadow.x=42;
		this._shadow.y=444;

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
		img.x=33;
		img.y=4;
	}

	public hide()
	{
		this._bg.visible=false;
		this._imgSp.visible=false;
		this._shadow.visible=false;
	}
	
	public show()
	{
		this._bg.visible=true;
		this._imgSp.visible=true;
		this._shadow.visible=true;
	}
}