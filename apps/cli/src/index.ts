#!/usr/bin/env node

import readline from 'readline';
import { TokenTaxBenchmark } from '@opennative/core-benchmark';
import { OllamaTyphoonProvider, MockMTProvider, MTProvider, isOllamaRunning } from '@opennative/core-mt';
import { CanonicalTranscriptEngine } from '@opennative/core-transcript';
import { AgentProvider, CodexAppServerProvider, ClaudeAPIProvider, OpenAICompatibleProvider } from '@opennative/core-providers';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function printBanner() {
  console.log('\x1b[36m%s\x1b[0m', '===============================================================');
  console.log('\x1b[1m\x1b[33m%s\x1b[0m', ' 🌐 OPENNATIVE — Native Language Layer for AI Coding Agents ');
  console.log('\x1b[36m%s\x1b[0m', '   Thai UX. English Tokens. Zero Translation LLM Tokens.');
  console.log('\x1b[36m%s\x1b[0m', '===============================================================\n');
}

function parseArgs(args: string[]) {
  const options: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        options[key] = next;
        i++;
      } else {
        options[key] = 'true';
      }
    } else if (i === 0 && !arg.startsWith('-')) {
      options.agent = arg;
    }
  }
  return options;
}

async function main() {
  printBanner();

  const args = parseArgs(process.argv.slice(2));
  const targetAgent = (args.agent || args['target'] || 'codex').toLowerCase();
  const apiKey = args['api-key'] || args['key'] || '';
  const baseUrl = args['base-url'] || '';
  const model = args['model'] || '';

  let agentProvider: AgentProvider;

  if (targetAgent === 'claude') {
    agentProvider = new ClaudeAPIProvider(apiKey || process.env.ANTHROPIC_API_KEY || '', model || 'claude-3-5-sonnet-20241022');
  } else if (targetAgent === 'deepseek' || targetAgent === 'qwen' || targetAgent === 'openai') {
    const providerName = targetAgent === 'qwen' ? 'Qwen-2.5-Coder' : 'DeepSeek-V3';
    const defaultUrl = targetAgent === 'qwen' ? 'https://dashscope.aliyuncs.com/compatible-mode/v1' : 'https://api.deepseek.com/v1';
    const defaultKey = targetAgent === 'qwen' ? process.env.DASHSCOPE_API_KEY : process.env.DEEPSEEK_API_KEY;
    const defaultModel = targetAgent === 'qwen' ? 'qwen2.5-coder-7b-instruct' : 'deepseek-chat';

    agentProvider = new OpenAICompatibleProvider(
      providerName,
      baseUrl || defaultUrl,
      apiKey || defaultKey || '',
      model || defaultModel
    );
  } else {
    agentProvider = new CodexAppServerProvider();
  }

  await agentProvider.connect();
  const threadId = await agentProvider.createThread();

  // Auto-detect local Ollama
  const ollamaActive = await isOllamaRunning();
  const mtProvider: MTProvider = ollamaActive ? new OllamaTyphoonProvider() : new MockMTProvider();

  console.log('\x1b[32m%s\x1b[0m', `✔ OpenNative Gateway active with Agent: [${agentProvider.name}]`);
  if (ollamaActive) {
    console.log('\x1b[32m%s\x1b[0m', `✔ Local Machine Translation: [Ollama Typhoon 4B] (Local GPU/CPU)`);
  } else {
    console.log('\x1b[33m%s\x1b[0m', `⚡ Local Machine Translation: [Mock Fallback] (Start Ollama for real local MT)`);
  }
  console.log('\x1b[90m%s\x1b[0m', 'Commands: /stats (Show Savings), /clear (Reset Session), /exit (Quit)\n');

  const benchmark = new TokenTaxBenchmark();
  const engine = new CanonicalTranscriptEngine(mtProvider);

  const promptUser = () => {
    rl.question('\x1b[1m\x1b[34m🇹🇭 You (Thai):\x1b[0m ', async (thaiInput: string) => {
      const trimmed = thaiInput.trim();

      if (trimmed === '/exit' || trimmed === 'exit' || trimmed === 'quit') {
        const stats = engine.getSessionStats();
        console.log('\n\x1b[33m%s\x1b[0m', '===============================================================');
        console.log('\x1b[33m%s\x1b[0m', ` 📊 OPENNATIVE SESSION TOKEN SAVINGS SUMMARY`);
        console.log(`  - Total Agent Turns:        ${stats.totalTurns}`);
        console.log(`  - Thai Equivalent Tokens:   ${stats.originalThaiEquivalentTokens}`);
        console.log(`  - Transmitted EN Tokens:   ${stats.transmittedEnglishTokens}`);
        console.log(`  - Total Tokens Avoided:     \x1b[32m${stats.tokensAvoided} (${stats.percentageSaved}% saved)\x1b[0m`);
        console.log(`  - Machine Translation Cost: \x1b[32m$0.00\x1b[0m`);
        console.log('\x1b[33m%s\x1b[0m', '===============================================================\n');
        benchmark.free();
        rl.close();
        process.exit(0);
      }

      if (trimmed === '/stats') {
        console.log('\n' + engine.generateShareableStats() + '\n');
        promptUser();
        return;
      }

      if (trimmed === '/clear') {
        engine.clearHistory();
        console.log('\x1b[32m%s\x1b[0m', '✔ Session history and token stats cleared.\n');
        promptUser();
        return;
      }

      if (!trimmed) {
        promptUser();
        return;
      }

      console.log('\x1b[90m%s\x1b[0m', '⏳ Protecting code sentinels & translating via Local MT...');

      // 1. Measure tokens before translation
      const initialMetrics = benchmark.measure(trimmed);

      // 2. Translate TH -> EN
      const turnResult = await engine.processUserPrompt(
        trimmed,
        initialMetrics.qwenTokens,
        0
      );

      const postMetrics = benchmark.compare(trimmed, turnResult.canonicalEnglish);
      engine.updateLastTurnTokens(postMetrics.translatedEnglish.qwenTokens);

      console.log('\n\x1b[1m\x1b[32m🇺🇸 Transmitted Canonical Prompt (EN):\x1b[0m');
      console.log(`   "${turnResult.canonicalEnglish}"`);

      console.log('\n\x1b[33m⚡ REAL-TIME LANGUAGE SAVINGS METER:\x1b[0m');
      console.log(`   - DeepSeek V3/R1: ${postMetrics.originalThai.deepseekTokens} TH -> ${postMetrics.translatedEnglish.deepseekTokens} EN tokens \x1b[32m(↓${postMetrics.savings.deepseekPercent}% saved)\x1b[0m`);
      console.log(`   - Qwen 2.5 Coder: ${postMetrics.originalThai.qwenTokens} TH -> ${postMetrics.translatedEnglish.qwenTokens} EN tokens \x1b[32m(↓${postMetrics.savings.qwenPercent}% saved)\x1b[0m`);
      console.log(`   - GPT-4o:         ${postMetrics.originalThai.o200kTokens} TH -> ${postMetrics.translatedEnglish.o200kTokens} EN tokens \x1b[32m(↓${postMetrics.savings.o200kPercent}% saved)\x1b[0m`);
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
