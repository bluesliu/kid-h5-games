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

		let qArr = new Array<Question>();
		let q1:Question;
		let q2:Question;
		//left 卡片
		while(true){
			let idx = MathUtil.random(0, Game.instance.question.$qList.length-1, 1);
			q1 = Game.instance.question.$qList[idx];
			if(q1.name != q.name){
				break;
			}
		}

		while(true){
			let idx = MathUtil.random(0, Game.instance.question.$qList.length-1, 1);
			q2 = Game.instance.question.$qList[idx];
			if(q2.name != q.name && q2.name != q1.name){
				break;
			}
		}
		qArr.push(q);
		qArr.push(q1);
		qArr.push(q2);
		ArrayUtil.randomSort(qArr);

		let card = new CardView(qArr[0]);
		card.x = this.m_startPoint0.x;
		card.y = this.m_startPoint0.y;
		card.speedY = 4;
		card.speedX = 0;
		Game.instance.sceneLayer.addChild(card);
		this.m_cardArr.push(card);

		let card1 = new CardView(qArr[1]);
		card1.x = this.m_startPoint1.x;
		card1.y = this.m_startPoint1.y;
		card1.speedY = 4;
		card1.speedX = -1.6;
		Game.instance.sceneLayer.addChild(card1);
		this.m_cardArr.push(card1);

		//right 卡片
		let card2 = new CardView(qArr[2]);
		card2.x = this.m_startPoint2.x;
		card2.y = this.m_startPoint2.y;
		card2.speedY = 4;
		card2.speedX = 1.6;
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

	public wrong(hitCardName:string){
		for(let i=0; i<this.m_cardArr.length; i++){
			if(this.m_cardArr[i].cardName == hitCardName){
				this.m_cardArr[i].wrong();
			}
		}
	}

	public right(hitCardName:string){
		for(let i=0; i<this.m_cardArr.length; i++){
			if(this.m_cardArr[i].cardName == hitCardName){
				this.m_cardArr[i].right();
			}
		}
	}

	public hideCard(){
		for(let i=this.m_cardArr.length-1; i>=0; i--){
			let card = this.m_cardArr[i];
			card.visible = false;
		}
	}

	public hitCardName(x:number, y:number):string{
		for(let i=this.m_cardArr.length-1; i>=0; i--){
			let card = this.m_cardArr[i];
			if(card.hitTestPoint(x, y)){
				return card.cardName;
			}
		}
		return "";
	}
	
}