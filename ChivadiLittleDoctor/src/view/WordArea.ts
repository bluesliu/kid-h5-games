// 答题区域
// events: CHECK
class WordArea extends egret.Sprite{
	private m_items:Array<WordItem>;
	private m_area1:egret.Sprite;
	private m_area2:egret.Sprite;
	private m_dragItems:Array<WordItem>;	//已经拖拽到指定区域的item
	private m_question:Question;
	private m_checkBtn:EButton;

	public constructor() {
		super();
		this.m_items = [];
		this.m_dragItems = [];

		this.m_area1 = new egret.Sprite();
		this.m_area1.graphics.beginFill(0xff0000, Game.isDebug?0.5:0);
		this.m_area1.graphics.drawRect(0,0,1248,126);
		this.m_area1.graphics.endFill();
		this.addChild(this.m_area1);

		this.m_area2 = new egret.Sprite();
		this.m_area2.graphics.beginFill(0xff0000, Game.isDebug?0.5:0);
		this.m_area2.graphics.drawRect(0,0,1248,126);
		this.m_area2.graphics.endFill();
		this.m_area2.y = 150;
		this.addChild(this.m_area2);

		//将检查的结果派发
		this.m_checkBtn = new EButton(this, "checkBtn_png", null, ()=>{
			let evt = new egret.Event("CHECK");
			evt.data = this.check();
			this.dispatchEvent(evt);
			this.m_checkBtn.visible = false;
		});
		this.addChild(this.m_checkBtn);
		this.m_checkBtn.visible = false;
		this.m_checkBtn.x = 516;
		this.m_checkBtn.y = 324;
	}

	public setQuestion(q:Question){
		this.reset();
		this.m_question = q;
		let words = q.name.split(" ");
		let wordsCopy = words.concat();
		ArrayUtil.randomSort(words);
		//防止顺序不变
		while(ArrayUtil.equal(words, wordsCopy)){
			ArrayUtil.randomSort(words);
		}

		let nextX = 85;
		for(let i=0; i<words.length; i++){
			let item = new WordItem(words[i]);
			item.setPosition(this.m_area1.x + nextX
							,(this.m_area1.height-item.height)/2);
			this.addChild(item);
			this.m_items.push(item);
			nextX = item.x + item.width + 10;
			item.addEventListener("DRAG_END", this.onDragEnd, this);
		}
	}

	private onDragEnd(e:egret.Event)
	{
		let item = e.target as WordItem;
		let point = e.data as egret.Point;
		if(this.m_area2.hitTestPoint(point.x, point.y)){
			//拖拽到区域
			let endY = this.m_area2.y+(this.m_area2.height-item.height)/2;
			let endX = 85;
			
			//避免重复添加
			let idx2 = this.m_dragItems.indexOf(item);
			if(idx2==-1){
				let lastItem = this.m_dragItems[this.m_dragItems.length-1];
				if(lastItem){
					endX = lastItem.x + lastItem.width + 10;
				}
				this.m_dragItems.push(item);
			}
			else{
				let lastItem2 = this.m_dragItems[idx2-1];
				if(lastItem2){
					endX = lastItem2.x + lastItem2.width + 10;
				}
			}

			item.x = endX;
			item.y = endY;
		}
		else{
			//回到原来的位置
			item.x = item.position.x;
			item.y = item.position.y;
			
			let idx = this.m_dragItems.indexOf(item);
			if(idx != -1){
				this.m_dragItems.splice(idx,1);
			}

			//重新排列
			let nextX = 85;
			for(let i=0; i<this.m_dragItems.length; i++){
				let item = this.m_dragItems[i];
				item.x = nextX;
				this.addChild(item);
				nextX = item.x + item.width + 10;
			}
		}

		this.m_checkBtn.visible = this.m_dragItems.length == this.m_items.length;
	}

	private check():boolean{
		let words = this.m_question.name.split(" ");
		for(let i=0; i<words.length; i++){
			if(i>=this.m_dragItems.length){
				return false;
			}
			if(this.m_dragItems[i].text != words[i]){
				return false;
			}
		}
		return true;
	}

	public reset(){
		for(let i=0; i<this.m_items.length; i++){
			this.m_items[i].dispose();
			DisplayUtil.remove(this.m_items[i]);
		}
		this.m_items.length = 0;
		this.m_dragItems.length = 0;
		this.m_checkBtn.visible = false;
	}

	public resetQuestion(){
		for(let i=0; i<this.m_items.length; i++){
			this.m_items[i].x = this.m_items[i].position.x;
			this.m_items[i].y = this.m_items[i].position.y;
		}
		this.m_dragItems.length = 0;
	}
}

//单词项
//events: DRAG_END
class WordItem extends egret.Sprite{
	private m_bg:egret.Bitmap;
	private m_tf:egret.TextField;
	private m_pos:egret.Point;
	private m_text:string;

	public constructor(text:string) {
		super();
		this.m_text = text;
		this.m_bg = DisplayUtil.createBitmapByName("wordBG_png");
		this.addChild(this.m_bg);

		this.m_tf = new egret.TextField();
		this.m_tf.textColor = 0xffffff;
		this.m_tf.bold = true;
		this.m_tf.text = text;
		this.m_tf.size = 46;
		if(Game.isDebug){
			this.m_tf.border = true;
		}
		this.addChild(this.m_tf);

		//修正背景宽度
		this.m_bg.width = Math.max(101, this.m_tf.width+40);
		this.m_tf.y = (this.m_bg.height-this.m_tf.height)/2;
		this.m_tf.x = (this.m_bg.width-this.m_tf.width)/2;

		//可拖拽
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
	}

	public setPosition(x:number, y:number){
		this.m_pos = new egret.Point(x,y);
		this.x = x;
		this.y = y;
	}

	private onTouchBegin(e:egret.TouchEvent){
		if(Game.instance.checking){
			return;
		}
		this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		DisplayUtil.bringFront(e.currentTarget);
	}
	private onTouchMove(e:egret.TouchEvent){
		let point = this.parent.globalToLocal(e.stageX, e.stageY);
		this.x = point.x - this.width/2;
		this.y = point.y - this.height/2;
	}
	private onTouchEnd(e:egret.TouchEvent){
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		
		let evt = new egret.Event("DRAG_END");
		evt.data = new egret.Point(e.stageX, e.stageY);
		this.dispatchEvent(evt);
	}

	public dispose(){
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		this.m_bg = null;
		this.m_pos = null;
		this.m_tf = null;
	}

	public get position(){
		return this.m_pos;
	}

	public get text(){return this.m_text;}
}