class Game extends egret.Sprite{

	static instance:Game;

	static WIN_NUM:number = 6;
	static GAME_TIME:number = 60;

	static GAME_INIT:string = "game_init";
	static GAME_PLAY:string = "game_play";
	static GAME_OVER:string = "game_over";
	private m_state:string = Game.GAME_INIT;

	private m_uiLayer:egret.Sprite;
	private m_sceneLayer:egret.Sprite;

	
	//背景音乐
	private m_bgSound:SoundPlayer;
	//题目声音
	private m_qSound:SoundPlayer;
	//音效
	private m_effSound:SoundPlayer;

	//开始按钮
	private m_gameStartBox:GameStartBox;
	//计分板
	private m_scoreBoard:ScoreBoard;
	//倒计时面板
	private m_clockBoard:ClockBoard;
	//repeat按钮
	private m_repeatBtn:egret.Bitmap;
	private m_playAgainBtn:egret.Bitmap;
	private m_tryAgainBtn:egret.Bitmap;
	//音乐按钮
	private m_musicBtn:MusicBtn;
	private m_cardManager:CardManager;
	private m_gameScene:GameScene;		//场景
	private m_role1:RoleView;			//人物
	private m_curCardView:CardView;		//当前点击的卡牌
	private m_water:egret.MovieClip;	//水花

	//题目原始数组
	private m_qList:Array<any>;
	//剩余题目数组，每回合
	private m_laveList:Array<any>;
	//当前题目数据
	private m_curQuestion:any;
	//当前是否处于答题中（点击Card）
	private m_answering:Boolean;
	//正确的数量
	private m_rightCount:number = 0;
	
	//游戏的倒计时Timer
	private m_timer:egret.Timer;


	public constructor() {
		super();
	}

