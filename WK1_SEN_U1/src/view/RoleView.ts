// 角色

enum RoleState {
    idle,				//空闲
    happy,				//开心
	happy_mouth,
    sad,				//难过
	sad_mouth,
	celebrate,
	celebrate_mouth,
	fail
}


class RoleView extends egret.Sprite{

	private m_state:RoleState;
	private m_isChangeState:boolean;
	private m_roleIdle:egret.MovieClip;
	private m_roleHappy:egret.MovieClip;
	private m_roleSad:egret.MovieClip;
	private m_roleCelebrate:egret.MovieClip;
	private m_hand:egret.MovieClip;

	public constructor() {
		super();

		this.touchEnabled = false;
		this.touchChildren = false;

		this.m_hand = DisplayUtil.createMovieClipByName("hand");
		this.m_hand.gotoAndStop(5);
		this.addChild(this.m_hand);

		this.m_roleIdle = DisplayUtil.createMovieClipByName("role_idle");
		this.m_roleIdle.stop();
		this.addChild(this.m_roleIdle);
		
		this.m_roleHappy = DisplayUtil.createMovieClipByName("role_happy");
		this.m_roleHappy.stop();

		this.m_roleSad = DisplayUtil.createMovieClipByName("role_sad");
		this.m_roleSad.stop();

		this.m_roleCelebrate = DisplayUtil.createMovieClipByName("role_celebrate");
		this.m_roleCelebrate.stop();
	}

	public setHand(value:number){
		this.m_hand.gotoAndStop(value);
	}
	public getHand():number{
		return this.m_hand.currentFrame;
	}

	public set state(value:RoleState){
		this.m_isChangeState = this.m_state != value;
		this.m_state = value;

		//如果状态改变了，就动态调用状态方法
		if(this.m_isChangeState){
			this.m_isChangeState = false;
			this.reset();
			this[RoleState[this.m_state]]();	
		}
	}
	public get state(){
		return this.m_state;
	}

	private reset(){
		this.m_roleIdle.stop();
		DisplayUtil.remove(this.m_roleIdle);
		this.m_roleHappy.stop();
		DisplayUtil.remove(this.m_roleHappy);
		this.m_roleSad.stop();
		DisplayUtil.remove(this.m_roleSad);
		this.m_roleCelebrate.stop();
		DisplayUtil.remove(this.m_roleCelebrate);
		this.m_hand.visible = true;
	}

	// -------------------  以下是人物状态方法，方法名与枚举名保持一致 ----------------
	private idle(){
		this.addChild(this.m_roleIdle);
		this.m_roleIdle.gotoAndPlay(RoleState[RoleState.idle], -1);
	}

	private happy(){
		this.addChild(this.m_roleHappy);
		this.m_roleHappy.gotoAndStop(RoleState[RoleState.happy]);
	}

	private happy_mouth(){
		this.addChild(this.m_roleHappy);
		this.m_roleHappy.gotoAndPlay(RoleState[RoleState.happy_mouth], -1);
	}

	private sad(){
		this.addChild(this.m_roleSad);
		this.m_roleSad.gotoAndStop(RoleState[RoleState.sad]);
	}

	private sad_mouth(){
		this.addChild(this.m_roleSad);
		this.m_roleSad.gotoAndPlay(RoleState[RoleState.sad_mouth], -1);
	}

	private celebrate(){
		this.addChild(this.m_roleCelebrate);
		this.m_roleCelebrate.gotoAndStop(RoleState[RoleState.celebrate]);
		this.m_hand.visible = false;
	}

	private celebrate_mouth(){
		this.addChild(this.m_roleCelebrate);
		this.m_roleCelebrate.gotoAndPlay(RoleState[RoleState.celebrate_mouth], -1);
		this.m_hand.visible = false;
	}
	
	private fail(){
		this.addChild(this.m_roleSad);
		this.m_roleSad.gotoAndPlay(RoleState[RoleState.fail], -1);
		this.m_hand.visible = false;
	}
}