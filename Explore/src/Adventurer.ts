class Adventurer extends egret.Sprite {
  
    private _bg:Bg;
	private _loves:CountLoves;
    private _stars:CountStars;
	private _startBG:egret.Sprite;
	private _startBtn:EButton;
	 private m_bgSound:SoundPlayer;
	private _index:number=0;
	private _question:QuestionCompoment;
	    private _qwd:Qieadi;
		private _left:Boolean;
		private _move:Boolean=false;
		private _cardX:number;
		private _speedX:number=5;
		  private _topSp:egret.Sprite;
    private _tryAgain:egret.Bitmap;
	private _qwd2:egret.Bitmap;	
    public constructor() {
        super();

		if(this.stage)
		{
			 this.initContent();
		}else
		{
			let timer=new egret.Timer(100,0);
			  timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
			   timer.start();
		}
		
        
    }

	private timerFunc(event:egret.TimerEvent)
	{
		
		if(this.stage)
		 {
			//  this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			 (event.currentTarget as egret.Timer).stop();
			  this.initContent();
		 }
	}

	private initContent()
	{
        this._bg=new Bg();
        this.addChild(this._bg);

     

		this._question=new QuestionCompoment();
		this.addChild(this._question);


 		 this._qwd=new Qieadi();  
         this.addChild(this._qwd);
        this._qwd.x=474;
        this._qwd.y=660;

		   this._loves=new CountLoves();
        this.addChild(this._loves);
        this._loves.x=200;
        this._loves.y=16;

        this._stars=new CountStars();
        this.addChild(this._stars);
        this._stars.x=755;
        this._stars.y=24;

		 let caidai= Source.createBitmapByName("success_2_png");
		 let qwd2= Source.createBitmapByName("success_0_png");
		  let qwd3= Source.createBitmapByName("fail_1_png");
        let successStar = Source.createBitmapByName("success_1_png");    
        let failStar= Source.createBitmapByName("fail_2_png");   
        this._tryAgain= Source.createBitmapByName("fail_0_png");

		this._topSp = new egret.Sprite();
        this.addChild( this._topSp);
        this._topSp.graphics.beginFill(0x000000, 0.5);
        this._topSp.graphics.drawRect(0, 0, 1366, 1024);
        this._topSp.graphics.endFill();
        this._topSp.visible=false; 
         this._topSp.$touchEnabled=true;

          this._topSp.addChild(caidai);
        caidai.name="caidai";
        caidai.y=68.48;
        caidai.visible=false; 

		   this._topSp.addChild(qwd2);
        qwd2.name="qwd2";
        qwd2.x=45+798;
		 qwd2.y=-66+695;
        qwd2.visible=false; 

		   this._topSp.addChild(qwd3);
        qwd3.name="qwd3";
        qwd3.x=45+798;
		 qwd3.y=-66+695;
        qwd3.visible=false; 

        this._topSp.addChild(successStar);
        successStar.name="successStar";
        successStar.x=324;
        successStar.y=157;
        successStar.visible=false; 
        successStar.touchEnabled = true;
        this._topSp.addChild(failStar);
        failStar.name="failStar";
        failStar.x=324;
        failStar.y=157;
        failStar.visible=false; 


        this._topSp.addChild(this._tryAgain);
        this._tryAgain.name="tryAgain";
        this._tryAgain.x=568;
        this._tryAgain.y=787;
        this._tryAgain.visible=false; 
        this._tryAgain.$touchEnabled=true;



		this._startBG=new egret.Sprite();		 
		 this._startBG.graphics.beginFill(0,0.5);
		 this._startBG.graphics.drawRect(0,0,PublicTool.stageWidth,PublicTool.stageHeight);
		 this._startBG.graphics.endFill();
		 this._startBG.touchEnabled = true;
		 this.addChild(this._startBG);

		 this._startBtn=new EButton(this, "start_png", null,null, "", 30, 3, null);
		 this._startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartBtnClick,this);
		 this._startBtn.x=(PublicTool.stageWidth-this._startBtn.width)*0.5;
		 this._startBtn.y=(PublicTool.stageHeight-this._startBtn.height)*0.5;
		 this._startBG.addChild(this._startBtn);

		   this.m_bgSound = new SoundPlayer();

		   this._question.clickFun=this.cardClick;

		 this.initListener();
    }

    private initListener()
    {
         
       // this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
       // this._cards.addEventListener(egret.Event.COMPLETE, this.boxShow, this);
        //this._question.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cardClick, this);
         this._tryAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.replay, this);
	}

	private replay(e:egret.TouchEvent)
    {
        e.stopImmediatePropagation();
        Source.reArrange();
        this._topSp.visible=false; 
        for(var i:number=0;i<this._topSp.numChildren;i++)
        {
        this._topSp.getChildAt(i).visible=false;
        }

        this.m_bgSound.clear();
        this.m_bgSound.playRes("bgmusic_mp3",0,0.1);

        this._qwd.visible=true;
		this._qwd.scaleX=1;
		  this._qwd.x=474;
        this._qwd.y=660;

       this._index=0;
       // this._countArr=[];
        this._loves.reset();
        this._stars.reset();
        // this._quit.visible=true;
        //this._next.visible = false;
       // this.m_repeatBtn.visible = true;
       // this.start();
	   this._question.reset();
	   this._question.visible=true;
	   	this._question.createQuestion(this._index);	
    }

	public cardClick(pX:number,pY:number):void
	{
	
		if(this._move)return;
		if(this._qwd.x>=pX)
	{
		this._left=true;
		if(this._qwd.scaleX!=1)
		{
			this._qwd.scaleX=1;
			this._qwd.x=this._qwd.x-this._qwd.width
		}
		
	}else
	{
		this._left=false;
		if(this._qwd.scaleX==1)
		{
			this._qwd.scaleX=-1;
			this._qwd.x=this._qwd.x+this._qwd.width;
		}
		
	}
	
	
		this._cardX=pX;
		this._move=true;
	
		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame0,this);
		
	}

	private onEnterFrame0(event:egret.Event):void
	{
		if(this._left)
		{
			this._qwd.x-=this._speedX;
			if(this._qwd.x<=this._cardX)
		{
			this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame0,this);
			this._qwd.gotoAndStop(1);
			this._move=false;
			if(this._question.answer)
			{
				this._stars.add();

			}else
			{
				this._loves.cut();

			}
			
		
			setTimeout(()=>{
				
				this._qwd.gotoAndStop(0);
		
			this._index++;
			if(this._index==10)
			{
					this._question.visible=false;
					this._qwd.visible=false;

   					this.addChild(this._loves);
                       this.addChild(this._stars);
                       this.addChild(this._qwd);
                    

                    this._topSp.visible=true; 
                    this._topSp.getChildByName("caidai").visible=true;
                    this._topSp.getChildByName("successStar").visible=true;
                    this._topSp.getChildByName("tryAgain").visible=true;
					 this._topSp.getChildByName("qwd2").visible=true;
                  
				   
					 	this._question.reset();
                    this.m_bgSound.clear();
				return;
			}
				
			this._question.createQuestion(this._index);	
			},500);
		}
		}else
		{
			
			this._qwd.x+=this._speedX;
			if(this._qwd.x>=this._cardX+270)
		{
			this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame0,this);
			this._qwd.gotoAndStop(1);
			this._move=false;
			if(this._question.answer)
			{
				this._stars.add();

			}else
			{
				this._loves.cut();

			}
			setTimeout(()=>{this._qwd.gotoAndStop(0);
				this._index++;
			if(this._index>=10)
			{
					this._question.visible=false;
					this._qwd.visible=false;

   					this.addChild(this._loves);
                       this.addChild(this._stars);
                       this.addChild(this._qwd);
                    

                    this._topSp.visible=true; 
                    this._topSp.getChildByName("caidai").visible=true;
                    this._topSp.getChildByName("successStar").visible=true;
                    this._topSp.getChildByName("tryAgain").visible=true;
					 this._topSp.getChildByName("qwd2").visible=true;
                  
				   
					this._question.reset();
                    this.m_bgSound.clear();
				return;
			}
		
			
			this._question.createQuestion(this._index);		
			},500);
		}
	}
		egret.log(event.target);
	}

	private onStartBtnClick(event: egret.TouchEvent):void
	{
		this.m_bgSound.clear();
        this.m_bgSound.playRes("bgmusic_mp3",0,0.1);
		var onComplete: Function = function () {			
			//this.showQuestion();
			this._question.createQuestion(this._index);
		}
		if(this._startBG.visible){
			egret.Tween.get(this._startBG).to({ alpha: 0,visible:false}, 800).call(onComplete, this);
		}
		
	}
}