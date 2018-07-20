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

        let constructionWorker:ConstructionWorker=new ConstructionWorker();
        this.addChild(constructionWorker);

        
    }

    
}
