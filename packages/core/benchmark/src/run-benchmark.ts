import { TokenTaxBenchmark } from './index.js';
import { CodeProtector } from '@opennative/core-protector';

const DATASET = [
  {
    th: 'ช่วย refactor ฟังก์ชัน handleSubmit ใน src/components/LoginForm.tsx ให้ใช้ react-hook-form แทน useState',
    en: 'Please refactor the handleSubmit function in src/components/LoginForm.tsx to use react-hook-form instead of useState.'
  },
  {
    th: 'ยิง API ไปที่ backend แล้วมันคืนค่า 500 Internal Server Error ช่วยดู middleware ใน auth.ts หน่อย',
    en: 'Hitting the backend API returns a 500 Internal Server Error. Please inspect the middleware in auth.ts.'
  },
  {
    th: 'ช่วยเขียน unit test สำหรับ UserService.createUser ให้ครอบคลุมกรณี email ซ้ำ และ password สั้นเกินไป',
    en: 'Please write unit tests for UserService.createUser covering duplicate email and password too short cases.'
  },
  {
    th: 'ช่วยปรับแต่งประสิทธิภาพของ SQL query ใน file src/db/queries.ts ให้ลดเวลาในการ query จาก 2 วินาทีเหลือต่ำกว่า 100ms',
    en: 'Please optimize the SQL query in src/db/queries.ts to reduce execution time from 2 seconds to below 100ms.'
  },
  {
    th: 'แก้บั๊กค้างเมื่อผู้ใช้กดปุ่ม logout ตอนที่ network connection เป็น offline',
    en: 'Fix the crash when the user clicks the logout button while the network connection is offline.'
  }
];

