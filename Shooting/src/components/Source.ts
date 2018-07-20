class Source {

	public static NUM:number=10;
 	//初始化生成13组选择题
	public static groups:number=13; 
//每组题4个选项	
 	public static showNum:number=4; 
	public static root:String="resource/";
	public static images:egret.Bitmap[]=[];
	public static audios:String[]=[];
	public static questionList:any[]=[];
	public static list:Object;
	public constructor() {
	}


	public static init()
	{
		let count=0;
		
		var obj = RES.getRes(Main.sourceName+"_json");
		this.list=obj.items;
		
		for(let k=0; k < obj.items.length; k++)
		{
			let imageName = obj.items[k].image;
			let bitmap = new egret.Bitmap(RES.getRes(imageName));
			let name = obj.items[k].name;
			bitmap.name=name;
			bitmap.width=bitmap.height=220;
			// bitmap.anchorOffsetX = bitmap.width / 2;
        	// bitmap.anchorOffsetY = bitmap.height / 2;
			
			this.images.push(bitmap);
	
		}
			
		for(var i=0; i < Source.groups; i++)
		{
			var numArr=[];
			for (var j:number = 0; j <this.images.length; j++) 
			{
				numArr.push(j);
			}
			
			
			this.questionList.push(this.getQuestion(i%this.images.length,numArr));
			
		}
		// egret.log(this.questionList);
	}
	

	public static reArrange()
	{
		this.questionList=[];
		for(var i:number=0;i<Source.groups;i++)
		{
									var bmpArr=[];
									for (var j:number = 0; j <this.images.length; j++) 
									{
										bmpArr.push(j);
									}
									
									
									this.questionList.push(this.getQuestion(i%this.images.length,bmpArr));
									//  egret.log(this.questionList[i]);
								}							
	}


	public static getQuestion(id:number,arr:number [])
	{
		let arr1:number []=[];
		arr1.push(arr[id]);
		arr.splice(id,1);
		for (let i:number = 0; i < Source.showNum-1; i++) 
		{
			let id:number=Math.floor(Math.random()*(arr.length-i));
			if(id<0)
			{
				id=0;
			}
			arr1.push(arr[id]);
			arr.splice(id,1);
		}
		let arr2:number []=[];

		for (let j:number = 0; j <Source.showNum; j++) 
		{
			let id0:number=Math.floor(Math.random()*(Source.showNum-j));
			if(id0<0)
			{
				id0=0;
			}
			arr2.push(arr1[id0]);
			arr1.splice(id0,1);
		}
		
		return arr2;
	}

	public static changeQusetion(index:number)
	{
		var bmpArr=[];
									for (var j:number = 0; j <this.images.length; j++) 
									{
										bmpArr.push(j);
									}
		this.questionList[index]=[];
		this.questionList[index].push(bmpArr[index]);
		bmpArr.splice(index,1);
		for (let i:number = 0; i < 2; i++) 
		{
			let id:number=Math.floor(Math.random()*(bmpArr.length-i));
			if(id<0)
			{
				id=0;
			}
			this.questionList[index].push(bmpArr[id]);
			bmpArr.splice(id,1);
		}

			let arr:number []=[];

		for (let j:number = 0; j <3; j++) 
		{
			let id0:number=Math.floor(Math.random()*(3-j));
			if(id0<0)
			{
				id0=0;
			}
			arr.push(this.questionList[index][id0]);
			this.questionList[index].splice(id0,1);
		}
		this.questionList[index]=arr;
	}

	  public static createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
		result.smoothing=true;
        return result;
    }

	public static  randomIndex(len:number):number[]
		{
			var arr0:number[]=[];
			for (var i:number = 0; i <len; i++) 
			{
				arr0.push(i);
			}
			
			var arr1:number[]=[];
		
			for (var j:number = 0; j <len; j++) 
			{
				var id0:number=Math.floor(Math.random()*(len-j));
				if(id0<0)
				{
					id0=0;
				}
				
				arr1.push(arr0[id0]);
				arr0.splice(id0,1);
			}
			//trace(arr1);
			return arr1;
		}


		public static  distance(p1:egret.Point,p2:egret.Point):number
		{
			let dis=Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y))
			return dis;
		}
}