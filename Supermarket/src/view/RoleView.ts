// 角色

enum RoleState {
    idle,				//空闲

}


class RoleView extends egret.Sprite{
	private m_roleName:string;
	private m_state:RoleState;
	private m_isChangeState:boolean;
	private m_role:egret.MovieClip;
	private m_sound = new SoundPlayer();

	public constructor(roleName:string) {
		super();

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
		
	}


	// -------------------  以下是人物状态方法，方法名与枚举名保持一致 ----------------
	private idle(){
		this.m_role.gotoAndPlay(RoleState[RoleState.idle], -1);
	}

}