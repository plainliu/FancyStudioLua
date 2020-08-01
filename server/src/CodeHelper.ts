import { CompletionItem, Connection, Diagnostic, DiagnosticSeverity, Position } from 'vscode-languageserver';
import CompletionProvider from './providers/completion-provider';
import { TextDocument } from 'vscode-languageserver-textdocument';
import DiagnosticProvider from './providers/diagnostic-provider';

class CodeHelper {
	private connection: Connection;
	private mCompletionProvider:CompletionProvider | undefined;
	private mDiagnosticProvider:DiagnosticProvider | undefined;

	constructor(connection: Connection) {
		console.log('CodeHelper')
		this.connection = connection
		this.mCompletionProvider = new CompletionProvider();
		this.mDiagnosticProvider = new DiagnosticProvider();
	}

	onCompletion(params:any) {
		return this.mCompletionProvider?.provideCompletions(params)
	}

	onCompletionResolve(item:CompletionItem): CompletionItem {
		this.mCompletionProvider?.resolveCompletion(item);
		return item;
	}

	async ValidateTextDocument(textDocument: TextDocument): Promise<void> {
		let text = textDocument.getText();
		let errs = this.mDiagnosticProvider?.checkFormatErrorByFile(text)

		let diagnostics: Diagnostic[] = [];
		errs?.forEach((res) => {
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
		this.connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
	}

	async clearDocumentDiagnostics(textDocument: TextDocument): Promise<void> {
		let diagnostics: Diagnostic[] = [];
		this.connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
	}
}

export default CodeHelper;
