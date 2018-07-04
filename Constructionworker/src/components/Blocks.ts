class Blocks extends egret.Sprite {
   
   private _bg:egret.Bitmap;
    public constructor() {
        super();
        this.createView();
    }

	private createView()
	{
		this._bg = Source.createBitmapByName("jzgr_7_png");
        this.addChild(this._bg);

        let block1 = Source.createBitmapByName("jzgr_16_png");
        this.addChild(block1);
        block1.name="block_1";
        block1.x=2.5;
        block1.y=234;
        // block1.anchorOffsetX=0;

          let block2 = Source.createBitmapByName("jzgr_17_png");
        this.addChild(block2);
        block2.name="block_2";
        block2.x=138.85;
        block2.y=354;

          let block3 = Source.createBitmapByName("jzgr_14_png");
        this.addChild(block3);
        block3.name="block_3";
        block3.x=473;
        block3.y=355;

         let block4 = Source.createBitmapByName("jzgr_10_png");
        
        block4.name="block_4";
        block4.x=633.5;
        block4.y=247;

        let block5 = Source.createBitmapByName("jzgr_13_png");
        this.addChild(block5);
        block5.name="block_5";
        block5.x=137;
        block5.y=287.5;

        let block6 = Source.createBitmapByName("jzgr_15_png");
        this.addChild(block6);
        block6.name="block_6";
        block6.x=2.5;
        block6.y=198.5;

        let block7 = Source.createBitmapByName("jzgr_11_png");
        this.addChild(block7);
        block7.name="block_7";
        block7.x=137;
        block7.y=192.35;

         let block8 = Source.createBitmapByName("jzgr_12_png");
        this.addChild(block8);
        block8.name="block_8";
        block8.x=473.5;
        block8.y=193.5;

        let block9 = Source.createBitmapByName("jzgr_9_png");
       
        block9.name="block_9";
        block9.x=633.5;
        block9.y=213;

        let block10 = Source.createBitmapByName("jzgr_8_png");
        this.addChild(block10);
        block10.name="block_10";
        block10.x=136;

        this.addChild(block4);
         this.addChild(block9);

         this.reset();
        //  this.showBlock(2);
	}

    public reset()
    {
        for(let i:number=1;i<11;i++)
        {
            (this.getChildByName("block_"+i)as egret.Bitmap).visible=false;
        }
         this._bg.visible=true; 
    }

     public showBlock(id:number)
    {
       (this.getChildByName("block_"+id)as egret.Bitmap).visible=true;
    }

    public hideBg()
    {
        this._bg.visible=false; 
    }
}