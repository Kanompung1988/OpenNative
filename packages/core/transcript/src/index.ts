import { MTProvider, MockMTProvider } from '@opennative/core-mt';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface TurnProcessResult {
  canonicalEnglish: string;
  displayThai: string;
  latencyMs: number;
}

export interface SessionStats {
  totalTurns: number;
  originalThaiEquivalentTokens: number;
  transmittedEnglishTokens: number;
  tokensAvoided: number;
  percentageSaved: number;
  totalMTLatencyMs: number;
  mtCostDollars: number;
}

export class CanonicalTranscriptEngine {
  private history: ChatMessage[] = [];
  private mtProvider: MTProvider;
  private totalThaiTokens = 0;
  private totalEngTokens = 0;
  private totalLatencyMs = 0;

  constructor(mtProvider?: MTProvider) {
    this.mtProvider = mtProvider || new MockMTProvider();
  }

  /**
   * Processes incoming user prompt in native language (Thai)
   * 1. Translates TH -> EN via local MT
   * 2. Appends Canonical English to conversation history
   */
  public async processUserPrompt(
    thaiPrompt: string,
    thaiTokenEst: number = 0,
    engTokenEst: number = 0
  ): Promise<TurnProcessResult> {
    const startTime = Date.now();
    const englishText = await this.mtProvider.translate(thaiPrompt, { from: 'TH', to: 'EN' });
    const latencyMs = Date.now() - startTime;

    this.history.push({
      role: 'user',
      content: englishText
    });

    this.totalThaiTokens += thaiTokenEst;
    this.totalEngTokens += engTokenEst;
    this.totalLatencyMs += latencyMs;

    return {
      canonicalEnglish: englishText,
      displayThai: thaiPrompt,
      latencyMs
    };
  }

  /**
   * Processes incoming agent response in English
   * 1. Appends Canonical English to conversation history
   * 2. Translates EN -> TH via local MT for UI Display
   */
  public async processAgentResponse(englishResponse: string): Promise<TurnProcessResult> {
    const startTime = Date.now();

    this.history.push({
      role: 'assistant',
      content: englishResponse
    });

    const thaiDisplay = await this.mtProvider.translate(englishResponse, { from: 'EN', to: 'TH' });
    const latencyMs = Date.now() - startTime;

    this.totalLatencyMs += latencyMs;

    return {
      canonicalEnglish: englishResponse,
      displayThai: thaiDisplay,
      latencyMs
    };
  }

  /**
   * Returns clean, 100% English conversation history
   */
  public getCanonicalHistory(): ChatMessage[] {
    return [...this.history];
  }

  /**
   * Returns current Session Language Savings metrics
   */
  public getSessionStats(): SessionStats {
    const avoided = Math.max(0, this.totalThaiTokens - this.totalEngTokens);
    const pct = this.totalThaiTokens > 0 ? (avoided / this.totalThaiTokens) * 100 : 0;

    return {
      totalTurns: Math.floor(this.history.length / 2),
      originalThaiEquivalentTokens: this.totalThaiTokens,
      transmittedEnglishTokens: this.totalEngTokens,
      tokensAvoided: avoided,
      percentageSaved: Number(pct.toFixed(1)),
      totalMTLatencyMs: this.totalLatencyMs,
      mtCostDollars: 0
    };
  }

  /**
   * Generates a shareable Markdown badge/report for social media / PRs
   */
  public generateShareableStats(): string {
    const stats = this.getSessionStats();
    return `### 🌐 OpenNative Language Savings Report
- **Original Thai Equivalent**: ${stats.originalThaiEquivalentTokens} tokens
- **Transmitted English**: ${stats.transmittedEnglishTokens} tokens
- **Tokens Avoided**: **${stats.tokensAvoided} tokens (${stats.percentageSaved}% saved)**
- **Translation Cost**: **$0.00** (Local Machine Translation)
*Coded in Thai. Transmitted in English. Powered by OpenNative.*`;
  }

  public clearHistory(): void {
    this.history = [];
    this.totalThaiTokens = 0;
    this.totalEngTokens = 0;
    this.totalLatencyMs = 0;
  }

  public updateLastTurnTokens(engTokens: number): void {
    this.totalEngTokens += engTokens;
  }
}
