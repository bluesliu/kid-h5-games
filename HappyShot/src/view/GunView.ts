//水枪

class GunView extends egret.Sprite{
	private mc:egret.MovieClip;
	public speed = 0;

	public constructor() {
		super();
		this.mc = DisplayUtil.createMovieClipByName("gun");
		this.mc.gotoAndStop("idle");
		this.addChild(this.mc);
	}

	//播放开枪效果
	public shot(callback:Function, thisObj:any){
		this.mc.gotoAndPlay("shot", 1);
		this.mc.once(egret.MovieClipEvent.COMPLETE, ()=>{
			this.mc.gotoAndStop("idle");
			if(callback!=null){
				callback.call(thisObj);
			}
		}, this);
	}
	
}