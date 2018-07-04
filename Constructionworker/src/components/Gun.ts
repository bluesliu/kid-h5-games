
class Gun extends egret.Sprite {
    private _barrel:egret.Bitmap;
    private _barrel_sp:egret.Sprite;
    public constructor() {
        super();
        this.createView();
    }

    private textField:egret.TextField;

    private createView():void {

        let base0= this.createBitmapByName("炮弹底座下_png");
        this.addChild(base0);
        base0.anchorOffsetX = 12.95;
        base0.anchorOffsetY = -169.65;

        this._barrel_sp=new egret.Sprite();
        this.addChild(this._barrel_sp);
        this._barrel_sp.x=74;
        this._barrel_sp.y=198;

        this._barrel = this.createBitmapByName("大炮_png");
        this._barrel_sp.addChild(this._barrel);
        // this._barrel.x=74;
        // this._barrel.y=198;
        this._barrel.anchorOffsetX = 74;
        this._barrel.anchorOffsetY = 198;



        let base1= this.createBitmapByName("炮弹底座上_png");
        this.addChild(base1);
        base1.anchorOffsetX = -22.05;
        base1.anchorOffsetY = -180.25;

        
        let huohua= this.createBitmapByName("炮弹火花_png");
         this._barrel_sp.addChild(huohua);
         huohua.name="huohua";
         huohua.visible=false;
           huohua.x = -70;
             huohua.y = -290;
        // base1.anchorOffsetX = -22.05;
        // base1.anchorOffsetY = -180.25;

    }

    public setRotate(num:number)
    {
        //this._barrel.rotation=90+num;
        egret.Tween.get(this._barrel_sp).to( {rotation:90+num},300 );
    }

    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private createDisobj(array: Array<egret.DisplayObject>): egret.Sprite {
        let result = new egret.Sprite();
        for(var i:number=0;i<array.length;i++)
        {
            result.addChild(array[i])
        }
        return result;
    }

    public showHuohua()
    {
         this._barrel_sp.getChildByName("huohua").visible=true;
        setTimeout(()=>{this._barrel_sp.getChildByName("huohua").visible=false;},200)
    }
}
