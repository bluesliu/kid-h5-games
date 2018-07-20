class TrainView extends egret.Sprite{

	private curFrame = 0;
	private bodys = new Array<Car>();
	private head:CarHead;
	static json:any;
	static json2:any;

	private m_rightCount = 0;

	public constructor() {
		super();
		TrainView.json = RES.getRes("trainMoveData_json");
		TrainView.json2 = RES.getRes("trainMoveData2_json");

		for(let i=0; i<10; i++){
			let car = new Car(9-i);
			car.beginFrame = i * 28;
			this.bodys.push(car);
			this.addChild(car);
		}

		this.head = new CarHead();
		this.addChild(this.head);

		this.onRender();
	}

	public stop(){
		this.head.mc.stop();
		for(let i=0; i<10; i++){
			this.bodys[i].mc.stop();
		}
	}

	public play(){
		this.head.mc.play(-1);
		for(let i=0; i<10; i++){
			this.bodys[i].mc.play(-1);
		}
	}

	public onRender(){
		for(let i=0; i<this.bodys.length; i++){
			let car = this.bodys[i];
			car.render(this.curFrame);
			this.head.render(this.curFrame);
		}
		
		this.curFrame += 1;
	}

	public get rightCount(){return this.m_rightCount;}
	public set rightCount(value:number){
		this.m_rightCount = value;
		for(let i=0; i<this.bodys.length; i++){
			if(this.bodys[i].index<value){
				this.bodys[i].box.visible = true;
			}else{
				this.bodys[i].box.visible = false;
			}
		}
	}

}

class CarHead extends egret.Sprite{
	public mc : egret.MovieClip;
	private tf:egret.TextField;

	public constructor() {
		super();
		this.mc = DisplayUtil.createMovieClipByName("carHead");
		this.mc.y = 150;
		this.mc.x = -30
		this.addChild(this.mc);
		this.mc.play(-1);
	}

	public render(frame:number){
		frame = (257+frame) % TrainView.json2.list.length;
		let obj = TrainView.json2.list[frame];
		this.x = obj.x;
		this.y = obj.y;
		this.rotation = obj.rotation;
	}
}

class Car extends egret.Sprite{
	public mc : egret.MovieClip;
	public beginFrame = 0;
	private tf:egret.TextField;
	public box:egret.Bitmap;
	public index = 0;
	public constructor(index:number) {
		super();
		this.mc = DisplayUtil.createMovieClipByName("carBody");
		this.addChild(this.mc);
		this.mc.play(-1);
		this.index = index;

		this.tf = new egret.TextField();
		this.tf.textColor = 0xF79BB3;
		this.tf.width = 66.5;
		this.tf.height = 31;
		this.tf.x = 10;
		this.tf.y = -101;
		this.tf.size = 40;
		this.tf.textAlign = egret.HorizontalAlign.CENTER;
		this.tf.text = String(index+1);
		this.addChild(this.tf);

		this.box = DisplayUtil.createBitmapByName("boxClose_png");
		DisplayUtil.setSize(this.box, 136, 129);
		this.addChildAt(this.box,0);
		this.box.x = -26;
		this.box.y = -193;
		this.box.visible = false;
	}

	public render(frame:number){
		frame = (this.beginFrame+frame) % TrainView.json.list.length;
		let obj = TrainView.json.list[frame];
		this.x = obj.x;
		this.y = obj.y;
		this.rotation = obj.rotation;
	}
}
