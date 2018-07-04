class UserDate extends egret.DisplayObjectContainer {
	
	private datejson:JSON;
	public dataArr:any[];
	private id:number=0;
	public kaPianArr:any[]=[];
	public constructor() {
		super();
		console.log("ddff")
		this.chushi();
		// this.init();
	}
	private chushi():void{
	
	}
	public init(str:any):void{
	// ?assetsName=HC1_T1U2
		// var ldr:egret.URLLoader=new egret.URLLoader();
		// var req:egret.URLRequest=new egret.URLRequest();
		// req.url="data/unit1/conf.json";
		// ldr.load(req);
		// ldr.addEventListener(egret.Event.COMPLETE,this.ldrCom,this);
		this.ldrCom(str);
	}
	private ldrCom(str:any):void{

		console.log(RES.getRes(str+"_json"))
		this.dataArr=<any>RES.getRes(str+"_json");

	
		this.loadData();
	}

	private loadData():void{
	
		
		for(var i:number=0;i<this.dataArr.length;i++){
			var kapian:KaPianData=new KaPianData();
			var n:string="kapian_"+i;
			console.log(this.dataArr[i].image);
			kapian.setUrl(this.dataArr[i].image,this.dataArr[i].shengyin,n);
			kapian.width=200;
			kapian.height=200;
			this.addChild(kapian);
			kapian.x=i*300;
			this.kaPianArr.push(kapian);
			kapian.addEventListener(egret.Event.COMPLETE,this.kapianCom,this);
		}
			this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
	}

	private kapianCom(e:egret.Event):void{
		this.id++;
		if(this.id==this.dataArr.length){
			// this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
		}
		
	}
	
}