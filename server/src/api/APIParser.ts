import * as fs from 'fs';
interface API_Class_Info {
	classname:string,
	brief:string,
	detail?:string
}
interface API_Class_Singleton {
	apiname:string,
	brief:string,
	detail?:string
}
interface API_Class_Constructor {
	brief:string
}
declare namespace Var_Type {
	const cst = 1
	const normal = 2
	const readonly = 3
}
declare type Var_Type = 1 | 2 | 3;
interface API_Class_Var {
	apiname:string,
	brief:string,
	detail?:string,
	// for func param type
	type?:Var_Type
}
interface API_Class_Func {
	apiname:string,
	brief:string,
	paramlist?:API_Class_Var[]
}
interface API_Class {
	class: API_Class_Info,
	constructor?:API_Class_Constructor[],
	singleton?:API_Class_Singleton,
	vars?:API_Class_Var[],
	funcs?:API_Class_Func[],
}

interface APILabel{
	label: string,
	doc:string,
	srcclass?:string,
	issingleton?:boolean,
};

function isFileSync(aPath:string) {
	try {
		return fs.statSync(aPath).isFile();
	} catch (e) {
		if (e.code === 'ENOENT') {
			return false;
		} else {
			throw e;
		}
	}
}

class APIParser {
	private _apipath = __dirname + '/../../src/api/'
	private _apilist: Map<string, APILabel[]> = new Map();
	private _apiversion: string = 'default';

	constructor() {
		console.log('APIParser')
	}

	genLabel(): APILabel[] {
		console.log('genLabels(apiversion)', this._apiversion)
		let labels:Array<APILabel> = [];
		let path = this._apipath + this._apiversion + '/client.json'
		if (isFileSync(path)) {
			let clientapi = JSON.parse(fs.readFileSync(path, "utf8")) as API_Class[];
			clientapi.forEach((clsapi: API_Class) => {
				let clsname = clsapi.class.classname
				labels.push({
					label: clsname,
					doc: clsapi.class.brief
				})
				if (clsapi.singleton) {
					labels.push({
						label: clsapi.singleton.apiname,
						doc: clsapi.singleton.brief,
						srcclass: clsname,
						issingleton:true
					})
				}
				if (clsapi.vars) {
					clsapi.vars.forEach((varapi) => {
						labels.push({
							label: varapi.apiname,
							doc: varapi.brief,
							srcclass: clsname
						})
					})
				}
				if (clsapi.funcs) {
					clsapi.funcs.forEach((func) => {
						labels.push({
							label: func.apiname,
							doc: func.brief,
							srcclass: clsname
						})
					})
				}
			})
		}
		return labels
	}

	getAPILabels(): APILabel[] {
		let api = this._apilist.get(this._apiversion)
		if (api) {
			return api
		} else {
			let api = this.genLabel()
			if (api) {
				this._apilist.set(this._apiversion, api)
				return api
			}
		}
		return []
	}

	getLabelDetail(index: number):string {
		let api = this._apilist.get(this._apiversion)
		let apilabel = api && api[index]
		if (apilabel) {
			let s = ''
			if (apilabel.srcclass) {
				s += apilabel.srcclass
				if (apilabel.issingleton) {
					s += '单例'
				}
				s += ': '
			}
			return s + apilabel.label;
		}
		return '暂无'
	}
	getLabelDoc(index: number):string {
		let api = this._apilist.get(this._apiversion)
		let apilabel = api && api[index]
		if (apilabel) {
			// TODO: 参数信息
			return apilabel.doc;
		}
		return '待补充'
	}
}

export default APIParser