class Boat extends egret.Sprite {
   
   private static LINEDEPTH:number=300; 
   public  line:egret.Sprite;
   private _hook:egret.Bitmap;
    public constructor() {
        super();
        this.initContent();
    }

	private initContent()
	{
		let boat = Source.createBitmapByName("buyu_7_png");
        this.addChild(boat);

        let face1_png = Source.createBitmapByName("face1_png");
        this.addChild(face1_png);
        face1_png.x=211.5;

        let face2_png = Source.createBitmapByName("face2_png");
        this.addChild(face2_png);
         face2_png.x=210.5;
          face2_png.y=4;
          face2_png.visible=false;

         let face3_png = Source.createBitmapByName("face3_png");
        this.addChild(face3_png);
           face3_png.x=208.5;
          face3_png.y=7;
          face3_png.visible=false;
      
	}

    public gotoAndStop(id:number)
	{
		  for(var i:number=1;i<this.numChildren;i++)
        {
            this.getChildAt(i).visible=false;
        }
		 this.getChildAt(id).visible=true;
	}

	
}