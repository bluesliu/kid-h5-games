class Bg extends egret.Sprite {
    private _qwd:egret.Bitmap;
	
    public constructor() {
        super();
        this.createView();
    }

    private textField:egret.TextField;

    private createView():void {

		let bg = Source.createBitmapByName("spaceadventure_5_png");
        this.addChild(bg);

		// this._qwd = Source.createBitmapByName("jzgr_18_png");
        // this.addChild(this._qwd);
		// this._qwd.x=148.5;
		// this._qwd.y=307;

	
	}

	public reset()
	{
		// this._qwd.visible=false;
	}
}