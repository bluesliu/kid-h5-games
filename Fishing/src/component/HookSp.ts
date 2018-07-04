class HookSp extends egret.Sprite {
   
   public tempX:number=0;
  public tempY:number=0;
  private static SPEEDY:number=5;
private static LINEDEPTH:number=200;
   public  line:egret.Sprite;
   private _hook:egret.Bitmap;
    public constructor() {
        super();
        this.initContent();
    }

	private initContent()
	{
		this.graphics.beginFill(0xffffff,0);
		this.graphics.drawRect(0,0,461,262);
		this.graphics.endFill();

		 let sp=new egret.Sprite();
		this.addChild(sp);
        sp.x=5;
		sp.y=8;
		sp.graphics.lineStyle(2,0x333333)
		sp.graphics.moveTo(0,0);
		sp.graphics.lineTo(0,300);
		 
		 this.line=new egret.Sprite();
		this.addChild(this.line);
        this.line.x=5;
        this.line.y=308;
		

        this._hook= Source.createBitmapByName("鱼钩_png");
        this.addChild(this._hook);
        this._hook.anchorOffsetX=14;
        this._hook.anchorOffsetY=5;
        this._hook.x=5;
        this._hook.y=308;

		this.tempX= this.line.x;
	}

	public start()
	{
		this.addEventListener(egret.Event.ENTER_FRAME,this.lineIn,this);
	}

		public stop()
	{
		this.removeEventListener(egret.Event.ENTER_FRAME,this.lineIn,this);
			
			this.addEventListener(egret.Event.ENTER_FRAME,this.lineBack,this);
	}

	private lineIn(e:egret.Event)
	{
		this.tempY+=HookSp.SPEEDY;
		if(this.tempY>=HookSp.LINEDEPTH)
		{
			
			this.removeEventListener(egret.Event.ENTER_FRAME,this.lineIn,this);
			
			this.addEventListener(egret.Event.ENTER_FRAME,this.lineBack,this);
			
		}
		this.line.graphics.clear();
		this.line.graphics.lineStyle(2,0)
		this.line.graphics.moveTo(0,0);
		this.line.graphics.lineTo(0,this.tempY);

		this._hook.y=300+this.tempY;

		this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
	}

	private lineBack(e:egret.Event)
	{
		this.tempY-=HookSp.SPEEDY;
		if(this.tempY<=0)
		{
			
			this.tempY=0;
			this.removeEventListener(egret.Event.ENTER_FRAME,this.lineBack,this);
			this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
		}
		this.line.graphics.clear();
		this.line.graphics.lineStyle(2,0);
		this.line.graphics.moveTo(0,0);
		this.line.graphics.lineTo(0,this.tempY);
		
		this._hook.y=300+this.tempY;
		this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
	}
}