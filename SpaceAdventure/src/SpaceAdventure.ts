class SpaceAdventure extends egret.Sprite {

	private _bg:Bg;
    private _loves:CountLoves;
    private _stars:CountStars;
    private _overPage:OverPage;
    private _upBtn:EButton
	private _downBtn:EButton;
    private _qwd:egret.Bitmap;
    private _isUp:Boolean;
    private _qwdSpeed:number=10;
	private _cardSpeed:number=6;
    private _questionSp:egret.Sprite;
    

    //题目索引
    private _questionIndex:number=0;
	public static WINNUM:number=10;
	public static FAILNUM:number=3;
	private _questionSound:SoundPlayer;
	private _showNum:number=3;
	private  _randomHeight:number[]=[110+153,559,859];
	private _answer:string;
	private _point:egret.Point;
	private _testDis:number=200;
	 private _rightSound:SoundPlayer;
	 private _wrongSound:SoundPlayer;
	public constructor() {
		 super();
	 		this.createView();
    }

    

    private createView():void {

		this._bg=new Bg();
        this.addChild(this._bg);

        this._qwd = Source.createBitmapByName("spaceadventure_4_png");
        this.addChild(this._qwd);
		this._qwd.anchorOffsetX=this._qwd.width*0.5;
		this._qwd.anchorOffsetY=this._qwd.height*0.5;
		this._qwd.x=3+this._qwd.width*0.5;
		this._qwd.y=399+this._qwd.height*0.5;;


        // this._queation=new QuestionCompoment();
        //  this.addChild(this._queation);

		this._questionSp=new egret.Sprite();
		this.addChild(this._questionSp);
		for(var i:number=0;i<this._showNum;i++)
		{
			let card=new CardComponent(i+1);
			 this._questionSp.addChild(card);
			 card.x=1366;
		}
		this._questionSound= new SoundPlayer();


        this._loves=new CountLoves();
        this.addChild(this._loves);
        this._loves.x=182.5;
        this._loves.y=11.5;

        this._stars=new CountStars();
        this.addChild(this._stars);
        this._stars.x=749;
        this._stars.y=22.5;

        this._upBtn = new EButton(this, "btn_up_png", this.onUpBtnBegin, this.onUpBtnEnd,"", 30, 3, null);
		 PublicTool.setXY(this._upBtn,31.7,837.75);
		 this.addChild(this._upBtn);
		 this._downBtn = new EButton(this, "btn_down_png", this.onDownBtnBegin,this.onDownBtnEnd, "", 30, 3, null);
		 PublicTool.setXY(this._downBtn,1176.6,837.75);
		 this.addChild(this._downBtn);




        this._overPage=new OverPage();
        this.addChild(this._overPage);

		 this._rightSound= new SoundPlayer();
	    this._wrongSound= new SoundPlayer();
      
       // this._queation.hitTestFun=this.hitTest;

         this.initListener();
	}

    private initListener()
    {
        this._overPage.addEventListener(egret.Event.COMPLETE,this.again, this);
         this._overPage.addEventListener(egret.Event.CHANGE,this.start, this)
        
    }

	public startQuestion(id:number):void
	{
		let randomArr=Source.randomIndex(this._showNum);
		for(let j:number=0;j<this._showNum;j++){

			let card=this._questionSp.getChildAt(j) as CardComponent;
			if(j>0)
			{
				let index=Source.questionList[id][j-1];
				
				card.addImg(Source.images[index]);
				card.name=Source.list[index].name;
				//egret.log(j,index,card.name);
			}else
			{
				card.name="";
			}
			card.x=1366+Math.random()*300;
			card.y=this._randomHeight[randomArr[j]];
			card.addEventListener(egret.Event.ENTER_FRAME,this.onCardMove,this);
			//egret.Tween.get(card,{loop:true}).to({x:-420}, 1000*10);
		}
		this.read(id);
	}

	public read(id:number)
	{
		this._answer=Source.list[id%Source.images.length].name;
		//egret.log("this.answer:",this._answer);
		this._questionSound.clear();
        this._questionSound.playRes(Source.list[id%Source.images.length].audio);
	}

	private onCardMove(e:egret.Event):void
	{
		let card= e.target as CardComponent;
		card.x -= this._cardSpeed;
		if (card.x <= -300)
		{
			card.x = 1366 + Math.random() * 300;
		}
		this._point=this._questionSp.localToGlobal(card.x,card.y);
		
		//let isTrue=this._qwd.hitTestPoint(this._point.x,this._point.y,true);
		//this._point.
		let distance=egret.Point.distance(this._point,new egret.Point(this._qwd.x,this._qwd.y));
	
		if(distance<this._testDis){
			this.stopMove();
			
			//egret.log("card.name:",card.name);
			//egret.log("this._answer",this._answer);
			if(card.name==this._answer)
			{
				this._rightSound.clear();
				this._rightSound.playRes("dingdong_mp3").exec(()=>{

					this._stars.add();
				if(this._stars.count>=SpaceAdventure.WINNUM)
				{
					//egret.log("win");
					 this._qwd.visible=false;
                    this.addChild(this._loves);
                    this.addChild(this._stars);
                    this._questionSp.visible=false;
                    this._overPage.visible=true;
                    this._overPage.showWin(true);
					return;
				}
				 setTimeout(()=>{
					this._questionIndex++;
					this.startQuestion(this._questionIndex);

				},500);
				},this);
				
			}else
			{
					this._wrongSound.clear();
				EffectUtils.shakeObj(card);
				this._wrongSound.playRes("chacha_mp3").exec(()=>{

					this._loves.cut();
				if(this._loves.count<=0)
				{
					//egret.log("fail");
					this._qwd.visible=false;
                    this.addChild(this._loves);
                    this.addChild(this._stars);
                    this._questionSp.visible=false;
                    this._overPage.visible=true;
                    this._overPage.showWin(false);
					return;
				}
				 setTimeout(()=>{
					this._questionIndex++;
					this.startQuestion(this._questionIndex);

				},500);
				},this);

				
			}
			
           // egret.log(this._stars.count);
		  
			
		}
	}

	private stopMove():void
	{
		for(let j:number=0;j<this._showNum;j++)
			{

				let card=this._questionSp.getChildAt(j) as CardComponent;
				card.removeEventListener(egret.Event.ENTER_FRAME,this.onCardMove,this);
			}

	}

	 private again(e:egret.Event)
    {
		this._qwd.x=3+this._qwd.width*0.5;
		this._qwd.y=399+this._qwd.height*0.5;;
         this._questionIndex=0;
         this._qwd.visible=true;
         this._loves.reset();
        this._stars.reset();
         this._overPage.visible=false;
         this._questionSp.visible=true;
         this.startQuestion(this._questionIndex);
    }



    private start(e:egret.TouchEvent)
	{
       this.startQuestion(this._questionIndex);
        this._overPage.visible=false;
	}

    public onUpBtnBegin(event: egret.TouchEvent):void
	{
		
		this._isUp=true;
		this.addEventListener(egret.Event.ENTER_FRAME,this.onBoatMove,this);
	}
	public onUpBtnEnd(event: egret.TouchEvent):void
	{
		
		this.removeEventListener(egret.Event.ENTER_FRAME,this.onBoatMove,this);
	}

    public onDownBtnBegin(event: egret.TouchEvent):void
	{
		
		this._isUp=false;
		this.addEventListener(egret.Event.ENTER_FRAME,this.onBoatMove,this);
	}
	public onDownBtnEnd(event: egret.TouchEvent):void
	{
		
		this.removeEventListener(egret.Event.ENTER_FRAME,this.onBoatMove,this);
	}

    private onBoatMove(e:egret.Event):void
	{
		if(this._isUp){
			
			if(this._qwd.y>=this._qwd.height*0.5)
			{
 				this._qwd.y-=this._qwdSpeed;
			}
           
		}else{
			 
			 if(this._qwd.y<=1024-this._qwd.height*0.5)
			{
 				this._qwd.y+=this._qwdSpeed;
			}
		}
		
	}


}