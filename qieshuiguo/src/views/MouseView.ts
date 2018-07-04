class MouseView extends egret.Sprite{
	public constructor() {
		super();
		this.chushi();
	}
	private chushi():void{
		// this.touchEnabled=true;
		// this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onmove,this);
	}
	public onmove(e:egret.TouchEvent):void{
		console.log(e.stageX);
		var bichu:BiChuView=new BiChuView();
		this.addChild(bichu);
		bichu.x=e.stageX;
		bichu.y=e.stageY;
		
	}
}