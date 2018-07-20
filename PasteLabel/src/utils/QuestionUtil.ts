class Question {
	public index:number;
	public name:string;
	public image:string;
	public audio:string;

	public clone():Question{
		let q = new Question();
		q.name = this.name;
		q.image = this.image;
		q.audio = this.audio;
		return q;
	}
}

class QuestionUtil {

	private m_assetsName:string;
	private m_json:any;
	private m_qList:Array<Question>;
	private m_historyList = new Array<Question>();

	private m_curIndex = -1;
	private m_size = 0;			

	public rightAudio:string;
	public rightLabel:string;
	public wrongAudio:string;
	public wrongLabel:string;

	public constructor() {
	}

	public init(assetsName:string, size=0){
		this.m_assetsName = assetsName;
		this.m_size = size;

		this.m_json = RES.getRes(assetsName+"_json");

		this.rightAudio = this.m_json.rightAudio;
		this.wrongAudio = this.m_json.wrongAudio;
		this.rightLabel = this.m_json.rightLabel;
		this.wrongLabel = this.m_json.wrongLabel;

		this.m_qList = new Array<Question>();
		for(let i=0; i<this.m_json.list.length; i++){
			let q = new Question();
			q.name = this.m_json.list[i].name;
			q.image = this.m_json.list[i].image;
			q.audio = this.m_json.list[i].audio;
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
}