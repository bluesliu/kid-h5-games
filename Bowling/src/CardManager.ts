class CardManager extends egret.EventDispatcher {

	public m_cardArr:Array<CardView>;
	private m_startPoint0 = new egret.Point(379,148);
	private m_startPoint1 = new egret.Point(679, 148);
	private m_startPoint2 = new egret.Point(979, 148);
	
	public constructor() {
		super();
		this.m_cardArr = Array<CardView>();
	}


	public addCard(q:Question){
		
		let qArr = new Array<Question>();
		let q1:Question;
		let q2:Question;
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

		let card0 = new CardView(qArr[0]);
		card0.x = this.m_startPoint0.x;
		card0.y = this.m_startPoint0.y;
		Game.instance.sceneLayer.addChild(card0);
		this.m_cardArr.push(card0);

		let card1 = new CardView(qArr[1]);
		card1.x = this.m_startPoint1.x;
		card1.y = this.m_startPoint1.y;
		Game.instance.sceneLayer.addChild(card1);
		this.m_cardArr.push(card1);

		let card2 = new CardView(qArr[2]);
		card2.x = this.m_startPoint2.x;
		card2.y = this.m_startPoint2.y;
		Game.instance.sceneLayer.addChild(card2);
		this.m_cardArr.push(card2);
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
	
}