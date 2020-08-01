import {
	CompletionItem,
	CompletionItemKind,
	CompletionParams,
	DocumentUri,
} from 'vscode-languageserver';

import { Position } from 'vscode-languageserver-textdocument';


import { APITypes, APIParser} from '../api/APIParser';

class CompletionProvider {
	private _apiversion: string = 'default'
	private _apiparser: APIParser = new APIParser()

	constructor() {
		console.log('CompletionProvider')
	}

	setApiVersion(version: string) {
		this._apiversion = version
	}

	provideCompletions(params:CompletionParams): CompletionItem[] | undefined {
		let trigger = params.context?.triggerCharacter
		if (!trigger) {
			return undefined
		}

		let words = this.provideWordBasedCompletions(params.textDocument.uri, params.position)
		return this.provideAPICompletions(params.textDocument.uri, params.position, trigger).concat(...words)
	}

	resolveCompletion(item: CompletionItem) {
		if (item.data != null) {
			item.detail = this._apiparser.getLabelDetail(item.data);
			item.documentation = this._apiparser.getLabelDoc(item.data);
		}
	}

	provideAPICompletions(textDocument:DocumentUri, position:Position, trigger:string): CompletionItem[] {
		let items:CompletionItem[] = []
		let apitype = 0
		if (trigger === ':') {
			apitype = (APITypes.Func)
		} else if (trigger === '.') {
			apitype = (APITypes.Vars | APITypes.Func)
		} else {
			apitype = (APITypes.Class | APITypes.Singleton | APITypes.Vars | APITypes.Func)
		}

		this._apiparser.getAPILabels().forEach((v, i) => {
			if (v.type & apitype) {
				items.push({
					label: v.label,
					kind: v.labelkind,
					data: i
				})
			}
		})
		return items
	}

	provideWordBasedCompletions(documentUri:DocumentUri, position:Position): CompletionItem[] {
		let words = this.getWords(documentUri, position)

		return words.map((word): CompletionItem => {
			return {
				kind: CompletionItemKind.Text,
				label: word
			};
		})
	}
	getWords(documentUri:DocumentUri, position:Position): string[] {
		const words: string[] = [];

		// words.push('TestABC')

		return words;
	}
}

export default CompletionProvider