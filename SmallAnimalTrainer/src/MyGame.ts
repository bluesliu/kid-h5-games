class MyGame extends Game{
	

	private m_repeat:EButton;
	private m_tf:egret.TextField;
	private m_yesBtn:EButton;
	private m_noBtn:EButton;
	private m_card:CardView;
	private m_role:RoleView;

	private m_soundQuestion = new Question();
	private m_isYes = false;

	public constructor(assetsName:string, stageW:number, stageH:number) {
		super(assetsName, stageW, stageH);
	}

	public run(){

		
		this.m_scene = new Scene();
		this.m_sceneLayer.addChild(this.m_scene);
		
		this.m_repeat = new EButton(this, "repeat_png", null, this.onRepeat);
		//this.m_uiLayer.addChild(this.m_repeat);
		this.m_repeat.x = Game.instance.stageW - this.m_repeat.width - 50;
		this.m_repeat.y = Game.instance.stageH - this.m_repeat.height - 80;

		this.m_tf = new egret.TextField();
		this.m_tf.border = Game.isDebug;
		this.m_tf.x = 188;
		this.m_tf.y = 236;
		this.m_tf.width = 992;
		this.m_tf.height = 80;
		this.m_tf.size = 50;
		this.m_tf.bold = true;
		this.m_tf.textColor = 0x000000;
		this.m_tf.textAlign = egret.HorizontalAlign.CENTER;
		this.uiLayer.addChild(this.m_tf);

		this.m_yesBtn = new EButton(this,this.question.yesImage,null,this.onTouchYes);
		this.m_yesBtn.x = 296;
		this.m_yesBtn.y = 414;
		this.m_sceneLayer.addChild(this.m_yesBtn);

		this.m_noBtn = new EButton(this,this.question.noImage,null,this.onTouchNo);
		this.m_noBtn.x = 720;
		this.m_noBtn.y = 414;
		this.m_sceneLayer.addChild(this.m_noBtn);

		this.m_card = new CardView();
		this.m_card.x = 1070;
		this.m_card.y = 700;
		this.m_sceneLayer.addChild(this.m_card);

		this.m_role = new RoleView("role");
		this.m_role.x = 43;
		this.m_role.y = 578;
		this.m_sceneLayer.addChild(this.m_role);

		this.m_gameStartBox.show(true);
	}

	private onTouchYes(){
		if(this.m_checking)return;
		this.m_checking = true;
		this.m_role.setState(RoleState.answer, ()=>{
			if(this.m_isYes){
				//正确
				this.m_card.right();
				this.m_role.state = RoleState.happy;
				this.m_effSound.clear();
				this.m_effSound.playRes("dingdong_mp3").playRes(this.question.yesAudio).exec(()=>{
					this.m_checking = false;
					this.right();
				},this);
			}
			else{
				//错误
				this.m_card.wrong();
				this.m_role.state = RoleState.sad;
				this.m_yesBtn.filters = [FilterUtil.getDarkFilter()];
				this.m_effSound.clear();
				this.m_effSound.playRes("chacha_mp3").exec(()=>{
					this.m_checking = false;
					this.wrong();
				},this);
			}
		}, this);
	}

	private onTouchNo(){
		if(this.m_checking)return;
		this.m_checking = true;
		this.m_role.setState(RoleState.answer,()=>{
			if(!this.m_isYes){
				//正确
				this.m_card.right();
				this.m_role.state = RoleState.happy;
				this.m_effSound.clear();
				this.m_effSound.playRes("dingdong_mp3").playRes(this.question.noAudio).exec(()=>{
					this.m_checking = false;
					this.right();
				},this);
			}
			else{
				//错误
				this.m_card.wrong();
				this.m_role.state = RoleState.sad;
				this.m_noBtn.filters = [FilterUtil.getDarkFilter()];
				this.m_effSound.clear();
				this.m_effSound.playRes("chacha_mp3").exec(()=>{
					this.m_checking = false;
					this.wrong();
				},this);
			}
		},this);
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
		this.m_role.state = RoleState.idle;
		//回复按钮颜色
		this.m_yesBtn.filters = [];
		this.m_noBtn.filters = [];

		let q = this.m_question.newQuestion;
		let soundQuestion:Question = ArrayUtil.getRandomItem(this.question.$qList);
		//50%概率是yes
		if(Math.random()>0.5){
			soundQuestion = q;
			this.m_isYes = true;
		}else{
			soundQuestion = ArrayUtil.getRandomItem(this.question.$qList);
			while(soundQuestion.name == q.name || soundQuestion.name == this.m_soundQuestion.name){
				soundQuestion = ArrayUtil.getRandomItem(this.question.$qList);
			}
			this.m_isYes = false;
		}
		this.m_soundQuestion = soundQuestion;
		this.m_tf.text = this.m_soundQuestion.text;
		this.m_card.question = q;
		this.m_card.x = 1070;
		this.m_card.y = 700;
		this.onRepeat();
	}

	protected onGameOver(isWin:boolean){
		this.m_role.state = RoleState.idle;
		this.stopBGMusic();
		this.submit(isWin);
	}

	private onRepeat(){
		this.m_qSound.clear();
		let audio = this.m_soundQuestion.sound;
		this.m_qSound.playRes(audio);
	}
}