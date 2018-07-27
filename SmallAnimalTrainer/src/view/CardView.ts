class CardView extends egret.Sprite{

	public bg:egret.Bitmap;
	private m_content:egret.Bitmap;
	
	public m_question:Question;

	public constructor(q:Question=null) {
		super();
		
		//图片
		this.m_content = new egret.Bitmap();
		this.addChild(this.m_content);

		this.question = q;
	}

	public get question():Question{return this.m_question;}
	public set question(value:Question){
		egret.Tween.removeTweens(this);
		egret.Tween.removeTweens(this.m_content);
		this.m_question = value;
		if(this.m_question != null){
			this.m_content.texture = RES.getRes(this.m_question.image);
			DisplayUtil.setSize(this.m_content, 170, 170);
		}
	}


	//答错 抖动
	public wrong(){
		EffectUtils.shakeObj(this, ()=>{
			EffectUtils.shakeObj(this,null);
		});
	}

	public right(){
		EffectUtils.flyObj(this, 500);
	}


	public dispose(){
		egret.Tween.removeTweens(this);
		egret.Tween.removeTweens(this.m_content);
		this.question = null;
		this.m_content = null;
	}


	public get cardName(){return this.question.name;}
}