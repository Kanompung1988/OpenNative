import { CodeProtector, MaskResult } from '@opennative/core-protector';

export interface MTTranslateOptions {
  from: 'TH' | 'EN';
  to: 'TH' | 'EN';
}

export interface MTProvider {
  name: string;
  translate(input: string, options: MTTranslateOptions): Promise<string>;
  translateStream?(input: string, options: MTTranslateOptions): AsyncIterable<string>;
}

/**
 * StreamSegmenter flushes chunks of text on sentence boundaries (. ! ? \n)
 * preventing UI flicker when rendering local MT output in real-time.
 */
export class StreamSegmenter {
  private buffer = '';
  private readonly delimiterRegex = /([.!?\n]+)/;

  public push(chunk: string): string[] {
    this.buffer += chunk;
    const parts = this.buffer.split(this.delimiterRegex);
    const completedSentences: string[] = [];

    // Process all pairs of [sentence, delimiter]
    while (parts.length >= 2) {
      const sentence = parts.shift()!;
      const delimiter = parts.shift()!;
      completedSentences.push(sentence + delimiter);
    }

    this.buffer = parts.join('');
    return completedSentences;
  }

  public flush(): string {
    const remaining = this.buffer;
    this.buffer = '';
    return remaining;
  }
}

export class OllamaTyphoonProvider implements MTProvider {
  public name = 'Ollama-Typhoon-4B';
  private endpoint: string;
  private model: string;
  private protector: CodeProtector;

  constructor(
    endpoint: string = 'http://localhost:11434',
    model: string = 'scb10x/typhoon-translate-4b'
  ) {
    this.endpoint = endpoint;
    this.model = model;
    this.protector = new CodeProtector();
  }

  public async translate(input: string, options: MTTranslateOptions): Promise<string> {
    const maskResult: MaskResult = this.protector.mask(input);

    const systemPrompt = `You are a professional software development translation engine. Translate the text from ${options.from} to ${options.to}.
STRICT RULES:
1. Preserve all __PH_0__, __PH_1__, etc. sentinel tags EXACTLY as written.
2. Do not explain or add commentary. Output ONLY translated content.`;

    try {
      const response = await fetch(`${this.endpoint}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: maskResult.maskedText }
          ],
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`Ollama HTTP ${response.status}: ${response.statusText}`);
      }

      const data = (await response.json()) as { message?: { content?: string } };
      const translatedMasked = data.message?.content?.trim() || maskResult.maskedText;

      const restoreResult = this.protector.restore(translatedMasked, maskResult.map);
      return restoreResult.restoredText;
    } catch (error) {
      console.warn(`[OllamaTyphoonProvider] Fallback active: ${(error as Error).message}`);
      return new MockMTProvider().translate(input, options);
    }
  }
}

export class MockMTProvider implements MTProvider {
  public name = 'Mock-Local-MT';
  private protector = new CodeProtector();

  public async translate(input: string, options: MTTranslateOptions): Promise<string> {
    const { maskedText, map } = this.protector.mask(input);

    let translated = maskedText;
    if (options.from === 'TH' && options.to === 'EN') {
      translated = maskedText
        .replace(/ช่วย/g, 'Please')
        .replace(/หน่อย/g, '')
        .replace(/แก้/g, 'fix')
        .replace(/ทำ/g, 'do')
        .replace(/ดู/g, 'inspect')
        .replace(/ใน/g, 'in')
        .replace(/ให้/g, 'to')
        .replace(/แทน/g, 'instead of')
        .replace(/ยิง/g, 'Send request to')
        .replace(/คืนค่า/g, 'returns');
    } else if (options.from === 'EN' && options.to === 'TH') {
      translated = maskedText
        .replace(/Inspecting request:/g, 'กำลังตรวจสอบคำขอ:')
        .replace(/I have inspected your request/g, 'ฉันได้ตรวจสอบคำขอของคุณแล้ว')
        .replace(/The code logic is updated successfully/g, 'แก้ไขลอจิกของโค้ดสำเร็จเรียบร้อยแล้ว')
        .replace(/Fix/g, 'แก้ไข')
        .replace(/Inspect/g, 'ตรวจสอบ')
        .replace(/completed/g, 'เสร็จสิ้น');
    }

    return this.protector.restore(translated, map).restoredText;
  }
}
