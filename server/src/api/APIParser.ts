import * as fs from 'fs';
interface API_Class_Info {
	classname:string,
	brief:string,
	detail?:string
}
interface API_Class_Constructor {
	brief:string
}
interface API_Class_Normalvar {
	brief:string,
	detail?:string
}
interface API_Class {
	class?: API_Class_Info,
	constructor?:API_Class_Constructor[],
	singleton?:Object,
	constvar?:Array<Object>,
	normalvar?:API_Class_Normalvar[],
	staticfunc?:Object,
	memberfunc?:Object
}

interface APILabel{
	label: string,
	doc:string,
	srcclass?:string,
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
				if (clsapi.class) {
					labels.push({
						label:clsapi.class.classname,
						doc:clsapi.class.brief
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

	getLabelDoc(index: number):string {
		let api = this._apilist.get(this._apiversion)
		if (api) {
			return api[index].doc;
		}
		return '待补充'
	}
}

export default APIParser