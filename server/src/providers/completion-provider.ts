import {
	CompletionItem,
	CompletionItemKind,
	CompletionParams,
	DocumentUri,
} from 'vscode-languageserver';

import { Position } from 'vscode-languageserver-textdocument';

import APIParser from '../api/APIParser';

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
		return this.provideAPICompletions(params.textDocument.uri, params.position).concat(...words)
	}

	resolveCompletion(item: CompletionItem) {
		if (item.data != null) {
			item.detail = this._apiparser.getLabelDetail(item.data);
			item.documentation = this._apiparser.getLabelDoc(item.data);
		}
	}

	provideAPICompletions(textDocument:DocumentUri, position:Position): CompletionItem[] {
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

		words.push('TestABC')

		return words;
	}
}

export default CompletionProvider