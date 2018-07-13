class Game extends egret.Sprite{

	static isDebug = false;
	static instance:Game;
	static WIN_NUM:number = 10;
	static LIFE_NUM:number = 3;
	
	protected m_stageW:number;
	protected m_stageH:number;

	//层
	protected m_uiLayer:egret.Sprite;
	protected m_sceneLayer:egret.Sprite;

	//背景音乐
	protected m_bgSound:SoundPlayer;
	//题目声音
	protected m_qSound:SoundPlayer;
	//音效
	protected m_effSound:SoundPlayer;

	//开始按钮
	protected m_gameStartBox:GameStartBox;
	//计分板
	protected m_scoreBoard:ScoreBoard;
	//生命面板
	protected m_lifeBoard:LifeBoard;
	//胜利面板
	protected m_successPanel:SuccessPanel;
	//失败面板
	protected m_failPanel:FailPanel;
	//题目
	protected m_question:QuestionUtil;
	protected m_checking:boolean;

	//答对数量
	private m_rightCount = 0;
	//错误数量
	private m_wrongCount = 0;

	

	public constructor(assetsName:string, stageW:number, stageH:number) {
		super();
		this.m_question = new QuestionUtil()
		this.m_question.init(assetsName);
		this.m_stageW = stageW;
		this.m_stageH = stageH;

		Game.instance = this;

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

		//显示开始按钮
		this.m_gameStartBox = new GameStartBox();
		this.m_gameStartBox.once("START", this.gamePlay, this);

		//计分板
		this.m_scoreBoard = new ScoreBoard();
		this.m_scoreBoard.show(false, BoxAlign.right_top, new egret.Point(-20,20));

		//生命面板
		this.m_lifeBoard = new LifeBoard();
		this.m_lifeBoard.show(false, BoxAlign.left_top, new egret.Point(200, 16));

		this.m_successPanel = new SuccessPanel(this);
		this.m_successPanel.onTryAgain = this.gamePlay;

		this.m_failPanel = new FailPanel(this);
		this.m_failPanel.onTryAgain = this.gamePlay;
		
	}

	public run(){
		
	}

	//开始游戏
	protected gamePlay()
    {
		this.rightCount = 0;
		this.lifeCount = Game.LIFE_NUM;
		this.m_question.reset();
		this.nextQuestion();
		this.playBGMusic();
	}

	protected nextQuestion(){
		this.m_qSound.playRes(this.m_question.newQuestion.audio);
	}

	//回答正确
	protected right(){
		this.rightCount += 1;
		if(this.rightCount>=Game.WIN_NUM){
			//游戏结束，胜利
			this.onGameOver(true);
		}
		else{
			//下一题
			this.nextQuestion();
		}
	}

	//回答错误
	protected wrong(){
		this.lifeCount -= 1;
		if(this.lifeCount<=0){
			//游戏结束，失败
			this.onGameOver(false);
		}
	}

	protected onGameOver(isWin:boolean){
		
	}

	//提交游戏结果
	protected submit(isComplete:boolean):void
	{	
		if(isComplete){
			this.m_successPanel.show();	//显示成功UI
		}
		else{
			this.m_failPanel.show();		//显示失败UI
		}
		GameOver(isComplete, null);
		this.stopBGMusic();
	}

	

	public get rightCount(){return this.m_rightCount;}
	public set rightCount(value:number){
		this.m_rightCount = value;
		this.m_scoreBoard.setScore(value);
	}

	public get lifeCount(){return Game.LIFE_NUM - this.m_wrongCount;}
	public set lifeCount(value:number){
		this.m_wrongCount = Game.LIFE_NUM - value;
		this.m_lifeBoard.setScore(value);
	}

	public playBGMusic(){
		this.m_bgSound.clear();
		this.m_bgSound.playRes("bgmusic_mp3",0);
	}
	public stopBGMusic(){
		this.m_bgSound.clear();
	}

	public get uiLayer() {return this.m_uiLayer;}
	public get stageW(){return this.m_stageW;}
	public get stageH(){return this.m_stageH;}
	public get question(){return this.m_question;}
	public get checking(){return this.m_checking;}
	
}