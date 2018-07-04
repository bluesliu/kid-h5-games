class Box extends egret.Sprite {
    public constructor() {
        super();
        this.createView();
    }

    private createView():void 
	{
		let box = Source.createBitmapByName("jzgr_1_png");
        this.addChild(box);
		box.smoothing=true;
        box.anchorOffsetX=box.width/2;
		box.anchorOffsetY=box.height/2;
	}

	public addContent(bmp:egret.Bitmap):void 
	{
		var scale:number=Math.min(208/bmp.width*0.8,209/bmp.height*0.8);
		bmp.scaleX=bmp.scaleY=scale;
        this.addChild(bmp);
        bmp.anchorOffsetX=bmp.width/2;
		bmp.anchorOffsetY=bmp.height/2;
	}
}