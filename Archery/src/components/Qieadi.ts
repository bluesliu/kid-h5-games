class Qieadi extends egret.Sprite {

	public constructor() {
		super();
		this.initContent();
	}

	private initContent()
	{

		    
        let qwd0 = Source.createBitmapByName("archery_4_png");
	    //  let qwd1= this.createBitmapByName("success_0_png");
        //  let qwd2= this.createBitmapByName("fail_1_png");
        //  let qwd3= this.createBitmapByName("qwd2_png");
        //  let qwd4= this.createBitmapByName("qwd3_png");
        this.addChild(qwd0);


        // this.addChild(qwd1);
        // qwd1.x=45;
        // qwd1.y=-66;
        //  this.addChild(qwd1);
		//  qwd1.visible=false;
        // qwd1.x=45;
        // qwd1.y=-66;
        //  this.addChild(qwd2);
		//   qwd2.visible=false;
        // qwd2.x=87;
        // qwd2.y=-77;

        //   this.addChild(qwd3);
        // qwd3.visible=false;
        // qwd3.y=6;

        //  this.addChild(qwd4);
        //   qwd4.visible=false;
        // qwd4.x=-19;
        // qwd4.y=8;
	}

	public gotoAndStop(id:number)
	{
		  for(var i:number=0;i<this.numChildren;i++)
        {
            this.getChildAt(i).visible=false;
        }
		 this.getChildAt(id).visible=true;
	}

	
}