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
var MyGame = (function (_super) {
    __extends(MyGame, _super);
    function MyGame(assetsName, stageW, stageH) {
        var _this = _super.call(this, assetsName, stageW, stageH) || this;
        _this.m_area = new egret.Rectangle(127, 726, 512, 160);
        return _this;
    }
    MyGame.prototype.run = function () {
        this.m_scene = new Scene();
        this.m_sceneLayer.addChild(this.m_scene);
        this.m_yesItem = new DragItem("yes_png");
        this.m_sceneLayer.addChild(this.m_yesItem);
        this.m_yesItem.setPosition(756, 264);
        this.m_yesItem.addEventListener("DRAG_END", this.onDragEnd, this);
        this.m_noItem = new DragItem("no_png");
        this.m_sceneLayer.addChild(this.m_noItem);
        this.m_noItem.setPosition(756, 490);
        this.m_noItem.addEventListener("DRAG_END", this.onDragEnd, this);
        this.m_image = new egret.Bitmap();
        this.m_image.x = 163;
        this.m_image.y = 249;
        this.m_sceneLayer.addChild(this.m_image);
        this.m_repeat = new EButton(this, "repeat_png", null, this.onRepeat);
        this.m_uiLayer.addChild(this.m_repeat);
        this.m_repeat.x = Game.instance.stageW - this.m_repeat.width - 50;
        this.m_repeat.y = Game.instance.stageH - this.m_repeat.height - 80;
        this.m_gameStartBox.show(true);
    };
    //开始游戏
    MyGame.prototype.gamePlay = function () {
        _super.prototype.gamePlay.call(this);
    };
    MyGame.prototype.nextQuestion = function () {
        this.m_checking = false;
        var q = this.m_question.newQuestion;
        if (Math.random() > 0.5) {
            //正确
            this.m_soundQuestion = q.clone();
        }
        else {
            //错误  也有正确的几率
            var idx = MathUtil.random(0, 5, 1);
            this.m_soundQuestion = this.question.getQuestionAt(idx).clone();
        }
        this.onRepeat();
        this.m_checking = false;
        this.m_image.texture = RES.getRes(this.question.curQuestion.image);
        DisplayUtil.setSize(this.m_image, 430, 430);
    };
    MyGame.prototype.onDragEnd = function (e) {
        var _this = this;
        this.m_checking = true;
        var item = e.currentTarget;
        if (item.getTransformedBounds(this).intersects(this.m_area)) {
            //拖拽到指定区域了
            item.x = this.m_area.x;
            item.y = this.m_area.y;
            if (item == this.m_yesItem) {
                //拖拽的是yes
                if (this.m_soundQuestion.name == this.question.curQuestion.name) {
                    //正确
                    this.m_effSound.clear();
                    this.m_effSound.playRes("yes_mp3").exec(function () {
                        item.x = item.position.x;
                        item.y = item.position.y;
                        _this.right();
                    }, this);
                }
                else {
                    //错误
                    //还原位置
                    egret.Tween.get(item).to({ x: item.position.x, y: item.position.y }, 200).call(function () {
                        _this.wrong();
                    }, this);
                }
            }
            else {
                if (this.m_soundQuestion.name != this.question.curQuestion.name) {
                    //正确
                    this.m_effSound.clear();
                    this.m_effSound.playRes("no_mp3").exec(function () {
                        item.x = item.position.x;
                        item.y = item.position.y;
                        _this.right();
                    }, this);
                }
                else {
                    //错误
                    //还原位置
                    egret.Tween.get(item).to({ x: item.position.x, y: item.position.y }, 200).call(function () {
                        _this.wrong();
                    }, this);
                }
            }
        }
        else {
            //还原位置
            egret.Tween.get(item).to({ x: item.position.x, y: item.position.y }, 200).call(function () {
                _this.m_checking = false;
            }, this);
        }
    };
    //回答错误
    MyGame.prototype.wrong = function () {
        var _this = this;
        this.lifeCount -= 1;
        EffectUtils.shakeObj(this.m_image, null);
        this.m_effSound.clear();
        this.m_effSound.playRes("chacha_mp3").exec(function () {
            _this.m_checking = false;
            if (_this.lifeCount <= 0) {
                //游戏结束，失败
                _this.onGameOver(false);
            }
            else {
                _this.onRepeat();
            }
        }, this);
    };
    MyGame.prototype.onGameOver = function (isWin) {
        egret.Tween.removeTweens(this.m_yesItem);
        egret.Tween.removeTweens(this.m_noItem);
        this.m_qSound.clear();
        this.m_effSound.clear();
        this.submit(isWin);
    };
    MyGame.prototype.onRepeat = function () {
        this.m_qSound.clear();
        this.m_qSound.playRes(this.m_soundQuestion.audio);
    };
    return MyGame;
}(Game));
__reflect(MyGame.prototype, "MyGame");
//# sourceMappingURL=MyGame.js.map