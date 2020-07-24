import {
	CompletionItem,
	CompletionItemKind,
} from 'vscode-languageserver';

import APIParser from '../api/APIParser';

// class F3dAPICompletion {
class CompletionProvider {
	private _apiversion: string = 'default'
	private _apiparser: APIParser = new APIParser()

	constructor() {
		console.log('CompletionProvider')
	}

	setApiVersion(version: string) {
		this._apiversion = version
	}

	provideCompletions(): CompletionItem[] {
		return this.provideAPICompletions()
	}

	resolveCompletion(item: CompletionItem) {
		if (item.data != null) {
			item.detail = this._apiparser.getLabelDetail(item.data);
			item.documentation = this._apiparser.getLabelDoc(item.data);
		}
	}

	provideAPICompletions(): CompletionItem[] {
		let items:CompletionItem[] = []
		this._apiparser.getAPILabels().forEach((v, i) => {
			items.push({
				label: v.label,
				kind: v.labelkind,
				data: i
			})
		})
		return items
	}
}

export default CompletionProvider