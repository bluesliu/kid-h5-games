class QuestionCompoment extends egret.Sprite {
    private _questionSound:SoundPlayer;
	private _moveSpeed:number=5;
	private _cardDis:number=400-1;
	public answer:string;
	public constructor() {
		super();
		this.initContent();
	}
	private initContent():void
	{
		
		for(var i:number=0;i<Source.showNum;i++)
		{
			let card=new CardComponent();
			card.name="card_"+i;
			card.touchEnabled=true;
			 this.addChild(card);
			card.x=120.0+this._cardDis*i;
			 card.y=247.4;
			// card.addImg(Source.images[i]);
			// card.tag=Source.list[i].name;
		}
		this._questionSound= new SoundPlayer();
	}	


	public startQuestion(id:number):void
	{
		for(var i:number=0;i<Source.showNum;i++)
		{
			let card=this.getChildByName("card_"+i)as CardComponent;
			card.addImg(Source.images[Source.questionList[id][i]]);
			card.tag=Source.list[Source.questionList[id][i]].name;
			 card.show();
		}

		this.read(id%Source.images.length);
	}

	public read(id:number)
	{

		this.answer=Source.list[id].name;
		this._questionSound.clear();
        this._questionSound.playRes(Source.list[id].audio);
	}

	public hide():void
	{
		for(var i:number=0;i<Source.showNum;i++)
		{
			let card=this.getChildByName("card_"+i)as CardComponent;
			card.hide();
		}
	}

}