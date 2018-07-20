class BasketBall extends egret.Sprite{
	private _bg:Bg;
	private _qwd:Qieadi;
	private _ball:Ball;
	private _queation:QuestionCompoment;
	private _loves:CountLoves;
	private _stars:CountStars;
	private _overPage:OverPage;
	private _net:egret.Bitmap;
	private _tempCard:CardComponent;
	private _questionIndex:number=0;
	private static WINNUM:number=10;
	private static FAILNUM:number=3;
	 private _rightSound:SoundPlayer;
	 private _wrongSound:SoundPlayer;
	 private _positionArr:Array<egret.Point> =[new egret.Point(244,236),new egret.Point(640,236),new egret.Point(1038,236)]; 
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

		this._qwd =new Qieadi();
        this.addChild(this._qwd);
		this._qwd.x=1006;
		this._qwd.y=525;

		this._ball=new Ball();
		this.addChild(this._ball);
		this._ball.x=1030;
		this._ball.y=820;
		

		this._net=Source.createBitmapByName("basketballStands1_png");
		this.addChild(this._net);
		this._net.x=220-1;
		this._net.y=438-2;
		this._net.visible=false;


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
        this._ball.visible=true;
		 this._ball.x=1030;
					this._ball.y=820;
					this._ball.play();
          this._qwd.visible=true;
		   this._qwd.gotoAndStop(1);
         this._loves.reset();
        this._stars.reset();
         this._overPage.visible=false;
		 Source.reArrange();
		//  this._queation.reset();
          this._queation.startQuestion(this._questionIndex);
		    this._queation.once(egret.TouchEvent.TOUCH_TAP,this.onStageTouchBegin, this );
			//    this._queation.move();
			
    }

	 
    private onStageTouchBegin(e: egret.TouchEvent):void 
    {
		
		if(e.target.name.split("_")[0]=="card")
		{
			let card=e.target;
			let id=e.target.name.split("_")[1];
			this._net.visible=false;
			this._ball.stop();
			egret.Tween.get( this._ball).to( {x:this._positionArr[id].x,y:this._positionArr[id].y}, 1500 ).call(()=>{this._net.visible=true;})
			.to( {x:this._positionArr[id].x,y:750}, 800 ).call(()=>{
				this._ball.play();
					this._net.visible=false;
					if(this._queation.answer==card.tag)
			{
				 this._qwd.gotoAndStop(2);
				this._rightSound.clear();
        		this._rightSound.playRes("dingdong_mp3").exec(()=>{
					this._queation.hide();
						this._stars.add();
						 
						if(this._stars.count>=BasketBall.WINNUM)
						{
							this._ball.visible=false;
							this._ball.stop();
							this._qwd.visible=false;
							this.addChild(this._loves);
							this.addChild(this._stars);
							this._overPage.visible=true;
							this._overPage.showWin(true);
							return;
						}

					setTimeout(()=>{
						this._ball.x=1030;
					this._ball.y=820;
					this._ball.play();
					this._questionIndex++;
					 this._qwd.gotoAndStop(1);
					this._queation.once(egret.TouchEvent.TOUCH_TAP,this.onStageTouchBegin, this );
					this._queation.startQuestion(this._questionIndex);
				},1000);
					

				
				},this);
				
			
			}else
			{
							this._wrongSound.clear();
				EffectUtils.shakeObj(card);
				this._qwd.gotoAndStop(3);
				this._wrongSound.playRes("chacha_mp3").exec(()=>{
					this._queation.hide();
					this._ball.play();
					this._loves.cut();
					  
						if(this._loves.count<=0)
				{
					this._ball.visible=false;
					this._ball.stop();
					this._qwd.visible=false;
                    this.addChild(this._loves);
                    this.addChild(this._stars);
                    this._overPage.visible=true;
                    this._overPage.showWin(false);
					return;
				}
					
				
				setTimeout(()=>{this._ball.x=1030;
					this._ball.y=820;
					this._ball.play();
					this._questionIndex++;
					 this._qwd.gotoAndStop(1);
					this._queation.once(egret.TouchEvent.TOUCH_TAP,this.onStageTouchBegin, this );
					this._queation.startQuestion(this._questionIndex);
				},1000);

				
				},this);

			}

			})

		}
       
    }
	private next()
	{

		this._ball.x=1030;
					this._ball.y=820;
					this._ball.play();
				this._questionIndex++;
				  this._qwd.gotoAndStop(1);
			   this._queation.once(egret.TouchEvent.TOUCH_TAP,this.onStageTouchBegin, this );
			   this._queation.startQuestion(this._questionIndex);
	}

    private start(e:egret.TouchEvent)
	{
		this._ball.play();
	   this._queation.startQuestion(this._questionIndex);
        this._overPage.visible=false;
		// this._queation.move();
		this._queation.once(egret.TouchEvent.TOUCH_TAP,this.onStageTouchBegin, this );
	
	}

  
}