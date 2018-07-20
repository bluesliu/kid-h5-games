class QuestionCompoment extends egret.Sprite {
    private _questionSound:SoundPlayer;
	private _moveSpeed:number=5;
	private _cardDis:number=412;
	public answer:string;
	public constructor() {
		super();
		this.initContent();
	}
	private initContent():void
	{
		
		for(var i:number=0;i<Source.images.length;i++)
		{
			let card=new CardComponent();
			card.name="card_"+i;
			card.touchEnabled=true;
			 this.addChild(card);
			card.x=154+this._cardDis*i;
			 card.y=335.5;
			 card.addImg(Source.images[i]);
			 card.tag=Source.list[i].name;
		}
		this._questionSound= new SoundPlayer();
	}	


	public startQuestion(id:number):void
	{
		// for(var i:number=0;i<Source.images.length;i++)
		// {
		// 	let card=this.getChildByName("card_"+i)as CardComponent;
		// 	card.addImg(Source.images[Source.questionList[id][i]]);
		// 	card.tag=Source.list[Source.questionList[id][i]].title;
		// 	 card.x=154+this._cardDis*i;
		// 	 card.y=335.5;
		// 	 card.show();
		// }

		this.read(id);
	}

	public read(id:number)
	{

		this.answer=Source.list[id].name;
		this._questionSound.clear();
        this._questionSound.playRes(Source.list[id].audio);
		// this.answer=Source.list[id%Source.images.length].title;
		// this._questionSound.clear();
        // this._questionSound.playRes(Source.list[id%Source.images.length].audio);
	}

	public move():void
	{
		for(var i:number=0;i<Source.images.length;i++)
		{
			let card=this.getChildByName("card_"+i)as CardComponent;
			card.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this)
		}
		
	}

	private onEnterFrame(e:egret.Event):void
	{
		let card=e.target;
		let id:number=card.name.split("_")[1];
		card.x-=this._moveSpeed;
		if(card.x<=-card.width)
		{
			let prevCard;
		
			//egret.log(card.name);
			if(id==0)
			{
				prevCard=this.getChildByName("card_"+(Source.images.length-1))as CardComponent;
			}else
			{

				prevCard=this.getChildByName("card_"+(id-1))as CardComponent;
			}
			
			card.x=prevCard.x+this._cardDis;
			card.show();
		}
	}
	public stop():void
	{
		for(var i:number=0;i<Source.images.length;i++)
		{
			let card=this.getChildByName("card_"+i)as CardComponent;
			card.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this)
		}
	}

	public reset():void
	{
			for(var i:number=0;i<Source.images.length;i++)
		{
			let card=this.getChildByName("card_"+i)as CardComponent;
			
			 card.x=154+this._cardDis*i;
			 card.y=335.5;
			 card.show();
		}
		
	}
}