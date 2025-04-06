import * as vscode from 'vscode';
import { runEval } from './evalRunner';
import { showLatestTrace } from './ui/tracePanel';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('eddie.runEval', runEval),
    vscode.commands.registerCommand('eddie.viewTrace', showLatestTrace)
  );
}

export function deactivate() {}