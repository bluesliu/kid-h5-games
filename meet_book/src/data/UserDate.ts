class UserDate extends egret.DisplayObjectContainer {
	
	private datejson:JSON;
	public dataArr:any[];
	private id:number=0;
	public kaPianArr:any[]=[];
	public constructor() {
		super();
		this.chushi();
		// this.init();
	}
	private chushi():void{
	
	}
	public init(str:string):void{
		this.dataArr=<any>RES.getRes(str+"_json");
	
		this.loadData();
		// var ldr:egret.URLLoader=new egret.URLLoader();
		// var req:egret.URLRequest=new egret.URLRequest();
		// req.url="data/unit1/conf.json";
		// ldr.load(req);
		// ldr.addEventListener(egret.Event.COMPLETE,this.ldrCom,this);
	}
	private ldrCom(e:egret.Event):void{
		this.datejson=JSON.parse(e.target.data);
		this.dataArr=<any>this.datejson;
	
		this.loadData();
	}

	private loadData():void{
	
		
		for(var i:number=0;i<this.dataArr.length;i++){
			var kapian:KaPianData=new KaPianData();
			var n:string="kapian_"+i;
			kapian.setUrl(this.dataArr[i].image,this.dataArr[i].shengyin,n);
			this.addChild(kapian);
			kapian.x=i*30;
			this.kaPianArr.push(kapian);
			kapian.addEventListener(egret.Event.COMPLETE,this.kapianCom,this);
		}
	}

	private kapianCom(e:egret.Event):void{
		this.id++;
		if(this.id==this.dataArr.length){
			this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
		}
		
	}
	
}