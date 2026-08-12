import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { CodeProtector } from '../src/index.js';

describe('CodeProtector Engine', () => {
  const protector = new CodeProtector();

  it('should correctly mask and restore Thai prompt with code identifiers and paths', () => {
    const input = 'ช่วย refactor ฟังก์ชัน handleSubmit ใน src/components/LoginForm.tsx ให้ใช้ react-hook-form แทน useState';
    
    const { maskedText, map, placeholders } = protector.mask(input);

    assert.ok(placeholders.length >= 3, 'Should extract at least 3 protected items');
    assert.ok(!maskedText.includes('handleSubmit'), 'Should mask handleSubmit');
    assert.ok(!maskedText.includes('src/components/LoginForm.tsx'), 'Should mask path');
    assert.ok(!maskedText.includes('react-hook-form'), 'Should mask library name');

    // Simulate MT translation step
    const simulatedMTOutput = `Please refactor function ${placeholders.find(p => map.get(p) === 'handleSubmit')} in ${placeholders.find(p => map.get(p) === 'src/components/LoginForm.tsx')} to use ${placeholders.find(p => map.get(p) === 'react-hook-form')} instead of ${placeholders.find(p => map.get(p) === 'useState')}`;

    const { restoredText, success } = protector.restore(simulatedMTOutput, map);

    assert.strictEqual(success, true);
    assert.strictEqual(restoredText, 'Please refactor function handleSubmit in src/components/LoginForm.tsx to use react-hook-form instead of useState');
  });

  it('should protect code blocks and URLs', () => {
    const input = 'ช่วยดูโค้ดนี้หน่อย ```ts\nconst user = await getUser(null);\n``` ว่าทำไมยิงไปที่ https://api.example.com/v1/auth แล้วเพี้ยน';

    const { maskedText, map } = protector.mask(input);

    assert.ok(!maskedText.includes('const user'), 'Should mask code block');
    assert.ok(!maskedText.includes('https://api.example.com/v1/auth'), 'Should mask URL');

    const { restoredText } = protector.restore(maskedText, map);
    assert.strictEqual(restoredText, input);
  });

  it('should handle missing placeholders gracefully with fallback suffix', () => {
    const input = 'แก้ bug ใน `authService.ts` หน่อย';
    const { maskedText, map } = protector.mask(input);

    // Simulate aggressive MT that dropped placeholder
    const corruptedMTOutput = 'Fix the bug in the service.';
    const { restoredText, success } = protector.restore(corruptedMTOutput, map);

    assert.strictEqual(success, false);
    assert.ok(restoredText.includes('authService.ts'), 'Should append restored code context');
  });
});
