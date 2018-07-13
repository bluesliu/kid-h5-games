class MyGame extends Game{
	
	private m_scene:Scene;
	private m_yesItem:DragItem;
	private m_noItem:DragItem;
	private m_image:egret.Bitmap;
	private m_area = new egret.Rectangle(127,726,512,160);
	private m_repeat:EButton;
	
	private m_soundQuestion:Question;
	

	public constructor(assetsName:string, stageW:number, stageH:number) {
		super(assetsName, stageW, stageH);
	}

	public run(){

		this.m_scene = new Scene();
		this.m_sceneLayer.addChild(this.m_scene);

		this.m_yesItem = new DragItem("yes_png");
		this.m_sceneLayer.addChild(this.m_yesItem);
		this.m_yesItem.setPosition(756, 264);
		this.m_yesItem.addEventListener("DRAG_END", this.onDragEnd, this);

		this.m_noItem = new DragItem("no_png");
		this.m_sceneLayer.addChild(this.m_noItem);
		this.m_noItem.setPosition(756, 490);
		this.m_noItem.addEventListener("DRAG_END", this.onDragEnd, this);

		this.m_image = new egret.Bitmap();
		this.m_image.x = 163;
		this.m_image.y = 249;
		this.m_sceneLayer.addChild(this.m_image);

		this.m_repeat = new EButton(this, "repeat_png", null, this.onRepeat);
		this.m_uiLayer.addChild(this.m_repeat);
		this.m_repeat.x = Game.instance.stageW - this.m_repeat.width - 50;
		this.m_repeat.y = Game.instance.stageH - this.m_repeat.height - 80;

		this.m_gameStartBox.show(true);
	}

	

	//开始游戏
	protected gamePlay()
    {
		super.gamePlay();
	}

	protected nextQuestion(){
		this.m_checking = false;
		let q = this.m_question.newQuestion;

		if(Math.random()>0.5){
			//正确
			this.m_soundQuestion = q.clone();
		}
		else{
			//错误  也有正确的几率
			let idx = MathUtil.random(0,5,1);
			this.m_soundQuestion = this.question.getQuestionAt(idx).clone();
		}

		this.onRepeat();

		this.m_checking = false;
		this.m_image.texture = RES.getRes(this.question.curQuestion.image);
		DisplayUtil.setSize(this.m_image, 430, 430);
	}


	private onDragEnd(e:egret.Event){
		this.m_checking = true;
		let item = e.currentTarget as DragItem;
		if(item.getTransformedBounds(this).intersects(this.m_area))
		{
			//拖拽到指定区域了
			item.x = this.m_area.x;
			item.y = this.m_area.y;
			
			if(item == this.m_yesItem){
				//拖拽的是yes
				if(this.m_soundQuestion.name == this.question.curQuestion.name){
					//正确
					this.m_effSound.clear();
					this.m_effSound.playRes("yes_mp3").exec(()=>{
						item.x = item.position.x;
						item.y = item.position.y;
						this.right();
					},this);
				}
				else{
					//错误
					//还原位置
					egret.Tween.get(item).to({x:item.position.x, y:item.position.y}, 200).call(()=>{
						this.wrong();
					},this);
				}
			}
			else{
				if(this.m_soundQuestion.name != this.question.curQuestion.name){
					//正确
					this.m_effSound.clear();
					this.m_effSound.playRes("no_mp3").exec(()=>{
						item.x = item.position.x;
						item.y = item.position.y;
						this.right();
					},this);
				}
				else{
					//错误
					//还原位置
					egret.Tween.get(item).to({x:item.position.x, y:item.position.y}, 200).call(()=>{
						this.wrong();
					},this);
				}
			}	
		}
		else{
			//还原位置
			egret.Tween.get(item).to({x:item.position.x, y:item.position.y}, 200).call(()=>{
				this.m_checking = false;
			},this);
		}
	}

	//回答错误
	protected wrong(){
		this.lifeCount -= 1;

		EffectUtils.shakeObj(this.m_image,null);
		this.m_effSound.clear();
		this.m_effSound.playRes("chacha_mp3").exec(()=>{
			this.m_checking = false;
			if(this.lifeCount<=0){
				//游戏结束，失败
				this.onGameOver(false);
			}
			else{
				this.onRepeat();
			}
		},this);
		
	}

	protected onGameOver(isWin:boolean){
		egret.Tween.removeTweens(this.m_yesItem);
		egret.Tween.removeTweens(this.m_noItem);
		this.m_qSound.clear();
		this.m_effSound.clear();
		this.submit(isWin);
	}

	private onRepeat(){
		this.m_qSound.clear();
		this.m_qSound.playRes(this.m_soundQuestion.audio);
	}
}