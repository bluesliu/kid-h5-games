class MyGame extends Game{
	
	private m_scene:Scene;
	private m_repeat:EButton;
	
	private m_balloonManager:BalloonManager;
	private m_yesBtn:EButton;
	private m_noBtn:EButton;
	private m_tf:egret.TextField;

	public constructor(assetsName:string, stageW:number, stageH:number) {
		super(assetsName, stageW, stageH);
	}

	public run(){

		this.m_scene = new Scene();
		this.m_sceneLayer.addChild(this.m_scene);

		this.m_yesBtn = new EButton(this, null, this.onTouchYes, null);
		this.m_yesBtn.x = 280;
		this.m_yesBtn.y = 400;
		this.uiLayer.addChild(this.m_yesBtn);

		this.m_noBtn = new EButton(this, null, this.onTouchNo, null);
		this.m_noBtn.x = 280;
		this.m_noBtn.y = 620;
		this.uiLayer.addChild(this.m_noBtn);

		this.m_repeat = new EButton(this, "repeat_png", null, this.onRepeat);
		this.m_uiLayer.addChild(this.m_repeat);
		this.m_repeat.x = Game.instance.stageW - this.m_repeat.width - 50;
		this.m_repeat.y = Game.instance.stageH - this.m_repeat.height - 80;

		this.m_balloonManager = new BalloonManager();

		this.m_tf = new egret.TextField();
		this.m_tf.x = 220;
		this.m_tf.y = 257;
		this.m_tf.width = 400;
		this.m_tf.height = 150;
		this.m_tf.size = 50;
		this.m_tf.textColor = 0x000000;
		this.m_tf.lineSpacing = 20;
		this.m_tf.bold = true;
		this.m_tf.textAlign = egret.HorizontalAlign.LEFT;
		this.m_tf.wordWrap = true;
		this.uiLayer.addChild(this.m_tf);
		this.m_tf.border = Game.isDebug;

		this.m_gameStartBox.show(true);
	}

	private onTouchYes(){
		if(this.m_checking)return;
		this.m_checking = true;
		this.m_qSound.clear();
		if(this.m_yesBtn.audio == this.questionAudio){
			//正确
			this.m_effSound.playRes("dingdong_mp3").exec(()=>{
				this.right();
			},this);
		}
		else{
			//错误
			this.wrong();
		}
	}
	
	private onTouchNo(){
		if(this.m_checking)return;
		this.m_checking = true;
		this.m_qSound.clear();
		if(this.m_noBtn.audio == this.questionAudio){
			this.m_effSound.playRes("dingdong_mp3").exec(()=>{
				//正确
				this.right();
			},this);
			
		}
		else{
			//错误
			this.wrong();
		}
	}

	//开始游戏
	protected gamePlay()
    {
		super.gamePlay();
		this.addEventListener(egret.Event.ENTER_FRAME, this.onRender, this);
	}

	private onRender(e:egret.Event){
		this.m_balloonManager.onRender();
	}

	private questionAudio = "";
	protected nextQuestion(){
		this.m_checking = false;
		let q = this.m_question.newQuestion;
		
		if(Math.random()>0.5){
			this.questionAudio = q.audio1;
		}else{
			this.questionAudio = q.audio2;
		}

		this.m_yesBtn.btnImg.texture = RES.getRes(q.image1);
		this.m_yesBtn.audio = q.audio1;
		this.m_noBtn.btnImg.texture = RES.getRes(q.image2);
		this.m_noBtn.audio = q.audio2;

		this.m_tf.text = q.text;
		this.m_checking = true;
		this.onRepeat(()=>{
			this.m_checking = false;
		});
		
	}

	//回答正确
	protected right(){
		this.rightCount += 1;
		this.m_balloonManager.rightCount = this.rightCount;
		if(this.rightCount>=Game.WIN_NUM){
			//等待气球飞到天上
			this.m_effSound.playRes("huanhu_mp3").exec(()=>{
				//游戏结束，胜利
				this.m_checking = false;
				this.onGameOver(true);
			},this);
		}
		else{
			//下一题
			this.nextQuestion();
		}
	}

	//回答错误
	protected wrong(){
		this.lifeCount -= 1;

		EffectUtils.shakeObj(this.m_balloonManager.balloon,null);
		this.m_effSound.clear();
		this.m_effSound.playRes("chacha_mp3").exec(()=>{
			
			if(this.lifeCount<=0){
				//游戏结束，失败
				this.onGameOver(false);
			}
			else{
				this.m_checking = false;
				this.onRepeat();
			}
		},this);
	}

	protected onGameOver(isWin:boolean){
		this.m_balloonManager.reset();
		this.m_tf.text = "";
		egret.Tween.removeTweens(this.m_balloonManager.balloon);
		this.m_qSound.clear();
		this.m_effSound.clear();
		this.submit(isWin);
	}

	private onRepeat(callback:Function=null, thisObj:any=null){
		this.m_qSound.clear();
		this.m_qSound.playRes(this.questionAudio).exec(()=>{
			if(callback!=null){
				callback.call(thisObj);
			}	
		}, thisObj);
	}
}