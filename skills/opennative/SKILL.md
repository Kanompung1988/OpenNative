---
name: opennative
description: Native language protection and token tax optimization for non-English developers. Automatically masks code sentinels, converts native prompts (Thai/Japanese/Chinese) to Canonical English, and prevents token inflation.
---

# OpenNative — Native Language Optimization Skill

Use this skill when handling prompts in non-English native languages (such as Thai 🇹🇭, Japanese 🇯🇵, Chinese 🇨🇳, etc.) to minimize token consumption and maximize LLM reasoning quality.

## Core Rules

### 1. Code & Identifier Protection (Sentinel Masking)
Never translate code identifiers, variable names, URLs, file paths, or CLI commands.
When receiving a native language prompt:
- Identify code blocks, filenames, function names (`handleSubmit`, `auth.ts`), and tech keywords (`useState`, `async`).
- Preserve these exact strings as `__PH_0__`, `__PH_1__`, etc. sentinels during translation processing.
- Restore all sentinels with 100% precision.

### 2. Canonical English Reasoning
- Perform all architectural reasoning, planning, code modification, and internal execution in **100% Canonical English**.
- Do NOT inject unmasked native-language prompts into long-term context state.

### 3. Display Layer Native Rendering
- Render the final UI explanation back to the user in their preferred native language (e.g. Thai), while keeping code blocks and technical diffs in exact English.

## Local Machine Translation (Optional Tool Call)
If a local OpenNative Gateway or Ollama instance is available at `http://localhost:11434`:
```bash
npx opennative --translate "user prompt"
```
Use local MT for zero-cost translation before appending to active context.
