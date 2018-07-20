var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MathUtil = (function () {
    function MathUtil() {
    }
    /**
     * 将弧度转换成角度
     * @param radian	弧度
     * @return 角度
     */
    MathUtil.R2D = function (radian) {
        return radian * 180 / Math.PI;
    };
    /**
     * 将角度转换成弧度
     * @param degress		角度
     * @return  弧度
     */
    MathUtil.D2R = function (degress) {
        return degress * Math.PI / 180;
    };
    /**
     * 计算圆周运动
     * @param centerX		圆心的x坐标
     * @param centerY		圆心的y坐标
     * @param radius		圆的半径
     * @param angle		角度（弧度制）
     * @return  			返回一个对象{x,y}
     */
    MathUtil.circle = function (centerX, centerY, radius, angle) {
        var _x = centerX + Math.cos(angle) * radius;
        var _y = centerY + Math.sin(angle) * radius;
        return new egret.Point(_x, _y);
    };
    /**
     * 计算椭圆运动
     * @param centerX		圆心的x坐标
     * @param centerY		圆心的y坐标
     * @param radiusX		椭圆x半径
     * @param radiusY		椭圆y半径
     * @param angle		角度（弧度制）
     * @return 			返回一个对象{x,y}
     *
     */
    MathUtil.oval = function (centerX, centerY, radiusX, radiusY, angle) {
        var _x = centerX + Math.cos(angle) * radiusX;
        var _y = centerY + Math.sin(angle) * radiusY;
        return { x: _x, y: _y };
    };
    /**
     * 计算两点之间距离
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @return
     */
    MathUtil.distance = function (x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    };
    MathUtil.distanceByPoint = function (p1, p2) {
        return MathUtil.distance(p1.x, p1.y, p2.x, p2.y);
    };
    /**
     * 以ox，oy为原点，计算两个点的夹角，这个方法可以实行一个对象指向另一个对象
     * 比如想实现mc的角度一直指向鼠标：
     * mc.rotation = Trigonometry.getAngleBypoint(mc.x, mc.y, mouseX, mouseY);
     * @param ox	原点x
     * @param oy	原点y
     * @param px
     * @param py
     * @return 	一个角度
     *
     */
    MathUtil.getAngleByPoint = function (ox, oy, px, py) {
        return MathUtil.R2D(MathUtil.getRadianByPoint(ox, oy, px, py));
    };
    /**
     * 以ox，oy为原点，计算两个点的夹角（弧度）
     * @param ox	原点x
     * @param oy	原点y
     * @param px
     * @param py
     * @return 	一个弧度
     *
     */
    MathUtil.getRadianByPoint = function (ox, oy, px, py) {
        var dx = px - ox;
        var dy = py - oy;
        return Math.atan2(dy, dx);
    };
    /**
     * 获点到线的交点
     * @param p1	直线上的点
     * @param p2	直线上的点
     * @param p3	直线外的点
     * @return 	交点
     *
     */
    MathUtil.getPointToLineIntersect = function (p1, p2, p3) {
        var point = new egret.Point();
        //如果p1.x==p2.x 说明是条竖着的线
        if (p1.x - p2.x == 0) {
            point.x = p1.x;
            point.y = p3.y;
        }
        else {
            var A = (p1.y - p2.y) / (p1.x - p2.x);
            var B = p1.y - A * p1.x;
            var m = p3.x + A * p3.y;
            point.x = (m - A * B) / (A * A + 1);
            point.y = A * point.x + B;
        }
        return point;
    };
    /**
     * 获点到线的距离
     * @param p1	直线上的点
     * @param p2	直线上的点
     * @param p3	直线外的点
     * @return 	距离
     *
     */
    MathUtil.getPointToLineDistance = function (p1, p2, p3) {
        var len;
        //如果p1.x==p2.x 说明是条竖着的线
        if (p1.x - p2.x == 0) {
            len = Math.abs(p3.x - p1.x);
        }
        else {
            var A = (p1.y - p2.y) / (p1.x - p2.x);
            var B = p1.y - A * p1.x;
            len = Math.abs((A * p3.x + B - p3.y) / Math.sqrt(A * A + 1));
        }
        return len;
    };
    MathUtil.random = function (nMinimum, nMaximum, nRoundToInterval) {
        if (nMaximum === void 0) { nMaximum = 0; }
        if (nRoundToInterval === void 0) { nRoundToInterval = 1; }
        if (nMinimum > nMaximum) {
            var nTemp = nMinimum;
            nMinimum = nMaximum;
            nMaximum = nTemp;
        }
        var nDeltaRange = (nMaximum - nMinimum) + (1 * nRoundToInterval);
        var nRandomNumber = Math.random() * nDeltaRange;
        nRandomNumber += nMinimum;
        return MathUtil.floor(nRandomNumber, nRoundToInterval);
    };
    MathUtil.floor = function (nNumber, nRoundToInterval) {
        if (nRoundToInterval === void 0) { nRoundToInterval = 1; }
        return Math.floor(nNumber / nRoundToInterval) * nRoundToInterval;
    };
    return MathUtil;
}());
__reflect(MathUtil.prototype, "MathUtil");
//# sourceMappingURL=MathUtil.js.map