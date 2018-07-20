var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Question = (function () {
    function Question() {
    }
    Question.prototype.clone = function () {
        var q = new Question();
        q.name = this.name;
        q.image1 = this.image1;
        q.audio1 = this.audio1;
        q.image2 = this.image2;
        q.audio2 = this.audio2;
        return q;
    };
    return Question;
}());
__reflect(Question.prototype, "Question");
var QuestionUtil = (function () {
    function QuestionUtil() {
        this.m_historyList = new Array();
        this.m_curIndex = -1;
        this.m_size = 0;
    }
    QuestionUtil.prototype.init = function (assetsName, size) {
        if (size === void 0) { size = 0; }
        this.m_assetsName = assetsName;
        this.m_size = size;
        this.m_json = RES.getRes(assetsName + "_json");
        this.m_qList = new Array();
        for (var i = 0; i < this.m_json.list.length; i++) {
            var q = new Question();
            q.name = this.m_json.list[i].name;
            q.image1 = this.m_json.list[i].image1;
            q.audio1 = this.m_json.list[i].audio1;
            q.image2 = this.m_json.list[i].image2;
            q.audio2 = this.m_json.list[i].audio2;
            this.m_qList.push(q);
        }
        this.newGroup();
    };
    //生成一组新题目
    QuestionUtil.prototype.newGroup = function () {
        var arr = this.m_qList.concat();
        ArrayUtil.randomSort(arr);
        //防止收尾相同
        while (this.m_historyList.length > 0
            && this.m_historyList[this.m_historyList.length - 1].name == arr[0].name) {
            ArrayUtil.randomSort(arr);
        }
        var size = Math.min(this.m_size, arr.length);
        if (size == 0) {
            size = arr.length;
        }
        for (var i = 0; i < size; i++) {
            var q = arr[i].clone();
            q.index = this.m_historyList.length;
            this.m_historyList.push(q);
        }
    };
    QuestionUtil.prototype.reset = function () {
        this.m_curIndex = -1;
        this.m_historyList.length = 0;
        this.newGroup();
    };
    Object.defineProperty(QuestionUtil.prototype, "newQuestion", {
        get: function () {
            var index = this.m_curIndex + 1;
            var q = this.m_historyList[index];
            if (q == null || q == undefined) {
                this.newGroup();
                q = this.m_historyList[index];
            }
            this.m_curIndex = index;
            return q;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionUtil.prototype, "curQuestion", {
        get: function () {
            var index = Math.max(this.m_curIndex, 0);
            return this.m_historyList[index];
        },
        enumerable: true,
        configurable: true
    });
    QuestionUtil.prototype.getQuestionAt = function (index) {
        return this.m_qList[index];
    };
    Object.defineProperty(QuestionUtil.prototype, "$qList", {
        get: function () { return this.m_qList; },
        enumerable: true,
        configurable: true
    });
    return QuestionUtil;
}());
__reflect(QuestionUtil.prototype, "QuestionUtil");
//# sourceMappingURL=QuestionUtil.js.map