import * as vscode from 'vscode';
import { CodeProtector } from '@opennative/core-protector';
import { TokenTaxBenchmark } from '@opennative/core-benchmark';
import { CanonicalTranscriptEngine } from '@opennative/core-transcript';
import { MockMTProvider } from '@opennative/core-mt';

export function activate(context: vscode.ExtensionContext) {
  const protector = new CodeProtector();
  const benchmark = new TokenTaxBenchmark();
  const transcriptEngine = new CanonicalTranscriptEngine(new MockMTProvider());

  // Command: opennative.askAgent
  const askAgentCommand = vscode.commands.registerCommand('opennative.askAgent', async () => {
    const editor = vscode.window.activeTextEditor;
    const selectedText = editor ? editor.document.getText(editor.selection) : '';

    const thaiPrompt = await vscode.window.showInputBox({
      prompt: 'Type your instruction in your native language (e.g. Thai 🇹🇭)',
      placeHolder: 'e.g. ช่วย refactor ฟังก์ชันนี้ให้ใช้ react-hook-form หน่อย'
    });

    if (!thaiPrompt) return;

    try {
      const combinedPrompt = selectedText
        ? `ช่วยแก้โค้ดต่อไปนี้:\n\`\`\`\n${selectedText}\n\`\`\`\n${thaiPrompt}`
        : thaiPrompt;

      const initialMetrics = benchmark.measure(combinedPrompt);
      const turnResult = await transcriptEngine.processUserPrompt(
        combinedPrompt,
        initialMetrics.claudeOpus5Tokens,
        0
      );

      const postMetrics = benchmark.compare(combinedPrompt, turnResult.canonicalEnglish);
      transcriptEngine.updateLastTurnTokens(postMetrics.translatedEnglish.claudeOpus5Tokens);
      const stats = transcriptEngine.getSessionStats();

      // Show English result in output channel
      const outputChannel = vscode.window.createOutputChannel('OpenNative');
      outputChannel.show();
      outputChannel.appendLine('===============================================================');
      outputChannel.appendLine(' 🌐 OPENNATIVE CANONICAL PROMPT SPECIFICATION');
      outputChannel.appendLine('===============================================================\n');
      outputChannel.appendLine('🇹🇭 Original Thai Prompt:');
      outputChannel.appendLine(`   "${combinedPrompt}"\n`);
      outputChannel.appendLine('🇺🇸 Transmitted Canonical Prompt (EN):');
      outputChannel.appendLine(`   "${turnResult.canonicalEnglish}"\n`);
      outputChannel.appendLine('⚡ Real-time Token Savings:');
      outputChannel.appendLine(`   - Claude Opus 5: ${postMetrics.originalThai.claudeOpus5Tokens} TH -> ${postMetrics.translatedEnglish.claudeOpus5Tokens} EN tokens (${postMetrics.savings.claudeOpus5Percent}% saved)`);
      outputChannel.appendLine(`   - DeepSeek V4:   ${postMetrics.originalThai.deepseekV4Tokens} TH -> ${postMetrics.translatedEnglish.deepseekV4Tokens} EN tokens (${postMetrics.savings.deepseekV4Percent}% saved)`);
      outputChannel.appendLine(`   - GPT-5.6 Sol:   ${postMetrics.originalThai.gpt56SolTokens} TH -> ${postMetrics.translatedEnglish.gpt56SolTokens} EN tokens (${postMetrics.savings.gpt56SolPercent}% saved)`);

      // Show token savings notification
      vscode.window.showInformationMessage(
        `OpenNative: Saved ${postMetrics.originalThai.claudeOpus5Tokens - postMetrics.translatedEnglish.claudeOpus5Tokens} tokens (${postMetrics.savings.claudeOpus5Percent}% reduction)`
      );

    } catch (error: any) {
      vscode.window.showErrorMessage(`OpenNative Error: ${error.message}`);
    }
  });

  context.subscriptions.push(askAgentCommand);

  // Register Sidebar Webview
  const sidebarProvider = new OpenNativeSidebarProvider(context.extensionUri, benchmark, transcriptEngine);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'opennative-sidebar-view',
      sidebarProvider
    )
  );
}

export function deactivate() {}

class OpenNativeSidebarProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;

  constructor(
    private readonly _extensionUri: vscode.Uri,
    private readonly benchmark: TokenTaxBenchmark,
    private readonly engine: CanonicalTranscriptEngine
  ) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri]
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (data: any) => {
      switch (data.type) {
        case 'translateAndSend': {
          const thaiPrompt = data.value;
          if (!thaiPrompt) return;

          try {
            const initialMetrics = this.benchmark.measure(thaiPrompt);
            const turnResult = await this.engine.processUserPrompt(
              thaiPrompt,
              initialMetrics.claudeOpus5Tokens,
              0
            );

            const postMetrics = this.benchmark.compare(thaiPrompt, turnResult.canonicalEnglish);
            this.engine.updateLastTurnTokens(postMetrics.translatedEnglish.claudeOpus5Tokens);
            const stats = this.engine.getSessionStats();

            this._view?.webview.postMessage({
              type: 'result',
              value: {
                canonicalEnglish: turnResult.canonicalEnglish,
                savedTokens: postMetrics.originalThai.claudeOpus5Tokens - postMetrics.translatedEnglish.claudeOpus5Tokens,
                savingPercentage: postMetrics.savings.claudeOpus5Percent,
                stats
              }
            });
          } catch (error: any) {
            vscode.window.showErrorMessage(`Error: ${error.message}`);
          }
          break;
        }
      }
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OpenNative Language Sidecar</title>
    <style>
        body {
            font-family: var(--vscode-font-family);
            background-color: var(--vscode-editor-background);
            color: var(--vscode-editor-foreground);
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        h2 {
            font-size: 1.2em;
            margin-bottom: 0;
            color: var(--vscode-editor-foreground);
        }

        textarea {
            width: 100%;
            height: 100px;
            box-sizing: border-box;
            background-color: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            border: 1px solid var(--vscode-input-border);
            padding: 8px;
            resize: vertical;
            font-family: inherit;
        }

        button {
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            padding: 8px 12px;
            cursor: pointer;
            font-size: 14px;
        }

        button:hover {
            background-color: var(--vscode-button-hoverBackground);
        }

        .card {
            background-color: var(--vscode-sideBar-background);
            border: 1px solid var(--vscode-widget-border);
            padding: 12px;
            border-radius: 4px;
        }

        .card-title {
            font-weight: bold;
            margin-bottom: 8px;
            color: var(--vscode-editor-foreground);
        }

        .meter {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }

        .result-box {
            background-color: var(--vscode-editor-background);
            border: 1px solid var(--vscode-widget-border);
            padding: 10px;
            min-height: 50px;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
    </style>
</head>
<body>
    <h2>🌐 OpenNative Language Sidecar</h2>

    <div>
        <label for="prompt">Thai Input Prompt</label>
        <textarea id="prompt" placeholder="อธิบายสิ่งที่คุณต้องการ..."></textarea>
        <button id="sendBtn" style="width: 100%; margin-top: 8px;">Send to Agent</button>
    </div>

    <div class="card" id="savingsCard" style="display: none;">
        <div class="card-title">Real-time Savings Meter 🚀</div>
        <div class="meter">
            <span>Tokens Saved:</span>
            <span id="tokensSaved" style="font-weight: bold; color: #a6e3a1;">0</span>
        </div>
        <div class="meter">
            <span>Reduction:</span>
            <span id="reduction" style="font-weight: bold; color: #a6e3a1;">0%</span>
        </div>
    </div>

    <div class="card" id="outputCard" style="display: none;">
        <div class="card-title">Canonical English Result</div>
        <div id="output" class="result-box"></div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();

        const sendBtn = document.getElementById('sendBtn');
        const promptInput = document.getElementById('prompt');
        const savingsCard = document.getElementById('savingsCard');
        const outputCard = document.getElementById('outputCard');
        const tokensSaved = document.getElementById('tokensSaved');
        const reduction = document.getElementById('reduction');
        const output = document.getElementById('output');

        sendBtn.addEventListener('click', () => {
            const text = promptInput.value.trim();
            if (text) {
                vscode.postMessage({
                    type: 'translateAndSend',
                    value: text
                });
                sendBtn.textContent = 'Processing...';
                sendBtn.disabled = true;
            }
        });

        window.addEventListener('message', event => {
            const message = event.data;
            switch (message.type) {
                case 'result':
                    sendBtn.textContent = 'Send to Agent';
                    sendBtn.disabled = false;
                    
                    savingsCard.style.display = 'block';
                    outputCard.style.display = 'block';
                    
                    tokensSaved.textContent = message.value.savedTokens;
                    reduction.textContent = message.value.savingPercentage + '%';
                    output.textContent = message.value.canonicalEnglish;
                    break;
            }
        });
    </script>
</body>
</html>`;
  }
}
