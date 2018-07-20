class QuestionCompoment extends egret.Sprite {
    private _questionSound:SoundPlayer;
	private _moveSpeed:number=5;
	private _cardDis:number=798;
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
		}
		this._questionSound= new SoundPlayer();
	}	


	public startQuestion(id:number):void
	{
		var count=Math.round(Math.random());
		for(let i:number=0;i<Source.showNum;i++)
		{
			
			let card=this.getChildByName("card_"+i)as CardComponent;
			if(i==0)
			{

				card.addImg(Source.images[Source.questionList[id]][count]);
			card.tag=Source.images[Source.questionList[id]][count].name;
			}else
			{
				card.addImg(Source.images[Source.questionList[id]][1-count]);
			card.tag=Source.images[Source.questionList[id]][1-count].name;
			}
			
			 card.show();
		}

		this.read(Source.questionList[id]);
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