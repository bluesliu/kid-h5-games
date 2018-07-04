class Qieadi extends egret.Sprite {

    private _qwd:egret.Sprite;
     private _net:egret.Sprite;
	public constructor() {
		super();
		this.initContent();
	}

	private initContent()
	{

        this._qwd=new egret.Sprite();
        this.addChild(this._qwd);
        this._qwd.y=24;
       let qwd0= this.createBitmapByName("qwd_png");
         this._qwd.addChild(qwd0);
          let qwd1= this.createBitmapByName("qwd2_png");
         this._qwd.addChild(qwd1);

          this._net=new egret.Sprite();
        this.addChild(this._net);
        this._net.x=204;
        this._net.y=-223+85;
       let net0= this.createBitmapByName("net_png");
         this._net.addChild(net0);
         net0.x=-25;
           let net1= this.createBitmapByName("net2_png");
         this._net.addChild(net1);
         net1.x=-209;
         net1.y=-165;
     this.addChild(this._qwd);

         this.gotoAndStop(0);
	}

	public gotoAndStop(id:number)
	{
		  for(var i:number=0;i<this._qwd.numChildren;i++)
        {
           this._qwd.getChildAt(i).visible=false;
        }
		 this._qwd.getChildAt(id).visible=true;

           for(var i:number=0;i<this._net.numChildren;i++)
        {
          this._net.getChildAt(i).visible=false;
        }
		 this._net.getChildAt(id).visible=true;
	}

	 private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}