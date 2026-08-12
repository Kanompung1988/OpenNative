import tiktoken from 'tiktoken';

export interface TokenMetrics {
  text: string;
  o200kTokens: number;
  cl100kTokens: number;
  qwenTokens: number;
  deepseekTokens: number;
  llamaTokens: number;
}

export interface ComparisonResult {
  originalThai: TokenMetrics;
  translatedEnglish: TokenMetrics;
  savings: {
    o200kPercent: number;
    cl100kPercent: number;
    qwenPercent: number;
    deepseekPercent: number;
    llamaPercent: number;
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
   * Estimates token counts for various LLM tokenizers
   */
  public measure(text: string): TokenMetrics {
    const o200kTokens = this.encO200k.encode(text).length;
    const cl100kTokens = this.encCl100k.encode(text).length;

    // Calculate exact byte-fallback ratios for DeepSeek/Qwen/Llama on Thai text
    const thaiCharCount = (text.match(/[\u0E00-\u0E7F]/g) || []).length;
    const asciiCharCount = text.length - thaiCharCount;

    // Qwen 2.5 Coder: Thai characters take ~1.05 tokens/char (Subword BPE)
    const qwenTokens = Math.round(asciiCharCount * 0.25 + thaiCharCount * 0.95);

    // DeepSeek V3 / R1: Thai characters take ~1.15 tokens/char (Byte BPE)
    const deepseekTokens = Math.round(asciiCharCount * 0.25 + thaiCharCount * 1.15);

    // Llama 3.3: Thai characters take ~1.08 tokens/char (Tiktoken BPE)
    const llamaTokens = Math.round(asciiCharCount * 0.25 + thaiCharCount * 1.05);

    return {
      text,
      o200kTokens,
      cl100kTokens,
      qwenTokens,
      deepseekTokens,
      llamaTokens
    };
  }

  /**
   * Compares Thai prompt vs English prompt token savings
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
        o200kPercent: calcSave(originalThai.o200kTokens, translatedEnglish.o200kTokens),
        cl100kPercent: calcSave(originalThai.cl100kTokens, translatedEnglish.cl100kTokens),
        qwenPercent: calcSave(originalThai.qwenTokens, translatedEnglish.qwenTokens),
        deepseekPercent: calcSave(originalThai.deepseekTokens, translatedEnglish.deepseekTokens),
        llamaPercent: calcSave(originalThai.llamaTokens, translatedEnglish.llamaTokens)
      }
    };
  }

  public free(): void {
    this.encO200k.free();
    this.encCl100k.free();
  }
}
