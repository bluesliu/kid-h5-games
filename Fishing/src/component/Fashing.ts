class Fashing extends egret.Sprite {
   private static sped:number=20;
   private _boat:Boat;
   private _hookSp:HookSp;
   private _boatDir:number=0;
   private _spedDir:number=0;
    private _tempX:number=0;
	private _count:any=0;
	private _timer: egret.Timer;
private _fishSp: egret.Sprite;
 private _tipsSound:SoundPlayer;
 //this._bgSound
    //private _tipsChannel: egret.SoundChannel;

	 private _loves:CountLoves;
    private _stars:CountStars;
	   private _bgSound:SoundPlayer;
   // private _bgChannel: egret.SoundChannel;

	private _quit:egret.Bitmap;
	private _tryAgain:egret.Bitmap;
	private _start:egret.Bitmap;
	private _topSp:egret.Sprite;
	private _isHit:Boolean=false;
	private _hitFish:egret.Bitmap;
	private _fail:egret.Bitmap;
	private _win:egret.Bitmap;
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
		this.stage.maxTouches=1;
		 let stageW = this.stage.stageWidth;
         let stageH = this.stage.stageHeight;


		let bg = Source.createBitmapByName("buyu_8_png");
        this.addChild(bg);

		var cloud:Cloud=new Cloud();
		this.addChild(cloud);

		this._boat=new Boat();
		this.addChild(this._boat);
		this._boat.x=531.5;
		this._boat.y=173;

		let sea = Source.createBitmapByName("buyu_6_png");
         this.addChild(sea);
		sea.y=200.5+173;

		this._hookSp=new HookSp();
		this.addChild(this._hookSp);
		this._hookSp.x=this._boat.x;
		this._hookSp.y=this._boat.y;

		

		this._fishSp=new egret.Sprite();
		this.addChild(this._fishSp);
		this._fishSp.y=173;

		var paopao:Paopao=new Paopao();
		this.addChild(paopao);

		this._loves=new CountLoves();
        this.addChild(this._loves);
        this._loves.x=29;
        this._loves.y=16;

        this._stars=new CountStars();
        this.addChild(this._stars);
        this._stars.x=755;
        this._stars.y=24;


		this._quit= Source.createBitmapByName("quit_png");
        this.addChild(this._quit);
        this._quit.$touchEnabled=true;
        this._quit.x=90;
        this._quit.y=852+89;

		let caidai= Source.createBitmapByName("success_2_png");
        let successStar= Source.createBitmapByName("success_1_png");    
        let failStar= Source.createBitmapByName("fail_2_png");   
        this._tryAgain= Source.createBitmapByName("fail_0_png");
		this._fail= Source.createBitmapByName("fail_1_png");
		this._win= Source.createBitmapByName("success_0_png");

         this._topSp = new egret.Sprite();
        this.addChild( this._topSp);
        this._topSp.graphics.beginFill(0x000000, 0.5);
        this._topSp.graphics.drawRect(0, 0, 1366, 1024);
        this._topSp.graphics.endFill();
        //this._topSp.visible=false; 
		 this._topSp.$touchEnabled=true;

          this._topSp.addChild(caidai);
        caidai.name="caidai";
        caidai.y=68.48;
        caidai.visible=false; 

		   this._topSp.addChild(this._fail);
        this._fail.name="fail";
        this._fail.x=798+87;
		this._fail.y=695-77;
        this._fail.visible=false; 

		   this._topSp.addChild(this._win);
        this._win.name="win";
        this._win.x=798+45;
		this._win.y=695-66;
        this._win.visible=false; 

        this._topSp.addChild(successStar);
        successStar.name="successStar";
        successStar.x=324;
        successStar.y=157;
        successStar.visible=false; 
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

        this._start= Source.createBitmapByName("start_png");
        this.addChild(this._start);
		this._start.visible=false; 
        this._start.$touchEnabled=true;
        this._start.x=(stageW-this._start.width)*0.5;
        this._start.y=(stageH-this._start.height)*0.5;

      

        this._timer=new egret.Timer(10000,0);

		// this._tipsSound = new egret.Sound();;
        // //sound 加载完成监听
        // this._tipsSound.addEventListener(egret.Event.COMPLETE, function (e: egret.Event) {
        //     this._tipsChannel = this._tipsSound.play(0, 1);
        // }, this);

		//   RES.getResAsync('bgmusic_mp3',(data)=>{
        //     this._bgSound=data;
             
        //     // this._bgChannel = this._bgSound.play(0, 0);
       	// 	// this._bgChannel.volume=0.1;
			  
        // //   this.start();
          
        // },this);

		 this._start.visible=true;	
		 this._tipsSound= new SoundPlayer();
		 this._bgSound= new SoundPlayer();

		 this.initListener();
	}

	private initListener()
	{
		this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		 this._hookSp.addEventListener(egret.Event.COMPLETE, this.onEntableTouch, this);
		 this._hookSp.addEventListener(egret.Event.CHANGE, this.onBoatChange, this);
		 this._start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
		 this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
		 this._tryAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.replay, this);
		 this._quit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuit, this);
		  this._topSp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStopEvent, this);
	}

	private onQuit(e:egret.TouchEvent)
	{
		 e.stopImmediatePropagation();
		//exit();
	}

	private onStopEvent(e:egret.TouchEvent)
	{
		e.stopImmediatePropagation();
	}

	private replay(e:egret.TouchEvent)
    {
        e.stopImmediatePropagation();
        Source.reArrange();
       for(var i:number=0;i<this._topSp.numChildren;i++)
       {
           this._topSp.getChildAt(i).visible=false;
       }
       this._count=0;
       this._loves.reset();
       this._stars.reset();
       this._quit.visible=true;
       this.start(null);
    }

	private onTimer(e:egret.TouchEvent)
	{
		 this._tipsSound.clear();
        this._tipsSound.playRes(Source.list[this._count%Source.images.length].audio);
		// this._tipsSound.load(Source.root+Source.list[this._count%Source.images.length].audio);
	}

	private start(e:egret.TouchEvent)
	{
		if(e)
		{
			e.stopImmediatePropagation();
		}
		
		// this._bgChannel = this._bgSound.play(0, 0);
       	// this._bgChannel.volume=0.1;
		    this._bgSound.clear();
        this._bgSound.playRes("bgmusic_mp3",10000,0.1);
		   this._start.visible=false;
		   this._topSp.visible=false;
        this.showFish(this._count);
		this._timer.start();
	}

	private onBoatChange(event:egret.Event)
	{
		
		var p:egret.Point=this._hookSp.localToGlobal(this._hookSp.tempX,this._hookSp.tempY+300);
		
		 //egret.log(p.x,p.y);
		 if(this._isHit)
		 {
			 this._hitFish.x=p.x;
			 this._hitFish.y=p.y-173;
		 }else
		 {
			 for(var i:any=0;i<this._fishSp.numChildren;i++)
                    {
                      
						let fish:egret.Bitmap=this._fishSp.getChildAt(i)as egret.Bitmap;
                        var bResult:boolean = fish.hitTestPoint(p.x,p.y,true);
						if(bResult)
						{
							this._hitFish=fish;
							this._isHit=true;
							this._timer.reset();
							this._timer.stop();
						}	
                        if(bResult&&fish.visible)
                        {
                           
						 
						   this._hookSp.stop();
						  
						
                            if(fish.name==Source.images[this._count%Source.images.length].name)
                            {
                               
                                this._stars.add();
								this._boat.gotoAndStop(2);
								if(this._stars.count>=10)
								{

		 this._timer.stop();
                setTimeout(()=>{ 
                     this.addChild(this._loves);
                       this.addChild(this._stars);
                    //    this.addChild(this._qwd);
                       this.addChild(this._quit);

                    this._topSp.visible=true; 
                    this._topSp.getChildByName("caidai").visible=true;
                    this._topSp.getChildByName("successStar").visible=true;
                     this._topSp.getChildByName("tryAgain").visible=true;
					 this._topSp.getChildByName("win").visible=true;
                    // this._qwd.gotoAndStop(1);

                  //  this._bgChannel.stop();
                },200);

				for(var i:any=0;i<this._fishSp.numChildren;i++)
                    {
                      
					let fish:egret.Bitmap=this._fishSp.getChildAt(i)as egret.Bitmap;
					fish.visible=false;
				}
                
									return;
								}
                            }else
                            {
                       
                                this._loves.cut();
								this._boat.gotoAndStop(3);
                                if(this._loves.count==0)
                                {
                                    setTimeout(()=>{ 
                                    this.addChild(this._loves);
                                    this.addChild(this._stars);
                                    //this.addChild(this._qwd);
                                    this.addChild(this._quit);
								

                                    this._topSp.visible=true;
                                    this._topSp.getChildByName("failStar").visible=true;
                                    this._topSp.getChildByName("tryAgain").visible=true;
									this._topSp.getChildByName("fail").visible=true;
                                    // this._quit.visible=false;
                                   // this._qwd.gotoAndStop(2);
								   
                                    //this._bgChannel.stop();
                                },200);
                                    this._timer.stop();
                                  
                                    return;
                                }
                            }
                            
                         this.hideFish(fish.name);
                            
                        }

                        
                    } 
		 }
		  

					
	}

	private hideFish(fishName:String)
	{
		  for(var i:any=0;i<this._fishSp.numChildren;i++)
		{
			let fish:egret.Bitmap=this._fishSp.getChildAt(i)as egret.Bitmap;
			if(fish.name==fishName)
			{
				// egret.Tween.get(fish, { loop:true}).to( {alpha:0.2}, 300, egret.Ease.cubicIn).to( {alpha:1}, 300, egret.Ease.cubicIn);
			}else
			{
				egret.Tween.get(fish).wait(100*i).to( {scaleX:0.2,scaleY:0.2,alpha:0}, 500, egret.Ease.cubicIn);
			}
		}

		egret.Tween.get(this).to( {}, 2000, egret.Ease.cubicIn)
		.call(this.next);
	}

	private next()
	{
			this._count++;
			//egret.log(this._count,String(this._count%Source.images.length));
			// if(this._count>=10)
			// {
			// 	 this._timer.stop();
            //     setTimeout(()=>{ 
            //          this.addChild(this._loves);
            //            this.addChild(this._stars);
            //         //    this.addChild(this._qwd);
            //            this.addChild(this._quit);

            //         this._topSp.visible=true; 
            //         this._topSp.getChildByName("caidai").visible=true;
            //         this._topSp.getChildByName("successStar").visible=true;
            //          this._topSp.getChildByName("tryAgain").visible=true;
			// 		 this._topSp.getChildByName("win").visible=true;
            //         // this._qwd.gotoAndStop(1);

            //       //  this._bgChannel.stop();
            //     },200);

			// 	for(var i:any=0;i<this._fishSp.numChildren;i++)
            //         {
                      
			// 		let fish:egret.Bitmap=this._fishSp.getChildAt(i)as egret.Bitmap;
			// 		fish.visible=false;
			// 	}
            //     return;

			// }else
			// {
				 this.showFish(this._count);
			// }
			
		
       
	}



	private onEntableTouch(event:egret.Event)
	{
		if(this._hitFish)
		{
			egret.Tween.get(this._hitFish).to( {alpha:0,scaleX:0.2,scaleY:0.2}, 500, egret.Ease.cubicIn).call(()=>{
					
					this._timer.reset();
									this._timer.start();
									this._hitFish=null;
				});
		}
		
		this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	
		
	}

	

	
	private showFish(id:number)
	{
		this._boat.gotoAndStop(1);
		//this._tipsSound.load(Source.root+Source.list[id%Source.images.length].audio);
		 this._tipsSound.clear();
        this._tipsSound.playRes(Source.list[id%Source.images.length].audio);
        let bmpArr=[];
        for(let i:number=0;i<Source.showNum;i++)
        {
			//egret.log(Source.images[Source.questionList[id][i]]);
            bmpArr.push(Source.images[Source.questionList[id][i]]);
        }

		while(this._fishSp.numChildren>0)
		{
			this._fishSp.removeChildAt(0);
		}
        
		for(let i:number=0;i<bmpArr.length;i++)
		{
			
			let fish:egret.Bitmap=bmpArr[i]as egret.Bitmap;
            this._fishSp.addChild(fish);
			fish.smoothing=true;
			//fish.width=fish.height=250;
            fish.x=250+300*i;
            fish.y=500;
			fish.alpha=0;
			fish.visible=true;
             fish.scaleX=fish.scaleY=0.2;
			egret.Tween.removeTweens(fish);
			egret.Tween.get(fish).wait(100*i).to( {scaleX:1,scaleY:1,alpha:1}, 500, egret.Ease.cubicIn);
		}
		
		
	}	
			
			private onClick(e:egret.TouchEvent)
			{
				this._isHit=false;
				if(e.stageX==this._boat.x)return;
				this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
				this._tempX=e.stageX
			// 	trace("this._boat.x:",this._boat.x);
			// 	trace("e.stageX:",e.stageX);
				if(e.stageX<this._boat.x)
				{
					
					if(this._boatDir==1)
					{
						if(e.stageX<this._boat.x && e.stageX>=this._boat.x-this._boat.width/2)
						{
							this._spedDir=0;
						}
						if(e.stageX<this._boat.x-this._boat.width/2 && e.stageX>=this._boat.x-this._boat.width)
						{
							this._spedDir=1;
							this.flipH(this._boat,this._hookSp);
						}
						
						if(e.stageX<this._boat.x-this._boat.width)
						{
							this._spedDir=0;
							this.flipH(this._boat,this._hookSp);
						}
						
					}else
					{
						this._spedDir=0;
					}
				}else
				{
					if(this._boatDir==0)
					{
						if(e.stageX>this._boat.x && e.stageX<=this._boat.x+this._boat.width/2)
						{
							this._spedDir=1;
						}
						if(e.stageX>=this._boat.x+this._boat.width/2 && e.stageX<=this._boat.x+this._boat.width)
						{
							this._spedDir=0;
							this.flipH(this._boat,this._hookSp);
						}
					
						if(e.stageX>this._boat.x+this._boat.width)
						{
							this._spedDir=1;
							this.flipH(this._boat,this._hookSp);
						}
					}else
					{
						this._spedDir=1;
					}
					
					
					
				}
				this.addEventListener(egret.Event.ENTER_FRAME,this.onENTER_FRAME,this);
			}
			
			private onENTER_FRAME(e:Event)
			{
				//trace("this._boat.x:",this._boat.x);
				if(this._spedDir==0)
				{
					this._boat.x-=Fashing.sped;
					this._hookSp.x=this._boat.x;
					if(this._boat.x<=this._tempX)
					{
						this._hookSp.start();
						this.removeEventListener(egret.Event.ENTER_FRAME,this.onENTER_FRAME,this);
					}
				}else
				{
					this._boat.x+=Fashing.sped;
					this._hookSp.x=this._boat.x;
					if(this._boat.x>=this._tempX)
					{
						this._hookSp.start();
						this.removeEventListener(egret.Event.ENTER_FRAME,this.onENTER_FRAME,this);
					}
				}
				
			}

			public flipH(disObj:egret.DisplayObject,disObj1:egret.DisplayObject)
			{
				if(this._boatDir==0)
				{
					disObj.scaleX=-1;
					disObj.x+=disObj.width;
					disObj1.scaleX=-1;
					disObj1.x+=disObj1.width;
					this._boatDir=1;
				}else
				{
					disObj.scaleX=1;
					disObj.x-=disObj.width;

					disObj1.scaleX=1;
					disObj1.x-=disObj1.width;
					this._boatDir=0;
				}
			}
}