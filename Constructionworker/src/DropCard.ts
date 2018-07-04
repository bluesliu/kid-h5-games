class DropCard extends egret.Sprite {
    public count:any=3;
    private _topMask:egret.Shape;
    public constructor() {
        super();
        this.createView();
    }

    

    private createView():void {

      let yellow_box= this.createBitmapByName("yellow_box_png");
     let violet_box= this.createBitmapByName("violet_box_png");
     let blue_box= this.createBitmapByName("blue_box_png");
     let red_box= this.createBitmapByName("red_box_png");
     
         this.addChildCenter(yellow_box);
         this.addChildCenter(violet_box);
         this.addChildCenter(blue_box);
         this.addChildCenter(red_box);

         
    }

    public addChildCenter(bmp:egret.Bitmap):void {
       bmp.anchorOffsetX = bmp.width/2;
       bmp.anchorOffsetY = bmp.height/2;
        this.addChild(bmp);
    }

    public setType(id:any=0):void {
        
         for(var i:number=0;i<this.numChildren;i++)
        {
            this.getChildAt(i).visible=false;
        }
        this.getChildAt(id).visible=true;
    }

     public add(bmp:egret.Bitmap):void {
        while(this.numChildren>4)
        {
            this.removeChildAt(4);
        }
         bmp.anchorOffsetX = bmp.width/2;
       bmp.anchorOffsetY = bmp.height/2;
        this.addChild(bmp);
    }

    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    // private createDisobj(array: Array<egret.DisplayObject>): egret.Sprite {
    //     let result = new egret.Sprite();
    //     for(var i:number=0;i<array.length;i++)
    //     {
    //         result.addChild(array[i])
    //     }
    //     return result;
    // }
}
