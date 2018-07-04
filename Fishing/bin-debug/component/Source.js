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
            this.images.push(bitmap);
        }
        for (var i = 0; i < Source.groups; i++) {
            var numArr = [];
            for (var j = 0; j < this.images.length; j++) {
                numArr.push(j);
            }
            this.questionList.push(this.getQuestion(i % this.images.length, numArr));
        }
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
        return arr2;
    };
    Source.reArrange = function () {
        this.questionList = [];
        for (var i = 0; i < Source.groups; i++) {
            var numArr = [];
            for (var j = 0; j < this.images.length; j++) {
                numArr.push(j);
            }
            this.questionList.push(this.getQuestion(i % this.images.length, numArr));
            //  egret.log(this.questionList[i]);
        }
    };
    Source.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    //初始化生成13组选择题
    Source.groups = 13;
    //每组题4个选项	
    Source.showNum = 4;
    //public static root:String="data/";
    Source.images = [];
    Source.questionList = [];
    return Source;
}());
__reflect(Source.prototype, "Source");
//# sourceMappingURL=Source.js.map