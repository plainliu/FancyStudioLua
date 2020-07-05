import * as fs from 'fs';

interface APILabel{
	labels: Array<string>
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
	private _apilist: Map<string, APILabel> = new Map();
	private _apiversion: string = 'test';

	constructor() {
		console.log('APIParser')
	}

	genLabel(): APILabel {
		console.log('genLabels(apiversion)', this._apiversion)
		let labels:Array<string> = [];
		let path = __dirname + '/server/src/api/' + this._apiversion + '/_Class.json'
		if (isFileSync(path)) {
			let api:Object = JSON.parse(fs.readFileSync(path, "utf8"));
			Object.keys(api).forEach((key) => {
				labels.push(key)
			})
		}
		return {labels:labels}
	}

	getAPILabels(): Array<string> {
		let api = this._apilist.get(this._apiversion)
		if (api && api.labels) {
			return api.labels
		} else {
			let api = this.genLabel()
			if (api) {
				this._apilist.set(this._apiversion, api)
				return api.labels
			}
		}
		return []
	}
}

export default APIParser