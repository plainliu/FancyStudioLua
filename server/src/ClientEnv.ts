import { InitializeParams } from 'vscode-languageserver';

class ClientEnv {
	public hasConfigurationCapability: boolean = false;
	public hasWorkspaceFolderCapability: boolean = false;
	public hasDiagnosticRelatedInformationCapability: boolean = false;

	constructor() {}

	init(params: InitializeParams) {
		let capabilities = params.capabilities;

		// Does the client support the `workspace/configuration` request?
		// If not, we fall back using global settings.
		this.hasConfigurationCapability = !!(
			capabilities.workspace && !!capabilities.workspace.configuration
		);
		this.hasWorkspaceFolderCapability = !!(
			capabilities.workspace && !!capabilities.workspace.workspaceFolders
		);
		this.hasDiagnosticRelatedInformationCapability = !!(
			capabilities.textDocument &&
			capabilities.textDocument.publishDiagnostics &&
			capabilities.textDocument.publishDiagnostics.relatedInformation
		);
	}
}

export default ClientEnv;
