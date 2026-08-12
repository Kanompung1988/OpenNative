---
name: opennative
description: OpenNative Native-Language & Token Tax Optimization Skill. Automatically protects code sentinels, converts native prompts (Thai/Japanese/Chinese) into Canonical English reasoning streams, and eliminates the LLM token tax. Use when receiving user prompts in native languages.
---

# 🌐 OpenNative — Native-Language Agent Skill

> **"Code in your Native Language. Reason in Canonical English. Zero Token Inflation."**

OpenNative is a zero-dependency agentic skill that eliminates the **Language Token Tax** (2.5×–3.7× token overhead) and reasoning degradation that occurs when AI agents operate in non-English native languages (Thai 🇹🇭, Japanese 🇯🇵, Chinese 🇨🇳, etc.).

---

## 🎯 The Decision Ladder

Whenever you receive a prompt containing non-English native text, follow this strict 4-step decision ladder:

```
Step 1: PROTECT SENTINELS 🔒
   Identify code, paths, variables, URLs & mask with __PH_n__ placeholders.
   ▼
Step 2: CANONICAL SPECIFICATION 🇺🇸
   Formulate task understanding and technical solution in 100% Canonical English.
   ▼
Step 3: EXECUTE SOLUTION 💻
   Write clean, minimal, non-overengineered code using canonical English context.
   ▼
Step 4: NATIVE UI RENDER 🇹🇭
   Present the final explanation in the user's native language with English code blocks.
```

---

## 📜 Execution Protocols

### Protocol 1: Code & Identifier Protection (Sentinel Masking)
**Rule**: Never allow code identifiers, file paths, variable names, URLs, or CLI commands to be mistranslated or altered.

Before processing a native language prompt:
1. Extract all technical tokens:
   - File paths (`src/auth/service.ts`)
   - Identifiers & functions (`handleSubmit`, `useSession`, `authRouter`)
   - Tech keywords & libraries (`react-hook-form`, `zod`, `prisma`)
   - URLs & endpoints (`https://api.example.com/v1`)
   - Code snippets & diffs
2. Internally assign sentinels: `__PH_0__`, `__PH_1__`, `__PH_2__`.
3. Process the prompt using the sentinel-protected layout.
4. When rendering output, restore all `__PH_n__` sentinels with 100% literal fidelity.

---

### Protocol 2: Canonical English Reasoning Stream
**Rule**: Internal context, chain-of-thought planning, file searches, tool executions, and state history MUST be maintained in **100% Canonical English**.

- **Why**: Non-English prompts degrade LLM reasoning performance (+4.5% to +9.9% error rate) and waste context window capacity due to byte-pair encoding bloat.
- **Action**: Immediately frame the technical problem, user intent, acceptance criteria, and plan in clear, precise English before generating files or editing code.

---

### Protocol 3: Token Tax Suppression (Minimalist Output)
**Rule**: Keep explanations concise, clear, and filler-free.

- Omit conversational fluff ("I would be happy to help you with...").
- Get straight to code modifications, tool calls, and results.
- Structure explanations with bullet points and bold highlights.

---

### Protocol 4: Native Language Display Layer
**Rule**: Always respond to the developer in their native language (e.g. Thai) for user experience, while keeping code untouched.

- **Explanations**: Written in clear, professional native language (Thai).
- **Code Blocks & Diffs**: Kept 100% intact in standard English code format.

---

## ⚡ Quick Reference Example

**User Input (Thai):**
> "ช่วยแก้ bug ใน `authService.ts` ตรงฟังก์ชัน `verifyToken` ให้ใช้ `jwt.verify` แทน `jwt.decode` หน่อย"

**OpenNative Internal Execution:**
1. **Sentinel Masking**:
   - `__PH_0__` = `authService.ts`
   - `__PH_1__` = `verifyToken`
   - `__PH_2__` = `jwt.verify`
   - `__PH_3__` = `jwt.decode`
2. **Canonical English Spec**:
   - *Target*: Fix security vulnerability in `__PH_0__` inside function `__PH_1__`.
   - *Action*: Replace insecure `__PH_3__` call with cryptographically verified `__PH_2__`.
3. **Execution**: Perform file edits in `authService.ts`.
4. **Native Display Output (Thai)**:
   > แก้ไขฟังก์ชัน `verifyToken` ใน `authService.ts` ให้ใช้ `jwt.verify` สำเร็จแล้ว เพื่อตรวจสอบความถูกต้องของลายเซ็นดิจิทัลแทนการถอดรหัสเพียงอย่างเดียว

---

## 📌 Installation in any AI Agent

### For Claude Code:
Copy this folder to `.claude/skills/opennative/` or `~/.claude/skills/opennative/`.

### For Cursor / Copilot:
Copy this file content into `.cursor/rules/opennative.mdc` or `.cursorrules`.
