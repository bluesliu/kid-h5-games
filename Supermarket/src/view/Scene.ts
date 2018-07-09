//场景
class Scene extends egret.Sprite{

	private m_bg:egret.Bitmap;
	private m_left:EButton;
	private m_right:EButton;

	private m_speedX = 0;

	//热区
	private m_area:egret.Sprite;
	private m_area1:egret.Sprite;
	private m_area2:egret.Sprite;
	private m_area3:egret.Sprite;
	private m_area4:egret.Sprite;

	private curDownIdx:number;
	private dragImg:egret.Bitmap;

	public constructor() {
		super();
		this.m_bg = DisplayUtil.createBitmapByName("bg_png");
		this.addChild(this.m_bg);

		this.m_left = new EButton(this, "arrow_png", this.onLeft, this.touchEnd);
		this.addChild(this.m_left);
		this.m_left.x = 0;
		this.m_left.y = Game.instance.stageH - this.m_left.height;

		this.m_right = new EButton(this, "arrow2_png", this.onRight, this.touchEnd);
		this.addChild(this.m_right);
		this.m_right.x = Game.instance.stageW-this.m_right.width;
		this.m_right.y = this.m_left.y;

		this.m_area = new egret.Sprite();
		this.addChild(this.m_area);
		this.m_area.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onAreaDown, this);
		
		this.m_area1 = new egret.Sprite();
		this.m_area1.graphics.beginFill(0xff0000,0.0);
		this.m_area1.graphics.drawRect(0,0,310,352);
		this.m_area1.graphics.endFill();
		this.m_area1.x = 726;
		this.m_area1.y = 104;
		this.m_area.addChild(this.m_area1);
		this.m_area1.touchEnabled = true;

		this.m_area2 = new egret.Sprite();
		this.m_area2.graphics.beginFill(0xff0000,0.0);
		this.m_area2.graphics.drawRect(0,0,310,352);
		this.m_area2.graphics.endFill();
		this.m_area2.x = 1059;
		this.m_area2.y = 104;
		this.m_area.addChild(this.m_area2);
		this.m_area2.touchEnabled = true;

		this.m_area3 = new egret.Sprite();
		this.m_area3.graphics.beginFill(0xff0000,0.0);
		this.m_area3.graphics.drawRect(0,0,310,352);
		this.m_area3.graphics.endFill();
		this.m_area3.x = 696;
		this.m_area3.y = 463;
		this.m_area.addChild(this.m_area3);
		this.m_area3.touchEnabled = true;

		this.m_area4 = new egret.Sprite();
		this.m_area4.graphics.beginFill(0xff0000,0.0);
		this.m_area4.graphics.drawRect(0,0,310,352);
		this.m_area4.graphics.endFill();
		this.m_area4.x = 1022;
		this.m_area4.y = 463;
		this.m_area.addChild(this.m_area4);
		this.m_area4.touchEnabled = true;
	}

	private onAreaDown(e:egret.TouchEvent){
		if(e.target == this.m_area1){
			this.curDownIdx = 0;
		}
		else if(e.target == this.m_area2){
			this.curDownIdx = 1;
		}
		else if(e.target == this.m_area3){
			this.curDownIdx = 2;
		}
		else if(e.target == this.m_area4){
			this.curDownIdx = 3;
		}
		this.m_area.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onAreaMove, this);
		this.m_area.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onAreaUp, this);

		this.dragImg = DisplayUtil.createBitmapByName(Game.instance.question.getQuestionAt(this.curDownIdx).image);
		Game.instance.uiLayer.addChild(this.dragImg);
		DisplayUtil.setSize(this.dragImg, 200,200);
		this.dragImg.x = e.stageX - this.dragImg.width/2;
		this.dragImg.y = e.stageY - this.dragImg.height/2;
	}

	private onAreaMove(e:egret.TouchEvent){
		this.dragImg.x = e.stageX - this.dragImg.width/2;
		this.dragImg.y = e.stageY - this.dragImg.height/2;
	}

	private onAreaUp(e:egret.TouchEvent){
		this.m_area.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onAreaMove, this);
		this.m_area.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onAreaUp, this);
		DisplayUtil.remove(this.dragImg);
		this.dragImg = null;

		let evt = new egret.Event("DRAG");
		evt.data = {point:new egret.Point(e.stageX,e.stageY), index:this.curDownIdx};
		this.dispatchEvent(evt);
	}

	private onLeft(){
		this.m_speedX = 5;
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}

	private onRight(){
		this.m_speedX = -5;
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}

	private touchEnd(){
		this.m_speedX = 0;
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}
	
	private onEnterFrame(e:egret.Event)
	{
		if(this.m_bg.x + this.m_speedX >= 0){
			this.m_bg.x = 0;
		}
		else if(this.m_bg.x + this.m_speedX <= Game.instance.stageW-this.m_bg.width){
			this.m_bg.x = Game.instance.stageW-this.m_bg.width;
		}
		else{
			this.m_bg.x += this.m_speedX;
			this.m_area.x += this.m_speedX;
		}
	}
}