import {
	Connection,
	TextDocuments,
	Diagnostic,
	DidChangeConfigurationParams
} from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import ClientEnv from './ClientEnv'

interface FancyStudioLuaSettings {
	isCheckF3dFormat: boolean;
	isProvideF3dAPI:boolean;
}

// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings: FancyStudioLuaSettings = { isCheckF3dFormat: true, isProvideF3dAPI:true };
let globalSettings: FancyStudioLuaSettings = defaultSettings;

class DocumentManager {
	private connection:Connection;
	private clientEnv:ClientEnv;
	private documents:TextDocuments<TextDocument>;

	// Cache the settings of all open documents
	private documentSettings:Map<string, Thenable<FancyStudioLuaSettings>>;

	constructor(documents: TextDocuments<TextDocument>, connection:Connection, env:ClientEnv) {
		this.clientEnv = env
		this.connection = connection
		this.documents = documents;
		this.documentSettings = new Map();
	}

	forEachDocument(func:any) {
		this.documents.all().forEach(func);
	}

	getDocument(uri: string): TextDocument | undefined {
		return this.documents.get(uri);
	}

	getDocumentSettings(resource: string): Thenable<FancyStudioLuaSettings> {
		if (!this.clientEnv.hasConfigurationCapability) {
			return Promise.resolve(globalSettings);
		}
		let result = this.documentSettings.get(resource);
		if (!result) {
			result = this.connection.workspace.getConfiguration({
				scopeUri: resource,
				section: 'FancyStudioLua'
			});
			this.documentSettings.set(resource, result);
		}
		return result;
	}

	closeDocument(document:TextDocument) {
		this.clearDocumentDiagnostics(document)
		this.documentSettings.delete(document.uri)
	}

	async clearDocumentDiagnostics(textDocument: TextDocument): Promise<void> {
		let diagnostics: Diagnostic[] = [];
		this.sendDiagnostics(textDocument, diagnostics);
	}

	sendDiagnostics(textDocument:TextDocument, diagnostics: Diagnostic[]) {
		this.connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
	}

	onChangeConfiguration(change:DidChangeConfigurationParams) {
		if (this.clientEnv.hasConfigurationCapability) {
			// Reset all cached document settings
			this.documentSettings.clear()
		} else {
			globalSettings = <FancyStudioLuaSettings>(
				(change.settings.FancyStudioLua || defaultSettings)
			);
		}
	}
}

export default DocumentManager;
