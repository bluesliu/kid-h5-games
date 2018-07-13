class ArrayUtil {
	public constructor() {
	}

	public static randomSort(array:Array<any>)
	{
		let tempArr:Array<any> = array.concat();
		array.length = 0;
			
		while(tempArr.length>0)
		{
			let outIdx = MathUtil.random(0,tempArr.length-1);
			let obj:Object = tempArr.splice(outIdx,1)[0];
			array.push(obj);
		}
	}

	public static equal(arr1:Array<string>, arr2:Array<string>):boolean{
		if(arr1.length != arr2.length){return false;}
		for(let i=0; i<arr1.length; i++){
			if(arr1[i] != arr2[i]){
				return false;
			}
		}
		return true;
	}
}