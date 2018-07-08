class CardListView extends egret.Sprite{

	private m_posArr = [[146.25,101],[523,101],[901.75,101],[1281,101]];
	private m_cardArr = new Array<CardView>();

	private m_sound = new SoundPlayer();

	public constructor() {
		super();
		let bg = DisplayUtil.createBitmapByName("cardList_png");
		this.addChild(bg);

		let conf = RES.getRes("config_json");
		for(let i=0; i<4; i++)
		{
			let card = new CardView(conf.list[i]);
			DisplayUtil.setSize(card, 184, 184);
			this.m_cardArr.push(card);
			card.touchEnabled = true;
			card.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCard, this);
		}
	}

	//出场景
	//出场景
	public goOut(){
		egret.Tween.get(this).to({x:-2120}, 5000);
	}

	public hideCard(cardName:string)
	{
		for(let i=0; i<this.m_cardArr.length; i++)
		{
			let card = this.m_cardArr[i];
			if(card.cardName == cardName){
				DisplayUtil.remove(card);
			}
		}
	}

	public hideAllCard(){
		for(let i=0; i<this.m_cardArr.length; i++)
		{
			let card = this.m_cardArr[i];
			DisplayUtil.remove(card);
		}
	}

	public refresh(){
		this.clear();
		ArrayUtil.randomSort(this.m_cardArr);
		for(let i=0; i<this.m_cardArr.length; i++)
		{
			let card = this.m_cardArr[i];
			card.x = this.m_posArr[i][0];
			card.y = this.m_posArr[i][1];
			this.addChild(card);
			card.alpha = 0;
			egret.Tween.get(card).to({alpha:1}, 300);
		}
	}

	public clear(){
		for(let i=0; i<this.m_cardArr.length; i++)
		{
			DisplayUtil.remove(this.m_cardArr[i]);
		}
	}

	private onTouchCard(e:egret.TouchEvent){
		this.m_sound.clear();
		this.m_sound.playRes("U1SNS01_mp3");
		let evt = new egret.Event("TOUCH_CARD");
		evt.data = e.currentTarget as CardView;
		this.dispatchEvent(evt);
	}
}