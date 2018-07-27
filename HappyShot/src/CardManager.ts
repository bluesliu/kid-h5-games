class CardManager extends egret.EventDispatcher {

	private m_cardArr:Array<CardView>;
	private m_historyArr:Array<Question>;

	public canMove:boolean = true;

	public constructor() {
		super();
		this.m_cardArr = new Array<CardView>();
		this.m_historyArr = new Array<Question>();
	}

	
	public onRender(){

		if(!this.canMove){
			return;
		}

		this.moveCard();

		if(ArrayUtil.getLastItem(this.m_cardArr)!=null){
			let card:CardView = ArrayUtil.getLastItem(this.m_cardArr);
			if(card.x < 910){
				this.addCard();
			}
		}
		else if(this.m_cardArr.length==0){
			this.addCard();
		}
	}

	private addCard(){
		let q:Question;
		//如果最后两个不是答案，就添加一个正确答案
		if(this.m_cardArr.length>=3
			&& this.m_cardArr[this.m_cardArr.length-1].cardName != Game.instance.question.curQuestion.name
			&& this.m_cardArr[this.m_cardArr.length-2].cardName != Game.instance.question.curQuestion.name
			&& this.m_cardArr[this.m_cardArr.length-3].cardName != Game.instance.question.curQuestion.name){
				q = Game.instance.question.curQuestion;
		}
		else{

			let hasQuestion = false;
			do{
				q = ArrayUtil.getRandomItem(Game.instance.question.$qList);
				hasQuestion = false;
				for(let i=0; i<Game.instance.question.$qList.length-1; i++){
					let idx = this.m_historyArr.length - i - 1;
					if(idx<0){
						break;
					}
					let historyQ = this.m_historyArr[idx];
					if(historyQ.name==q.name){
						hasQuestion = true;
						break;
					}
				}
			}while(hasQuestion)
		}
		
		let card = new CardView(q);
		card.x = 1293;
		card.y = 682;
		card.speedX = -2.5;
		Game.instance.scene.cardLayer.addChild(card);
		this.m_cardArr.push(card);
		this.m_historyArr.push(q);
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
			if(card.x <= 70)
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

	

	public getHitCard(x:number):CardView{
		for(let i=this.m_cardArr.length-1; i>=0; i--){
			let card = this.m_cardArr[i];
			if(Math.abs(card.x-x)<150){
				return card;
			}
		}
		return null;
	}
	
}