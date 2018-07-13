class Car extends egret.Sprite{
	private m_pos = [[121,101],[246,101],[183,101]
					,[91,22],[208,22],[149,22],[267,22]
					,[91,-43],[254,-43],[171,-43]];
	private m_bg:egret.Bitmap;
	private m_imgArr = new Array<egret.Bitmap>();
	private m_container:egret.Sprite;

	public constructor() {
		super();
		this.m_bg = DisplayUtil.createBitmapByName("car_png");
		this.addChild(this.m_bg);

		this.m_container = new egret.Sprite();
		this.addChildAt(this.m_container,0);
	}

	public reset(){
		for(let i=0; i<this.m_imgArr.length; i++){
			DisplayUtil.remove(this.m_imgArr[i]);
		}
		this.m_imgArr.length = 0;
	}

	public addItem(q:Question){
		let index = this.m_imgArr.length;
		if(index>=this.m_pos.length){
			return;
		}
		let img = DisplayUtil.createBitmapByName(q.image);
		DisplayUtil.setSize(img, 100, 100);
		img.x = this.m_pos[index][0];
		img.y = this.m_pos[index][1];
		this.m_container.addChild(img);
		this.m_imgArr.push(img);
	}
}