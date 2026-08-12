<p align="center">
  <img src="https://img.shields.io/badge/OpenNative-v0.1.0-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="Version" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
</p>

<h1 align="center">🌐 OpenNative</h1>

<p align="center">
  <strong>Open-Source Native-Language Infrastructure & Agent Skill for AI Coding Agents</strong>
</p>

<p align="center">
  <em>Thai UX · English Tokens · Zero LLM Translation Cost</em>
</p>

<p align="center">
  Keep your editor. Keep your agent. Stop paying the language tax.<br/>
  Stop sacrificing agent quality.
</p>

---

## 🧠 The Problem

When non-English developers use AI coding agents (Claude Code, Codex CLI, Cursor, etc.), they face a hidden **Language Tax**:

| Problem | Impact |
|:---|:---|
| 🔴 **Token Inflation** | Thai text consumes **2.5×–3.7× more tokens** than English on most LLM tokenizers |
| 🔴 **Degraded Reasoning** | LLMs reason **+4.5% to +9.9% worse** on non-English prompts (SWE-bench, HumanEval) |
| 🔴 **Context Window Waste** | Inflated tokens eat into precious context window space |
| 🔴 **Higher API Costs** | More tokens = more money per request |

**OpenNative** eliminates this tax entirely by translating your native-language prompts to clean English **locally or via Agent Skill directives** — before they pollute your agent's context history.

---

## ⚡ Super Easy Installation (Zero Dependencies!)

Inspired by lightweight prompt skills like `ponytail`, you can install OpenNative in **10 seconds with zero dependencies**:

### For Claude Code:
Simply copy the `skills/opennative` folder to your project's `.claude/skills/` directory:

```bash
mkdir -p .claude/skills
cp -r skills/opennative .claude/skills/
```

### For Global Claude Code (All Projects):
```bash
mkdir -p ~/.claude/skills
cp -r skills/opennative ~/.claude/skills/
```

### For Cursor / Copilot CLI:
Copy the contents of `skills/opennative/SKILL.md` directly into your `.cursor/rules/opennative.mdc` or `.cursorrules` file.

Done! Next time you talk to Claude Code or Cursor in Thai, OpenNative automatically handles sentinel protection, forces Canonical English reasoning, and renders Thai UI explanations cleanly!

---

## 🎯 The Decision Ladder (Ponytail-Inspired Core Protocol)

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

## 📊 Token Tax Benchmark Results

Empirical measurements comparing Thai prompts vs. their English translations across major LLM tokenizers:

| Model / Tokenizer | Type | Thai Tokens | English Tokens | **Tax Ratio** | **Savings** |
|:---|:---|---:|---:|:---:|:---|
| 🇨🇳 **GLM-4 / MiniMax** | SentencePiece (150k) | 90 | 24 | **3.75×** | ⚡ **73.3%** |
| 🇨🇳 **DeepSeek V3 / R1** | BBPE (129k) | 85 | 25 | **3.40×** | ⚡ **70.5%** |
| 🦙 **Meta Llama 3.3** | Tiktoken BPE (128k) | 78 | 25 | **3.12×** | ⚡ **67.9%** |
| 🇨🇳 **Qwen 2.5 Coder** | BPE (151k) | 38 | 15 | **2.53×** | 🔥 **60.5%** |
| 🇺🇸 **GPT-4 (cl100k)** | Tiktoken (100k) | 39 | 20 | **1.95×** | 🟢 **48.7%** |
| 🇺🇸 **GPT-4o (o200k)** | Tiktoken (200k) | 27 | 23 | **1.17×** | 🔵 **14.8%** |

---

## 💻 Alternative Options

### Option 2: CLI Gateway (`npx opennative`)
If you want **100% Zero Token Tax on the first turn** via Local GPU/CPU Machine Translation:
```bash
# Install local Ollama + Typhoon 4B
ollama pull scb10x/typhoon-translate-4b

# Run Gateway CLI
npx opennative --agent claude --api-key sk-ant-xxx
```

### Option 3: VS Code Extension
```bash
cd apps/vscode
npx vsce package
```
Install the generated `.vsix` in VS Code for a dedicated sidebar Language Sidecar UI (`Ctrl+Shift+L` / `Alt+T`).

---

## 🧱 Monorepo Architecture

```
@opennative/monorepo
├── skills/
│   └── opennative/      🌐 Pure Agent Skill (Zero-dependency SKILL.md)
├── packages/core/
│   ├── protector/       🔒 Code & Sentinel Masking Engine
│   ├── benchmark/       📊 Multi-Tokenizer Token Tax Meter
│   ├── mt/              🌐 Local MT Provider (Typhoon 4B / Ollama)
│   ├── transcript/      📝 Canonical English State Manager
│   └── providers/       🤖 Agent Provider Abstraction (Codex, Claude, DeepSeek)
└── apps/
    ├── cli/             ⌨️  Interactive Terminal Gateway
    └── vscode/          🧩 VS Code Extension (Language Sidecar)
```

---

## 🛡️ License

MIT © [OpenNative Team](https://github.com/Kanompung1988)

---

<p align="center">
  <strong>Coded in Thai. Transmitted in English. Powered by OpenNative.</strong>
</p>
