class QuestionCompoment extends egret.Sprite {
    private _questionSound:SoundPlayer;
	private _showNum:number=3;
	public answer:string;
	private  _randomHeight:number[]=[110,406,706];
	public hitTestFun:Function;
	public constructor() {
		super();
		this.initContent();
	}
	private initContent():void
	{
		
		for(var i:number=0;i<this._showNum;i++)
		{
			let card=new CardComponent(i+1);
			 this.addChild(card);
			 card.x=1366;
		}
		this._questionSound= new SoundPlayer();
	}	



	public startQuestion(id:number):void
	{
		let randomArr=Source.randomIndex(this._showNum);
		for(let j:number=0;j<1;j++){

			let card=this.getChildAt(j) as CardComponent;
			if(j>0)
			{
				let index=Source.questionList[id][j-1];
				
				card.addImg(Source.images[index]);
				card.name=Source.list[index].title;
				//egret.log(j,index,card.name);
			}else
			{
				card.name="";
			}
			card.x=1366+Math.random()*300;
			card.y=this._randomHeight[randomArr[j]];
			card.addEventListener(egret.Event.ENTER_FRAME,this.onCardMove,this);
			egret.Tween.get(card,{loop:true}).to({x:-420}, 1000*10);
		}
		this.read(id);
	}

	public read(id:number)
	{
		this.answer=Source.list[id%Source.images.length].title;
		egret.log("this.answer:",this.answer);
		this._questionSound.clear();
        this._questionSound.playRes(Source.list[id%Source.images.length].audio);
	}

	private onCardMove(e:egret.Event):void
	{
		let card=e.target;
		//card.x-=5;
		// if(card.x<=-300)
		// {
		// 	card.x=1366+Math.random()*300;
		// }
		//egret.log("card.name:",card.name);
		if(this.hitTestFun){
				var p:egret.Point=this.localToGlobal(card.x ,card.y);
				this.hitTestFun.apply(this.parent,[p.x,p.y,card]);
			}
		
	}

public stop():void
	{
		for(let j:number=0;j<this.numChildren;j++){

		let card=this.getChildAt(j) as CardComponent;
		egret.Tween.pauseTweens(card);
		if(card.hasEventListener(egret.Event.ENTER_FRAME))
		{
			card.removeEventListener(egret.Event.ENTER_FRAME,this.onCardMove,this);

		}
		
		}
	}
	
}