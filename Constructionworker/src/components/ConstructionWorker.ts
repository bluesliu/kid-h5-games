class ConstructionWorker extends egret.Sprite {
   
   	private _bg:Bg;
	private _blocks:Blocks;
   	// private _bgSound:SoundPlayer;
    // private _bgChannel: egret.SoundChannel;
    private _loves:CountLoves;
    private _stars:CountStars;
    private  _optionSp:egret.Sprite;
    private  _box:Box;
    private  _index:number=0;

    private _tipsSound:SoundPlayer;
    // private _tipsChannel: egret.SoundChannel;
    private _overPage:OverPage;
    private _quit:egret.Bitmap;
    private _qwd:egret.Bitmap;
    public constructor() {
        super();

        // Source.init();
        //  Source.init(()=>{
        //     this.createView();
        //  });
         this.createView();
    }

    

    private createView():void {

		this._bg=new Bg();
        this.addChild(this._bg);

        this._qwd = Source.createBitmapByName("jzgr_18_png");
        this.addChild(this._qwd);
		this._qwd.x=148.5;
		this._qwd.y=307;


        this._loves=new CountLoves();
        this.addChild(this._loves);
        this._loves.x=182.5;
        this._loves.y=11.5;

        this._stars=new CountStars();
        this.addChild(this._stars);
        this._stars.x=749;
        this._stars.y=22.5;

		this._blocks=new Blocks();
		this.addChild(this._blocks);
		this._blocks.x=523;
		this._blocks.y=254.5;

        this._quit= Source.createBitmapByName("jzgr_0_png");
       // this.addChild(this._quit);
        this._quit.x=20;
        this._quit.y=12;
        this._quit.touchEnabled=true;

      

        this._optionSp=new egret.Sprite();
        this.addChild(this._optionSp);
        this._optionSp.x=173;
        this._optionSp.y=742;
        let bg = Source.createBitmapByName("jzgr_4_png");
        this._optionSp.addChild(bg);

       this._overPage=new OverPage();
        this.addChild(this._overPage);
       //this._overPage.visible=false;
       // this._overPage.showWin(true);



         this._tipsSound= new SoundPlayer();
		//  this._bgSound= new SoundPlayer();
		// RES.getResAsync('bgmusic_mp3',(data)=>{
        // this._bgSound=data;
        // this._bgChannel = this._bgSound.play(0, 0);
        // this._bgChannel.volume=0.1;
        //   //this._topSp.visible=true; 
        // },this);

        //  this._tipsSound = new egret.Sound();;
        // //sound 加载完成监听
        // this._tipsSound.addEventListener(egret.Event.COMPLETE, function (e: egret.Event) {
        //     this._tipsChannel = this._tipsSound.play(0, 1);
        // }, this);

          for(let i:number=0;i<Source.images.length;i++)
		{
			let box:Box=Source.images[i]as Box;
            box.touchEnabled=true;
            box.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		}

        //  this.setQuestion(this._index);



         this.initListener();
	}

    private initListener()
    {
        this._overPage.addEventListener(egret.Event.COMPLETE,this.again, this);
         this._overPage.addEventListener(egret.Event.CHANGE,this.start, this)
          this._quit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuit, this);
    }

    private start(e:egret.TouchEvent)
	{
        // this._bgSound.clear();
        // this._bgSound.playRes("bgmusic_mp3",10000,0.1);
		this.setQuestion(this._index);
        this._overPage.visible=false;
	}

    private onQuit(e:egret.TouchEvent)
	{
		this.dispatchEvent(new egret.Event(egret.Event.CLOSE));
	}

    private again(e:egret.Event)
    {
         this._index=0;
        this._blocks.scaleX= this._blocks.scaleY=1;
         this._blocks.x=523;
		 this._blocks.y=254.5;
         this._qwd.visible=true;
         this._blocks.reset();
         this._loves.reset();
        this._stars.reset();
         this._overPage.visible=false;
         this._optionSp.visible=true;
         this.setQuestion(this._index);
    }

 private onClick(e:egret.TouchEvent)
    {
        //egret.log(e.target.name,this._index);
        if(e.target.name.split("_")[0]=="box")
        {
            var id:number=e.target.name.split("_")[1];
             egret.log("this._index:",this._index,"id:",id);
            if(id==(this._index%Source.images.length))
            {
                this._blocks.showBlock(this._index+1);
                this._stars.add();
                this._index++;
                  
                if( this._stars.count>=10)
                { 
                    this._blocks.hideBg();
                    this.addChild( this._blocks);
                    this._blocks.scaleX= this._blocks.scaleY=0.5;
                    this._blocks.x=523+410;
		            this._blocks.y=254.5+484;
                    this._qwd.visible=false;
                    this.addChild(this._quit);
                    this.addChild(this._loves);
                    this.addChild(this._stars);
                    this._optionSp.visible=false;
                    this._overPage.visible=true;
                    this._overPage.showWin(true);
                    return;
                }
                
            }else
            {
                
                // egret.log(this._loves.count);
                Source.changeQusetion(this._index);
                this._loves.cut();
                if(this._loves.count<=0)
                {
                    this._blocks.hideBg();
                    this.addChild( this._blocks);
                    this._blocks.scaleX= this._blocks.scaleY=0.5;
                    this._blocks.x=523+410;
		            this._blocks.y=254.5+484;
                    this._qwd.visible=false;
                    this.addChild(this._quit);
                    this.addChild(this._loves);
                    this.addChild(this._stars);
                    this._optionSp.visible=false;
                    this._overPage.visible=true;
                    this._overPage.showWin(false);
                    return;
                }

            }

            let count:number=0;
             for(let i:number=1;i<4;i++)
		    {
			//  egret.log(Source.questionList[id][i]);
                let box:Box=this._optionSp.getChildAt(i)as Box;
                egret.Tween.get(box).wait(100*i).to( {scaleX:0.2,scaleY:0.2,alpha:0}, 500, egret.Ease.cubicIn).call(()=>{
                  //  egret.log("aa");
                    count++;
                    if(count>=3)
                    {
                   
                        this.setQuestion(this._index);
                    }
                });
            }
        }
    }

    private setQuestion(id:number)
    {
        egret.log("id:::::::",id)
       // let url:string="resource/"+Source.audios[id];
       //this._tipsSound.load(url);
       this._tipsSound.clear();
       this._tipsSound.playRes(Source.list[id%Source.images.length].audio);

        while(this._optionSp.numChildren>1)
		{
			this._optionSp.removeChildAt(1);
		}
        	   egret.log(id,"Source.list[id%Source.images.length].audio:",Source.list[id%Source.images.length].audio);
        for(let i:number=0;i<Source.questionList[id].length;i++)
		{
			  egret.log("id:",id,"Source.questionList[id][i]:",Source.questionList[id][i]);
			let box:Box=Source.images[Source.questionList[id][i]]as Box;
            this._optionSp.addChild(box)
            box.x=175+340*i;
            box.y=145;
			box.alpha=0;
			box.visible=true;
            box.scaleX=box.scaleY=0.2;
			egret.Tween.removeTweens(box);
			egret.Tween.get(box).wait(100*i).to( {scaleX:1,scaleY:1,alpha:1}, 500, egret.Ease.cubicIn);
		}
    }
}