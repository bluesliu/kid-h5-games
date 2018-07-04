var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Paopao = (function (_super) {
    __extends(Paopao, _super);
    function Paopao() {
        var _this = _super.call(this) || this;
        _this.initContent();
        return _this;
    }
    Paopao.prototype.initContent = function () {
        for (var i = 0; i < 10; i++) {
            var r = Math.round(Math.random() * 10) + 10;
            var paopao = Source.createBitmapByName("泡泡_png");
            this.addChild(paopao);
        }
        this.start();
    };
    Paopao.prototype.start = function () {
        for (var i = 0; i < this.numChildren; i++) {
            var paopao = this.getChildAt(i);
            paopao.alpha = 0;
            paopao.scaleX = paopao.scaleY = 0.6 + Math.random() * 4 * 0.1;
            paopao.x = Math.random() * 1266 + 100;
            paopao.y = Math.random() * 200 + 800;
            egret.Tween.get(paopao, { loop: true })
                .wait(Math.round(Math.random() * 10) * 1000)
                .to({ alpha: 1 }, 300)
                .to({ y: Math.random() * 100 + 350 }, 3000 + Math.round(Math.random() * 5) * 1000)
                .to({ alpha: 0 }, 300);
        }
    };
    Paopao.prototype.stop = function () {
        for (var i = 0; i < this.numChildren; i++) {
            var paopao = this.getChildAt(i);
            egret.Tween.removeTweens(paopao);
            // paopao.alpha=0;
            // paopao.x=Math.random()*1266+100;
            // paopao.y=Math.random()*200+800;
            // egret.Tween.get(paopao,{loop:true})
            // .wait(Math.round(Math.random()*10)*1000)
            // .to({alpha:1},300)
            // .to({y:Math.random()*100+100},5000+Math.round(Math.random()*5)*1000)
            // .to({alpha:0},300);
        }
    };
    return Paopao;
}(egret.Sprite));
__reflect(Paopao.prototype, "Paopao");
//# sourceMappingURL=Paopao.js.map