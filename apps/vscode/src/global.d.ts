declare module 'vscode' {
  export interface ExtensionContext {
    subscriptions: Array<{ dispose(): any }>;
    extensionUri: Uri;
  }
  export interface Uri {
    toString(): string;
  }
  export interface TextEditor {
    selection: Selection;
    document: TextDocument;
  }
  export interface Selection {
    start: any;
    end: any;
  }
  export interface TextDocument {
    getText(selection?: Selection): string;
  }
  export interface OutputChannel {
    show(): void;
    appendLine(value: string): void;
  }
  export interface Webview {
    options: any;
    html: string;
    onDidReceiveMessage(listener: (data: any) => any): any;
    postMessage(message: any): Thenable<boolean>;
  }
  export interface WebviewView {
    webview: Webview;
  }
  export interface WebviewViewResolveContext {
    [key: string]: any;
  }
  export interface CancellationToken {
    isCancellationRequested: boolean;
  }
  export interface WebviewViewProvider {
    resolveWebviewView(
      webviewView: WebviewView,
      context: WebviewViewResolveContext,
      token: CancellationToken
    ): void | Promise<void>;
  }

  export namespace window {
    export const activeTextEditor: TextEditor | undefined;
    export function showInputBox(options?: any): Promise<string | undefined>;
    export function showInformationMessage(message: string, ...items: string[]): Promise<string | undefined>;
    export function showErrorMessage(message: string, ...items: string[]): Promise<string | undefined>;
    export function createOutputChannel(name: string): OutputChannel;
    export function registerWebviewViewProvider(viewId: string, provider: WebviewViewProvider): { dispose(): any };
  }

  export namespace commands {
    export function registerCommand(command: string, callback: (...args: any[]) => any): { dispose(): any };
  }
}

declare var console: {
  log(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
};
