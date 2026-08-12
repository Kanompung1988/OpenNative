declare module 'readline' {
  export interface Interface {
    question(query: string, callback: (answer: string) => void): void;
    close(): void;
  }
  export function createInterface(options: any): Interface;
}

declare var process: {
  env: Record<string, string | undefined>;
  argv: string[];
  stdin: any;
  stdout: {
    write(str: string): boolean;
  };
  exit(code?: number): never;
};

declare var console: {
  log(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
};
