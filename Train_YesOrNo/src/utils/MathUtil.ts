class MathUtil {
	
	/**
	 * 将弧度转换成角度
	 * @param radian	弧度
	 * @return 角度
	 */
	public static R2D(radian:number):number
	{
		return radian * 180 / Math.PI;
	}

	/**
	 * 将角度转换成弧度
	 * @param degress		角度
	 * @return  弧度
	 */
	public static D2R(degress:number):number
	{
		return degress * Math.PI / 180;
	}


	/**
	 * 计算圆周运动
	 * @param centerX		圆心的x坐标
	 * @param centerY		圆心的y坐标
	 * @param radius		圆的半径
	 * @param angle		角度（弧度制）
	 * @return  			返回一个对象{x,y}
	 */
	public static circle(centerX:number, centerY:number, radius:number, angle:number):egret.Point
	{
		let _x = centerX + Math.cos(angle) * radius;
		let _y = centerY + Math.sin(angle) * radius;
		return new egret.Point(_x,  _y);
	}


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
	public static oval(centerX:number, centerY:number, radiusX:number, radiusY:number, angle:number):Object
	{
		let _x = centerX + Math.cos(angle) * radiusX;
		let _y = centerY + Math.sin(angle) * radiusY;
		return {x: _x, y: _y};
	}



	/**
	 * 计算两点之间距离
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 * @return
	 */
	public static distance(x1:number, y1:number, x2:number, y2:number):number
	{
		let dx=x2 - x1;
		let dy=y2 - y1;
		return Math.sqrt(dx * dx + dy * dy);
	}
	
	public static distanceByPoint(p1:egret.Point, p2:egret.Point):number
	{
		return MathUtil.distance(p1.x,p1.y, p2.x, p2.y);
	}


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
	public static getAngleByPoint(ox:number, oy:number, px:number, py:number):number
	{
		return MathUtil.R2D(MathUtil.getRadianByPoint(ox, oy, px, py));
	}
	
	/**
	 * 以ox，oy为原点，计算两个点的夹角（弧度）
	 * @param ox	原点x
	 * @param oy	原点y
	 * @param px
	 * @param py
	 * @return 	一个弧度
	 *
	 */
	public static getRadianByPoint(ox:number, oy:number, px:number, py:number):number
	{
		let dx=px - ox;
		let dy=py - oy;
		return Math.atan2(dy, dx);
	}

	/**
	 * 获点到线的交点
	 * @param p1	直线上的点
	 * @param p2	直线上的点
	 * @param p3	直线外的点
	 * @return 	交点
	 *
	 */
	public static getPointToLineIntersect(p1:egret.Point, p2:egret.Point, p3:egret.Point):egret.Point
	{
		let point = new egret.Point();
		//如果p1.x==p2.x 说明是条竖着的线
		if(p1.x-p2.x==0)
		{
			point.x=p1.x;
			point.y=p3.y;
		}
		else
		{
			let A=(p1.y-p2.y)/(p1.x-p2.x)
			let B=p1.y-A*p1.x
			let m=p3.x+A*p3.y
	
			point.x=(m-A*B)/(A*A+1)
			point.y=A*point.x+B
		}
		return point;
	}

	/**
	 * 获点到线的距离
	 * @param p1	直线上的点
	 * @param p2	直线上的点
	 * @param p3	直线外的点
	 * @return 	距离
	 *
	 */
	public static getPointToLineDistance(p1:egret.Point, p2:egret.Point, p3:egret.Point):number
	{
		let len;
  
		//如果p1.x==p2.x 说明是条竖着的线
		if(p1.x-p2.x==0)
		{
			len=Math.abs(p3.x-p1.x)
		}
		else
		{
			let A=(p1.y-p2.y)/(p1.x-p2.x)
			let B=p1.y-A*p1.x
			
			len=Math.abs((A*p3.x+B-p3.y)/Math.sqrt(A*A+1))
		}
		
		return len
	}

	public static random(nMinimum:number, nMaximum:number=0, nRoundToInterval:number=1):number
	{
		if (nMinimum > nMaximum)
		{
			let nTemp=nMinimum;
			nMinimum=nMaximum;
			nMaximum=nTemp;
		}
		let nDeltaRange = (nMaximum - nMinimum) + (1 * nRoundToInterval);
		let nRandomNumber = Math.random() * nDeltaRange;
		nRandomNumber += nMinimum;
		return MathUtil.floor(nRandomNumber, nRoundToInterval);
	}

	public static floor(nNumber:number, nRoundToInterval:number=1):number
	{
		return Math.floor(nNumber / nRoundToInterval) * nRoundToInterval;
	}
}