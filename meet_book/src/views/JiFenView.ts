class JiFenView extends egret.Sprite {
	private _xingArr:any[]=[];
	private _id:number=0;
	private _guanshu:number=0;
	public constructor() {
		super();
		//this.chushi();
	}
	public chushi(n:number):void{
		this._guanshu=n;
		for(var i:number=0;i<n;i++){
			var huixing:egret.Bitmap=new egret.Bitmap();
			huixing.texture=RES.getRes("huo_hong_png");
			this.addChild(huixing);
			huixing.x=i*50;
			

			var hongXing:egret.Bitmap=new egret.Bitmap();
			hongXing.texture=RES.getRes("huo_hui_png");
			this.addChild(hongXing);
			hongXing.x=i*50;
	
			this._xingArr.push(hongXing);
			// hongXing.visible=false;
		}
	}

	/**
	 * 玩家通过一关
	 */
	public chengong():void{
		(<any>this._xingArr[this._id]).visible=false;
		this._id++;
		if(this._id==this._guanshu){
			this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
		}
	}

	public reset():void{
		this._id=0;
		for(var i:number=0;i<this._guanshu;i++){
			(<any>this._xingArr[i]).visible=true;
		}
	}
}