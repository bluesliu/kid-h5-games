class FailPanel extends BaseBox{
	
	private m_tryAgainBtn:EButton;
	public onTryAgain:Function;
	private m_thisObj:any;

	public constructor(thisObj:any) {
		super();
		this.m_thisObj = thisObj;

		let bg = new egret.Shape();
		bg.graphics.beginFill(0xff0000,0);
		bg.graphics.drawRect(0,0,Game.instance.stageW,Game.instance.stageH);
		this.addChild(bg);

		let star = DisplayUtil.createBitmapByName("fail_2_png");
		this.addChild(star);
		star.x = (Game.instance.stageW - star.width)/2;
		star.y = (Game.instance.stageH - star.height)/2-100;

		let role = DisplayUtil.createBitmapByName("fail_1_png");
		this.addChild(role);
		role.x = star.x - 100;
		role.y = star.y + star.height/2;

		this.m_tryAgainBtn = new EButton(this, "tryAgainBtn_png", null, this.onTryAgainClick)
		this.addChild(this.m_tryAgainBtn);
		this.m_tryAgainBtn.y = star.y+star.height;
		this.m_tryAgainBtn.x = (Game.instance.stageW - this.m_tryAgainBtn.width)/2;

	}

	public show(){
		super.show(true, BoxAlign.center);
	}

	private onTryAgainClick(){
		this.hide();
		this.onTryAgain.call(this.m_thisObj);
	}

}