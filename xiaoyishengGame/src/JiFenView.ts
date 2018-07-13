class JiFenView extends egret.Sprite {
	private _xingArr:any[]=[];
	private _id:number=0;
	private _shenmingID:number=0;
	public constructor() {
		super();
		//this.chushi();
	}
	public chushi(n:number):void{
		this._shenmingID=n;
		for(var i:number=0;i<n;i++){
			var huixing:egret.Bitmap=new egret.Bitmap();
			huixing.texture=RES.getRes("jinbing_hong_png");
			this.addChild(huixing);
			huixing.x=i*55;
			

			var hongXing:egret.Bitmap=new egret.Bitmap();
			hongXing.texture=RES.getRes("jinbing_png");
			this.addChild(hongXing);
			hongXing.x=i*55;
	
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
		if(this._id==this._shenmingID){
			this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
		}
	}

	public reset():void{
			for(var i:number=0;i<this._shenmingID;i++){
				(<any>this._xingArr[i]).visible=true;
				this._id=0;
			}
			
	}
}