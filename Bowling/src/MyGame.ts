class MyGame extends Game{
	

	private m_cardManager:CardManager;
	private m_ballManager:BallManager;
	private m_repeat:EButton;
	private m_tf:egret.TextField;

	public constructor(assetsName:string, stageW:number, stageH:number) {
		super(assetsName, stageW, stageH);
	}

	public run(){

		this.m_cardManager = new CardManager();
		
		
		this.m_scene = new Scene();
		this.m_sceneLayer.addChild(this.m_scene);

		this.m_ballManager = new BallManager();
		this.m_ballManager.addEventListener("SHOT_END", this.onShotEnd, this);

		this.m_repeat = new EButton(this, "repeat_png", null, this.onRepeat);
		//this.m_uiLayer.addChild(this.m_repeat);
		this.m_repeat.x = Game.instance.stageW - this.m_repeat.width - 50;
		this.m_repeat.y = Game.instance.stageH - this.m_repeat.height - 80;

		this.m_tf = new egret.TextField();
		//this.m_tf.border = Game.isDebug;
		this.m_tf.x = 350;
		this.m_tf.y = 912;
		this.m_tf.width = 986;
		this.m_tf.height = 68;
		this.m_tf.size = 50;
		this.m_tf.bold = true;
		this.m_tf.textColor = 0x000000;
		this.m_tf.textAlign = egret.HorizontalAlign.CENTER;
		this.uiLayer.addChild(this.m_tf);

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
		
		this.m_ballManager.onRender();
	}

	private onShotEnd(e:egret.Event){
		let hitCard = this.getHitCard();
		if(hitCard==null){
			//错误
			this.m_checking = true;
			this.m_ballManager.ball.wrong();
			this.m_qSound.clear();
			this.m_qSound.playRes("chacha_mp3");
			this.m_qSound.exec(()=>{
				this.wrong();
			},this);
		}
		else{
			if(hitCard.cardName != this.question.curQuestion.name){
				//错误
				this.m_checking = true;
				hitCard.wrong();
				this.m_qSound.clear();
				this.m_qSound.playRes("chacha_mp3");
				this.m_qSound.exec(()=>{
					this.wrong();
				},this);
			}
			else{
				//正确
				this.m_checking = true;
				hitCard.right();
				this.m_qSound.clear();
				this.m_qSound.playRes("dingdong_mp3");
				this.m_qSound.exec(()=>{
					this.right();
				},this);
			}
		}
		
	}

	private getHitCard():CardView{
		let ball = this.m_ballManager.ball;
		if(ball.x >= 428 && ball.x <= 537){
			return this.m_cardManager.m_cardArr[0];
		}
		else if(ball.x >= 728 && ball.x <= 837){
			return this.m_cardManager.m_cardArr[1];
		}
		else if(ball.x >= 1028 && ball.x <= 1137){
			return this.m_cardManager.m_cardArr[2];
		}
		return null;
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
		this.m_cardManager.addCard(q);
		this.m_ballManager.moveLeftAndRight();
		this.m_tf.text = q.text;
		this.onRepeat();
	}

	protected onGameOver(isWin:boolean){
		this.m_cardManager.reset();
		this.m_ballManager.reset();
		this.stopBGMusic();
		this.submit(isWin);
	}

	


	private onRepeat(){
		this.m_qSound.clear();
		let audio = this.question.curQuestion.sound;
		this.m_qSound.playRes(audio);
	}
}