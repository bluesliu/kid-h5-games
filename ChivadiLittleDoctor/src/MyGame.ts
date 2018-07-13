class MyGame extends Game{
	
	private m_scene:Scene;
	private m_pingZi:PingZi;
	private m_wordArea:WordArea;
	private m_role:RoleView;
	private m_repeat:EButton;
	
	

	public constructor(assetsName:string, stageW:number, stageH:number) {
		super(assetsName, stageW, stageH);
	}

	public run(){

		this.m_scene = new Scene();
		this.m_sceneLayer.addChild(this.m_scene);

		this.m_pingZi = new PingZi();
		this.m_sceneLayer.addChild(this.m_pingZi);
		this.m_pingZi.x = 447;
		this.m_pingZi.y = 800;
		
		this.m_wordArea = new WordArea();
		this.m_sceneLayer.addChild(this.m_wordArea);
		this.m_wordArea.x = 57;
		this.m_wordArea.y = 114;
		this.m_wordArea.addEventListener("CHECK", this.onCheck, this);

		this.m_role = new RoleView("role");
		this.m_sceneLayer.addChild(this.m_role);
		this.m_role.x = 233;
		this.m_role.y = 955;

		this.m_repeat = new EButton(this, "repeat_png", null, this.onRepeat);
		this.m_uiLayer.addChild(this.m_repeat);
		this.m_repeat.x = Game.instance.stageW - this.m_repeat.width - 50;
		this.m_repeat.y = Game.instance.stageH - this.m_repeat.height - 80;

		this.m_gameStartBox.show(true);
	}

	

	//开始游戏
	protected gamePlay()
    {
		this.m_wordArea.reset();
		super.gamePlay();
	}

	protected nextQuestion(){
		super.nextQuestion();
		this.m_checking = false;
		this.m_wordArea.setQuestion(this.question.curQuestion);
		this.m_role.state = RoleState.idle;
		this.m_pingZi.reset();
	}

	private onCheck(e:egret.Event){
		if(this.m_checking){return;}
		this.m_checking = true;

		//随机导入一种药水
		let index = MathUtil.random(1,6,1);
		this.m_pingZi.setPingZi(index);

		let isRight = e.data as boolean;
		if(isRight){
			this.answerRight();
		}
		else{
			this.answerWrong();
		}
	}

	private answerRight(){
		let step = new Step();
		step.exec(()=>{
			this.m_pingZi.showRightEff();
			this.m_role.state = RoleState.right;
		},this);
		step.wait(2000);
		step.exec(()=>{
			this.right();
		},this);
	}

	private answerWrong(){
		let step = new Step();
		step.exec(()=>{
			this.m_pingZi.showWrongEff();
			this.m_role.state = RoleState.wrong;
		},this);
		step.wait(2000);
		step.exec(()=>{
			this.m_checking = false;
			this.wrong();
		},this);
	}

	protected wrong(){
		this.lifeCount -= 1;
		if(this.lifeCount<=0){
			//游戏结束，失败
			this.onGameOver(false);
		}
		else{
			this.m_pingZi.reset();
			this.m_wordArea.resetQuestion();
			this.m_role.state = RoleState.idle;
			this.onRepeat();
		}
	}

	protected onGameOver(isWin:boolean){
		this.submit(isWin);
	}

	private onRepeat(){
		this.m_qSound.clear();
		this.m_qSound.playRes(this.m_question.curQuestion.audio);
	}
}