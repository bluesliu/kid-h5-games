class CardView extends egret.Sprite{

	private m_content:egret.Bitmap;
	private m_shake:egret.Bitmap;

	public id:number;
	public image:string;
	public audio:string;
	public cardName:string;
	private m_data:any;
	
	public constructor(data:any) {
		super();
		this.m_data = data;
		this.image = data.image;
		this.audio = data.audio;
		this.cardName = data.name;

		this.m_content = DisplayUtil.createBitmapByName(this.image);
		this.m_content.x = -this.m_content.width/2;
		this.m_content.y = -this.m_content.height/2;
		this.addChild(this.m_content);

		this.m_shake= DisplayUtil.createBitmapByName("shake_png");
		this.m_shake.scaleX = this.m_shake.scaleY = 2;
		this.m_shake.x = -this.m_shake.width/2 - 150;
		this.m_shake.y = -this.m_shake.height/2 - 100;
		//this.addChild(this.m_shake);
		//this.m_shake.visible = false;
	}


	//答错 抖动
	public wrong(){
		this.addChild(this.m_shake);
		EffectUtils.shakeObj(this, ()=>{
			EffectUtils.shakeObj(this,null);
			DisplayUtil.remove(this.m_shake);
		});
	}

	public get data():any{return this.m_data;}

}