class Main extends egret.DisplayObjectContainer {
    private loadingView:LoadingUI;
    private _main:MainContent;
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
           this.loadingView.visible=false;
           this.initContent();

    }
    private initContent(){
        this._main=new MainContent();
        this.addChild(this._main);
        this._main.init(this.assetsName);
    }
}