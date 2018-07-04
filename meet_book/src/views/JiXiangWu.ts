class JiXiangWu extends egret.Sprite {
	private _pingchang:egret.Bitmap;
	private _shibai:egret.Bitmap;
	private _chenggong:egret.Bitmap;
	public constructor() {
		super();
		this.chushi();
	}
	private chushi():void{
		this._pingchang=new egret.Bitmap();
		this._pingchang.texture=RES.getRes("kaTong_png");
		this.addChild(this._pingchang);

		this._shibai=new egret.Bitmap();
		this._shibai.texture=RES.getRes("Long_shiBai_png");
		this.addChild(this._shibai);
		this._shibai.visible=false;

		this._chenggong=new egret.Bitmap();
		this._chenggong.texture=RES.getRes("Long_chenggong_png");
		this.addChild(this._chenggong);
		this._chenggong.visible=false;
	}

	/**
	 * 显示失败了
	 */
	public shibail():void{
		this._pingchang.visible=false;
		this._shibai.visible=true;
	}

	/**
	 * 显示成功了
	 */
	public chenggongl():void{
		this._pingchang.visible=false;
		this._chenggong.visible=true;
	}
}