function run() {
  console.log('================================================================================');
  console.log(' 🚀 OPENNATIVE BENCHMARK — Artificial Analysis Intelligence Index (Top 11 Models)');
  console.log('================================================================================\n');

  const benchmark = new TokenTaxBenchmark();
  const protector = new CodeProtector();

  let sumClaudeOpus5 = 0, sumClaudeFable5 = 0, sumGpt56Sol = 0, sumGrok46 = 0, sumKimiK3 = 0;
  let sumMuseSpark = 0, sumGlm52 = 0, sumDeepseekV4 = 0, sumGemini36 = 0, sumMinimaxM3 = 0, sumNemotron3 = 0;

  DATASET.forEach((item, index) => {
    const { maskedText } = protector.mask(item.th);
    const result = benchmark.compare(item.th, item.en);

    console.log(`[Prompt #${index + 1}]`);
    console.log(`🇹🇭 TH: "${item.th}"`);
    console.log(`🇺🇸 EN: "${item.en}"`);
    console.log(`🔒 Masked: "${maskedText}"`);
    console.log('--------------------------------------------------------------------------------');
    console.log(` Token Count (TH vs EN):`);
    console.log(`  1. Claude Opus 5 (max) [Score: 63]:         ${result.originalThai.claudeOpus5Tokens} -> ${result.translatedEnglish.claudeOpus5Tokens} tokens (${result.savings.claudeOpus5Percent}% saved)`);
    console.log(`  2. Claude Fable 5 (with fallback) [62]:      ${result.originalThai.claudeFable5Tokens} -> ${result.translatedEnglish.claudeFable5Tokens} tokens (${result.savings.claudeFable5Percent}% saved)`);
    console.log(`  3. GPT-5.6 Sol (max) [Score: 61]:           ${result.originalThai.gpt56SolTokens} -> ${result.translatedEnglish.gpt56SolTokens} tokens (${result.savings.gpt56SolPercent}% saved)`);
    console.log(`  4. Grok 4.6 (high) [Score: 61]:             ${result.originalThai.grok46Tokens} -> ${result.translatedEnglish.grok46Tokens} tokens (${result.savings.grok46Percent}% saved)`);
    console.log(`  5. Kimi K3 (max) [Score: 60]:               ${result.originalThai.kimiK3Tokens} -> ${result.translatedEnglish.kimiK3Tokens} tokens (${result.savings.kimiK3Percent}% saved)`);
    console.log(`  6. Muse Spark 1.2 (xhigh) [Score: 57]:      ${result.originalThai.museSparkTokens} -> ${result.translatedEnglish.museSparkTokens} tokens (${result.savings.museSparkPercent}% saved)`);
    console.log(`  7. GLM-5.2 (max) [Score: 53]:               ${result.originalThai.glm52Tokens} -> ${result.translatedEnglish.glm52Tokens} tokens (${result.savings.glm52Percent}% saved)`);
    console.log(`  8. DeepSeek V4 Flash 0731 (max) [52]:       ${result.originalThai.deepseekV4Tokens} -> ${result.translatedEnglish.deepseekV4Tokens} tokens (${result.savings.deepseekV4Percent}% saved)`);
    console.log(`  9. Gemini 3.6 Flash [Score: 52]:            ${result.originalThai.gemini36Tokens} -> ${result.translatedEnglish.gemini36Tokens} tokens (${result.savings.gemini36Percent}% saved)`);
    console.log(` 10. MiniMax-M3 [Score: 45]:                  ${result.originalThai.minimaxM3Tokens} -> ${result.translatedEnglish.minimaxM3Tokens} tokens (${result.savings.minimaxM3Percent}% saved)`);
    console.log(` 11. Nemotron 3 Ultra [Score: 38]:            ${result.originalThai.nemotron3Tokens} -> ${result.translatedEnglish.nemotron3Tokens} tokens (${result.savings.nemotron3Percent}% saved)`);
    console.log('\n');

    sumClaudeOpus5 += result.savings.claudeOpus5Percent;
    sumClaudeFable5 += result.savings.claudeFable5Percent;
    sumGpt56Sol += result.savings.gpt56SolPercent;
    sumGrok46 += result.savings.grok46Percent;
    sumKimiK3 += result.savings.kimiK3Percent;
    sumMuseSpark += result.savings.museSparkPercent;
    sumGlm52 += result.savings.glm52Percent;
    sumDeepseekV4 += result.savings.deepseekV4Percent;
    sumGemini36 += result.savings.gemini36Percent;
    sumMinimaxM3 += result.savings.minimaxM3Percent;
    sumNemotron3 += result.savings.nemotron3Percent;
  });

  const count = DATASET.length;
  console.log('================================================================================');
  console.log(' 📊 AVERAGE TOKEN SAVINGS SUMMARY (Artificial Analysis Top 11 Models)');
  console.log('================================================================================');
  console.log(` 🔹 1. Claude Opus 5 (max) [Score: 63]:         ${(sumClaudeOpus5 / count).toFixed(1)}% Token Savings`);
  console.log(` 🔹 2. Claude Fable 5 (with fallback) [62]:      ${(sumClaudeFable5 / count).toFixed(1)}% Token Savings`);
  console.log(` 🔹 3. GPT-5.6 Sol (max) [Score: 61]:           ${(sumGpt56Sol / count).toFixed(1)}% Token Savings`);
  console.log(` 🔹 4. Grok 4.6 (high) [Score: 61]:             ${(sumGrok46 / count).toFixed(1)}% Token Savings`);
  console.log(` 🔹 5. Kimi K3 (max) [Score: 60]:               ${(sumKimiK3 / count).toFixed(1)}% Token Savings`);
  console.log(` 🔹 6. Muse Spark 1.2 (xhigh) [Score: 57]:      ${(sumMuseSpark / count).toFixed(1)}% Token Savings`);
  console.log(` 🔹 7. GLM-5.2 (max) [Score: 53]:               ${(sumGlm52 / count).toFixed(1)}% Token Savings`);
  console.log(` 🔹 8. DeepSeek V4 Flash 0731 (max) [52]:       ${(sumDeepseekV4 / count).toFixed(1)}% Token Savings`);
  console.log(` 🔹 9. Gemini 3.6 Flash [Score: 52]:            ${(sumGemini36 / count).toFixed(1)}% Token Savings`);
  console.log(` 🔹 10. MiniMax-M3 [Score: 45]:                 ${(sumMinimaxM3 / count).toFixed(1)}% Token Savings`);
  console.log(` 🔹 11. Nemotron 3 Ultra [Score: 38]:           ${(sumNemotron3 / count).toFixed(1)}% Token Savings`);
  console.log('================================================================================\n');

  benchmark.free();
}

run();
