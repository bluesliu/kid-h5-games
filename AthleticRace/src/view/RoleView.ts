// 角色

enum RoleState {
    idle,				//空闲
	run,
	jump
}

//events ： JUMP_END

class RoleView extends egret.Sprite{
	private m_roleName:string;
	private m_state:RoleState;
	private m_isChangeState:boolean;
	private m_role:egret.MovieClip;
	private m_shadow:egret.Sprite;
	private m_sound = new SoundPlayer();
	private m_jumpSpeed = 0;

	public constructor(roleName:string) {
		super();

		this.m_shadow = new egret.Sprite();
		this.m_shadow.graphics.beginFill(0x000000, 1);
		this.m_shadow.graphics.drawCircle(0,0,120);
		this.m_shadow.graphics.endFill();
		this.m_shadow.alpha = 0.5;
		this.addChild(this.m_shadow);
		this.m_shadow.scaleY = 0.5;

		this.m_roleName = roleName;
		let data = RES.getRes(roleName+"_json");
		let txtr = RES.getRes(roleName+"_png");
		let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
		this.m_role = new egret.MovieClip( mcFactory.generateMovieClipData( roleName ) );
		this.m_role.stop();
		this.addChild(this.m_role);
	}

	public set state(value:RoleState){
		this.m_isChangeState = this.m_state != value;
		this.m_state = value;

		//如果状态改变了，就动态调用状态方法
		if(this.m_isChangeState){
			this.m_sound.clear();
			this.m_isChangeState = false;
			this[RoleState[this.m_state]]();	
		}
	}
	public get state(){
		return this.m_state;
	}

	public onPlay(){
		this.m_role.play();
	}

	public onPause(){
		this.m_role.stop();
	}

	public onRender(){
		if(this.state == RoleState.jump){
			this.jumpRender();
		}
	}

	private jumpRender(){
		if(this.m_jumpSpeed==0){
			this.m_jumpSpeed = -10;
		}

		this.m_role.y += this.m_jumpSpeed;
		if(this.m_role.y < -300){
			//跳到了顶点
			this.m_role.y = -300;
			this.m_jumpSpeed = 10;
		}
		else if(this.m_role.y >= 0 && this.m_jumpSpeed > 0){
			//落地
			this.m_role.y = 0;
			this.m_jumpSpeed = 0;
			this.state = RoleState.run;
			this.dispatchEvent(new egret.Event("JUMP_END"));
		}

		if(this.m_jumpSpeed<0){
			this.m_shadow.alpha -= 0.02;
		}
		else if(this.m_jumpSpeed>0){
			this.m_shadow.alpha += 0.02;
		}
	}


	// -------------------  以下是人物状态方法，方法名与枚举名保持一致 ----------------
	private idle(){
		this.m_role.gotoAndStop(RoleState[RoleState.idle]);
	}

	private run(){
		this.m_role.gotoAndPlay(RoleState[RoleState.run], -1);
	}

	private jump(){
		this.m_role.gotoAndStop(RoleState[RoleState.jump]);
	}
}