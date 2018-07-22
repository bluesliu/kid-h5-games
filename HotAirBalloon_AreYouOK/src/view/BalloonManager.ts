class BalloonManager {
	
	public balloon:BalloonView;
	private m_rightCount = 0;
	public speedY = 1;

	public constructor() {
		this.balloon = new BalloonView();
		Game.instance.sceneLayer.addChild(this.balloon);
		this.reset();
	}

	public reset(){
		this.balloon.reset();
		this.balloon.scaleX = 1;
		this.balloon.scaleY = 1;
		this.balloon.x = 976;
		this.balloon.y = 1004;
		this.rightCount = 0;
		this.speedY = 1;
	}

	public onRender(){
		let targetY = 0;
		if(this.rightCount<Game.WIN_NUM){
			targetY = 1004 - this.rightCount * 30;
			this.speedY = 1;
		}else{
			targetY = -10;
			this.speedY = 5;
		}
		
		if(this.balloon.y <= targetY){
			this.balloon.y = targetY;
		}else{
			this.balloon.y -= this.speedY;
		}
		this.balloon.onRender();
	}

	public get rightCount(){return this.m_rightCount;}
	public set rightCount(value:number){
		this.m_rightCount = value;
		this.balloon.isFloat = value>0 && value<Game.WIN_NUM;
	}
}