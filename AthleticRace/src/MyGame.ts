class MyGame extends Game{
	
	
	private m_leftArrow:EButton;
	private m_rightArrow:EButton;
	private m_role:RoleView;
	private m_curRolePos = 0;
	private m_cardManager:CardManager;
	private m_stoneManager:StoneManager;
	private m_repeat:EButton;
	private m_jumpBtn:EButton;
	private m_jumpCard:CardView;

	public constructor(assetsName:string, stageW:number, stageH:number) {
		super(assetsName, stageW, stageH);
	}

	public run(){

		this.m_cardManager = new CardManager();
		this.m_stoneManager = new StoneManager();
		
		this.m_scene = new Scene();
		this.m_sceneLayer.addChild(this.m_scene);

		this.m_leftArrow = new EButton(this, "leftArrow_png", this.onTouchLeft);
		this.m_leftArrow.x = 33;
		this.m_leftArrow.y = 841;
		this.m_uiLayer.addChild(this.m_leftArrow);

		this.m_rightArrow = new EButton(this, "rightArrow_png", this.onTouchRight);
		this.m_rightArrow.x = 1180;
		this.m_rightArrow.y = 841;
		this.m_uiLayer.addChild(this.m_rightArrow);

		this.m_role = new RoleView("role");
		this.m_sceneLayer.addChild(this.m_role);
		this.m_role.y = 1000;
		this.m_role.addEventListener("JUMP_END", this.onJumpEnd, this);
		this.setRolePos(-1);
		
		this.m_jumpBtn = new EButton(this, "jumpBtn_png", this.onTouchJump);
		this.m_jumpBtn.x = (this.stageW-this.m_jumpBtn.width)/2;
		this.m_jumpBtn.y = 841;
		this.uiLayer.addChild(this.m_jumpBtn);

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
		this.m_role.state = RoleState.run;
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}

	private onEnterFrame(e:egret.Event){

		

		if(this.m_checking){
			return;
		}
		
		this.sceneLayerSort();

		this.m_cardManager.onRender();
		this.m_role.onRender();
		this.m_stoneManager.onRender();

		let hitCard = this.getHitCard();
		if(hitCard==null){
			return;
		}

		if(this.m_role.state != RoleState.jump){
			//撞到栏杆
			//错误
			this.m_checking = true;
			this.m_role.state = RoleState.idle;
			hitCard.wrong();
			this.m_qSound.clear();
			this.m_qSound.playRes("chacha_mp3");
			this.m_qSound.exec(()=>{
				this.wrong();
			},this);
		}
		else{
			//跳跃栏杆
			this.m_jumpCard = hitCard;
		}
		
	}

	private onJumpEnd(e:egret.Event){
		if(this.m_jumpCard==null){
			return;
		}

		this.m_checking = true;
		this.m_role.state = RoleState.idle;
		if(this.m_jumpCard.cardName == this.question.curQuestion.name){
			//正确
			this.m_jumpCard.right();
			this.m_qSound.clear();
			this.m_qSound.playRes("dingdong_mp3");
			this.m_qSound.exec(()=>{
				this.right();
			},this);
		}
		else{
			//错误
			this.m_jumpCard.wrong();
			this.m_qSound.clear();
			this.m_qSound.playRes("chacha_mp3");
			this.m_qSound.exec(()=>{
				this.wrong();
			},this);
		}
		this.m_jumpCard = null;
	}

	private getHitCard():CardView{
		for(let i=0; i<this.m_cardManager.m_cardArr.length; i++){
			let card = this.m_cardManager.m_cardArr[i];
			if(Math.abs(this.m_role.y - card.y) < 10){
				if(MathUtil.distance(this.m_role.x, this.m_role.y, card.x, card.y)<80){
					return card;
				}
			}
		}
		return null;
	}

	private sceneLayerSort(){
		let arr = new Array<egret.DisplayObject>();
		for(let i=0; i<this.sceneLayer.numChildren; i++){
			let obj = this.sceneLayer.getChildAt(i);
			arr.push(obj);
		}
		arr.sort((a,b)=>{
			if(a.y < b.y){
				return -1;
			}
			return 1;
		});

		for(let k=0; k<arr.length; k++){
			this.sceneLayer.addChild(arr[k]);
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
		this.m_role.state = RoleState.run;
		let q = this.m_question.newQuestion;

		this.m_cardManager.reset();
		this.m_cardManager.canMove = true;
		this.m_stoneManager.canMove = true;
		this.m_cardManager.addCard(q);

		this.onRepeat();
	}

	protected onGameOver(isWin:boolean){
		this.m_cardManager.canMove = false;
		this.m_cardManager.reset();
		this.m_stoneManager.canMove = false;
		this.m_role.state = RoleState.idle;
		this.stopBGMusic();
		this.submit(isWin);
	}

	private onTouchJump(){
		this.m_role.state = RoleState.jump;
	}

	private onTouchLeft(){
		if(this.checking)return;
		//if(this.m_curRolePos == -1)return;
		//this.setRolePos(this.m_curRolePos-1);
		this.setRolePos(-1);
	}

	private onTouchRight(){
		if(this.checking)return;
		// if(this.m_curRolePos == 1)return;
		// this.setRolePos(this.m_curRolePos+1);
		this.setRolePos(1);
	}

	private setRolePos(pos:number){
		this.m_curRolePos = pos;
		egret.Tween.removeTweens(this.m_role);
		let endX = 681 + pos * 250;
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