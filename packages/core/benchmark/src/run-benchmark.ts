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
  console.log('===============================================================');
  console.log(' 🚀 OPENNATIVE (Phase 0) MULTI-TOKENIZER BENCHMARK REPORT ');
  console.log('===============================================================\n');

  const benchmark = new TokenTaxBenchmark();
  const protector = new CodeProtector();

  let sumSaveO200k = 0;
  let sumSaveCl100k = 0;
  let sumSaveQwen = 0;
  let sumSaveDeepSeek = 0;
  let sumSaveLlama = 0;

  DATASET.forEach((item, index) => {
    const { maskedText } = protector.mask(item.th);
    const result = benchmark.compare(item.th, item.en);

    console.log(`[Prompt #${index + 1}]`);
    console.log(`🇹🇭 TH: "${item.th}"`);
    console.log(`🇺🇸 EN: "${item.en}"`);
    console.log(`🔒 Masked: "${maskedText}"`);
    console.log('---------------------------------------------------------------');
    console.log(` Token Count (TH vs EN):`);
    console.log(`  - GPT-4o (o200k_base):  ${result.originalThai.o200kTokens} -> ${result.translatedEnglish.o200kTokens} tokens (${result.savings.o200kPercent}% saved)`);
    console.log(`  - GPT-4 (cl100k_base):  ${result.originalThai.cl100kTokens} -> ${result.translatedEnglish.cl100kTokens} tokens (${result.savings.cl100kPercent}% saved)`);
    console.log(`  - Qwen 2.5 Coder:       ${result.originalThai.qwenTokens} -> ${result.translatedEnglish.qwenTokens} tokens (${result.savings.qwenPercent}% saved)`);
    console.log(`  - DeepSeek V3 / R1:     ${result.originalThai.deepseekTokens} -> ${result.translatedEnglish.deepseekTokens} tokens (${result.savings.deepseekPercent}% saved)`);
    console.log(`  - Llama 3.3:            ${result.originalThai.llamaTokens} -> ${result.translatedEnglish.llamaTokens} tokens (${result.savings.llamaPercent}% saved)`);
    console.log('\n');

    sumSaveO200k += result.savings.o200kPercent;
    sumSaveCl100k += result.savings.cl100kPercent;
    sumSaveQwen += result.savings.qwenPercent;
    sumSaveDeepSeek += result.savings.deepseekPercent;
    sumSaveLlama += result.savings.llamaPercent;
  });

  const count = DATASET.length;
  console.log('===============================================================');
  console.log(' 📊 AVERAGE TOKEN SAVINGS SUMMARY ACROSS MODELS');
  console.log('===============================================================');
  console.log(` 🔹 OpenAI GPT-4o (o200k_base):  ${(sumSaveO200k / count).toFixed(1)}% Token Savings`);
  console.log(` 🔹 OpenAI GPT-4  (cl100k_base): ${(sumSaveCl100k / count).toFixed(1)}% Token Savings`);
  console.log(` 🔹 Qwen 2.5 Coder:              ${(sumSaveQwen / count).toFixed(1)}% Token Savings`);
  console.log(` 🔹 DeepSeek V3 / R1:            ${(sumSaveDeepSeek / count).toFixed(1)}% Token Savings`);
  console.log(` 🔹 Meta Llama 3.3:              ${(sumSaveLlama / count).toFixed(1)}% Token Savings`);
  console.log('===============================================================\n');

  benchmark.free();
}

run();
