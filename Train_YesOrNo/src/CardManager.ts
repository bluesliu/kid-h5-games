// event: TOUCH_CARD

class CardManager extends egret.EventDispatcher {

	private m_cardArr:Array<CardView>;
	private m_startPoint0 = new egret.Point(384, 581);
	//private m_startPoint1 = new egret.Point(683,483);
	private m_startPoint2 = new egret.Point(981, 577);
	
	public constructor() {
		super();
		this.m_cardArr = Array<CardView>();
	}

	
	

	public addCard(q:Question){

		let card = new CardView(0, q.image1, q.audio1);
		card.x = this.m_startPoint0.x;
		card.y = this.m_startPoint0.y;
		Game.instance.sceneLayer.addChild(card);
		this.m_cardArr.push(card);
		card.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapCard, this);

		let card1 = new CardView(1, q.image2, q.audio2);
		card1.x = this.m_startPoint2.x;
		card1.y = this.m_startPoint2.y;
		Game.instance.sceneLayer.addChild(card1);
		this.m_cardArr.push(card1);
		card1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapCard, this);
	}

	private onTapCard(e:egret.TouchEvent){
		let card = e.currentTarget as CardView;
		let evt = new egret.Event("TOUCH_CARD");
		evt.data = card;
		this.dispatchEvent(evt);
	}

	public start(){
		this.reset();
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