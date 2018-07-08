//游戏场景
class GameScene extends egret.Sprite{

	private m_bg:egret.Bitmap;							//背景
	private m_lamp:egret.MovieClip;
	private m_paopaoArr:Array<egret.MovieClip>;
	private m_paopaoPos = [new egret.Point(399,454), new egret.Point(779,198), new egret.Point(1239,410), 
						   new egret.Point(1673,218), new egret.Point(703,815), new egret.Point(1501,859)];
	private m_black:egret.Sprite;

	public constructor() {
		super();

		//背景
		this.m_bg = DisplayUtil.createBitmapByName("scene_jpg");
        this.addChild(this.m_bg);

		this.m_lamp = DisplayUtil.createMovieClipByName("lamp");
		DisplayUtil.setSize(this.m_lamp, 1838, 207);
		this.m_lamp.x = 24;
		this.m_lamp.y = 112;

		this.m_paopaoArr = new Array<egret.MovieClip>();

		this.m_black = new egret.Sprite();
		this.m_black.graphics.beginFill(0x333333);
		this.m_black.graphics.drawRect(0,0,1920,1080);
		this.m_black.graphics.endFill();
	}

	public showLamp(){
		this.reset();

		this.addChild(this.m_lamp);
		this.m_lamp.gotoAndPlay("flash", -1);

		for(let i=0; i<this.m_paopaoPos.length; i++){
			let paopao = DisplayUtil.createMovieClipByName("paopao");
			paopao.x = this.m_paopaoPos[i].x;
			paopao.y = this.m_paopaoPos[i].y;
			paopao.scaleX = paopao.scaleY = MathUtil.random(0.5,1.5,0.1);
			this.m_paopaoArr.push(paopao);
			this.addChild(paopao);

			egret.Tween.get(paopao).wait(MathUtil.random(0,1000,100)).call(()=>{
				let color = MathUtil.random(1,2,1);
				paopao.gotoAndPlay("color"+color, -1);
			},this);
		}
	}

	public black(){
		this.reset();
		this.addChild(this.m_black);
	}
	
	public reset(){
		DisplayUtil.remove(this.m_lamp);
		this.m_lamp.stop();
		for(let i=0; i<this.m_paopaoArr.length; i++){
			let paopao = this.m_paopaoArr[i];
			paopao.stop();
			DisplayUtil.remove(paopao);
			egret.Tween.removeTweens(paopao);
		}
		this.m_paopaoArr.length = 0;
		DisplayUtil.remove(this.m_black);
	}
}