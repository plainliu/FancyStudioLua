import {
	CompletionItemKind,
	MarkupContent,
	MarkupKind,
} from 'vscode-languageserver';

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

const enum APITypes {
	Class = 0b0001,
	Singleton = 0b0010,
	Vars = 0b0100,
	Func = 0b1000,
}

interface APILabel{
	label: string,
	srcclass?:string,
	issingleton?:boolean,
	type:APITypes,
	labelkind:CompletionItemKind,
	documentation: string | MarkupContent,

	// for function
	snippet?:string,
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
					documentation: clsapi.class.brief,
					labelkind:CompletionItemKind.Class,
					type: APITypes.Class,
				})
				if (clsapi.singleton) {
					labels.push({
						label: clsapi.singleton.apiname,
						documentation: clsapi.singleton.brief,
						srcclass: clsname,
						issingleton:true,
						labelkind:CompletionItemKind.Variable,
						type: APITypes.Singleton,
					})
				}
				if (clsapi.vars) {
					clsapi.vars.forEach((varapi) => {
						labels.push({
							label: varapi.apiname,
							documentation: varapi.brief,
							srcclass: clsname,
							labelkind:CompletionItemKind.Field,
							type: APITypes.Vars,
						})
					})
				}
				if (clsapi.funcs) {
					clsapi.funcs.forEach((func) => {
						let f = this.analyzeFunctionCompletion(func)
						f.srcclass = clsname
						labels.push(f)
					})
				}
			})
		}
		return labels
	}

	analyzeFunctionCompletion(func : API_Class_Func): APILabel {
		// func(${1:v})
		let snippet = func.apiname
		let funtionstr = func.apiname
		let paramsdetail = ""
		snippet += "(";
		funtionstr += "(";
		if (func.paramlist) {
			for(let i = 0; i < func.paramlist.length; i++) {
				let paramname = func.paramlist[i].type
				let paramid = i + 1
				snippet += ("${" + paramid + ":" + paramname + "}")
				funtionstr += paramname
				paramsdetail += "(p" + paramid + ") " + paramname + ": " + func.paramlist[i].brief
				if (i != func.paramlist.length - 1)
				{
					snippet += ", "
					funtionstr += ", "
					paramsdetail += "\n"
				}
			}
		}
		snippet += ")"
		funtionstr += ")"

		
		let markdown : MarkupContent = {
			kind: MarkupKind.Markdown,
			value: [
				func.brief,
				"```lua",
				funtionstr,
				paramsdetail,
				"```",
			].join("\n")
		};

		return {
			label: func.apiname,
			labelkind: CompletionItemKind.Method,
			type: APITypes.Func,
			snippet: snippet,
			documentation: markdown
		}
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
	getLabelDoc(index: number): MarkupContent | string {
		let api = this._apilist.get(this._apiversion)

		let apilabel = api && api[index]
		if (apilabel) {
			return apilabel.documentation
		}
		return "待补充"
	}
	getLabelSnippet(index: number):string {
		let api = this._apilist.get(this._apiversion)
		let apilabel = api && api[index]
		if (apilabel) {
			if (apilabel.labelkind === CompletionItemKind.Method && apilabel.snippet)
				return apilabel.snippet;
			else
				return apilabel.label;
		}
		return "";
	}
}

export { APITypes, APIParser }