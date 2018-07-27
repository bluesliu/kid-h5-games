class MyGame extends Game{
	
	private m_repeat:EButton;

	private m_cardManager:CardManager;
	private m_leftArrow:EButton;
	private m_rightArrow:EButton;
	private m_shotBtn:EButton;
	private m_gun:GunView;
	private m_role:RoleView;
	

	public constructor(assetsName:string, stageW:number, stageH:number) {
		super(assetsName, stageW, stageH);
	}

	public run(){

		this.m_cardManager = new CardManager();
		
		this.m_scene = new Scene();
		this.m_sceneLayer.addChild(this.m_scene);

		// this.m_role = new RoleView("role");
		// this.m_uiLayer.addChild(this.m_role);
		// this.m_role.x = 681;
		// this.m_role.y = 1020;

		this.m_leftArrow = new EButton(this, "leftArrow_png", this.onLeftDown, this.onLeftUp);
		this.m_leftArrow.x = 33;
		this.m_leftArrow.y = 841;
		this.m_uiLayer.addChild(this.m_leftArrow);

		this.m_rightArrow = new EButton(this, "rightArrow_png", this.onRightDown, this.onRightUp);
		this.m_rightArrow.x = 1180;
		this.m_rightArrow.y = 841;
		this.m_uiLayer.addChild(this.m_rightArrow);

		this.m_shotBtn = new EButton(this, "shotBtn_png", this.onShotDown);
		this.m_shotBtn.x = 628;
		this.m_shotBtn.y = 900;
		this.m_uiLayer.addChild(this.m_shotBtn);

		this.m_gun = new GunView();
		this.m_gun.x = this.stageW/2;
		this.m_gun.y = 788;
		this.uiLayer.addChild(this.m_gun);

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
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}

	private onEnterFrame(e:egret.Event){

		if(this.m_checking){
			return;
		}

		this.m_gun.x += this.m_gun.speed;
		if(this.m_gun.x <= 320){
			this.m_gun.x = 320;
		}
		else if(this.m_gun.x >= 1045){
			this.m_gun.x = 1045;
		}

		this.m_cardManager.onRender();
		
		
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

		this.m_cardManager.canMove = true;

		this.onRepeat();
	}

	protected onGameOver(isWin:boolean){
		this.m_cardManager.canMove = false;
		this.m_cardManager.reset();
		this.stopBGMusic();
		this.submit(isWin);
	}

	private onLeftDown(){
		this.m_gun.speed = -6;
	}
	private onLeftUp(){
		this.m_gun.speed = 0;
	}

	private onRightDown(){
		this.m_gun.speed = 6;
	}
	private onRightUp(){
		this.m_gun.speed = 0;
	}

	private onShotDown(){
		this.m_gun.shot(()=>{
			let card = this.m_cardManager.getHitCard(this.m_gun.x);
			if(!card){
				return;
			}

			this.m_checking = true;
			this.m_effSound.clear();

			if(card.cardName == this.question.curQuestion.name){
				card.right();
				this.m_effSound.playRes("dingdong_mp3").exec(()=>{
					this.m_checking = false;
					card.content.visible = false;
					this.right();
				},this);
			}
			else{
				card.wrong();
				this.m_effSound.playRes("chacha_mp3").exec(()=>{
					this.m_checking = false;
					this.wrong();
				},this);
			}
			
		},this);
	}

	private onRepeat(){
		this.m_qSound.clear();
		let audio = this.question.curQuestion.sound;
		this.m_qSound.playRes(audio);
	}
}