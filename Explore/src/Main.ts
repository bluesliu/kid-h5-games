class Main extends egret.DisplayObjectContainer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private _loadCount:number=0;
    private loadingView:LoadingUI;
    private _loves:CountLoves;
    private _stars:CountStars;
    private _gun:Gun;
    private _bullet:egret.Bitmap;
    private _speedY:number=40;
    private _speedX:number;
    private _box1:egret.Sprite;
    private _qwd:Qieadi;
    private _cards:DropCards;
    // private _bmpArr:Array<egret.Bitmap>=new Array<egret.Bitmap>();
    private _count:number=0;
    private _drop:any;
    private m_gunSound:SoundPlayer;
    private _resultArr:number[]=[0,2,3,1,2,0,0,2,1,3];
    private _countArr:number[]=[];
   
    // private _tipsSound:egret.Sound;
    // private _tipsChannel: egret.SoundChannel;
    private m_tipsSound:SoundPlayer;

    private m_bgSound:SoundPlayer;
    private _topSp:egret.Sprite;
    private _timer: egret.Timer;
    private _clickEnable:boolean;
    private _tryAgain:egret.Bitmap;
    // private _quit:egret.Bitmap;          //退出按钮郑辉做
    private _next:egret.Bitmap;
    private _start:egret.Bitmap;
    // private _audioArr:any[]=[];
    private rightIndex:number;
    private _bg:Bg;

    private m_repeatBtn:egret.Bitmap;
    public static sourceName:String="";


    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {
                
            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }


        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.loadingView.x = (this.stage.stageWidth - this.loadingView.width)/2;
        this.loadingView.y = (this.stage.stageHeight - this.loadingView.height)/2;
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onSceneLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");   //加载场景资源
    }

    private isResourceLoadEnd: boolean = false;
    /**
     * 场景资源组加载完成
     */
    private onSceneLoadComplete(event: RES.ResourceEvent): void {
        
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onSceneLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onUnitLoadComplete, this);

        let requestObj = GetRequestObject();
        
        let assetsName:string;
        if(requestObj==null){
            Println("请求数据为null，无法加载相应单元的数据");
            return;
        }
        else if(requestObj.assetsName==null || requestObj.assetsName==undefined || requestObj.assetsName==""){
            Println("请求的assetsName为null，无法加载相应单元的数据");
            return;
        }
        else{
            //assetsName = requestObj.assetsName;
            assetsName = requestObj.assetsName;

        }
        Main.sourceName=assetsName;
        RES.loadGroup(assetsName);
    }


    private onUnitLoadComplete(event: RES.ResourceEvent): void {
        
        this.stage.removeChild(this.loadingView);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onUnitLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        this.isResourceLoadEnd = true;

        Source.init();
      
       this.startCreateScene();
    }



    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        Println("Url:" + event.resItem.url + " has failed to load");
    }
    private onResourceLoadError(event: RES.ResourceEvent): void {
        Println("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onSceneLoadComplete(event);
    }
    private onResourceProgress(event: RES.ResourceEvent): void {
        this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {

        this.stage.maxTouches=1;

        let adv=new Adventurer();
        this.addChild(adv);

        // let stageW = this.stage.stageWidth;
        // let stageH = this.stage.stageHeight;


        // this._bg=new Bg();
        // this.addChild(this._bg);
      

        // // this._bullet=Source.createBitmapByName("炮弹_png");
        // // this.addChild(this._bullet);
        // // this._bullet.x=681;
        // // this._bullet.y=957;
        // // this._bullet.anchorOffsetX = 17.5;
        // // this._bullet.anchorOffsetY = 23;

        // // this._gun=new Gun();
        // // this.addChild(this._gun);
        // // this._gun.x=607;
        // // this._gun.y=759;

        // this._cards=new DropCards();
        // this.addChild(this._cards);

        // // let caidai= Source.createBitmapByName("success_2_png");
        // // let successStar = Source.createBitmapByName("success_1_png");    
        // // let failStar= Source.createBitmapByName("fail_2_png");   
        // // this._tryAgain= Source.createBitmapByName("fail_0_png");

  

        // this._loves=new CountLoves();
        // this.addChild(this._loves);
        // this._loves.x=200;
        // this._loves.y=16;

        // this._stars=new CountStars();
        // this.addChild(this._stars);
        // this._stars.x=755;
        // this._stars.y=24;

        // // this._qwd=new Qieadi();  
        // // this.addChild(this._qwd);
        // // this._qwd.x=798;
        // // this._qwd.y=695;

        // // // this._quit= Source.createBitmapByName("quit_png");
        // // // this.addChild(this._quit);
        // // // this._quit.$touchEnabled=true;
        // // // this._quit.x=90;
        // // // this._quit.y=852+89;

        // // this._next= Source.createBitmapByName("next_png");
        // // this.addChild(this._next);
        // // this._next.$touchEnabled=true;
        // // this._next.x=this.stage.stageWidth-this._next.width - 50;
        // // this._next.y=940;
        // // this._next.visible = false;

        // // this.m_repeatBtn= Source.createBitmapByName("repeat_png");
        // // this.addChild(this.m_repeatBtn);
        // // this.m_repeatBtn.$touchEnabled=true;
        // // this.m_repeatBtn.x=this._next.x;
        // // this.m_repeatBtn.y=this._next.y - 90;
        // // this.m_repeatBtn.visible = false;

        // this._topSp = new egret.Sprite();
        // this.addChild( this._topSp);
        // this._topSp.graphics.beginFill(0x000000, 0.5);
        // this._topSp.graphics.drawRect(0, 0, 1366, 1024);
        // this._topSp.graphics.endFill();
        // this._topSp.visible=false; 
        //  this._topSp.$touchEnabled=true;

        // //   this._topSp.addChild(caidai);
        // // caidai.name="caidai";
        // // caidai.y=68.48;
        // // caidai.visible=false; 

        // // this._topSp.addChild(successStar);
        // // successStar.name="successStar";
        // // successStar.x=324;
        // // successStar.y=157;
        // // successStar.visible=false; 
        // // successStar.touchEnabled = true;
        // // this._topSp.addChild(failStar);
        // // failStar.name="failStar";
        // // failStar.x=324;
        // // failStar.y=157;
        // // failStar.visible=false; 


        // // this._topSp.addChild(this._tryAgain);
        // // this._tryAgain.name="tryAgain";
        // // this._tryAgain.x=568;
        // // this._tryAgain.y=787;
        // // this._tryAgain.visible=false; 
        // // this._tryAgain.$touchEnabled=true;

        // this._start= Source.createBitmapByName("start_png");
        // this.addChild(this._start);
        // this._start.$touchEnabled=true;
        // this._start.x=(stageW-this._start.width)*0.5;
        // this._start.y=(stageH-this._start.height)*0.5;

        // this.m_tipsSound = new SoundPlayer();

        // this._timer=new egret.Timer(10000,0);

        
       

        //  this.m_bgSound = new SoundPlayer();
        // this.m_gunSound = new SoundPlayer();
        
        // this._topSp.visible=true; 
        //   this.initListener();
    }

    // private initListener()
    // {
         
    //     this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
    //      this._cards.addEventListener(egret.Event.COMPLETE, this.boxShow, this);
    //     // this._tryAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.replay, this);
    //     // // this._quit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuit, this);
    //     this._start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
    //     // this._topSp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStopEvent, this);
    //     // this._next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapSuccessStar, this);
    //     // this.m_repeatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.repeat, this);
	// }

	// // private onQuit(e:egret.TouchEvent)
	// // {
    // //     e.stopImmediatePropagation();
	// // 	exit();
	// // }

	// private onStopEvent(e:egret.TouchEvent)
	// {
	// 	e.stopImmediatePropagation();
	// }
    
  
    // private onTapSuccessStar(e:egret.TouchEvent)
    // {
    //     e.stopImmediatePropagation();
    //     NextLevel()
    // }

    // private replay(e:egret.TouchEvent)
    // {
    //     e.stopImmediatePropagation();
    //     Source.reArrange();
    //     this._topSp.visible=false; 
    //     for(var i:number=0;i<this._topSp.numChildren;i++)
    //     {
    //     this._topSp.getChildAt(i).visible=false;
    //     }

    //     this.m_bgSound.clear();
    //     this.m_bgSound.playRes("bgmusic_mp3",0,0.1);

    //     this._qwd.gotoAndStop(0);
    //     this._count=0;
    //     this._countArr=[];
    //     this._loves.reset();
    //     this._stars.reset();
    //     // this._quit.visible=true;
    //     this._next.visible = false;
    //     this.m_repeatBtn.visible = true;
    //     this.start();
    // }

    //  private boxShow()
    // {
         
    //     this._clickEnable=true;
    //     this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStageTouchBegin, this);
    // }

    // private start()
    // {
        
    //     this._topSp.visible=false; 
    //     this._start.visible=false; 
    // //    this.m_repeatBtn.visible = true;
    //     // this._tipsSound.load(Source.root+Source.list[this._count%Source.images.length].audio);
    //     this.m_tipsSound.clear();
    //     this.m_tipsSound.playRes(Source.list[this._count%Source.images.length].audio);

    //     let arr=[];
    //     for(let i:number=0;i<Source.LEN;i++)
    //     {
    //         egret.log(i,Source.images[Source.questionList[this._count][i]]);
    //         arr.push(Source.images[Source.questionList[this._count][i]]);
    //     }
    //   //  this._cards.init(arr);
    //     this._timer.start();

    //     this.m_bgSound.playRes("bgmusic_mp3",0,0.1);
      
    // }

    // private timerFunc(event:egret.TimerEvent)
    // {
    //     this.repeat(null);
    // }

    // private repeat(e:egret.TouchEvent=null){
    //     if(e!=null){
    //         e.stopImmediatePropagation();
    //     }
        
    //     this._timer.reset();
    //     this.m_tipsSound.clear();
    //     this.m_tipsSound.playRes(Source.list[this._count%Source.images.length].audio);
    // }

    //  private next()
    // {
    //      this._clickEnable=false;
    //      this.stage.removeEventListener( egret.TouchEvent.TOUCH_BEGIN,this.onStageTouchBegin, this );
        
    //       if(this._countArr[this._count]==undefined)
    //         {
    //             this._loves.cut();
    //             if(this._loves.count==0)
    //             {
                  
    //                setTimeout(()=>{ 

    //                    this.addChild(this._loves);
    //                    this.addChild(this._stars);
    //                    this.addChild(this._qwd);
    //                 //    this.addChild(this._quit);
    //                    this.addChild(this._next);

    //                     this._topSp.visible=true; 
    //                     this._topSp.getChildByName("failStar").visible=true;
    //                     this._topSp.getChildByName("tryAgain").visible=true;
    //                     //this._quit.visible=false;
    //                     this._qwd.gotoAndStop(2);

    //                     this.m_bgSound.clear();
        
    //                 },200);
                    
    //                 this._timer.stop();
    //                 return;
    //             }
               
    //         }
    //         this._count++;
    //         if(this._count>=Source.NUM)
    //         {
    //             //提交胜利
    //             console.log("提交胜利... ...")
    //             GameOver(true, function(){
    //                 console.log("提交胜利complete")
    //             });
               
    //             this._next.visible =  GetRequestObject().taskId == 0;
    //             this.m_repeatBtn.visible = false;

    //             this._timer.stop();
    //             setTimeout(()=>{ 
    //                  this.addChild(this._loves);
    //                    this.addChild(this._stars);
    //                    this.addChild(this._qwd);
    //                 //    this.addChild(this._quit);
    //                    this.addChild(this._next);

    //                 this._topSp.visible=true; 
    //                 this._topSp.getChildByName("caidai").visible=true;
    //                 this._topSp.getChildByName("successStar").visible=true;
    //                 this._topSp.getChildByName("tryAgain").visible=true;
    //                 this._qwd.gotoAndStop(1);

    //                 this.m_bgSound.clear();
    //             },200);
    //             return;
    //         }
    //     let arr=[];
    //     for(let i:number=0;i<Source.images.length;i++)
    //     {
    //         arr.push(Source.images[Source.questionList[this._count][i]]);
    //     }
            
    //         var time=this.rightIndex==-1?1500:4000;
    //         this._cards.next(arr,this.rightIndex,time-1500);
    //         setTimeout(()=>{
    //             this._qwd.gotoAndStop(0);
    //               //this._tipsSound.load(Source.root+Source.list[this._count%Source.images.length].audio);
    //               this.m_tipsSound.clear();
    //             this.m_tipsSound.playRes(Source.list[this._count%Source.images.length].audio);
    //             },time);
    // }

    // /**
    //  * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    //  * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
    //  */
    // // private createBitmapByName(name: string): egret.Bitmap {
    // //     let result = new egret.Bitmap();
    // //     let texture: egret.Texture = RES.getRes(name);
    // //     result.texture = texture;
    // //     return result;
    // // }

    // private createDisobj(array: Array<egret.DisplayObject>): egret.Sprite {
    //     let result = new egret.Sprite();
    //     for(var i:number=0;i<array.length;i++)
    //     {
    //         result.addChild(array[i])
    //     }
    //     return result;
    // }

    
    
    // private onStageTouchBegin(e: egret.TouchEvent):void 
    // {
    //     this.stage.removeEventListener( egret.TouchEvent.TOUCH_BEGIN,this.onStageTouchBegin, this );
    //     this._speedX=-this._speedY*(e.stageX-(this._gun.x+74))/(this._gun.y+198-e.stageY);

    //     var rotate:number=-Math.atan2((this._gun.y+198-e.stageY),(e.stageX-(this._gun.x+74)))*180/Math.PI;
    //     this._gun.setRotate(rotate);
    //     this._bullet.rotation=90+rotate;
    //     // this.stage.once(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);

    //     this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
    //     setTimeout(()=>{this._gun.showHuohua()},100);
    // }

    // // private onStageTouchEnd(e: egret.TouchEvent):void {
        
    // // }

    // private onEnterFrame(e:egret.Event){
    //     if(this._bullet.y>0)
    //     {
    //         this._bullet.y-=this._speedY;
    //         this._bullet.x-=this._speedX;
    //         for(var i:any=0;i<4;i++)
    //         {
    //             var card:DropCard=this._cards.getChildren(i)as DropCard;
    //             var bResult:boolean = card.hitTestPoint( this._bullet.x, this._bullet.y,true);

    //             if(bResult&&card.visible&&this._clickEnable)
    //             {
    //                 //开枪音效
    //                 this.m_gunSound.clear();
    //                 this.m_gunSound.playRes("8367_mp3");

    //                 //   card.visible=false;
    //                 this._bullet.visible=false;
                    
    //                 this.rightIndex=(Source.questionList[this._count]as any []).indexOf(this._count%Source.images.length);
    //                     //egret.log("card.name:",card.name,String(this._count%Source.images.length));
    //                     egret.log("this.rightIndex:",this.rightIndex);
    //                 if(card.name==this.getCurQuestionName())
    //                 {
    //                     this._countArr[this._count]=1;
    //                     this._stars.add();
    //                     this._qwd.gotoAndStop(4);
    //                 }else
    //                 {
    //                     this.rightIndex=-1;
    //                     card.visible=false;
    //                     this._countArr[this._count]=0;
    //                     this._loves.cut();
    //                     this._qwd.gotoAndStop(3);
    //                     if(this._loves.count==0)
    //                     {
    //                         //提交失败
    //                         console.log("提交失败... ...")
    //                         GameOver(false, function(){
    //                             console.log("提交失败complete")
    //                         });
    //                         this.m_repeatBtn.visible = false;
    //                         setTimeout(()=>{ 
    //                         this.addChild(this._loves);
    //                         this.addChild(this._stars);
    //                         this.addChild(this._qwd);
    //                         // this.addChild(this._quit);
    //                         this.addChild(this._next);

    //                         this._topSp.visible=true;
    //                         this._topSp.getChildByName("failStar").visible=true;
    //                         this._topSp.getChildByName("tryAgain").visible=true;
    //                         // this._quit.visible=false;
    //                         this._qwd.gotoAndStop(2);

    //                         this.m_bgSound.clear();
    //                     },200);
    //                         this._timer.stop();
    //                         this.stage.removeEventListener( egret.TouchEvent.TOUCH_BEGIN,this.onStageTouchBegin, this );
    //                         return;
    //                     }
    //                 }
                    
                        
    //                 setTimeout(()=>{  this._timer.reset();
    //                     this._timer.start();
    //                     this.next();},500);

    //                     this._bullet.visible=true;
    //                     this._bullet.x=681;
    //                     this._bullet.y=957;
    //                     this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
                    
    //             }

                
    //         } 
  
    //     }else
    //     {
    //          if(this._countArr[this._count]==undefined)
    //         {
    //             this.stage.addEventListener( egret.TouchEvent.TOUCH_TAP,this.onStageTouchBegin, this );
    //         }
            
           
    //         this._bullet.visible=true;
    //         this._bullet.x=681;
    //         this._bullet.y=957;
    //         this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
           
    //     }
    // }

    // private getCurQuestionName():string{
    //     return Source.list[this._count%Source.images.length].name;
    // }
}
