class QuestionCompoment extends egret.Sprite {
	private _xml:egret.XML;
	private _allList=new Array();
	private _imgList=new Array();
	private _qIDArr=new Array();
	private _nowIDArr=new Array();
	private _itemArr=new Array();
	private _answerID:number=-1;
	private _gameData:any;
	public root:string="data/";
	 /**
     * 对应要加载的资源组名称
     */
    private resGroupName:String="unit1";
	private isResourceLoadEnd: boolean = false;
	private _isStart:boolean=false;
	public answer:boolean=false;
	private m_tipsSound:SoundPlayer;
	private _index:number=0;
	public clickFun:Function;
	public constructor() {
		super();
		this.initContent();
	}
	private initContent():void
	{

		this.m_tipsSound = new SoundPlayer();
	}	

	

	public createQuestion(id:number):void
	{
		this._index=id;
		egret.log("this._index:",this._index);
		this._isStart=true;
		var tim:number=250*this.numChildren;
		for(let j:number=0;j<this.numChildren;j++){
			egret.Tween.get(this.getChildAt(j)).to({y: 514+50,alpha:0}, 1000, egret.Ease.quadInOut);
		}
		egret.setTimeout(this.newQuestion,this,tim);
		
	}	 

	private newQuestion():void
	{
		while (this.numChildren>0) {	
			this.removeChildAt(0);
		}	

			
		  for(let i:number=0;i<Source.questionList[this._index].length;i++)
			{
					let qid=Source.questionList[this._index][i];
					let bmp=Source.images[qid];			
					let item:CardComponent=new CardComponent(i+1,bmp,qid);
					item.name="item_"+qid;
						item.x=120+400*i;
						item.y=150;
						item.alpha=0;
						//item.y=514+50;
						this.addChild(item);
						item.$touchEnabled=true;
						 item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cardClick, this);
						egret.setTimeout(a=>{
							egret.Tween.get(item).to({y:100,alpha:1}, 1000, egret.Ease.quadInOut).call(()=>{
								item.move();
							}, this);
						},this,100*i)

			}	

		// let copyArr:Array<any>=this._qIDArr.slice();
		// this._nowIDArr.length=0;
		// //egret.log("----",this._qIDArr.length);
		// for(let i:number=0;i<4&&i<this._qIDArr.length;i++){
		// 	this._nowIDArr.push(this.getRandomArr(copyArr));
		// 	let qid=this._nowIDArr[i];
		// 	let bmp=this._imgList[qid];			
		// 	let item:CardComponent=new CardComponent(i,bmp,qid);
		// 	item.name="item_"+qid;
		// 	item.x=120+308*i;
		// 	item.y=514;
		// 	item.alpha=0;
		// 	item.y=514+50;
		// 	this.addChild(item);
		// 	egret.setTimeout(a=>{
		// 		egret.Tween.get(item).to({y: 514,alpha:1}, 1000, egret.Ease.quadInOut);
		// 	},this,100*i)
		// 	//egret.log("----",item.x);
		// 	//this._itemArr.push(item);
		// }
		// copyArr=this._nowIDArr.slice();
		// if(copyArr.indexOf(this._answerID)!=-1){
		// 	copyArr.splice(copyArr.indexOf(this._answerID),1);
		// }
		this._answerID=this._index%Source.images.length;

		this.repeat();
	}

	public repeat(){
		this.m_tipsSound.clear();
		this.m_tipsSound.playRes(Source.list[this._answerID].audio);
	}

private cardClick(event: egret.TouchEvent):void
	{
		if(this._answerID==event.target.name.split("_")[1])
		{
			this.answer=true;

		}else
		{
			this.answer=false;

		}
		if(this.clickFun){
				//var p:egret.Point=this.localToGlobal(event.stageX,event.stageY);
				var p:egret.Point=this.localToGlobal(event.target.x,event.target.y);
				this.clickFun.apply(this.parent,[p.x,p.y]);
			}
		//egret.log(event.target);
	}

public reset(){
		while (this.numChildren>0) {	
			this.removeChildAt(0);
		}	
	}

	// public hitTestFun(pX:number,pY:number):boolean
	// {
	// 	let isTrue:boolean=false;
	// 	for(var i:number=0;i<this._qIDArr.length;i++){
	// 		let item:CardComponent=this.getChildByName("item_"+this._qIDArr[i]) as CardComponent;
	// 		let isHit:boolean=item.hitObj.hitTestPoint( pX, pY, false );
	// 		if(isHit){
	// 			if(item.name==("item_"+this._answerID)){
	// 				isTrue=true;
	// 			}
				
	// 			egret.Tween.get(item).to({y: 314}, 1000, egret.Ease.quadInOut);
	// 		}
	// 	}
	// 	let item:CardComponent=this.getChildByName("item_"+this._qIDArr[this._answerID]) as CardComponent;
	// 	EffectUtils.blinkEffect(item, 2000);
	// 	//var p:egret.Point=item.globalToLocal(pX,pY);		
	// 	//isTrue= item.hitObj.hitTestPoint( pX, pY, false );
	// 	if(isTrue){
	// 		EffectUtils.showTips("回答正確",4,true);
	// 	}else{
	// 		EffectUtils.showTips("回答錯誤",4);
	// 	}
		
       
	// 	return isTrue;
	// }
	
	// private getRandomArr(arr:Array<any>):any
	// {
	// 	return arr.splice (Math.random()*arr.length, 1)[0];
	// }
}