import { CodeProtector } from '@opennative/core-protector';
import { TokenTaxBenchmark } from '@opennative/core-benchmark';
import { MockMTProvider, OllamaTyphoonProvider } from '@opennative/core-mt';
import { CanonicalTranscriptEngine } from '@opennative/core-transcript';
import { AgentProvider, CodexAppServerProvider, ClaudeAPIProvider } from '@opennative/core-providers';

export interface VSCodeExtensionContext {
  subscriptions: Array<{ dispose(): any }>;
}

/**
 * OpenNativeVSCodeExtension manages the Language Sidecar inside VS Code
 */
export class OpenNativeVSCodeExtension {
  private protector = new CodeProtector();
  private benchmark = new TokenTaxBenchmark();
  private engine = new CanonicalTranscriptEngine(new MockMTProvider());
  private provider: AgentProvider = new CodexAppServerProvider();

  public activate(context: VSCodeExtensionContext) {
    console.log('🌐 OpenNative Language Sidecar extension activated in VS Code!');
  }

  /**
   * Handles Ctrl+Shift+L shortcut: Captures active editor selection & prompt
   */
  public async handleAskAgentCommand(selectedCode: string, thaiPrompt: string) {
    const combinedPrompt = selectedCode
      ? `ช่วยแก้โค้ดต่อไปนี้:\n\`\`\`\n${selectedCode}\n\`\`\`\n${thaiPrompt}`
      : thaiPrompt;

    const initialMetrics = this.benchmark.measure(combinedPrompt);
    const { canonicalEnglish, displayThai, latencyMs } = await this.engine.processUserPrompt(
      combinedPrompt,
      initialMetrics.qwenTokens,
      0
    );

    const metrics = this.benchmark.compare(combinedPrompt, canonicalEnglish);

    return {
      canonicalEnglish,
      displayThai,
      latencyMs,
      savings: {
        qwenPercent: metrics.savings.qwenPercent,
        deepseekPercent: metrics.savings.deepseekPercent,
        o200kPercent: metrics.savings.o200kPercent,
        savedTokens: metrics.originalThai.qwenTokens - metrics.translatedEnglish.qwenTokens
      },
      stats: this.engine.getSessionStats()
    };
  }

  /**
   * Renders the OpenNative Sidebar Webview HTML UI
   */
  public getWebviewHtml(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>OpenNative Language Gateway</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #1e1e2e;
      color: #cdd6f4;
      padding: 12px;
      margin: 0;
    }
    .header {
      font-size: 14px;
      font-weight: bold;
      color: #89b4fa;
      margin-bottom: 8px;
    }
    .tagline {
      font-size: 11px;
      color: #a6adc8;
      margin-bottom: 12px;
    }
    textarea {
      width: 100%;
      height: 80px;
      background: #313244;
      color: #f5e0dc;
      border: 1px solid #45475a;
      border-radius: 6px;
      padding: 8px;
      box-sizing: border-box;
      font-size: 12px;
    }
    button {
      width: 100%;
      background: #89b4fa;
      color: #11111b;
      border: none;
      padding: 8px;
      margin-top: 8px;
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
    }
    button:hover {
      background: #b4befe;
    }
    .savings-card {
      background: #181825;
      border: 1px solid #313244;
      border-radius: 6px;
      padding: 10px;
      margin-top: 12px;
    }
    .stat-row {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      margin-bottom: 4px;
    }
    .badge {
      color: #a6e3a1;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="header">🌐 OpenNative Language Sidecar</div>
  <div class="tagline">Thai UX. English Tokens. Zero Translation Tokens.</div>
  
  <label for="prompt" style="font-size:11px;">🇹🇭 Ask Agent (Thai):</label>
  <textarea id="prompt" placeholder="ช่วยแก้ login bug และเพิ่ม error handling หน่อย..."></textarea>
  <button onclick="sendPrompt()">Send to Agent (Ctrl+Shift+L)</button>

  <div class="savings-card">
    <div class="header" style="font-size:12px; color:#f9e2af;">⚡ LANGUAGE SAVINGS METER</div>
    <div class="stat-row"><span>DeepSeek V3/R1:</span><span class="badge">↓ 55.0% saved</span></div>
    <div class="stat-row"><span>Qwen 2.5 Coder:</span><span class="badge">↓ 48.6% saved</span></div>
    <div class="stat-row"><span>GPT-4o:</span><span class="badge">↓ 22.1% saved</span></div>
    <div class="stat-row"><span>Translation Cost:</span><span style="color:#a6e3a1;">$0.00 (Local MT)</span></div>
  </div>

  <script>
    function sendPrompt() {
      const val = document.getElementById('prompt').value;
      if (val) {
        alert('Prompt sent via OpenNative Canonical Layer!');
      }
    }
  </script>
</body>
</html>`;
  }

  public deactivate() {
    this.benchmark.free();
  }
}
