class OverPage extends egret.Sprite {
  
  	private _winSp:egret.Sprite;
  	private _failSp:egret.Sprite;
        private _start:egret.Bitmap;
        private _tryAgain:egret.Bitmap;
        	private _bgSound:SoundPlayer;
    public constructor() 
	{
        super();
      //  this.createView();
      if(this.stage)
      {
        this.createView();

      }else
      {
          this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddStage,this)

      }
    }
    private onAddStage(e:egret.Event):void 
    {
 this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddStage,this)
 this.createView();
    }

    private createView():void 
	{
		let caidai= Source.createBitmapByName("success_2_png");
        let successStar= Source.createBitmapByName("success_1_png");    
        let failStar= Source.createBitmapByName("fail_2_png");   
        this._tryAgain= Source.createBitmapByName("fail_0_png");
		let fail= Source.createBitmapByName("fail_1_png");
		let win= Source.createBitmapByName("success_0_png");

        let bg = new egret.Sprite();
        this.addChild( bg);
        bg.graphics.beginFill(0x000000, 0.5);
        bg.graphics.drawRect(0, 0, 1366, 1024);
        bg.graphics.endFill();

		this._failSp = new egret.Sprite();
        this.addChild(this._failSp);
        this._failSp.visible=false; 

  		this._winSp = new egret.Sprite();
        this.addChild(this._winSp);
        this._winSp.addChild(caidai);
        caidai.name="caidai";
        caidai.y=68.48;

		this._failSp.addChild(fail);
        fail.name="fail";
        fail.x=150;
		fail.y=570;

		this._winSp.addChild(win);
        win.name="win";
        win.x=150;
		win.y=570;

        this._winSp.addChild(successStar);
        successStar.name="successStar";
        successStar.x=324;
        successStar.y=157;

        this._failSp.addChild(failStar);
        failStar.name="failStar";
        failStar.x=324;
        failStar.y=157;


        this.addChild(this._tryAgain);
        this._tryAgain.name="tryAgain";
        this._tryAgain.x=568;
        this._tryAgain.y=787;
        this._tryAgain.visible=false; 
        this._tryAgain.$touchEnabled=true;

	    this._winSp.visible=false;
		this._failSp.visible=false;
		this._winSp.visible=false;
		this._failSp.visible=false;

         this._start= Source.createBitmapByName("start_png");
        this.addChild(this._start);
		//this._start.visible=false; 
        this._start.$touchEnabled=true;
        this._start.x=(this.stage.stageWidth-this._start.width)*0.5;
        this._start.y=(this.stage.stageHeight-this._start.height)*0.5;

        this._bgSound= new SoundPlayer();

		
		this._tryAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tryAgain, this);
         this._start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
	}



private start(e:egret.TouchEvent)
	{

          this._bgSound.clear();
        this._bgSound.playRes("bgmusic_mp3",10000,0.1);
        this._start.visible=false;
		this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
	}
	private tryAgain(e:egret.TouchEvent)
	{
		this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
	}

	public showWin(boo:boolean)
	{
        this._tryAgain.visible=true;
		if(boo)
		{
			 this._winSp.visible=true;
			 this._failSp.visible=false;
		}else
		{
			this._winSp.visible=false;
			 this._failSp.visible=true;
		}
	}
}