import readline from 'readline';
import { TokenTaxBenchmark } from '@opennative/core-benchmark';
import { OllamaTyphoonProvider, MockMTProvider, MTProvider } from '@opennative/core-mt';
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

async function main() {
  printBanner();

  const args = process.argv.slice(2);
  const targetAgentArg = (args[0] || 'codex').toLowerCase();

  let agentProvider: AgentProvider;

  if (targetAgentArg === 'claude') {
    agentProvider = new ClaudeAPIProvider();
  } else if (targetAgentArg === 'deepseek' || targetAgentArg === 'qwen') {
    agentProvider = new OpenAICompatibleProvider('DeepSeek-V3');
  } else {
    agentProvider = new CodexAppServerProvider();
  }

  await agentProvider.connect();
  const threadId = await agentProvider.createThread();

  const mtProvider: MTProvider = new OllamaTyphoonProvider();
  const benchmark = new TokenTaxBenchmark();
  const engine = new CanonicalTranscriptEngine(mtProvider);

  console.log('\x1b[32m%s\x1b[0m', `✔ OpenNative Gateway active with Agent: [${agentProvider.name}]`);
  console.log('\x1b[90m%s\x1b[0m', 'Commands: /stats (Show Savings), /clear (Reset Session), /exit (Quit)\n');

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
      for await (const event of agentProvider.send(threadId, turnResult.canonicalEnglish)) {
        if (event.type === 'text') {
          const agentTurnResult = await engine.processAgentResponse(event.content);
          console.log(`   "${agentTurnResult.displayThai}"`);
        } else if (event.type === 'diff' || event.type === 'code') {
          console.log(`\n\x1b[35m[${event.type.toUpperCase()}]\x1b[0m\n${event.content}\n`);
        }
      }

      console.log('\n\x1b[90m%s\x1b[0m', '---------------------------------------------------------------');
      promptUser();
    });
  };

  promptUser();
}

main().catch(console.error);
