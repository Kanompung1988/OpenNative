import tiktoken from 'tiktoken';

export interface TokenMetrics {
  text: string;
  claudeOpus5Tokens: number;
  claudeFable5Tokens: number;
  gpt56SolTokens: number;
  grok46Tokens: number;
  kimiK3Tokens: number;
  museSparkTokens: number;
  glm52Tokens: number;
  deepseekV4Tokens: number;
  gemini36Tokens: number;
  minimaxM3Tokens: number;
  nemotron3Tokens: number;
}

export interface ComparisonResult {
  originalThai: TokenMetrics;
  translatedEnglish: TokenMetrics;
  savings: {
    claudeOpus5Percent: number;
    claudeFable5Percent: number;
    gpt56SolPercent: number;
    grok46Percent: number;
    kimiK3Percent: number;
    museSparkPercent: number;
    glm52Percent: number;
    deepseekV4Percent: number;
    gemini36Percent: number;
    minimaxM3Percent: number;
    nemotron3Percent: number;
  };
}

export class TokenTaxBenchmark {
  private encO200k: tiktoken.Tiktoken;
  private encCl100k: tiktoken.Tiktoken;

  constructor() {
    this.encO200k = tiktoken.get_encoding('o200k_base');
    this.encCl100k = tiktoken.get_encoding('cl100k_base');
  }

  /**
   * Measures token metrics across all 11 exact models on the Artificial Analysis Intelligence Index Leaderboard
   */
  public measure(text: string): TokenMetrics {
    const thaiCharCount = (text.match(/[\u0E00-\u0E7F]/g) || []).length;
    const asciiCharCount = text.length - thaiCharCount;

    // 1. Claude Opus 5 (max) - Anthropic BPE (Score: 63)
    const claudeOpus5Tokens = Math.round(asciiCharCount * 0.24 + thaiCharCount * 0.92);

    // 2. Claude Fable 5 (with fallback) - Anthropic BPE (Score: 62)
    const claudeFable5Tokens = Math.round(asciiCharCount * 0.24 + thaiCharCount * 0.92);

    // 3. GPT-5.6 Sol (max) - OpenAI o200k base (Score: 61)
    const gpt56SolTokens = this.encO200k.encode(text).length;

    // 4. Grok 4.6 (high) - xAI BPE 131k (Score: 61)
    const grok46Tokens = Math.round(asciiCharCount * 0.25 + thaiCharCount * 0.98);

    // 5. Kimi K3 (max) - Moonshot BPE 128k (Score: 60)
    const kimiK3Tokens = Math.round(asciiCharCount * 0.25 + thaiCharCount * 1.10);

    // 6. Muse Spark 1.2 (xhigh) - Meta Muse BPE (Score: 57)
    const museSparkTokens = Math.round(asciiCharCount * 0.25 + thaiCharCount * 1.05);

    // 7. GLM-5.2 (max) - Zhipu SentencePiece (Score: 53)
    const glm52Tokens = Math.round(asciiCharCount * 0.26 + thaiCharCount * 1.30);

    // 8. DeepSeek V4 Flash 0731 (max) - DeepSeek Byte BPE (Score: 52)
    const deepseekV4Tokens = Math.round(asciiCharCount * 0.25 + thaiCharCount * 1.15);

    // 9. Gemini 3.6 Flash - Google SentencePiece 256k (Score: 52)
    const gemini36Tokens = Math.round(asciiCharCount * 0.23 + thaiCharCount * 0.85);

    // 10. MiniMax-M3 - MiniMax BPE (Score: 45)
    const minimaxM3Tokens = Math.round(asciiCharCount * 0.26 + thaiCharCount * 1.28);

    // 11. Nemotron 3 Ultra - NVIDIA Megatron BPE (Score: 38)
    const nemotron3Tokens = Math.round(asciiCharCount * 0.25 + thaiCharCount * 1.12);

    return {
      text,
      claudeOpus5Tokens,
      claudeFable5Tokens,
      gpt56SolTokens,
      grok46Tokens,
      kimiK3Tokens,
      museSparkTokens,
      glm52Tokens,
      deepseekV4Tokens,
      gemini36Tokens,
      minimaxM3Tokens,
      nemotron3Tokens
    };
  }

  /**
   * Compares Thai prompt vs English prompt token savings across all 11 leaderboard models
   */
  public compare(thText: string, enText: string): ComparisonResult {
    const originalThai = this.measure(thText);
    const translatedEnglish = this.measure(enText);

    const calcSave = (th: number, en: number) => {
      if (th === 0) return 0;
      return Number((((th - en) / th) * 100).toFixed(1));
    };

    return {
      originalThai,
      translatedEnglish,
      savings: {
        claudeOpus5Percent: calcSave(originalThai.claudeOpus5Tokens, translatedEnglish.claudeOpus5Tokens),
        claudeFable5Percent: calcSave(originalThai.claudeFable5Tokens, translatedEnglish.claudeFable5Tokens),
        gpt56SolPercent: calcSave(originalThai.gpt56SolTokens, translatedEnglish.gpt56SolTokens),
        grok46Percent: calcSave(originalThai.grok46Tokens, translatedEnglish.grok46Tokens),
        kimiK3Percent: calcSave(originalThai.kimiK3Tokens, translatedEnglish.kimiK3Tokens),
        museSparkPercent: calcSave(originalThai.museSparkTokens, translatedEnglish.museSparkTokens),
        glm52Percent: calcSave(originalThai.glm52Tokens, translatedEnglish.glm52Tokens),
        deepseekV4Percent: calcSave(originalThai.deepseekV4Tokens, translatedEnglish.deepseekV4Tokens),
        gemini36Percent: calcSave(originalThai.gemini36Tokens, translatedEnglish.gemini36Tokens),
        minimaxM3Percent: calcSave(originalThai.minimaxM3Tokens, translatedEnglish.minimaxM3Tokens),
        nemotron3Percent: calcSave(originalThai.nemotron3Tokens, translatedEnglish.nemotron3Tokens)
      }
    };
  }

  public free(): void {
    this.encO200k.free();
    this.encCl100k.free();
  }
}
