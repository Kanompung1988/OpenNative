/**
 * @opennative/core-protector
 * Robust Code, Identifier, Path, and Stack Trace protection engine.
 * Replaces protected tokens with sentinel placeholders (__PH_0__) before MT
 * and restores them accurately afterwards.
 */

export interface MaskResult {
  maskedText: string;
  map: Map<string, string>;
  placeholders: string[];
}

export interface RestoreResult {
  restoredText: string;
  success: boolean;
  missingPlaceholders: string[];
}

export class CodeProtector {
  private static readonly PLACEHOLDER_PREFIX = '__PH_';
  private static readonly PLACEHOLDER_SUFFIX = '__';

  private static readonly PATTERNS: { name: string; regex: RegExp }[] = [
    // 1. Multiline Fenced Code Blocks (```ts ... ```)
    { name: 'code_block', regex: /```[\s\S]*?```/g },

    // 2. Inline Backtick Code (`...`)
    { name: 'inline_code', regex: /`[^`\r\n]+`/g },

    // 3. Stack Traces & Errors (at Service.method (file.ts:12:34))
    { name: 'stack_trace', regex: /\bat\s+[a-zA-Z0-9_$.<>]+\s+\([^)]+\)|\bError:\s+[^\r\n]+/g },

    // 4. Git Diff Blocks (+ const x = 1, - const x = 2)
    { name: 'git_diff', regex: /^(?:\+|\-)\s+[\s\S]*?(?=\r?\n[^+@]|$)/gm },

    // 5. URLs & Web Endpoints
    { name: 'url', regex: /https?:\/\/[^\s\u0E00-\u0E7F"'()]+/g },

    // 6. File Paths & Extensions (e.g., src/auth/middleware.ts, ./config/db.json)
    { 
      name: 'file_path', 
      regex: /(?:[a-zA-Z0-9_.-]+\/)+[a-zA-Z0-9_.-]+\.[a-zA-Z0-9]{1,6}|\b[a-zA-Z0-9_.-]+\.(?:ts|tsx|js|jsx|py|go|rs|cpp|c|h|java|json|yaml|yml|md|html|css|scss|sql|sh|ps1|toml|env)\b/g 
    },

    // 7. CLI Commands & Package Operations
    { 
      name: 'cli_command', 
      regex: /\b(?:npm|pnpm|yarn|git|docker|kubectl|cargo|pip|python|node|go|make|npx)\s+[a-zA-Z0-9_.:-]+(?:\s+[a-zA-Z0-9_.:-]+)*/g 
    },

    // 8. Code Identifiers & Method Invocations (camelCase, PascalCase, snake_case, dot notation)
    { 
      name: 'identifier', 
      regex: /\b[a-zA-Z_][a-zA-Z0-9_-]*(?:\.[a-zA-Z_][a-zA-Z0-9_-]*)+(?:\(\))?|\b[a-z]+(?:[A-Z][a-z0-9]+)+\b|\b[A-Z][a-zA-Z0-9]+(?:[A-Z][a-z0-9]+)+\b|\b[a-z0-9]+(?:-[a-z0-9]+){2,}\b/g 
    },

    // 9. Standard Programming Keywords & Framework Tokens
    { 
      name: 'tech_keywords', 
      regex: /\b(?:null|undefined|true|false|NaN|async|await|useState|useEffect|useContext|useReducer|useCallback|useMemo|props|state|interface|type|export|import|const|let|var|return|function)\b/g 
    }
  ];

  /**
   * Replaces all code/file/identifier targets with __PH_n__ sentinels
   */
  public mask(input: string): MaskResult {
    let currentText = input;
    const map = new Map<string, string>();
    const placeholders: string[] = [];
    let counter = 0;

    for (const pattern of CodeProtector.PATTERNS) {
      currentText = currentText.replace(pattern.regex, (match) => {
        // Skip string if it's already a placeholder
        if (match.startsWith(CodeProtector.PLACEHOLDER_PREFIX) && match.endsWith(CodeProtector.PLACEHOLDER_SUFFIX)) {
          return match;
        }

        const placeholder = `${CodeProtector.PLACEHOLDER_PREFIX}${counter++}${CodeProtector.PLACEHOLDER_SUFFIX}`;
        map.set(placeholder, match);
        placeholders.push(placeholder);
        return placeholder;
      });
    }

    return {
      maskedText: currentText,
      map,
      placeholders
    };
  }

  /**
   * Restores sentinel placeholders back to original strings
   */
  public restore(maskedText: string, map: Map<string, string>): RestoreResult {
    let restoredText = maskedText;
    const missingPlaceholders: string[] = [];

    for (const [placeholder, originalValue] of map.entries()) {
      if (restoredText.includes(placeholder)) {
        restoredText = restoredText.replaceAll(placeholder, originalValue);
      } else {
        missingPlaceholders.push(placeholder);
      }
    }

    // Safety fallback: if MT dropped a placeholder, append original to preserve context
    if (missingPlaceholders.length > 0) {
      const appended = missingPlaceholders
        .map((ph) => map.get(ph))
        .filter(Boolean)
        .join(' ');
      if (appended) {
        restoredText = `${restoredText}\n[Code Context Preserved: ${appended}]`;
      }
    }

    return {
      restoredText,
      success: missingPlaceholders.length === 0,
      missingPlaceholders
    };
  }

  /**
   * Validates if sentinel mapping is intact inside text
   */
  public validate(targetText: string, map: Map<string, string>): boolean {
    for (const placeholder of map.keys()) {
      if (!targetText.includes(placeholder)) return false;
    }
    return true;
  }
}
