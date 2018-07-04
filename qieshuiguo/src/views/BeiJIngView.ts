class BeiJIngView extends egret.Sprite{
	private _yunduo:egret.Bitmap;
	public constructor() {
		super();
		this.chushi();
	}
	private chushi():void{
		var BJbitmap:egret.Bitmap=new egret.Bitmap();
		BJbitmap.texture=RES.getRes("xingkong_png");
		this.addChild(BJbitmap);
        
		this._yunduo=new egret.Bitmap();
		this._yunduo.texture=RES.getRes("yunduo_png");
		this.addChild(this._yunduo);
		this._yunduo.y=200;
		this.zuoyi();

		var chuangtai:egret.Bitmap=new egret.Bitmap();
		chuangtai.texture=RES.getRes("chuangtai_png");
		this.addChild(chuangtai);
	}
	private zuoyi():void{
		egret.Tween.get(this._yunduo).to({x:50},5000,egret.Ease.sineIn).call(this.youyi,this);
	}
	private youyi():void{
			egret.Tween.get(this._yunduo).to({x:-50},5000,egret.Ease.sineIn).call(this.zuoyi,this);
	}
}