import * as vscode from 'vscode';

export function runEval() {
  const terminal = vscode.window.createTerminal("EDDIE Eval");
  terminal.sendText("python run_eval.py");
  terminal.show();
}