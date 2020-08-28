import {
	CompletionItem,
	CompletionItemKind,
	CompletionParams,
	DocumentUri,
} from 'vscode-languageserver';
import { Position } from 'vscode-languageserver-textdocument';

import { APITypes, APIParser} from '../api/APIParser';
import DocumentManager from '../DocumentHelper'

class CompletionProvider {
	private _apiparser: APIParser = new APIParser()
	private mDocumentManager:DocumentManager;

	constructor(doc:DocumentManager) {
		this.mDocumentManager = doc;
	}

	provideCompletions(params:CompletionParams): CompletionItem[] | undefined {
		let trigger = params.context?.triggerCharacter
		if (!trigger) {
			return undefined
		}

		return this.provideAPICompletions(params.textDocument.uri, params.position, trigger)
	}

	resolveCompletion(item: CompletionItem) {
		if (item.data != null) {
			item.detail = this._apiparser.getLabelDetail(item.data);
			item.documentation = this._apiparser.getLabelDoc(item.data);
		}
	}

	provideAPICompletions(textDocument:DocumentUri, position:Position, trigger:string): CompletionItem[] | undefined {
		let items:CompletionItem[] = []
		let apitype = 0
		if (trigger === ':') {
			apitype = (APITypes.Func)
		} else if (trigger === '.') {
			apitype = (APITypes.Vars | APITypes.Func)
		} else if (trigger === '_') {
			let doc = this.mDocumentManager.getDocument(textDocument);
			let text = doc?.getText()
			// TODO:非单词边界
			// 根据单词前是否有点和冒号决定是否提示API
			// return undefined

			// 单词边界
			// 是全局的，前面不是 . 和 : ；
			if (doc && position.character > 1) {
				// -2位置 换成单词前
				let before = doc.offsetAt({line: position.line, character: position.character - 2})
				let c = text?.charAt(before)

				if (c === '.') {
					apitype = (APITypes.Vars | APITypes.Func)
				} else if ( c === ':') {
					apitype = (APITypes.Func)
				}
			}
			if (apitype === 0) {
				apitype = (APITypes.Class | APITypes.Singleton)
			}
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