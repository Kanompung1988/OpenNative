// Ambient definitions for Node.js built-in modules & globals
declare module 'child_process' {
  export interface ChildProcess {
    stdout: any;
    stdin: any;
    stderr: any;
    kill(signal?: string): boolean;
    on(event: string, listener: (...args: any[]) => void): this;
  }
  export function spawn(command: string, args?: string[], options?: any): ChildProcess;
}

declare module 'events' {
  export class EventEmitter {
    emit(event: string, ...args: any[]): boolean;
    on(event: string, listener: (...args: any[]) => void): this;
    once(event: string, listener: (...args: any[]) => void): this;
  }
}

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
  stdout: any;
  exit(code?: number): never;
};

declare var Buffer: {
  from(data: any): any;
  toString(): string;
};

declare var TextDecoder: {
  new (encoding?: string): {
    decode(input?: any, options?: { stream?: boolean }): string;
  };
};