	public run(){
		Game.instance = this;

		let json = RES.getRes("config_json");
		this.m_qList = json.list;
		this.m_laveList = new Array();

		this.m_bgSound = new SoundPlayer();
		this.m_qSound = new SoundPlayer();
		this.m_effSound = new SoundPlayer();

		//场景层
		this.m_sceneLayer = new egret.Sprite();
		this.addChild(this.m_sceneLayer);

		//UI层
		this.m_uiLayer = new egret.Sprite();
		this.m_uiLayer.touchEnabled = this.m_uiLayer.touchChildren = true;
		this.addChild(this.m_uiLayer);
		
		//卡牌
        this.m_cardManager = new CardManager();
		this.m_cardManager.init(json);
		this.m_cardManager.addEventListener("TOUCH_CARD", this.onTouchCard, this);

		//游戏场景
		this.m_gameScene = new GameScene();
		this.m_sceneLayer.addChild(this.m_gameScene);

		//角色
		this.m_role1 = new RoleView("role");
		this.m_role1.x = Game.instance.stageW/2;
		this.m_role1.y = 1000;
		this.m_role1.scaleX = this.m_role1.scaleY = 1.2;
		this.scene.roleContainer.addChild(this.m_role1);

		this.m_water = DisplayUtil.createMovieClipByName("water");
		this.m_water.stop();

		//计分板
		this.m_scoreBoard = new ScoreBoard();
		this.m_scoreBoard.show(false, BoxAlign.right_top, new egret.Point(-50,50));

		//倒计时班
		this.m_clockBoard = new ClockBoard();
		this.m_clockBoard.show(false, BoxAlign.left_top, new egret.Point(50,50));
		this.m_clockBoard.text = ""+Game.GAME_TIME;

		//音乐按钮
		this.m_musicBtn = new MusicBtn();
		this.m_musicBtn.show(false, BoxAlign.right_bottom, new egret.Point(-50,-50));
		this.m_musicBtn.addEventListener(egret.Event.CHANGE, this.updateBgMusic, this);

		//repeat按钮
		this.m_repeatBtn = DisplayUtil.createBitmapByName("repatBtn_png");
		this.m_repeatBtn.touchEnabled = true;
		this.m_repeatBtn.x = this.m_musicBtn.x;
		this.m_repeatBtn.y = this.m_musicBtn.y - 120;
		this.uiLayer.addChild(this.m_repeatBtn);
		this.m_repeatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e:egret.TouchEvent)=>{
			if(this.m_curQuestion != null){
				//this.m_qSound.playSync(this.m_curQuestion.audio);
				this.m_qSound.clear();
				this.m_qSound.playRes(this.m_curQuestion.audio);
			}
		},this);

		//playAgain按钮
		this.m_playAgainBtn = DisplayUtil.createBitmapByName("playAgainBtn_png");
		this.m_playAgainBtn.touchEnabled = true;
		this.m_playAgainBtn.x = this.m_repeatBtn.x;
		this.m_playAgainBtn.y = this.m_repeatBtn.y;
		this.m_playAgainBtn.visible = false;
		this.uiLayer.addChild(this.m_playAgainBtn);
		this.m_playAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e:egret.TouchEvent)=>{
			this.gamePlay();
		},this);

		this.m_tryAgainBtn = DisplayUtil.createBitmapByName("tryAgainBtn_png");
		this.m_tryAgainBtn.touchEnabled = true;
		this.m_tryAgainBtn.x = this.m_repeatBtn.x;
		this.m_tryAgainBtn.y = this.m_repeatBtn.y;
		this.m_tryAgainBtn.visible = false;
		this.uiLayer.addChild(this.m_tryAgainBtn);
		this.m_tryAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e:egret.TouchEvent)=>{
			this.gamePlay();
		},this);


		this.addEventListener(egret.Event.ENTER_FRAME, this.onRender, this);

		//游戏初始状态
		this.m_state = Game.GAME_INIT;
		//显示开始按钮
		this.m_gameStartBox = new GameStartBox();
		this.m_gameStartBox.once("START", this.gamePlay, this);
		this.m_gameStartBox.show(true);
	}

	private onRender(){
		if(this.m_state == Game.GAME_PLAY){
			this.m_cardManager.onRender();
		}
	}


	//开始游戏
	private gamePlay()
    {
		this.m_state = Game.GAME_PLAY;

		//隐藏开始按钮
		this.m_gameStartBox.hide();

		//人物设置为空闲状态
		this.m_role1.state = RoleState.idle;

		this.m_gameScene.reset();

		//播放背景音乐
        this.updateBgMusic();

		//重置分数
		this.m_rightCount = 0;
		this.m_scoreBoard.setScore(0);

		//重置题目
		this.m_laveList = this.m_qList.concat();
		ArrayUtil.randomSort(this.m_laveList);
		

		//发射卡牌
		this.m_cardManager.reset();
		this.m_cardManager.start();

		//提问
		this.question();
		
		//计时开始
		this.startTimer();
    }

	//提问一个新问题
	private question()
	{
		this.m_answering = false;
		this.m_repeatBtn.visible = true;
		this.m_playAgainBtn.visible = false;
		this.m_tryAgainBtn.visible = false;
		this.m_cardManager.canMove = true;
		
		if(this.m_laveList.length == 0){
			this.m_laveList = this.m_qList.concat();
			ArrayUtil.randomSort(this.m_laveList);
		}
		 this.m_curQuestion = this.m_laveList.shift();
		 //播放题目语音
		 this.m_qSound.playRes(this.m_curQuestion.audio);
	}


	//点击了卡牌
	private onTouchCard(e:egret.Event){
		if(this.m_answering){
			return;
		}
		this.m_answering = true;
		this.m_repeatBtn.visible = false;
		this.m_qSound.clear();
		this.m_curCardView = e.data;
		
		this.shoot();
	}

	private shoot(){
		this.m_cardManager.canMove = false;
		if(this.m_curCardView.x > this.m_role1.x){
			this.m_role1.scaleX = -1.2;
		}else{
			this.m_role1.scaleX = 1.2;
		}
		//播放水花动画
		egret.Tween.removeTweens(this.m_water);
		this.m_sceneLayer.addChild( this.m_water );
		this.m_water.alpha = 1;
		this.m_water.x = this.m_curCardView.x;
		this.m_water.y = this.m_curCardView.y - 300;
		this.m_water.rotation= MathUtil.getAngleByPoint(this.m_role1.x, this.m_role1.y, this.m_curCardView.x, this.m_curCardView.y);
		this.m_water.play(1);
		this.m_water.once(egret.MovieClipEvent.COMPLETE, ()=>{
			egret.Tween.get(this.m_water).wait(300).to({alpha:0},300);
		}, this)
		//射击状态
		this.m_role1.state = RoleState.shoot;
		//水花音效
		this.m_effSound.clear();
		this.m_effSound.playRes("water_mp3").exec(()=>{

			DisplayUtil.remove(this.m_water);

			//回答正确
			if(this.m_curCardView.cardName == this.m_curQuestion.name)
			{
				this.answerRight();
			}
			else
			{
				this.answerWrong();
			}

		},this);
	}

	//回答正确
	private answerRight(){
		//正确数+1
		this.m_rightCount += 1;
		//添加星星
		this.m_scoreBoard.setScore(this.m_rightCount);
		//开心
		this.m_role1.state = RoleState.happy;
		this.m_curCardView.right();
		//答对音效（叮咚）
		this.m_effSound.clear();
		this.m_effSound.playRes("dingdong_mp3");
		this.m_effSound.exec(()=>{
			//全部答对
			if(this.m_rightCount >= Game.WIN_NUM)
			{
				//游戏结束
				this.m_state = Game.GAME_OVER;
				this.stopTimer();
				this.m_cardManager.hideCard();
				this.m_role1.state = RoleState.dance;	//跳舞
				this.scene.showRibbon();

				this.m_effSound.playRes("huanhu_mp3");	
				this.m_effSound.exec(()=>{ 
					this.m_role1.state = RoleState.dance_mouth; //庆祝表情 + 说话
				}, this);
				this.m_effSound.playRes("U2SNS-OS01_mp3").playRes("U2SNS-OS02_mp3");
				this.m_effSound.exec(()=>{
					this.m_role1.state = RoleState.celebrate;
					this.m_playAgainBtn.visible = true;
					this.submit(true);
				}, this);	
			}
			else{
				//删除这个卡片
				DisplayUtil.remove(this.m_curCardView);
				//继续答题
				this.question();

				this.m_role1.scaleX = 1.2;
				this.m_role1.state = RoleState.idle;
			}
		}, this);
		
	}

	//回答错误
	private answerWrong(){
		this.m_role1.state = RoleState.sad;	//难过
		this.m_curCardView.wrong();
		this.m_effSound.clear();
		this.m_effSound.playRes("chacha_mp3");	//答错音效
		this.m_effSound.exec(()=>{
			//继续答题，重新朗读题目
			this.m_role1.scaleX = 1.2;
			this.m_role1.state = RoleState.idle;
			this.question();
		},this);
	}


	//点击音乐按钮
	private updateBgMusic(){
		if(this.m_musicBtn.state == 0){
			Println("停止背景音乐")
			this.m_bgSound.clear();
		}else{
			Println("播放背景音乐")
			// this.m_bgSound.playSync("bgmusic_mp3",null,0);
			this.m_bgSound.playRes("bgmusic_mp3",0);
		}
	}

	private stopTimer(){
		if(this.m_timer){
			this.m_timer.stop();
			this.m_timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
			this.m_timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
		}
		this.m_timer = null;
	}

	private startTimer(){
		this.stopTimer();
		this.m_timer = new egret.Timer(1000, Game.GAME_TIME);
		this.m_timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
		this.m_timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
		this.m_timer.start();
		this.onTimer(null);	//首次更新一下文本框
	}

	private onTimer(e:egret.TimerEvent){
		this.m_clockBoard.text = ""+(this.m_timer.repeatCount - this.m_timer.currentCount);
	}

	private onTimerComplete(e:egret.TimerEvent){
		this.stopTimer();
		//游戏结束
		this.m_state = Game.GAME_OVER;
		this.m_effSound.clear();
		this.m_qSound.clear();
		this.m_cardManager.wrong();
		
		this.m_role1.state = RoleState.fail;
		
		this.m_effSound.clear();
		this.m_effSound.playRes("shuaijiao_mp3").playRes("shibai_mp3");
		this.m_effSound.exec(()=>{
			this.m_role1.state = RoleState.fail_mouth;
		},this);
		this.m_effSound.playRes("U2SNS-OS03_mp3");
		this.m_effSound.exec(()=>{
			this.m_role1.state = RoleState.fail;
		},this);
		

		//弹出失败窗口
		this.submit(false);
		this.m_tryAgainBtn.visible = true;
	}

	//提交游戏结果
	private submit(isComplete:boolean):void
	{
		let theRequest = GetRequestObject();

		GameOver(isComplete, ()=>{
			
			//入口是任务中心，不需要显示任何UI
			if(theRequest.taskId !=0 ){
				return;
			}

			if(isComplete){
				SetSuccessPanelVisible(true);	//显示成功UI
			}
			else{
				SetFailPanelVisible(true);		//显示失败UI
			}
			
		});
	}

	public get uiLayer() {return this.m_uiLayer;}
	//public get sceneLayer(){return this.m_sceneLayer;}
	public get scene(){return this.m_gameScene;}
	public get stageW(){return this.stage.stageWidth;}
	public get stageH(){return this.stage.stageHeight;}
}