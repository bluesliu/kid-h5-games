class Main extends egret.DisplayObjectContainer {

    private _mainContent:MainContent;
    private _userData:UserDate;
    private loadingView:LoadingUI;
    private _kaiShiSP:egret.Sprite;
    private assetsName:string;
    public constructor() {
        super();
        
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddStage,this);
    }

   
    private onAddStage(e:egret.Event):void{


        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        RES.loadConfig("resource/default.res.json","resource/");
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.configCom,this);

        
    }
    private configCom(e:RES.ResourceEvent):void{
       
        RES.loadGroup("preload");
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.configCom,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onGroupCom,this);
         RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        // RES.addEventListener(RES.ResourceEvent.)
    }


      private onResourceProgress(event:RES.ResourceEvent):void {
        
      
        if (event.groupName == "preload") {
 
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal+1);
        }
    }

    private onGroupCom(e:RES.ResourceEvent):void{

          RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onGroupCom,this);


       
         let requestObj = GetRequestObject();
        let assetsName:string;

        if(requestObj==null){
            // Println("请求数据为null，无法加载相应单元的数据");
            return;
        }
        else if(requestObj.assetsName==null || requestObj.assetsName==undefined || requestObj.assetsName==""){
            // Println("请求的assetsName为null，无法加载相应单元的数据");
            return;
        }
        else{
            assetsName = requestObj.assetsName;
        }
        this.assetsName=assetsName;
        RES.loadGroup(assetsName);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.ziLiaoCom,this);
          
    }
    private ziLiaoCom(e:RES.ResourceEvent){
            this._userData=new UserDate();
            this._userData.init(this.assetsName);
          this._userData.addEventListener(egret.Event.COMPLETE,this.DataCom1,this);
          this.loadingView.visible=false;

        
            this.DataCom1(null)
    }
    private DataCom1(e:egret.Event):void{
     
        
      
          var bj:BeiJIngView=new BeiJIngView();
         this.addChild(bj);

          var long:LongSwfView=new LongSwfView();
          long.init();
          this.addChild(long);
          long.x=-50;
          long.y=0;
          long.scaleX=long.scaleY=0.3;

          this._kaiShiSP=new egret.Sprite();
          this.addChild(this._kaiShiSP);
          this._kaiShiSP.touchEnabled=true;
          var bitmap:egret.Bitmap=new egret.Bitmap();
          bitmap.texture=RES.getRes("kaishi_png");
          this._kaiShiSP.addChild(bitmap);
          this._kaiShiSP.x=(1366-bitmap.width)/2;
          this._kaiShiSP.y=(1024-bitmap.height)/2;
          this._kaiShiSP.addEventListener(egret.TouchEvent.TOUCH_END,this.kaishi,this);

          
    }

    private kaishi():void{
        this._kaiShiSP.visible=false;
        var sound:egret.Sound=RES.getRes("bgmusic_mp3");
          var shall:egret.SoundChannel=sound.play(0,200);
          shall.volume=0.2;

        this._mainContent=new MainContent();
        this.addChild(this._mainContent);
        this._mainContent.setArr(this._userData.kaPianArr);
      
         var bitmap:egret.Bitmap=new egret.Bitmap();
          bitmap.texture=RES.getRes("quit_png");
          var sp:egret.Sprite=new egret.Sprite();
          sp.addChild(bitmap);
          sp.x=50;
          sp.y=950;
        //   this.addChild(sp);
        //   sp.touchEnabled=true;
          sp.addEventListener(egret.TouchEvent.TOUCH_END,this.onQuit,this);
    }
    private onQuit(e:egret.TouchEvent):void{
        // exit();
    
    }
}