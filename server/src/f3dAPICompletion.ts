import {
	CompletionItem,
	CompletionItemKind,
} from 'vscode-languageserver';

import APIParser from './api/APIParser';

class F3dAPICompletion {
	private _apiversion: string = 'default'
	private _apiparser: APIParser = new APIParser()
	// private _apilabels: Array<string> = []

	constructor() {
		console.log('F3dAPICompletion')
		// this.initAPILabels()
	}

	// initAPILabels() {
	// 	this._apilabels = this._apiparser.getAPILabels()
	// }

	setApiVersion(version: string) {
		this._apiversion = version
	}

	apiCompletionLabels(): CompletionItem[] {
		let items:CompletionItem[] = []
		this._apiparser.getAPILabels().forEach((v, i) => {
			items.push({
				label: v.label,
				kind: CompletionItemKind.Text,
				data: i
			})
		})
		return items
	}

	onApiCompletion(item: CompletionItem) {
		if (item.data != null) {
			item.detail = this._apiparser.getLabelDetail(item.data);
			item.documentation = this._apiparser.getLabelDoc(item.data);
		}
	}
}

export default F3dAPICompletion