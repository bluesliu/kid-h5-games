class CountStars extends egret.Sprite {

     private static NUM:number=10;
     private static MOVEDIS:number=60;
	public count:any=0;
	private _topMask:egret.Shape;
    private _stars:egret.Bitmap;
	public constructor() {
		super();
		this.initContent();
	}

	private initContent()
	{

	 let gstars = this.createBitmapByName("gstars_png");
        this.addChild(gstars);
        this._stars= this.createBitmapByName("stars_png");
        this.addChild(this._stars);
        

        this._topMask = new egret.Shape();
        this.addChild( this._topMask);
        
         this._topMask.graphics.beginFill(0x000000, 1);
         this._topMask.graphics.drawRect(0, 0, CountStars.MOVEDIS*CountStars.NUM, 51);
         this._topMask.graphics.endFill();
        
       

        this._stars.mask = this._topMask;
     
	  //	this._topMask.x=(this.count-CountStars.NUM)*CountStars.MOVEDIS;
        this._stars.x=(this.count+CountStars.NUM)*CountStars.MOVEDIS;
       
    }

    public add():void {
        
        if(this.count>=CountStars.NUM)return;
        this.count++;
        // this._topMask.x=(this.count-CountStars.NUM)*CountStars.MOVEDIS;

         	// if(_count>=_num)return;
			// _count++;
			//			_res.stars.x=(_count-_num)*_moveDis;
			this._stars.x-=CountStars.MOVEDIS;
    }

     public cut():void {
        
        if(this.count<=0)return;
        this.count--;
         this._stars.x=(this.count-CountStars.NUM)*CountStars.MOVEDIS;
    }

    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private createDisobj(array: Array<egret.DisplayObject>): egret.Sprite {
        let result = new egret.Sprite();
        for(var i:number=0;i<array.length;i++)
        {
            result.addChild(array[i])
        }
        return result;
    }

    public reset()
    {
        this.count=0;
        this._stars.x=(this.count+CountStars.NUM)*CountStars.MOVEDIS;

        //_count=0;
		//	_res.stars.x=(_count+_num)*_moveDis;
    }
}