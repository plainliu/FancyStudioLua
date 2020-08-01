/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
	createConnection,
	TextDocuments,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	CompletionItem,
	TextDocumentSyncKind,
	InitializeResult,
} from 'vscode-languageserver';

import {
	TextDocument,
} from 'vscode-languageserver-textdocument';

import ClientEnv from './ClientEnv'
import DocumentManager from './DocumentHelper'
import CodeHelper from './CodeHelper'

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
let connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager. 
let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let mClientEnv = new ClientEnv()
let mDocumentManager = new DocumentManager(documents, connection, mClientEnv)
let mCodeHelper = new CodeHelper(mDocumentManager)

connection.onInitialize((params: InitializeParams) => {
	mClientEnv.init(params);

	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental,
			// Tell the client that this server supports code completion.
			completionProvider: {
				resolveProvider: true,
				triggerCharacters: ['_', '.', ':']
			}
		}
	};
	if (mClientEnv.hasWorkspaceFolderCapability) {
		result.capabilities.workspace = {
			workspaceFolders: {
				supported: true
			}
		};
	}
	return result;
});

connection.onInitialized(() => {
	if (mClientEnv.hasConfigurationCapability) {
		// Register for all configuration changes.
		connection.client.register(DidChangeConfigurationNotification.type, undefined);
	}
	if (mClientEnv.hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders(_event => {
			connection.console.log('Workspace folder change event received.');
		});
	}
});

connection.onDidChangeConfiguration(change => {
	mCodeHelper.onDidChangeConfiguration(change);
});

// Only keep settings for open documents
documents.onDidClose(e => {
	mDocumentManager.closeDocument(e.document);
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
	mCodeHelper.ValidateTextDocument(change.document);
});

connection.onDidChangeWatchedFiles(_change => {
	// Monitored files have change in VSCode
	connection.console.log('We received an file change event');
});

// This handler provides the initial list of the completion items.
connection.onCompletion(
	async (completionparams) => {
		return mCodeHelper.onCompletion(completionparams);
	}
);

connection.onCompletionResolve(
	(item: CompletionItem): CompletionItem => {
		return mCodeHelper.onCompletionResolve(item);
	}
);

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
