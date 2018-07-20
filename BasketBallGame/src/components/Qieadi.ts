class Qieadi extends egret.Sprite {

	public constructor() {
		super();
		this.initContent();
	}

	private initContent()
	{

		    
        let qwd1 = Source.createBitmapByName("qwd1_png");
	    
        let qwd2= Source.createBitmapByName("qwd2_png");
        let qwd3= Source.createBitmapByName("qwd3_png");
        this.addChild(qwd1);

         this.addChild(qwd2);
		  qwd2.visible=false;

          this.addChild(qwd3);
        qwd3.visible=false;
      

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
		 this.getChildAt(id-1).visible=true;
	}

	
}