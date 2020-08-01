import {
	CompletionItem,
	Diagnostic,
	DiagnosticSeverity,
	Position
} from 'vscode-languageserver';
import CompletionProvider from './providers/completion-provider';
import { TextDocument } from 'vscode-languageserver-textdocument';
import DiagnosticProvider from './providers/diagnostic-provider';
import DocumentManager from './DocumentHelper'

class CodeHelper {
	private mDocumentManager:DocumentManager;
	private mCompletionProvider:CompletionProvider;
	private mDiagnosticProvider:DiagnosticProvider;

	constructor(doc:DocumentManager) {
		console.log('CodeHelper')
		this.mDocumentManager = doc;
		this.mCompletionProvider = new CompletionProvider(doc);
		this.mDiagnosticProvider = new DiagnosticProvider();
	}

	async onCompletion(params:any) {
		let settings = await this.mDocumentManager.getDocumentSettings(params.textDocument.uri);
		if (settings.isProvideF3dAPI) {
			return this.mCompletionProvider.provideCompletions(params);
		}
		return undefined;
	}

	onCompletionResolve(item:CompletionItem): CompletionItem {
		this.mCompletionProvider.resolveCompletion(item);
		return item;
	}

	async ValidateTextDocument(textDocument: TextDocument): Promise<void> {
		let settings = await this.mDocumentManager.getDocumentSettings(textDocument.uri);
		if (settings.isCheckF3dFormat === false) {
			this.mDocumentManager.clearDocumentDiagnostics(textDocument)
			return
		}

		let text = textDocument.getText();
		let errs = this.mDiagnosticProvider.checkFormatErrorByFile(text)

		let diagnostics: Diagnostic[] = [];
		errs.forEach((res) => {
			let diagnostic: Diagnostic = {
				severity: DiagnosticSeverity.Warning, 
				range: {
					start: Position.create(res.line, res.col),
					end: Position.create(res.line, res.col)
				},
				message: `${res.err}`,
				source: 'f3dlua'
			};
			diagnostics.push(diagnostic);
		})
		this.mDocumentManager.sendDiagnostics(textDocument, diagnostics);
	}
	onDidChangeConfiguration(change: any) {
		this.mDocumentManager.onChangeConfiguration(change);
		this.mDocumentManager.forEachDocument(this.ValidateTextDocument);
	}
}

export default CodeHelper;
