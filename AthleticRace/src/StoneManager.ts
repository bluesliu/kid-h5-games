class StoneManager {
	public m_stoneArr:Array<StoneView>;
	private m_timestamp = 0;
	public canMove:boolean;

	public constructor() {
		this.m_stoneArr = Array<CardView>();
	}

	public onRender(){
		if(!this.canMove){
			return;
		}

		if(egret.getTimer()-this.m_timestamp > 3000){
			this.addStone();
			this.m_timestamp = egret.getTimer();
		}
		this.moveCard();
	}


	public addStone(){
		let type = Math.random()>0.5?"left":"right";
		let stone = new StoneView(type);
		stone.speed = 4;
		if(type=="left"){
			stone.angle = 116;
			stone.x = MathUtil.random(100,490);
		}
		else{
			stone.angle = 64;
			stone.x = MathUtil.random(871,1266);
		}
		this.m_stoneArr.push(stone);
		Game.instance.scene.stoneLayer.addChild(stone);
	}


	private moveCard(){
		for (let i = this.m_stoneArr.length-1 ; i >= 0 ; i--) 
		{
			let stone = this.m_stoneArr[i];
			let p = MathUtil.circle(stone.x, stone.y, stone.speed, MathUtil.D2R(stone.angle));
			stone.setPosition(p);
			if(stone.y >= 1580)
			{
				DisplayUtil.remove(stone);
				this.m_stoneArr.splice(i,1);
				stone.dispose();
			}
		}
	}

	public reset(){
		//移除全部
		for(let i=this.m_stoneArr.length-1; i>=0; i--){
			let stone = this.m_stoneArr[i];
			DisplayUtil.remove(stone);
			stone.dispose();
		}
		this.m_stoneArr.length = 0;
	}


}

class StoneView extends egret.Sprite{
	public speed = 0;
	public angle = 0;
	public constructor(type:string){
		super();
		let bg = DisplayUtil.createBitmapByName("stone"+MathUtil.random(1,2,1)+"_png");
		this.addChild(bg);
		
		//let scale = MathUtil.random(0.1, 0.3, 0.05);
		if(type=="left"){
			// DisplayUtil.setScale(bg, scale);
			bg.x = -bg.width;
		}else{
			// DisplayUtil.setScale(bg, -scale);
			bg.x = bg.width;
		}

		bg.y = - bg.height;
	}

	public setPosition(p:egret.Point){
		this.x = p.x;
		this.y = p.y;
		this.scaleX = this.scaleY =  0.2+this.y / 800;
	}

	public dispose(){
		
	}
}