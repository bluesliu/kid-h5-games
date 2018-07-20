class DropCards extends egret.Sprite {
  
    private static NUM:number=4;
    public constructor() {
        super();
        this.createView();
    }

    

    private createView():void {

       for(var i:number=0;i<DropCards.NUM;i++)
        {
            var card:DropCard=new DropCard();
            this.addChild(card);
            card.name="card_"+i;
            card.setType(i);
            card.x=200+308*i;
            card.y=-150;
        }
    }

    public setType(id:any=0):void {
        
         for(var i:number=0;i<this.numChildren;i++)
        {
            this.getChildAt(i).visible=false;
        }
        this.getChildAt(id).visible=false;
    }

    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

     public getChildren(id:any):DropCard {
       return  this.getChildAt(id)as DropCard;
    }


    public init(bmpArr:Array<egret.Bitmap>)
	{
        let count:number=0;
		for(let i:number=0;i<bmpArr.length;i++)
		{
			let card:DropCard=this.getChildAt(i)as DropCard;
            
             card.add(bmpArr[i]);
            card.name=bmpArr[i].name;
            card.x=200+308*i;
            card.y=-150;
             card.visible=true;
            egret.Tween.get( card).wait(100*i).to( {y:250+Math.random()*150}, 500, egret.Ease.cubicIn).call(()=>{
                count++;
				if(count>=this.numChildren)
                {
                    this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));

                }
				
			});
		}
		
		
	}

	public next(bmpArr:Array<egret.Bitmap>,id:number,waitTime:number)
	{
        let count:number=0;
		for(let i:number=0;i<bmpArr.length;i++)
		{
			let card:DropCard=this.getChildAt(i)as DropCard;
            if(i==id)
            {
                card.visible=true;
                egret.Tween.get(card).wait(100*i).to( {}, 500, egret.Ease.backOut)
                .wait(waitTime)
            .to( {y:-300},0)
            .call(()=>{card.visible=true; card.add(bmpArr[i]);card.name=bmpArr[i].name;})
            .wait(100*i).to( {y:250+Math.random()*150}, 500, egret.Ease.cubicIn).call(()=>{
                count++;
				if(count>=this.numChildren)
                {
                    this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));

                }
				
			});
            }else
            {
                egret.Tween.get(card).wait(100*i).to( {y:1200}, 500, egret.Ease.backOut)
			  .wait(waitTime)
            .to( {y:-300},0)
            .call(()=>{card.visible=true; card.add(bmpArr[i]);card.name=bmpArr[i].name;})
            .wait(100*i).to( {y:250+Math.random()*150}, 500, egret.Ease.cubicIn).call(()=>{
                count++;
				if(count>=this.numChildren)
                {
                    this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));

                }
				
			});
            }
            
		}
	}

}
