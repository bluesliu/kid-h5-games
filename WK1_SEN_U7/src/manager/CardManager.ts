class MyPosition extends egret.Point{
	public id:number;
	public constructor(x:number=0, y:number=0, id:number=0) {
		super(x,y)
		this.id = id;
	}
}

class CardManager extends egret.EventDispatcher {
	
	private POS_CONF = [new MyPosition(510,280,1),new MyPosition(824,537,2),
						new MyPosition(1209,462,3),new MyPosition(1566,332,4)];
	private _positionArr = [];
	
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
		for(let i=0; i<this.POS_CONF.length; i++)
		{
			let card = new CardView(json.list[i]);
			card.touchEnabled = true;
			card.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCard, this);
			this.m_cardArr.push(card);
		}
	}

	
	public sortCard(){
		ArrayUtil.randomSort(this.POS_CONF);
		for(let i=0; i<this.m_cardArr.length; i++)
		{
			let pos = this.POS_CONF[i];
			let card = this.m_cardArr[i];
			card.id = pos.id;
			card.x = pos.x + 125;
			card.y = pos.y + 125;
			Game.instance.sceneLayer.addChild(card);
			card.reset();
		}
	}

	public setLight(value:number){
		for(let i=this.m_cardArr.length-1; i>=0; i--){
			let card = this.m_cardArr[i];
			if(card.id == value){
				card.light();
			}else{
				card.dark();
			}
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