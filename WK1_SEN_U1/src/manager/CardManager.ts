class CardManager extends egret.EventDispatcher {
	
	private _positionArr = [[474,346],[824,537],[1209,462],[1566,332]];
	
	private m_cardArr:Array<CardView>;
	private m_json:any;
	private m_touchSound:SoundPlayer;

	public constructor() {
		super();
		
	}

	public init(json:any){
		this.m_json = json;

		this.m_touchSound = new SoundPlayer();

		this.m_cardArr = Array<CardView>();
		for(let i=0; i<this._positionArr.length; i++)
		{
			let card = new CardView(json.list[i]);
			card.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCard, this);
			this.m_cardArr.push(card);
		}
	}

	
	public sortCard(){

		ArrayUtil.randomSort(this._positionArr);

		for(let i=0; i<this.m_cardArr.length; i++)
		{
			let card = this.m_cardArr[i];
			card.x = this._positionArr[i][0] + 125;
			card.y = this._positionArr[i][1] + 125;
			Game.instance.sceneLayer.addChild(card);
		}
	}

	public start(){
		this.reset();
		this.sortCard();
	}


	private onTouchCard(e:egret.Event)
	{
		//播放点击卡片音效
		this.m_touchSound.clear();
		this.m_touchSound.playRes("U1SNS01_mp3");

		let evt = new egret.Event("TOUCH_CARD");
		evt.data = e.currentTarget;
		this.dispatchEvent(evt);
	}

	public reset(){
		
		for(let i=this.m_cardArr.length-1; i>=0; i--){
			let card = this.m_cardArr[i];
			DisplayUtil.remove(card);
			card.reset();
		}
	}

	public wrong(){
		for(let i=this.m_cardArr.length-1; i>=0; i--){
			let card = this.m_cardArr[i];
			card.wrong();
		}
	}

	public hideCard(){
		for (let i = 0; i < this.m_cardArr.length; i++) 
		{
			let card = this.m_cardArr[i];
			DisplayUtil.remove(card);
		}
	}
	
}