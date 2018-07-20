class Archery extends egret.Sprite{
	private _bg:Bg;
	private _qwd:Qieadi;
	private _arrow:Arrow;
	private _queation:QuestionCompoment;
	private _loves:CountLoves;
	private _stars:CountStars;
	private _overPage:OverPage;
	private _tempCard:CardComponent;
	private _questionIndex:number=0;
	private static WINNUM:number=10;
	private static FAILNUM:number=3;
	 private _rightSound:SoundPlayer;
	 private _wrongSound:SoundPlayer;
	public constructor() {
		super();
		
		if(this.stage)
		{
			this.createView();
			
		}else
		{

			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}
    }

	private onAddToStage(event: egret.Event) 
	{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		this.createView();
	}

    private createView():void {

		this._bg=new Bg();
        this.addChild(this._bg);

		this._queation=new QuestionCompoment();
        this.addChild(this._queation);
	

		let flower=Source.createBitmapByName("archery_2_png");
		this.addChild(flower);
		flower.y=787.7;

		this._qwd =new Qieadi();
        this.addChild(this._qwd);
		this._qwd.x=1014;
		this._qwd.y=637;

		this._arrow=new Arrow();
		 this.addChild(this._arrow);
		 this._arrow.x=1018;
		 this._arrow.y=809;
		  this._arrow.rotation=-72.5;


        this._loves=new CountLoves();
        this.addChild(this._loves);
        this._loves.x=182.5;
        this._loves.y=11.5;

        this._stars=new CountStars();
        this.addChild(this._stars);
        this._stars.x=749;
        this._stars.y=22.5;


        this._overPage=new OverPage();
        this.addChild(this._overPage);
      
       this._rightSound= new SoundPlayer();
	    this._wrongSound= new SoundPlayer();

         this.initListener();
	}

    private initListener()
    {
        this._overPage.addEventListener(egret.Event.COMPLETE,this.again, this);
        this._overPage.addEventListener(egret.Event.CHANGE,this.start, this)
    }

	private again(e:egret.Event)
    {
         this._questionIndex=0;
        this._arrow.visible=true;
          this._qwd.visible=true;
         this._loves.reset();
        this._stars.reset();
         this._overPage.visible=false;
		 Source.reArrange();
		 this._queation.reset();
          this._queation.startQuestion(Source.questionList[this._questionIndex]);
		    this._queation.once(egret.TouchEvent.TOUCH_TAP,this.onStageTouchBegin, this );
			   this._queation.move();
			   this.arrowReset();
    }

	 
    private onStageTouchBegin(e: egret.TouchEvent):void 
    {
		
		if(e.target.name.split("_")[0]=="card")
		{
			let card=e.target;
			this._queation.stop();
			 var rotate:number=-Math.atan2((this._arrow.y+10-e.stageY),(e.stageX-(this._arrow.x+65)))*180/Math.PI;
        	this._arrow.rotation=90+rotate;
		   egret.Tween.get( this._arrow).to( {x:e.stageX,y:e.stageY}, 300, egret.Ease.sineIn );

		   setTimeout(()=>{
			   egret.log(this._queation.answer,card.tag);
			if(this._queation.answer==card.tag)
			{
				this.arrowReset();
				card.hide(); 
				
				this._rightSound.clear();
        		this._rightSound.playRes("dingdong_mp3").exec(()=>{
						this._stars.add();
						if(this._stars.count>=Archery.WINNUM)
						{
							this._arrow.visible=false;
							this._qwd.visible=false;
							this.addChild(this._loves);
							this.addChild(this._stars);
							this._overPage.visible=true;
							this._overPage.showWin(true);
							return;
						}

						
					
						this._questionIndex++;
					this._queation.once(egret.TouchEvent.TOUCH_TAP,this.onStageTouchBegin, this );
					this._queation.startQuestion(Source.questionList[this._questionIndex]);
					this._queation.move();
					this.arrowReset();

				
				},this);
				
			
			}else
			{
				
				this.arrowDrop();
				this._wrongSound.clear();
				EffectUtils.shakeObj(card);
				this._wrongSound.playRes("chacha_mp3").exec(()=>{
					this._loves.cut();
						if(this._loves.count<=0)
				{
					this._arrow.visible=false;
					this._qwd.visible=false;
                    this.addChild(this._loves);
                    this.addChild(this._stars);
                    this._overPage.visible=true;
                    this._overPage.showWin(false);
					return;
				}
					
					
				this._questionIndex++;
			   this._queation.once(egret.TouchEvent.TOUCH_TAP,this.onStageTouchBegin, this );
			   this._queation.startQuestion(Source.questionList[this._questionIndex]);
			   this._queation.move();
			   this.arrowReset();

				
				},this);
				
			
			}
				
			

		   },1000,this)
		}
       
    }


    private start(e:egret.TouchEvent)
	{
	   this._queation.startQuestion(Source.questionList[this._questionIndex]);
        this._overPage.visible=false;
		this._queation.move();
		this._queation.once(egret.TouchEvent.TOUCH_TAP,this.onStageTouchBegin, this );
	
	}

	private arrowReset()
	{
		this._arrow.x=1018;
		this._arrow.y=809;
		this._arrow.rotation=-72.5;
	}

	private arrowDrop()
	{
		egret.Tween.get( this._arrow).to( {rotation:120,y:900}, 300, egret.Ease.sineIn );
	}
  
}