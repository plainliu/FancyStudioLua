import {
	CompletionItem,
	CompletionItemKind,
} from 'vscode-languageserver';

import APIParser from './api/APIParser';

class F3dAPICompletion {
	private _apiversion: string = 'default'
	private _apiparser: APIParser = new APIParser()
	private _apilabels: Array<string> = []

	constructor() {
		console.log('F3dAPICompletion')
		this.initAPILabels()
	}

	initAPILabels() {
		this._apilabels = this._apiparser.getAPILabels()
	}

	setApiVersion(version: string) {
		this._apiversion = version
	}

	apiCompletionLabels(): CompletionItem[] {
		let items:CompletionItem[] = []
		this._apiparser.getAPILabels().forEach((v) => {
			items.push({
				label: v,
				kind: CompletionItemKind.Text,
				data: 1
			})
		})
		return items
	}

	onApiCompletion(item: CompletionItem) {
		// if (item.data === 1) {
		// 	item.detail = '_File details';
		// 	item.documentation = '_File documentation';
		// } else if (item.data === 2) {
		// 	item.detail = '_String details';
		// 	item.documentation = '_String documentation';
		// }
	}
}

export default F3dAPICompletion