class MyGame extends Game{
	
	private m_scene:Scene;
	private m_leftArrow:EButton;
	private m_rightArrow:EButton;
	private m_role:RoleView;
	private m_curRolePos = 0;
	private m_cardManager:CardManager;
	private m_repeat:EButton;


	public constructor(assetsName:string, stageW:number, stageH:number) {
		super(assetsName, stageW, stageH);
	}

	public run(){

		this.m_cardManager = new CardManager();
		
		this.m_scene = new Scene();
		this.m_sceneLayer.addChild(this.m_scene);

		this.m_role = new RoleView("role");
		this.m_uiLayer.addChild(this.m_role);
		this.m_role.x = 681;
		this.m_role.y = 1020;

		this.m_leftArrow = new EButton(this, "leftArrow_png", this.onTouchLeft);
		this.m_leftArrow.x = 33;
		this.m_leftArrow.y = 841;
		this.m_uiLayer.addChild(this.m_leftArrow);

		this.m_rightArrow = new EButton(this, "rightArrow_png", this.onTouchRight);
		this.m_rightArrow.x = 1180;
		this.m_rightArrow.y = 841;
		this.m_uiLayer.addChild(this.m_rightArrow);

		this.m_repeat = new EButton(this, "repeat_png", null, this.onRepeat);
		//this.m_uiLayer.addChild(this.m_repeat);
		this.m_repeat.x = Game.instance.stageW - this.m_repeat.width - 50;
		this.m_repeat.y = Game.instance.stageH - this.m_repeat.height - 80;

		this.m_gameStartBox.show(true);
	}

	

	//开始游戏
	protected gamePlay()
    {
		super.gamePlay();
		this.setRolePos(0);
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}

	private onEnterFrame(e:egret.Event){
		if(this.m_checking){
			return;
		}

		this.m_cardManager.onRender();
		
		let hitCardName = this.m_cardManager.hitCardName(this.m_role.x,this.m_role.y-150);
		if( hitCardName != ""){
			this.m_checking = true;
			this.m_cardManager.canMove = false;
			if(hitCardName == this.question.curQuestion.name){
				Println("正确");
				this.m_cardManager.right(hitCardName);
				this.m_qSound.clear();
				this.m_qSound.playRes("dingdong_mp3");
				this.m_qSound.exec(()=>{
					this.right();
				},this);
			}
			else{
				Println("错误");
				this.m_cardManager.wrong(hitCardName);
				this.m_qSound.clear();
				this.m_qSound.playRes("chacha_mp3");
				this.m_qSound.exec(()=>{
					this.wrong();
				},this);
			}
		}
	}

	//回答错误
	protected wrong(){
		this.lifeCount -= 1;
		if(this.lifeCount<=0){
			//游戏结束，失败
			this.onGameOver(false);
		}
		else{
			this.nextQuestion();
		}
	}

	protected nextQuestion(){
		this.m_checking = false;
		let q = this.m_question.newQuestion;

		this.m_cardManager.reset();
		this.m_cardManager.canMove = true;
		this.m_cardManager.addCard(q);

		this.onRepeat();
	}

	protected onGameOver(isWin:boolean){
		this.m_cardManager.canMove = false;
		this.m_cardManager.reset();
		this.stopBGMusic();
		this.submit(isWin);
	}

	private onTouchLeft(){
		if(this.checking)return;
		if(this.m_curRolePos == -1)return;
		this.setRolePos(this.m_curRolePos-1);
	}

	private onTouchRight(){
		if(this.checking)return;
		if(this.m_curRolePos == 1)return;
		this.setRolePos(this.m_curRolePos+1);
	}

	private setRolePos(pos:number){
		this.m_curRolePos = pos;
		egret.Tween.removeTweens(this.m_role);
		let endX = 681 + pos * 500;
		egret.Tween.get(this.m_role).to({x:endX}, 200);
		this.m_leftArrow.visible = pos!=-1;
		this.m_rightArrow.visible = pos!=1;
	}

	private onRepeat(){
		this.m_qSound.clear();
		let audio = this.question.curQuestion.sound;
		this.m_qSound.playRes(audio);
	}
}