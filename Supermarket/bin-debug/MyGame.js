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
        return _super.call(this, assetsName, stageW, stageH) || this;
    }
    MyGame.prototype.run = function () {
        this.m_scene = new Scene();
        this.m_sceneLayer.addChild(this.m_scene);
        this.m_scene.addEventListener("DRAG", this.onDragScene, this);
        this.m_car = new Car();
        this.m_sceneLayer.addChild(this.m_car);
        this.m_car.x = 496;
        this.m_car.y = 676;
        this.m_role = new RoleView("role");
        this.m_sceneLayer.addChild(this.m_role);
        this.m_role.x = 373;
        this.m_role.y = 955;
        this.m_repeat = new EButton(this, "repeat_png", null, this.onRepeat);
        this.m_uiLayer.addChild(this.m_repeat);
        this.m_repeat.x = Game.instance.stageW - this.m_repeat.width - 50;
        this.m_repeat.y = Game.instance.stageH - this.m_repeat.height - 180;
        this.m_gameStartBox.show(true);
    };
    MyGame.prototype.onDragScene = function (e) {
        var p = e.data.point;
        var idx = e.data.index;
        if (this.m_car.hitTestPoint(p.x, p.y)) {
            var dragName = Game.instance.question.getQuestionAt(idx).name;
            var qName = Game.instance.question.curQuestion.name;
            if (dragName == qName) {
                //正确
                this.m_car.addItem(Game.instance.question.curQuestion);
                this.right();
            }
            else {
                //错误
                this.wrong();
            }
        }
    };
    //开始游戏
    MyGame.prototype.gamePlay = function () {
        this.m_car.reset();
        _super.prototype.gamePlay.call(this);
    };
    MyGame.prototype.onGameOver = function (isWin) {
        this.submit(isWin);
    };
    MyGame.prototype.onRepeat = function () {
        this.m_qSound.clear();
        this.m_qSound.playRes(this.m_question.curQuestion.audio);
    };
    return MyGame;
}(Game));
__reflect(MyGame.prototype, "MyGame");
//# sourceMappingURL=MyGame.js.map