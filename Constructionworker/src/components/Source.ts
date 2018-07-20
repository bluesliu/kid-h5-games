class Source {

 	//初始化生成13组选择题
	public static groups:number=13; 
//每组题4个选项	
 	public static showNum:number=3; 
	public static root:String="resource/";
	public static images:Box[]=[];
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
			bitmap.width=bitmap.height=250;
			bitmap.anchorOffsetX = bitmap.width / 2;
        	bitmap.anchorOffsetY = bitmap.height / 2;
			

			let  box=new Box();
		//	let block = bmpArr[i]as egret.Bitmap;
		//	block.smoothing=true;
        	box.addContent(bitmap);
			//box.mo
			box.name="box_"+k;
			this.images.push(box);
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
			egret.log(this.questionList);	
		
	}
	// public static init(compFunc: Function)
	// {
	// 	this.audios.push("assets/audio/绿色圆柱.mp3");
	// 	this.audios.push("assets/audio/红色小矩形.mp3");
	// 	this.audios.push("assets/audio/橙色小矩形.mp3");
	// 	this.audios.push("assets/audio/紫色圆柱.mp3");
	// 	this.audios.push("assets/audio/黄色长矩形.mp3");
	// 	this.audios.push("assets/audio/黄色三角形.mp3");
	// 	this.audios.push("assets/audio/紫色矩形.mp3");
	// 	this.audios.push("assets/audio/红色矩形.mp3");
	// 	this.audios.push("assets/audio/橙色三角形.mp3");
	// 	this.audios.push("assets/audio/绿色三角形.mp3");
		
		
		

	// 	let bmpArr=[];
	// 	let block1 = Source.createBitmapByName("jzgr_16_png");
	// 	let block2 = Source.createBitmapByName("jzgr_17_png");
	// 	let block3 = Source.createBitmapByName("jzgr_14_png");
	// 	let block4 = Source.createBitmapByName("jzgr_10_png");
	// 	let block5 = Source.createBitmapByName("jzgr_13_png");
	// 	let block6 = Source.createBitmapByName("jzgr_15_png");
	// 	let block7 = Source.createBitmapByName("jzgr_11_png");
	// 	let block8 = Source.createBitmapByName("jzgr_12_png");
	// 	let block9 = Source.createBitmapByName("jzgr_9_png");
	// 	let block10 = Source.createBitmapByName("jzgr_8_png");
	// 	bmpArr.push(block1);
	// 	bmpArr.push(block2);
	// 	bmpArr.push(block3);
	// 	bmpArr.push(block4);
	// 	bmpArr.push(block5);
	// 	bmpArr.push(block6);
	// 	bmpArr.push(block7);
	// 	bmpArr.push(block8);
	// 	bmpArr.push(block9);
	// 	bmpArr.push(block10);

	// 	for(var i:number=0;i<bmpArr.length;i++)
	// 	{
			// let  box=new Box();
			// let block = bmpArr[i]as egret.Bitmap;
			// block.smoothing=true;
        	// box.addContent(block);
			// //box.mo
			// box.name="box_"+i;
	// 		this.images.push(box);					
	// 	}

	// 							for(var i:number=0;i<this.images.length;i++)
	// 							{
	// 								var arr=[];
	// 								for (var j:number = 0; j <this.images.length; j++) 
	// 								{
	// 									arr.push(j);
	// 								}
									
									
	// 								this.questionList.push(this.getQuestion(i,arr));
	// 								  // egret.log(this.questionList[i]);
	// 							}
	// 	compFunc();
	// 							//console.log(this.questionList);
	// }

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
		for (let i:number = 0; i < 2; i++) 
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

		for (let j:number = 0; j <3; j++) 
		{
			let id0:number=Math.floor(Math.random()*(3-j));
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


}