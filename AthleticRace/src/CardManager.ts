class CardManager extends egret.EventDispatcher {

	public m_cardArr:Array<CardView>;
	private m_startPoint1 = new egret.Point(611, 0);
	private m_startPoint2 = new egret.Point(762, 0);
	
	public canMove:boolean = true;

	public constructor() {
		super();
		this.m_cardArr = Array<CardView>();
	}

	
	public onRender(){

		if(this.canMove)
		{
			this.moveCard();
		}
	}

	public addCard(q:Question){

		let qArr = new Array<Question>();
		let q1:Question;
		//left 卡片
		while(true){
			let idx = MathUtil.random(0, Game.instance.question.$qList.length-1, 1);
			q1 = Game.instance.question.$qList[idx];
			if(q1.name != q.name){
				break;
			}
		}

		qArr.push(q);
		qArr.push(q1);
		ArrayUtil.randomSort(qArr);


		let card1 = new CardView(qArr[0]);
		card1.setPosition(this.m_startPoint1);
		card1.speed = 4;
		card1.angle = 102;
		Game.instance.sceneLayer.addChild(card1);
		this.m_cardArr.push(card1);

		//right 卡片
		let card2 = new CardView(qArr[1]);
		card2.setPosition(this.m_startPoint2);
		card2.speed = 4;
		card2.angle = 80;
		card2.bg.scaleX = -1;
		card2.bg.x = card2.bg.width/2;
		Game.instance.sceneLayer.addChild(card2);
		this.m_cardArr.push(card2);
	}

	public start(){
		this.canMove = true;
		this.reset();
	}

	private moveCard(){
		for (let i = this.m_cardArr.length-1 ; i >= 0 ; i--) 
		{
			let card = this.m_cardArr[i];
			let p = MathUtil.circle(card.x, card.y, card.speed, MathUtil.D2R(card.angle));
			card.setPosition(p);
			if(card.y >= 1580)
			{
				DisplayUtil.remove(card);
				this.m_cardArr.splice(i,1);
				card.dispose();
			}
		}
	}


	

	public reset(){
		//移除全部
		for(let i=this.m_cardArr.length-1; i>=0; i--){
			let card = this.m_cardArr[i];
			DisplayUtil.remove(card);
			card.dispose();
		}
		this.m_cardArr.length = 0;
	}


	public hideCard(){
		for(let i=this.m_cardArr.length-1; i>=0; i--){
			let card = this.m_cardArr[i];
			card.visible = false;
		}
	}

	
	
}