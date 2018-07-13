class SuccessPanel extends BaseBox{
	
	private m_tryAgainBtn:EButton;
	private m_nextBtn:EButton;

	public onTryAgain:Function;
	private m_thisObj:any;

	public constructor(thisObj:any) {
		super();
		this.m_thisObj = thisObj;

		let bg = DisplayUtil.createBitmapByName("success_2_png");
		this.addChild(bg);
		bg.x = (Game.instance.stageW - bg.width)/2;
		bg.y = (Game.instance.stageH - bg.height)/2;

		let star = DisplayUtil.createBitmapByName("success_1_png");
		this.addChild(star);
		star.x = (Game.instance.stageW - star.width)/2;
		star.y = (Game.instance.stageH - star.height)/2-100;

		let role = DisplayUtil.createBitmapByName("success_0_png");
		this.addChild(role);
		role.x = star.x - 100;
		role.y = star.y + star.height/2;

		this.m_tryAgainBtn = new EButton(this, "tryAgainBtn_png", null, this.onTryAgainClick)
		this.addChild(this.m_tryAgainBtn);
		this.m_tryAgainBtn.y = star.y+star.height;
		this.m_tryAgainBtn.x = (Game.instance.stageW - this.m_tryAgainBtn.width)/2;

		this.m_nextBtn = new EButton(this,"nextBtn_png",null, this.onNextClick);
		this.m_nextBtn.x = Game.instance.stageW - this.m_nextBtn.width - 50;
		this.m_nextBtn.y = Game.instance.stageH - this.m_nextBtn.height - 100;
		
	}

	public show(){
		super.show(true, BoxAlign.center);

		let obj = GetRequestObject();
		if(obj==null || obj.taskId!=0){
			//从任务入口打开,没有下一关
			DisplayUtil.remove(this.m_nextBtn);
		}
		else{
			//有下一关
			this.addChild(this.m_nextBtn);
		}
	}

	private onTryAgainClick(){
		this.hide();
		this.onTryAgain.call(this.m_thisObj);
	}

	private onNextClick(){
		NextLevel();
	}
}