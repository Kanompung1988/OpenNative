#!/usr/bin/env node

import readline from 'readline';
import { CodeProtector } from '@opennative/core-protector';
import { TokenTaxBenchmark } from '@opennative/core-benchmark';
import { CanonicalTranscriptEngine } from '@opennative/core-transcript';
import { OllamaTyphoonProvider, MockMTProvider, isOllamaRunning } from '@opennative/core-mt';
import { ClaudeAPIProvider, OpenAICompatibleProvider, CodexAppServerProvider, AgentProvider } from '@opennative/core-providers';

interface CLIArgs {
  agent: 'claude' | 'deepseek' | 'qwen' | 'codex';
  apiKey?: string;
  baseUrl?: string;
  model?: string;
}

function parseArgs(args: string[]): CLIArgs {
  const result: CLIArgs = { agent: 'claude' };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--agent' && args[i + 1]) {
      result.agent = args[i + 1] as any;
      i++;
    } else if (arg === '--api-key' && args[i + 1]) {
      result.apiKey = args[i + 1];
      i++;
    } else if (arg === '--base-url' && args[i + 1]) {
      result.baseUrl = args[i + 1];
      i++;
    } else if (arg === '--model' && args[i + 1]) {
      result.model = args[i + 1];
      i++;
    } else if (!arg.startsWith('-') && i === 0) {
      if (['claude', 'deepseek', 'qwen', 'codex'].includes(arg)) {
        result.agent = arg as any;
      }
    }
  }
  return result;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  console.log('\n\x1b[1m\x1b[36m===============================================================\x1b[0m');
  console.log('\x1b[1m\x1b[36m 🌐 OPENNATIVE GATEWAY — Native Language Gateway for AI Agents \x1b[0m');
  console.log('\x1b[1m\x1b[36m===============================================================\x1b[0m');

  // 1. Detect Ollama for Local Machine Translation
  const ollamaOnline = await isOllamaRunning();
  let mtProvider;
  if (ollamaOnline) {
    console.log('\x1b[32m[+] Local Ollama (Typhoon 4B) detected. MT Cost: $0.00 (Zero Token Tax Mode)\x1b[0m');
    mtProvider = new OllamaTyphoonProvider();
  } else {
    console.log('\x1b[33m[!] Local Ollama not detected. Falling back to Standalone Agent Skill mode.\x1b[0m');
    mtProvider = new MockMTProvider();
  }

  // 2. Select Agent Provider
  let agentProvider: AgentProvider;
  if (args.agent === 'claude') {
    agentProvider = new ClaudeAPIProvider(args.apiKey, args.model);
    console.log(`\x1b[34m[+] Connected to Agent: Anthropic Claude API (${args.model || 'claude-3-5-sonnet'})\x1b[0m`);
  } else if (args.agent === 'deepseek' || args.agent === 'qwen') {
    const defaultUrl = args.agent === 'deepseek' ? 'https://api.deepseek.com/v1' : 'https://dashscope.aliyuncs.com/compatible-mode/v1';
    agentProvider = new OpenAICompatibleProvider(args.apiKey || '', args.baseUrl || defaultUrl, args.model || (args.agent === 'deepseek' ? 'deepseek-coder' : 'qwen-2.5-coder-72b'));
    console.log(`\x1b[34m[+] Connected to Agent: ${args.agent.toUpperCase()} Provider\x1b[0m`);
  } else {
    agentProvider = new CodexAppServerProvider();
    console.log('\x1b[34m[+] Connected to Agent: Codex App-Server (Stdio JSON-RPC)\x1b[0m');
  }

  const protector = new CodeProtector();
  const benchmark = new TokenTaxBenchmark();
  const engine = new CanonicalTranscriptEngine(mtProvider);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const threadId = 'session-' + Date.now();
  console.log('\x1b[90m%s\x1b[0m', '---------------------------------------------------------------');
  console.log('Type your coding request in your native language (e.g. Thai 🇹🇭).');
  console.log('Type "exit" or "quit" to stop.\n');

  const promptUser = () => {
    rl.question('\x1b[1m\x1b[33m🇹🇭 Native Developer Prompt > \x1b[0m', async (input) => {
      const trimmed = input.trim();
      if (!trimmed || trimmed.toLowerCase() === 'exit' || trimmed.toLowerCase() === 'quit') {
        console.log('\x1b[36mGoodbye! Keep prompting natively.\x1b[0m');
        benchmark.free();
        rl.close();
        process.exit(0);
      }

      console.log('\n\x1b[90m[OpenNative Engine Processing...]\x1b[0m');
      
      // 1. Masking
      const { maskedText } = protector.mask(trimmed);
      console.log(`🔒 Sentinels Protected: "${maskedText}"`);

      // 2. Canonical Transcript Engine
      const turnResult = await engine.processUserPrompt(trimmed);
      
      const postMetrics = benchmark.compare(trimmed, turnResult.canonicalEnglish);
      engine.updateLastTurnTokens(postMetrics.translatedEnglish.claudeOpus5Tokens);

      console.log('\n\x1b[1m\x1b[32m🇺🇸 Transmitted Canonical Prompt (EN):\x1b[0m');
      console.log(`   "${turnResult.canonicalEnglish}"`);

      console.log('\n\x1b[33m⚡ REAL-TIME LANGUAGE SAVINGS METER:\x1b[0m');
      console.log(`   - DeepSeek V4:   ${postMetrics.originalThai.deepseekV4Tokens} TH -> ${postMetrics.translatedEnglish.deepseekV4Tokens} EN tokens \x1b[32m(↓${postMetrics.savings.deepseekV4Percent}% saved)\x1b[0m`);
      console.log(`   - Claude Opus 5: ${postMetrics.originalThai.claudeOpus5Tokens} TH -> ${postMetrics.translatedEnglish.claudeOpus5Tokens} EN tokens \x1b[32m(↓${postMetrics.savings.claudeOpus5Percent}% saved)\x1b[0m`);
      console.log(`   - GPT-5.6 Sol:   ${postMetrics.originalThai.gpt56SolTokens} TH -> ${postMetrics.translatedEnglish.gpt56SolTokens} EN tokens \x1b[32m(↓${postMetrics.savings.gpt56SolPercent}% saved)\x1b[0m`);
      console.log(`   - Latency:        ${turnResult.latencyMs} ms | MT Cost: \x1b[32m$0.00\x1b[0m\n`);

      // 3. Transmit to Agent Provider & stream response
      console.log(`\x1b[1m\x1b[36m🤖 Agent [${agentProvider.name}] Output:\x1b[0m`);
      let agentAccumulated = '';
      for await (const event of agentProvider.send(threadId, turnResult.canonicalEnglish)) {
        if (event.type === 'text') {
          agentAccumulated += event.content;
          process.stdout.write(event.content);
        } else if (event.type === 'diff' || event.type === 'code') {
          console.log(`\n\x1b[35m[${event.type.toUpperCase()}]\x1b[0m\n${event.content}\n`);
        }
      }
      process.stdout.write('\n');

      if (agentAccumulated) {
        const agentTurnResult = await engine.processAgentResponse(agentAccumulated);
        console.log(`\n\x1b[1m\x1b[34m🇹🇭 Thai UI Render:\x1b[0m`);
        console.log(`   "${agentTurnResult.displayThai}"`);
      }

      console.log('\n\x1b[90m%s\x1b[0m', '---------------------------------------------------------------');
      promptUser();
    });
  };

  promptUser();
}

main().catch(console.error);
