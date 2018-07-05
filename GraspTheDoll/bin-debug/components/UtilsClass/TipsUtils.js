/**
  * tips特效汇总
  * by zhaoxin
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * TipsUtils.showTipsDownToUp()
  */
var TipsUtils;
(function (TipsUtils) {
    //从下到上弹出
    function showTipsDownToUp(str, isWarning) {
        if (str === void 0) { str = ""; }
        if (isWarning === void 0) { isWarning = false; }
        var effectTips = new egret.TextField();
        effectTips.size = 24;
        effectTips.y = PublicTool.stageHeight / 2;
        if (isWarning) {
            effectTips.textColor = PublicTool.TextColors.red;
        }
        else {
            effectTips.textColor = PublicTool.TextColors.green;
        }
        effectTips.alpha = 0;
        effectTips.text = str;
        effectTips.strokeColor = 0x000000;
        effectTips.x = PublicTool.stageWidth / 2 - effectTips.width / 2;
        effectTips.stroke = 2;
        effectTips.bold = true;
        effectTips.textAlign = egret.HorizontalAlign.CENTER;
        if (!PublicTool.topSP.contains(effectTips)) {
            PublicTool.topSP.addChild(effectTips);
        }
        var onComplete2 = function () {
            if (PublicTool.topSP.contains(effectTips)) {
                PublicTool.topSP.removeChild(effectTips);
                effectTips = null;
            }
        };
        var onComplete1 = function () {
            egret.Tween.get(effectTips).to({ alpha: 0 }, 500).call(onComplete2, this);
        };
        effectTips.visible = true;
        egret.Tween.get(effectTips).to({ y: effectTips.y - 120, alpha: 1 }, 800, egret.Ease.backOut).call(onComplete1, this);
    }
    TipsUtils.showTipsDownToUp = showTipsDownToUp;
    //从左至右 或者 从右至左
    function showTipsLeftOrRight(str, isWarning, isFromeLeft) {
        if (str === void 0) { str = ""; }
        if (isWarning === void 0) { isWarning = false; }
        if (isFromeLeft === void 0) { isFromeLeft = true; }
        var effectTips = new egret.TextField();
        effectTips.size = 24;
        effectTips.y = PublicTool.stageHeight / 2;
        if (isWarning) {
            effectTips.textColor = PublicTool.TextColors.red;
        }
        else {
            effectTips.textColor = PublicTool.TextColors.green;
        }
        effectTips.alpha = 0;
        effectTips.text = str;
        effectTips.strokeColor = 0x000000;
        if (isFromeLeft) {
            effectTips.x = -effectTips.width;
        }
        else {
            effectTips.x = PublicTool.stageWidth;
        }
        effectTips.stroke = 2;
        effectTips.bold = true;
        effectTips.textAlign = egret.HorizontalAlign.CENTER;
        if (!PublicTool.topSP.contains(effectTips)) {
            PublicTool.topSP.addChild(effectTips);
        }
        if (isFromeLeft) {
            egret.Tween.get(effectTips).to({ x: PublicTool.stageWidth / 2 - effectTips.width / 2 - 50, alpha: 1 }, 300, egret.Ease.sineInOut);
        }
        else {
            egret.Tween.get(effectTips).to({ x: PublicTool.stageWidth / 2 - effectTips.width / 2 + 50, alpha: 1 }, 300, egret.Ease.sineInOut);
        }
        egret.setTimeout(function () {
            if (isFromeLeft) {
                egret.Tween.get(effectTips).to({ x: effectTips.x + 100 }, 500);
            }
            else {
                egret.Tween.get(effectTips).to({ x: effectTips.x - 100 }, 500);
            }
        }, this, 300);
        egret.setTimeout(function () {
            if (isFromeLeft) {
                egret.Tween.get(effectTips).to({ x: PublicTool.stageWidth }, 300, egret.Ease.sineIn);
            }
            else {
                egret.Tween.get(effectTips).to({ x: -effectTips.width }, 300, egret.Ease.sineIn);
            }
        }, this, 800);
        egret.setTimeout(function () {
            if (PublicTool.topSP.contains(effectTips)) {
                PublicTool.topSP.removeChild(effectTips);
                effectTips = null;
            }
        }, this, 1100);
    }
    TipsUtils.showTipsLeftOrRight = showTipsLeftOrRight;
    //从里到外
    function showTipsFromCenter(str, isWarning) {
        if (str === void 0) { str = ""; }
        if (isWarning === void 0) { isWarning = false; }
        var effectTips = new egret.TextField();
        effectTips.size = 44;
        effectTips.y = PublicTool.stageHeight / 2 - 150;
        if (isWarning) {
            effectTips.textColor = PublicTool.TextColors.white;
        }
        else {
            effectTips.textColor = PublicTool.TextColors.golden;
        }
        effectTips.alpha = 0;
        effectTips.text = str;
        effectTips.strokeColor = 0x000000;
        effectTips.x = PublicTool.stageWidth / 2;
        effectTips.stroke = 2;
        effectTips.bold = true;
        effectTips.textAlign = egret.HorizontalAlign.CENTER;
        if (!PublicTool.topSP.contains(effectTips)) {
            PublicTool.topSP.addChild(effectTips);
        }
        effectTips.anchorOffsetX = effectTips.width / 2;
        effectTips.anchorOffsetY = effectTips.height / 2;
        effectTips.scaleX = 0;
        effectTips.scaleY = 0;
        var onComplete2 = function () {
            if (PublicTool.topSP.contains(effectTips)) {
                PublicTool.topSP.removeChild(effectTips);
                effectTips = null;
            }
        };
        egret.Tween.get(effectTips).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200);
        egret.setTimeout(function () {
            egret.Tween.get(effectTips).to({ alpha: 0 }, 500).call(onComplete2, this);
        }, this, 1000);
    }
    TipsUtils.showTipsFromCenter = showTipsFromCenter;
    //从外到里
    function showTipsBigToSmall(str, isWarning) {
        if (str === void 0) { str = ""; }
        if (isWarning === void 0) { isWarning = false; }
        var effectTips = new egret.TextField();
        effectTips.size = 24;
        effectTips.y = PublicTool.stageHeight / 2;
        if (isWarning) {
            effectTips.textColor = PublicTool.TextColors.red;
        }
        else {
            effectTips.textColor = PublicTool.TextColors.green;
        }
        effectTips.alpha = 0;
        effectTips.text = str;
        effectTips.strokeColor = 0x000000;
        effectTips.x = PublicTool.stageWidth / 2;
        effectTips.stroke = 2;
        effectTips.bold = true;
        effectTips.textAlign = egret.HorizontalAlign.CENTER;
        if (!PublicTool.topSP.contains(effectTips)) {
            PublicTool.topSP.addChild(effectTips);
        }
        effectTips.anchorOffsetX = effectTips.width / 2;
        effectTips.anchorOffsetY = effectTips.height / 2;
        effectTips.scaleX = 4;
        effectTips.scaleY = 4;
        var onComplete2 = function () {
            if (PublicTool.topSP.contains(effectTips)) {
                PublicTool.topSP.removeChild(effectTips);
                effectTips = null;
            }
        };
        egret.Tween.get(effectTips).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200);
        egret.setTimeout(function () {
            egret.Tween.get(effectTips).to({ alpha: 0 }, 500).call(onComplete2, this);
        }, this, 1000);
    }
    TipsUtils.showTipsBigToSmall = showTipsBigToSmall;
})(TipsUtils || (TipsUtils = {}));
//# sourceMappingURL=TipsUtils.js.map