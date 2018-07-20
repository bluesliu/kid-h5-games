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
            var imageName = obj.items[k].image;
            var bitmap = new egret.Bitmap(RES.getRes(imageName));
            var name_1 = obj.items[k].name;
            bitmap.name = name_1;
            bitmap.width = bitmap.height = 190;
            // bitmap.anchorOffsetX = bitmap.width / 2;
            // bitmap.anchorOffsetY = bitmap.height / 2;
            this.images.push(bitmap);
        }
        Source.showNum = this.images.length;
        Source.reArrange();
    };
    Source.reArrange = function () {
        // this.questionList=[];
        // for(var i:number=0;i<Source.groups;i++)
        // {
        // 	var bmpArr=[];
        // 	for (var j:number = 0; j <this.images.length; j++) 
        // 	{
        // 		bmpArr.push(j);
        // 	}
        // 	this.questionList.push(this.getQuestion(i%this.images.length,bmpArr));
        // }	
        var last = -1;
        while (Source.questionList.length < Source.groups) {
            var arr = Source.randomIndex(Source.showNum);
            if (last > -1) {
                last = arr[arr.length - 1];
            }
            else {
                while (last == arr[0]) {
                    arr = Source.randomIndex(Source.showNum);
                }
                last = arr[arr.length - 1];
            }
            for (var i = 0; i < arr.length; i++) {
                Source.questionList.push(arr[i]);
            }
        }
        //egret.log(this.questionList);													
    };
    Source.getQuestion = function (id, arr) {
        var arr1 = [];
        arr1.push(arr[id]);
        arr.splice(id, 1);
        for (var i = 0; i < Source.showNum - 1; i++) {
            var id_1 = Math.floor(Math.random() * (arr.length - i));
            if (id_1 < 0) {
                id_1 = 0;
            }
            arr1.push(arr[id_1]);
            arr.splice(id_1, 1);
        }
        var arr2 = [];
        for (var j = 0; j < Source.showNum; j++) {
            var id0 = Math.floor(Math.random() * (Source.showNum - j));
            if (id0 < 0) {
                id0 = 0;
            }
            arr2.push(arr1[id0]);
            arr1.splice(id0, 1);
        }
        // egret.log("arr2:",arr2);
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
    Source.randomIndex = function (len) {
        var arr0 = [];
        for (var i = 0; i < len; i++) {
            arr0.push(i);
        }
        var arr1 = [];
        for (var j = 0; j < len; j++) {
            var id0 = Math.floor(Math.random() * (len - j));
            if (id0 < 0) {
                id0 = 0;
            }
            arr1.push(arr0[id0]);
            arr0.splice(id0, 1);
        }
        //trace(arr1);
        return arr1;
    };
    //初始化生成13组选择题
    Source.groups = 13;
    //每组题4个选项	
    Source.showNum = 4;
    //public static root:String="resource/";
    Source.images = [];
    //public static audios:String[]=[];
    Source.questionList = [];
    return Source;
}());
__reflect(Source.prototype, "Source");
//# sourceMappingURL=Source.js.map