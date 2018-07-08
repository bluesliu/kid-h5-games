class CardManager extends egret.EventDispatcher {

	private m_cardArr:Array<CardView>;
	private m_startPoint1 = new egret.Point(1920/2-140, -100);
	private m_startPoint2 = new egret.Point(1920/2+200, -100);
	
	private m_minY = 300;
	private m_json:any;
	private m_count:number;
	private m_touchSound:SoundPlayer;
	public canMove:boolean = true;

	public constructor() {
		super();
		
	}

	public init(json:any){
		this.m_json = json;
		this.m_cardArr = Array<CardView>();
		this.m_touchSound = new SoundPlayer();
	}

	
	public onRender(){

		let minY = 1080;
		for(let i=0; i<this.m_cardArr.length; i++)
		{
			minY = Math.min(this.m_cardArr[i].y, minY);
		}
		if(minY > this.m_minY)
		{
			this.addCard();
		}

		if(this.canMove)
		{
			this.moveCard();
		}
	}

	private addCard(){

		//添加一个卡片，保证这个卡片在界面中没有重复
		let arr:Array<any> = this.m_json.list.concat();
		
		for(let i=arr.length-1; i>=0; i--)
		{
			let item = arr[i];

			for(let j=0; j<this.m_cardArr.length; j++)
			{
				if(item.name == this.m_cardArr[j].cardName)
				{
					arr.splice(i, 1);	
					break;
				}
			}
		}

		if(arr.length == 0){
			Println("当前没有可以添加的卡牌");
			return;
		}

		let idx = MathUtil.random(0, arr.length-1);
		let data = arr[idx];
		
		
		let card = new CardView(data);
		card.touchEnabled = true;
		let startPoint = this.m_count%2==0 ? this.m_startPoint1 : this.m_startPoint2;
		card.x = startPoint.x;
		card.y = startPoint.y;
		card.speedY = 6;
		card.speedX = (this.m_count%2==0 ? -1 : 1) * 2.5;
		card.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCard, this);
		Game.instance.scene.cardContainer.addChildAt(card,0);
		this.m_cardArr.push(card);
		this.m_count++;
	}

	public start(){
		this.canMove = true;
		this.reset();
		this.addCard();
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


	private onTouchCard(e:egret.Event)
	{
		//播放点击卡片音效
		this.m_touchSound.playRes("touchCard_mp3");

		let evt = new egret.Event("TOUCH_CARD");
		evt.data = e.currentTarget;
		this.dispatchEvent(evt);
	}

	public reset(){
		//移除全部
		for(let i=this.m_cardArr.length-1; i>=0; i--){
			let card = this.m_cardArr[i];
			DisplayUtil.remove(card);
			card.dispose();
		}
		this.m_cardArr.length = 0;
		this.m_count = 0;
	}

	public wrong(){
		
	}

	public hideCard(){
		for(let i=this.m_cardArr.length-1; i>=0; i--){
			let card = this.m_cardArr[i];
			card.visible = false;
		}
	}
	
}