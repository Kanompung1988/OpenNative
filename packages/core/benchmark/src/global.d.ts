declare module 'tiktoken' {
  export interface Tiktoken {
    encode(text: string): Uint8Array;
    free(): void;
  }
  export function get_encoding(encoding: string): Tiktoken;
}

declare var console: {
  log(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
};
