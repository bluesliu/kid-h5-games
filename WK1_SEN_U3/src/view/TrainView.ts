//火车

class TrainView extends egret.Sprite{
	private m_windowPos = [[584.5,272.5],[883.5,273.5],[1184.5,273.5],[1485.5,273.5],[1786.5,273.5]];
	private m_windows = [];

	private m_sound:SoundPlayer;
	private m_locomotive:egret.Bitmap;	//火车头
	private m_wheel1:egret.Bitmap;		//轮子1
	private m_wheel2:egret.Bitmap;		//轮子2
	private m_smoke:egret.MovieClip;	//黑烟
	private m_chimney:egret.MovieClip;	//白烟
	private m_flash:egret.MovieClip;	//窗户闪烁

	private m_role:RoleView;

	public constructor() {
		super();
		this.m_sound = new SoundPlayer();

		//影子
		let shadow = DisplayUtil.createBitmapByName("shadow_png");
		shadow.x = 17;
		shadow.y = 458;
		this.addChild(shadow);
		//车头
		this.m_locomotive = DisplayUtil.createBitmapByName("train1_png");
		this.m_locomotive.x = 0;
		this.m_locomotive.y = 130;
		this.addChild(this.m_locomotive);
		//车尾
		let tail = DisplayUtil.createBitmapByName("train2_png");
		tail.x = 1033;
		tail.y = 130;
		this.addChild(tail);
		//前轮
		this.m_wheel1 = DisplayUtil.createBitmapByName("wheel_png");
		this.m_wheel1.x = 160;
		this.m_wheel1.y = 415;
		this.addChild(this.m_wheel1);
		//后轮
		this.m_wheel2 = DisplayUtil.createBitmapByName("wheel_png");
		this.m_wheel2.x = 288;
		this.m_wheel2.y = 415;
		this.addChild(this.m_wheel2);
		//其它轮子
		let wheel = DisplayUtil.createBitmapByName("wheels_png");
		wheel.x = 478;
		wheel.y = 415;
		this.addChild(wheel);
		//烟
		this.m_smoke = DisplayUtil.createMovieClipByName("smoke");
		this.m_smoke.stop();
		//蒸汽
		this.m_chimney = DisplayUtil.createMovieClipByName("chimney");
		this.m_chimney.stop();
		//窗户闪烁
		this.m_flash = DisplayUtil.createMovieClipByName("flash");
		this.m_flash.stop();
	}

	//坏掉了
	public bad(){
		this.reset();
		//两个轮子飞出去
		egret.Tween.get(this.m_wheel1).to({x:-80}, 400);
		egret.Tween.get(this.m_wheel2).wait(400).to({x:-80}, 600);
		//车头坏掉
		egret.Tween.get(this.m_locomotive).wait(1000).to({y:150}, 300);
		egret.Tween.get(this.m_role).wait(1000).to({y:2}, 300);
		//冒烟
		this.m_smoke.gotoAndPlay(2, -1);
		this.addChild(this.m_smoke);
		//故障音频
		this.m_sound.playRes("guzhang_mp3");
	}

	//进场景
	public goIn(callback:Function=null, thisObj:any=null){
		this.reset();
		this.x = 1920;
		egret.Tween.get(this).to({x:2}, 4000).call(()=>{
			this.m_sound.clear();
			this.m_chimney.stop();
			DisplayUtil.remove(this.m_chimney);
			if(callback!=null){
				callback.call(thisObj);
			}
		},this);
		this.m_chimney.gotoAndPlay(2,-1);
		this.addChild(this.m_chimney);
		//进入音频
		this.m_sound.playRes("goIn_mp3",0);
	}

	//出场景
	public goOut(callback:Function=null, thisObj:any=null){
		this.reset();
		this.x = 2;
		this.m_chimney.gotoAndPlay(2,-1);
		this.addChild(this.m_chimney);
		this.m_sound.playRes("wuwu_mp3");
		this.m_sound.exec(()=>{
			egret.Tween.get(this).to({x:-2120}, 5000).call(()=>{
				this.m_sound.clear();
				this.m_chimney.stop();
				DisplayUtil.remove(this.m_chimney);
				if(callback!=null){
					callback.call(thisObj);
				}
			},this);
		},this);
		this.m_sound.playRes("goIn_mp3",0);
	}

	//闪烁
	public flash(){
		this.reset();
		let index = this.m_windows.length;
		
		this.addChild(this.m_flash);
		this.m_flash.gotoAndPlay(2,-1);
		this.m_flash.x = this.m_windowPos[index][0];
		this.m_flash.y = this.m_windowPos[index][1];
	}

	//添加一个卡片
	public addCard(data:any)
	{
		this.reset();
		let index = this.m_windows.length;
		let card = new CardView(data);
		DisplayUtil.setSize(card, 184, 184);
		card.x = this.m_windowPos[index][0];
		card.y = this.m_windowPos[index][1];
		this.addChild(card);
		this.m_windows.push(card);
	}

	public addRole(role:RoleView)
	{
		role.y = -22;
		this.addChild(role);
		this.m_role = role;
	}

	public reset(){
		this.m_sound.clear();
		egret.Tween.removeTweens(this);
		egret.Tween.removeTweens(this.m_wheel1);
		egret.Tween.removeTweens(this.m_wheel2);
		egret.Tween.removeTweens(this.m_locomotive);
		this.m_wheel1.x = 160;
		this.m_wheel2.x = 288;
		this.m_locomotive.y = 130;
		DisplayUtil.remove(this.m_smoke);
		this.m_smoke.stop();
		DisplayUtil.remove(this.m_chimney);
		this.m_chimney.stop();
		DisplayUtil.remove(this.m_flash);
		this.m_flash.stop();
		this.m_role.y = -22;
	}

	public clear(){
		for(let i=0; i<this.m_windows.length; i++)
		{
			DisplayUtil.remove(this.m_windows[i]);
		}
		this.m_windows.length = 0;
	}
}