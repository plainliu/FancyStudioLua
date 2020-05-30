// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
	commands,
	window,
	workspace,
	languages,
	ExtensionContext,
	Diagnostic,
	DiagnosticCollection,
	DiagnosticSeverity,
	Range,
	TextDocument
} from 'vscode';

let diagnosticCollection: DiagnosticCollection;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "fancystudiolua" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = commands.registerCommand('fancystudiolua.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		window.showInformationMessage('Hello World from FancyStudioLua!');
	});

	context.subscriptions.push(disposable);

	workspace.onDidSaveTextDocument((text: TextDocument) => {
		if (text.languageId === 'lua'){
			diagnosticCollection.clear();
			diagnosticCollection.set(text.uri, fsCheckLuaFormat(text));
		}
	});

	diagnosticCollection = languages.createDiagnosticCollection('lua');
	context.subscriptions.push(diagnosticCollection);
}

function fsCheckLuaFormat(document: TextDocument) {
	console.log('Congratulations, "fancystudiolua" fsCheckLuaFormat!');

	// diagnostics
	let diagnostics = [];
	let d: Diagnostic = {
		severity: DiagnosticSeverity.Warning,
		range: new Range(document.positionAt(0), document.positionAt(0)),
		message: "test Diagnostic"
	};
	diagnostics.push(d);
	return diagnostics
}

// this method is called when your extension is deactivated
export function deactivate() {}
