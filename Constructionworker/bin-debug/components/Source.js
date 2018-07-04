var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Source = (function () {
    function Source() {
    }
    Source.init = function () {
        var count = 0;
        var obj = RES.getRes(Main.sourceName + "_json");
        this.list = obj.items;
        for (var k = 0; k < obj.items.length; k++) {
            var imageName = obj.items[k].img;
            var bitmap = new egret.Bitmap(RES.getRes(imageName));
            var name_1 = obj.items[k].name;
            bitmap.name = name_1;
            bitmap.width = bitmap.height = 250;
            bitmap.anchorOffsetX = bitmap.width / 2;
            bitmap.anchorOffsetY = bitmap.height / 2;
            var box = new Box();
            //	let block = bmpArr[i]as egret.Bitmap;
            //	block.smoothing=true;
            box.addContent(bitmap);
            //box.mo
            box.name = "box_" + k;
            this.images.push(box);
        }
        for (var i = 0; i < Source.groups; i++) {
            var numArr = [];
            for (var j = 0; j < this.images.length; j++) {
                numArr.push(j);
            }
            this.questionList.push(this.getQuestion(i % this.images.length, numArr));
        }
        egret.log(this.questionList);
    };
    // public static init(compFunc: Function)
    // {
    // 	this.audios.push("assets/audio/绿色圆柱.mp3");
    // 	this.audios.push("assets/audio/红色小矩形.mp3");
    // 	this.audios.push("assets/audio/橙色小矩形.mp3");
    // 	this.audios.push("assets/audio/紫色圆柱.mp3");
    // 	this.audios.push("assets/audio/黄色长矩形.mp3");
    // 	this.audios.push("assets/audio/黄色三角形.mp3");
    // 	this.audios.push("assets/audio/紫色矩形.mp3");
    // 	this.audios.push("assets/audio/红色矩形.mp3");
    // 	this.audios.push("assets/audio/橙色三角形.mp3");
    // 	this.audios.push("assets/audio/绿色三角形.mp3");
    // 	let bmpArr=[];
    // 	let block1 = Source.createBitmapByName("jzgr_16_png");
    // 	let block2 = Source.createBitmapByName("jzgr_17_png");
    // 	let block3 = Source.createBitmapByName("jzgr_14_png");
    // 	let block4 = Source.createBitmapByName("jzgr_10_png");
    // 	let block5 = Source.createBitmapByName("jzgr_13_png");
    // 	let block6 = Source.createBitmapByName("jzgr_15_png");
    // 	let block7 = Source.createBitmapByName("jzgr_11_png");
    // 	let block8 = Source.createBitmapByName("jzgr_12_png");
    // 	let block9 = Source.createBitmapByName("jzgr_9_png");
    // 	let block10 = Source.createBitmapByName("jzgr_8_png");
    // 	bmpArr.push(block1);
    // 	bmpArr.push(block2);
    // 	bmpArr.push(block3);
    // 	bmpArr.push(block4);
    // 	bmpArr.push(block5);
    // 	bmpArr.push(block6);
    // 	bmpArr.push(block7);
    // 	bmpArr.push(block8);
    // 	bmpArr.push(block9);
    // 	bmpArr.push(block10);
    // 	for(var i:number=0;i<bmpArr.length;i++)
    // 	{
    // let  box=new Box();
    // let block = bmpArr[i]as egret.Bitmap;
    // block.smoothing=true;
    // box.addContent(block);
    // //box.mo
    // box.name="box_"+i;
    // 		this.images.push(box);					
    // 	}
    // 							for(var i:number=0;i<this.images.length;i++)
    // 							{
    // 								var arr=[];
    // 								for (var j:number = 0; j <this.images.length; j++) 
    // 								{
    // 									arr.push(j);
    // 								}
    // 								this.questionList.push(this.getQuestion(i,arr));
    // 								  // egret.log(this.questionList[i]);
    // 							}
    // 	compFunc();
    // 							//console.log(this.questionList);
    // }
    Source.reArrange = function () {
        this.questionList = [];
        for (var i = 0; i < Source.groups; i++) {
            var bmpArr = [];
            for (var j = 0; j < this.images.length; j++) {
                bmpArr.push(j);
            }
            this.questionList.push(this.getQuestion(i % this.images.length, bmpArr));
            //  egret.log(this.questionList[i]);
        }
    };
    Source.getQuestion = function (id, arr) {
        var arr1 = [];
        arr1.push(arr[id]);
        arr.splice(id, 1);
        for (var i = 0; i < 2; i++) {
            var id_1 = Math.floor(Math.random() * (arr.length - i));
            if (id_1 < 0) {
                id_1 = 0;
            }
            arr1.push(arr[id_1]);
            arr.splice(id_1, 1);
        }
        var arr2 = [];
        for (var j = 0; j < 3; j++) {
            var id0 = Math.floor(Math.random() * (3 - j));
            if (id0 < 0) {
                id0 = 0;
            }
            arr2.push(arr1[id0]);
            arr1.splice(id0, 1);
        }
        return arr2;
    };
    Source.changeQusetion = function (index) {
        var bmpArr = [];
        for (var j = 0; j < this.images.length; j++) {
            bmpArr.push(j);
        }
        this.questionList[index] = [];
        this.questionList[index].push(bmpArr[index]);
        bmpArr.splice(index, 1);
        for (var i = 0; i < 2; i++) {
            var id = Math.floor(Math.random() * (bmpArr.length - i));
            if (id < 0) {
                id = 0;
            }
            this.questionList[index].push(bmpArr[id]);
            bmpArr.splice(id, 1);
        }
        var arr = [];
        for (var j_1 = 0; j_1 < 3; j_1++) {
            var id0 = Math.floor(Math.random() * (3 - j_1));
            if (id0 < 0) {
                id0 = 0;
            }
            arr.push(this.questionList[index][id0]);
            this.questionList[index].splice(id0, 1);
        }
        this.questionList[index] = arr;
    };
    Source.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.smoothing = true;
        return result;
    };
    //初始化生成13组选择题
    Source.groups = 13;
    //每组题4个选项	
    Source.showNum = 3;
    Source.root = "resource/";
    Source.images = [];
    Source.audios = [];
    Source.questionList = [];
    return Source;
}());
__reflect(Source.prototype, "Source");
//# sourceMappingURL=Source.js.map