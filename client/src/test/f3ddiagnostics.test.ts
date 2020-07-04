/* --------------------------------------------------------------------------------------------
 * Copyright (c) LiuJuanjuan. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as vscode from 'vscode';
import * as assert from 'assert';
import { getDocUri, activate } from './helper';

suite('Should get diagnostics', () => {
	test('Diagnoses ignore texts', async () => {
		const docUri = getDocUri('f3dFormatChecker/ignore.test.lua');
		await testDiagnostics(docUri, []);
	});

	test('Diagnoses ignore texts', async () => {
		const docUri = getDocUri('f3dFormatChecker/error.test.lua');
		await testDiagnostics(docUri, [
			{ message: '行末多余Tab', range: toRange(4, 1, 4, 1), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: 'Tab错误使用', range: toRange(4, 0, 4, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: 'Tab空格错误使用', range: toRange(5, 0, 5, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '多个连续空行', range: toRange(1, 0, 1, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' }
		]);
	});

	test('Diagnoses lua exp', async () => {
		const docUri = getDocUri('f3dFormatChecker/experror.test.lua');
		await testDiagnostics(docUri, [
			{ message: '+前缺少空格', range: toRange(1, 0, 1, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '+后缺少空格', range: toRange(1, 1, 1, 1), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '-前后缺少空格', range: toRange(2, 0, 2, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '*前缺少空格', range: toRange(3, 0, 3, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '*后缺少空格', range: toRange(3, 1, 3, 1), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '/前缺少空格', range: toRange(4, 0, 4, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '/后缺少空格', range: toRange(4, 0, 4, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '<前缺少空格', range: toRange(5, 0, 5, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '<后缺少空格', range: toRange(5, 1, 5, 1), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '>前缺少空格', range: toRange(6, 0, 6, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '>后缺少空格', range: toRange(6, 1, 6, 1), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '=后缺少空格', range: toRange(7, 2, 7, 2), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '<前缺少空格', range: toRange(7, 0, 7, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '=后缺少空格', range: toRange(8, 2, 8, 2), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '>前缺少空格', range: toRange(8, 0, 8, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '=前缺少空格', range: toRange(9, 0, 9, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '=后缺少空格', range: toRange(9, 2, 9, 2), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '=后缺少空格', range: toRange(10, 2, 10, 2), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '~=前缺少空格', range: toRange(10, 0, 10, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '..前缺少空格', range: toRange(12, 0, 12, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '..后缺少空格', range: toRange(12, 0, 12, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '..后缺少空格', range: toRange(13, 1, 13, 1), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '..前缺少空格', range: toRange(14, 0, 14, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: ')前多余空格', range: toRange(17, 7, 17, 7), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '(后多余空格', range: toRange(17, 0, 17, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: ']前多余空格', range: toRange(18, 7, 18, 7), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '[后多余空格', range: toRange(18, 0, 18, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '}前多余空格', range: toRange(19, 7, 19, 7), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: '{后多余空格', range: toRange(19, 0, 19, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: ';错误使用', range: toRange(21, 0, 21, 0), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
			{ message: ',前多余空格', range: toRange(23, 1, 23, 1), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' }
		]);
	});

	test('Diagnoses bugs', async () => {
		const docUri = getDocUri('f3dFormatChecker/bug.test.lua');
		await testDiagnostics(docUri, [
			{ message: ')前多余空格', range: toRange(8, 15, 8, 15), severity: vscode.DiagnosticSeverity.Warning, source: 'f3dlua' },
		]);
	});
});

function toRange(sLine: number, sChar: number, eLine: number, eChar: number) {
	const start = new vscode.Position(sLine, sChar);
	const end = new vscode.Position(eLine, eChar);
	return new vscode.Range(start, end);
}

async function testDiagnostics(docUri: vscode.Uri, expectedDiagnostics: vscode.Diagnostic[]) {
	await activate(docUri);

	const actualDiagnostics = vscode.languages.getDiagnostics(docUri);

	assert.equal(actualDiagnostics.length, expectedDiagnostics.length);

	expectedDiagnostics.forEach((expectedDiagnostic, i) => {
		const actualDiagnostic = actualDiagnostics[i];
		assert.equal(actualDiagnostic.message, expectedDiagnostic.message);
		assert.deepEqual(actualDiagnostic.range, expectedDiagnostic.range);
		assert.equal(actualDiagnostic.severity, expectedDiagnostic.severity);
	});
}