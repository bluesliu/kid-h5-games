class ShenMingView extends egret.Sprite {
	private _kuang:egret.Bitmap;
	private _xingArr:any[]=[];
	public _id:number=2;
	public constructor() {
		super();
		this.chushi();
	}
	private chushi():void{
		this._kuang=new egret.Bitmap();
		this._kuang.texture=RES.getRes("xingxing_kuang_png");
		this.addChild(this._kuang);
		for(var i:number=0;i<3;i++){
			var huixing:egret.Bitmap=new egret.Bitmap();
			huixing.texture=RES.getRes("huixin_png");
			this.addChild(huixing);
			huixing.x=i*80+20;
			huixing.y=10;

			var hongXing:egret.Bitmap=new egret.Bitmap();
			hongXing.texture=RES.getRes("hongXin_png");
			this.addChild(hongXing);
			hongXing.x=i*80+20;
			hongXing.y=10;
			this._xingArr.push(hongXing);
			// hongXing.visible=false;
		}

		
	}
	/**
	 * 玩家死亡一次
	 */
	public siwang():void{
		(<any>this._xingArr[this._id]).visible=false;
		this._id--;
		if(this._id==-1){
			this.dispatchEvent(new egret.Event(egret.Event.CLOSE));
		}
	}

	public reset():void{
			this._id=2;
				for(var i:number=0;i<3;i++){
					(<any>this._xingArr[i]).visible=true;	
				}
	}
}