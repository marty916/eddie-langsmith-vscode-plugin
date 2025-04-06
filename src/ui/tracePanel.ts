import * as vscode from 'vscode';
import { fetchLatestTrace } from '../langsmith';

export async function showLatestTrace() {
  const panel = vscode.window.createWebviewPanel(
    'eddieTrace',
    'EDDIE: Latest LangSmith Trace',
    vscode.ViewColumn.One,
    {
      enableScripts: true
    }
  );

  try {
    const trace = await fetchLatestTrace("enterprise-llm-rag-training");

    panel.webview.html = getWebviewContent(trace);
  } catch (error) {
    panel.webview.html = `<html><body><h2 style="color: red;">Failed to fetch trace</h2><pre>${error}</pre></body></html>`;
  }
}

function getWebviewContent(trace: any) {
  const prompt = trace.inputs?.input || JSON.stringify(trace.inputs, null, 2);
  const response = trace.outputs?.output || JSON.stringify(trace.outputs, null, 2);
  const usage = trace.extra?.token_usage || {};
  const promptTokens = usage.prompt_tokens ?? 'N/A';
  const completionTokens = usage.completion_tokens ?? 'N/A';
  const totalTokens = usage.total_tokens ?? 'N/A';
  const latency = trace.latency_ms ? `${trace.latency_ms} ms` : 'N/A';

  return `
    <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 1rem; color: #ccc; background-color: #1e1e1e; }
          .section { margin-bottom: 1.5rem; }
          .label { font-weight: bold; margin-bottom: 0.25rem; display: block; color: #aaa; }
          pre { background: #2a2a2a; padding: 0.75rem; border-radius: 5px; white-space: pre-wrap; word-break: break-word; color: #ddd; }
          details summary { cursor: pointer; font-weight: bold; color: #ccc; }
        </style>
      </head>
      <body>
        <h1 style="color: #fff;">LangSmith Trace: ${trace.name || trace.id}</h1>
        <div class="section">
          <span class="label">Prompt:</span>
          <pre>${prompt}</pre>
        </div>
        <div class="section">
          <span class="label">Response:</span>
          <pre>${response}</pre>
        </div>
        <div class="section">
          <span class="label">Token Usage:</span>
          <pre>
Prompt Tokens: ${promptTokens}
Completion Tokens: ${completionTokens}
Total Tokens: ${totalTokens}
          </pre>
        </div>
        <div class="section">
          <span class="label">Latency:</span> ${latency}
        </div>
        <div class="section">
          <details>
            <summary>Raw Trace JSON</summary>
            <pre>${JSON.stringify(trace, null, 2)}</pre>
          </details>
        </div>
      </body>
    </html>
  `;
}