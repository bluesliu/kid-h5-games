//Event:  SHOT_END

class BallManager extends egret.EventDispatcher{
	public ball:BallView;
	private state = 0;				//0居中不动 1左右移动 2投球

	public constructor() {
		super();
		this.ball = new BallView();
		Game.instance.sceneLayer.addChild(this.ball);
		
		this.reset();
	}

	public onRender(){
		if(this.state == 0){
			return;
		}

		if(this.state == 1){
			this.ball.x += this.ball.speedX;
			if(this.ball.x < 370){
				this.ball.x = 370;
				this.ball.speedX *= -1;
			}
			else if(this.ball.x > 1235){
				this.ball.x = 1235;
				this.ball.speedX *= -1;
			}
		}
		else if(this.state == 2){
			this.ball.y += this.ball.speedY;
			if(this.ball.y < 402){
				this.ball.y = 402;
				this.dispatchEvent(new egret.Event("SHOT_END"));
			}else{
				this.ball.rotation += 10;
			}
		}
		DisplayUtil.setScale(this.ball, 0.71 + (this.ball.y-402) / (777-402) * 0.29);
	}

	public reset(){
		this.state = 0;
		this.ball.x = Game.instance.stageW/2;
		this.ball.y = 777;
		this.ball.speedX = 0;
		this.ball.speedY = 0;
		this.ball.rotation = 0;
	}

	public moveLeftAndRight(){
		this.reset()
		this.ball.speedX = -5;
		this.state = 1;
		this.ball.touchEnabled = true;
		this.ball.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapBall, this);
	}

	private shot(){
		this.ball.speedX = 0;
		this.ball.speedY = -10;
		this.state = 2;
		this.ball.touchEnabled = false;
		this.ball.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapBall, this);
	}

	private onTapBall(e:egret.TouchEvent){
		this.shot();
	}
}

class BallView extends egret.Sprite{
	private bg:egret.Bitmap;
	public speedX = 0;
	public speedY = 0;
	public constructor(){
		super();
		this.bg = DisplayUtil.createBitmapByName("ball_png");
		this.addChild(this.bg);
		this.bg.x = - this.bg.width/2;
		this.bg.y = - this.bg.height/2;
	}

	//答错 抖动
	public wrong(){
		EffectUtils.shakeObj(this, ()=>{
			EffectUtils.shakeObj(this,null);
		});
	}
}