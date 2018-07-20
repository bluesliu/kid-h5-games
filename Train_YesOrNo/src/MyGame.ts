class MyGame extends Game{
	
	private m_scene:Scene;
	private m_curRolePos = 0;
	private m_cardManager:CardManager;
	private m_repeat:EButton;

	private m_train:TrainView;
	private m_box:egret.MovieClip;

	private m_curAudioName:string;

	public constructor(assetsName:string, stageW:number, stageH:number) {
		super(assetsName, stageW, stageH);
	}

	public run(){

		this.m_cardManager = new CardManager();
		this.m_cardManager.addEventListener("TOUCH_CARD", this.onTouchCard, this);
		this.m_train = new TrainView();
		this.m_train.stop();

		this.m_scene = new Scene();
		this.m_sceneLayer.addChild(this.m_scene);

		this.m_box = DisplayUtil.createMovieClipByName("box");
		this.m_box.gotoAndStop("close");
		this.m_box.x = 540;
		this.m_box.y = 606;
		this.sceneLayer.addChild(this.m_box);

		this.m_repeat = new EButton(this, "repeat_png", null, this.onRepeat);
		this.m_uiLayer.addChild(this.m_repeat);
		this.m_repeat.x = Game.instance.stageW - this.m_repeat.width - 50;
		this.m_repeat.y = Game.instance.stageH - this.m_repeat.height - 80;

		this.m_gameStartBox.show(true);

		this.m_sceneLayer.addChild(this.m_train);

	
	}

	private onTouchCard(e:egret.Event){
		let card = e.data as CardView;
		if(card.audioName == this.m_curAudioName){
			//正确
			card.right();
			this.m_effSound.clear();
			this.m_effSound.playRes("dingdong_mp3").exec(()=>{
				this.right();
			},this);
		}
		else{
			//错误
			card.wrong();
			this.m_effSound.clear();
			this.m_effSound.playRes("chacha_mp3").exec(()=>{
				this.wrong();
			},this);
		}
	}

	//开始游戏
	protected gamePlay()
    {
		super.gamePlay();
		this.m_train.play();
		this.m_train.rightCount = this.rightCount;
		this.m_box.gotoAndStop("open");
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}

	private onEnterFrame(e:egret.Event){
		if(this.m_checking){
			return;
		}
		this.m_train.onRender();
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

	//回答正确
	protected right(){
		this.rightCount += 1;
		this.m_train.rightCount = this.rightCount;
		if(this.rightCount>=Game.WIN_NUM){
			//游戏结束，胜利
			this.onGameOver(true);
		}
		else{
			//下一题
			this.nextQuestion();
		}
	}

	protected nextQuestion(){
		this.m_checking = false;
		let q = this.m_question.newQuestion;

		//随机朗读yes或no语音
		this.m_curAudioName = Math.random()>0.5 ? q.audio1 : q.audio2;

		this.m_cardManager.reset();
		this.m_cardManager.addCard(q);

		this.onRepeat();
	}

	protected onGameOver(isWin:boolean){
		this.m_curAudioName = "";
		this.m_cardManager.reset();
		this.stopBGMusic();
		this.m_box.gotoAndStop("close");
		this.submit(isWin);
	}


	private onRepeat(){
		if(this.m_curAudioName==null || this.m_curAudioName.length==0){
			return;
		}
		this.m_qSound.clear();
		this.m_qSound.playRes(this.m_curAudioName);
	}
}