class Main extends egret.DisplayObjectContainer {
    private loadingView:LoadingUI;
    public static sourceName:String="";


    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

      


        //设置加载进度界面
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
            assetsName = requestObj.assetsName;

        }
        // let assetsName="HC3_T3U2";
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
        PublicTool.stageWidth=this.stage.stageWidth;
		PublicTool.stageHeight=this.stage.stageHeight;
        let spaceAdventure:SpaceAdventure=new SpaceAdventure();
        this.addChild(spaceAdventure);

        
    }

    
}
