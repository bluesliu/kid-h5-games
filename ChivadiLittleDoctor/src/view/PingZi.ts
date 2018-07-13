class PingZi extends egret.Sprite{
	private m_pingZi123:egret.MovieClip;
	private m_pingZi4:egret.MovieClip;
	private m_pingZi5:egret.MovieClip;
	private m_pingZi6:egret.MovieClip;
	private m_jiuJingDeng:egret.MovieClip;
	private m_shaoBei:egret.MovieClip;
	private m_rightEff:egret.MovieClip;
	private m_wrongEff:egret.MovieClip;

	public constructor() {
		super();
		
		this.m_pingZi123 = DisplayUtil.createMovieClipByName("pingZi123");
		this.addChild(this.m_pingZi123);
		this.m_pingZi123.x = 0;
		
		this.m_pingZi4 = DisplayUtil.createMovieClipByName("pingZi4");
		this.addChild(this.m_pingZi4);
		this.m_pingZi4.x = 240;

		this.m_pingZi5 = DisplayUtil.createMovieClipByName("pingZi5");
		this.addChild(this.m_pingZi5);
		this.m_pingZi5.x = 384;

		this.m_pingZi6 = DisplayUtil.createMovieClipByName("pingZi6");
		this.addChild(this.m_pingZi6);
		this.m_pingZi6.x = 506;

		this.m_jiuJingDeng = DisplayUtil.createMovieClipByName("jiuJingDeng");
		this.addChild(this.m_jiuJingDeng);
		this.m_jiuJingDeng.x = 641;
		this.m_jiuJingDeng.play(-1);

		this.m_shaoBei = DisplayUtil.createMovieClipByName("shaoBei");
		//this.addChild(this.m_shaoBei);
		this.m_shaoBei.x = 641;

		this.m_rightEff = DisplayUtil.createMovieClipByName("rightEff");
		this.m_rightEff.x = 641;

		this.m_wrongEff = DisplayUtil.createMovieClipByName("wrongEff");
		this.m_wrongEff.x = 641;
	}

	public reset(){
		this.m_pingZi123.gotoAndStop("idle");
		this.m_pingZi4.gotoAndStop("idle");
		this.m_pingZi5.gotoAndStop("idle");
		this.m_pingZi6.gotoAndStop("idle");
		DisplayUtil.remove(this.m_shaoBei);
		DisplayUtil.remove(this.m_rightEff);
		DisplayUtil.remove(this.m_wrongEff);
	}

	public setPingZi(value:number){
		this.reset();
		let pingZi:egret.MovieClip;
		if(value>=1 && value<=3){
			pingZi = this.m_pingZi123;
		}
		else if(value==4){
			pingZi = this.m_pingZi4;
		}
		else if(value==5){
			pingZi = this.m_pingZi5;
		}
		else if(value==6){
			pingZi = this.m_pingZi6;
		}
		pingZi.gotoAndStop("state"+value);

		this.addChildAt(this.m_shaoBei,0);
		this.m_shaoBei.gotoAndStop("state"+value);
	}

	public showRightEff(){
		this.addChildAt(this.m_rightEff,0);
		this.m_rightEff.play(-1);
		DisplayUtil.remove(this.m_wrongEff);
	}

	public showWrongEff(){
		this.addChild(this.m_wrongEff);
		this.m_wrongEff.play(1);
		DisplayUtil.remove(this.m_rightEff);
	}
}