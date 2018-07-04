class LongSwfView extends egret.Sprite {
	private _mcData:any;
    private _mcTexture:egret.Texture;
	public constructor() {
		super();
	}
	public init():void{
		this._mcData=RES.getRes("Long_swf_json");
		this._mcTexture=RES.getRes("Long_swf_png");
		var mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
        var role:egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("attack"));
        this.addChild(role);
        role.gotoAndPlay(1, 300);
	}
}