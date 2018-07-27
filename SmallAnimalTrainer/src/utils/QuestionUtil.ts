class Question {
	public index:number;
	public name:string;
	public image:string;
	public sound:string;
	public text:string;

	public clone():Question{
		let q = new Question();
		q.name = this.name;
		q.image = this.image;
		q.sound = this.sound;
		q.text = this.text;
		return q;
	}
}

class QuestionUtil {

	public yesAudio:string;
	public noAudio:string;
	public yesImage:string;
	public noImage:string;

	private m_assetsName:string;
	private m_json:any;
	private m_qList:Array<Question>;
	private m_historyList = new Array<Question>();

	private m_curIndex = -1;
	private m_size = 0;			

	public constructor() {
	}

	public init(assetsName:string, size=0){
		this.m_assetsName = assetsName;
		this.m_size = size;

		this.m_json = RES.getRes(assetsName+"_json");
		
		this.yesAudio = this.m_json.yesAudio;
		this.noAudio = this.m_json.noAudio;
		this.yesImage = this.m_json.yesImage;
		this.noImage = this.m_json.noImage;

		this.m_qList = new Array<Question>();
		for(let i=0; i<this.m_json.list.length; i++){
			let q = new Question();
			q.name = this.m_json.list[i].name;
			q.image = this.m_json.list[i].image;
			q.sound = this.m_json.list[i].sound;
			q.text = this.m_json.list[i].text;
			this.m_qList.push(q);
		}
		this.newGroup();
	}

	//生成一组新题目
	private newGroup(){
		let arr = this.m_qList.concat();
		ArrayUtil.randomSort(arr);
		//防止收尾相同
		while(this.m_historyList.length>0
				&& this.m_historyList[this.m_historyList.length-1].name == arr[0].name){
			ArrayUtil.randomSort(arr);
		}
		let size = Math.min(this.m_size, arr.length);
		if(size==0){
			size = arr.length;
		}
		for(let i=0; i<size; i++){
			let q = arr[i].clone()
			q.index = this.m_historyList.length;
			this.m_historyList.push(q);
		}
	}

	public reset(){
		this.m_curIndex = -1;
		this.m_historyList.length = 0;
		this.newGroup();
	}

	public get newQuestion():Question{
		let index = this.m_curIndex + 1;
		let q = this.m_historyList[index];
		if(q==null || q==undefined){
			this.newGroup();
			q = this.m_historyList[index];
		}
		this.m_curIndex = index;
		return q;
	}

	public get curQuestion():Question{
		let index = Math.max(this.m_curIndex, 0);
		return this.m_historyList[index];
	}

	public getQuestionAt(index:number):Question{
		return this.m_qList[index];
	}

	public get $qList(){return this.m_qList;}
}