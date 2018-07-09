class MyGame extends Game{
	
	private m_scene:Scene;
	private m_car:Car;
	private m_role:RoleView;
	private m_repeat:EButton;

	

	public constructor(assetsName:string, stageW:number, stageH:number) {
		super(assetsName, stageW, stageH);
	}

	public run(){

		this.m_scene = new Scene();
		this.m_sceneLayer.addChild(this.m_scene);
		this.m_scene.addEventListener("DRAG", this.onDragScene, this);

		this.m_car = new Car();
		this.m_sceneLayer.addChild(this.m_car);
		this.m_car.x = 496;
		this.m_car.y = 676;

		this.m_role = new RoleView("role");
		this.m_sceneLayer.addChild(this.m_role);
		this.m_role.x = 373;
		this.m_role.y = 955;

		this.m_repeat = new EButton(this, "repeat_png", null, this.onRepeat);
		this.m_uiLayer.addChild(this.m_repeat);
		this.m_repeat.x = Game.instance.stageW - this.m_repeat.width - 50;
		this.m_repeat.y = Game.instance.stageH - this.m_repeat.height - 180;

		this.m_gameStartBox.show(true);
	}

	private onDragScene(e:egret.Event)
	{
		let p:egret.Point = e.data.point;
		let idx:number = e.data.index;
		if(this.m_car.hitTestPoint(p.x, p.y)){
			let dragName = Game.instance.question.getQuestionAt(idx).name;
			let qName = Game.instance.question.curQuestion.name;
			if(dragName == qName){
				//正确
				this.m_car.addItem(Game.instance.question.curQuestion);
				this.right();
			}
			else{
				//错误
				this.wrong();
			}
		}
	}

	//开始游戏
	protected gamePlay()
    {
		this.m_car.reset();
		super.gamePlay();
	}

	protected onGameOver(isWin:boolean){
		this.submit(isWin);
	}

	private onRepeat(){
		this.m_qSound.clear();
		this.m_qSound.playRes(this.m_question.curQuestion.audio);
	}
}