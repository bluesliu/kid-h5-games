
//Yes No
//events: DRAG_END
class DragItem extends egret.Sprite{
	private m_bg:egret.Bitmap;
	private m_pos:egret.Point;
	private m_type:string;
	public constructor(type:string) {
		super();
		this.m_type = type;
		this.m_bg = DisplayUtil.createBitmapByName("item_png");
		this.addChild(this.m_bg);

		let content = DisplayUtil.createBitmapByName(type);
		this.addChild(content);
		DisplayUtil.setSize(content, 437, 150);
		content.x = 23;
		content.y = 5;

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
	}

	public get position(){
		return this.m_pos;
	}

	public get type(){return this.m_type;}
}