class CardManager extends egret.EventDispatcher {

	private m_cardArr:Array<CardView>;
	private m_startPoint0 = new egret.Point(1366/2, -100);
	private m_startPoint1 = new egret.Point(1366/2-100, -100);
	private m_startPoint2 = new egret.Point(1366/2+100, -100);
	
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

		let card = new CardView(q);	//题目卡片
		card.x = this.m_startPoint0.x;
		card.y = this.m_startPoint0.y;
		card.speedY = 6;
		card.speedX = 0;//(this.m_count%2==0 ? -1 : 1) * 2.5;
		Game.instance.sceneLayer.addChild(card);
		this.m_cardArr.push(card);

		//yes 卡片
		let card1 = new CardView(q, 1);
		card1.x = this.m_startPoint1.x;
		card1.y = this.m_startPoint1.y;
		card1.speedY = 6;
		card1.speedX = -2.5;
		Game.instance.sceneLayer.addChild(card1);
		this.m_cardArr.push(card1);

		//no 卡片
		let card2 = new CardView(q, 2);
		card2.x = this.m_startPoint2.x;
		card2.y = this.m_startPoint2.y;
		card2.speedY = 6;
		card2.speedX = 2.5;
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
			card.x += card.speedX;
			card.y += card.speedY
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

	public wrong(index:number){
		this.m_cardArr[index].wrong();
	}

	public right(index:number){
		this.m_cardArr[index].right();
	}

	public hideCard(){
		for(let i=this.m_cardArr.length-1; i>=0; i--){
			let card = this.m_cardArr[i];
			card.visible = false;
		}
	}

	public hitType(x:number, y:number):number{
		for(let i=this.m_cardArr.length-1; i>=0; i--){
			let card = this.m_cardArr[i];
			if(card.hitTestPoint(x, y)){
				return card.type;
			}
		}
		return -1;
	}
	
}