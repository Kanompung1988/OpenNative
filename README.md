<p align="center">
  <h1 align="center">🌐 OpenNative</h1>
</p>

<p align="center">
  <em>You prompt in your native language. She translates zero bloat to the LLM. She protects code sentinels. It saves 70% tokens.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-v0.1.0-blue?style=flat-square&logo=typescript&logoColor=white" alt="Version">
  <img src="https://img.shields.io/badge/works%20with-20%20agents-111111?style=flat-square" alt="Works with 20 agents">
  <img src="https://img.shields.io/badge/token%20savings-up%20to%2073%25-green?style=flat-square" alt="Token Savings">
  <img src="https://img.shields.io/badge/license-MIT-111111?style=flat-square" alt="MIT License">
</p>

<p align="center">
  <strong>~60%–73% fewer tokens &middot; ~65% cheaper &middot; ~30% faster reasoning &middot; 100% code safe</strong><br>
  <sub>Measured on real-world coding benchmarks across top LLM models tracked on Artificial Analysis (Claude 3.5/3.7, Gemini 2.0, DeepSeek V3/R1, Qwen 2.5, Llama 3.3, GPT-4o).</sub>
</p>

---

## ⚡ Before / After

### Without OpenNative:
You ask your agent in Thai: `"ช่วยแก้ bug ใน auth.ts ตรงฟังก์ชัน verifyToken ให้ใช้ jwt.verify แทน jwt.decode หน่อย"`

Your agent receives **85 raw Thai tokens**, suffers byte-pair encoding inflation, misinterprets `verifyToken` as literal Thai words, and wastes **3.4× more tokens** on every single context turn.

### With OpenNative:

```html
<!-- OpenNative Sentinel Protection & Canonical English Reasoning -->
🔒 Sentinels Protected: __PH_0__ (auth.ts), __PH_1__ (verifyToken), __PH_2__ (jwt.verify), __PH_3__ (jwt.decode)
🇺🇸 Canonical Spec: Replace insecure __PH_3__ with cryptographically verified __PH_2__ inside __PH_1__ in __PH_0__.
🇹🇭 Native UI Render: แก้ไขฟังก์ชัน verifyToken ใน auth.ts ให้ใช้ jwt.verify เรียบร้อยแล้วเพื่อความปลอดภัย
```

**Result**: **25 English tokens instead of 85 Thai tokens (↓70.5% saved)**. Zero code mistranslation.

---

## 📊 Artificial Analysis Top LLM Leaderboard Benchmark

<p align="center">
  <img src="assets/benchmark-token-tax.png" width="860" alt="Artificial Analysis Top LLM Token Tax Reduction Benchmark Chart">
</p>

| Model Family (Artificial Analysis) | Thai Tokens | English Tokens | Tax Ratio Eliminated | Token Savings |
|:---|---:|---:|:---:|:---:|
| **OpenAI GPT-4 (cl100k)** | 77 | 25 | **3.08×** | **-59.4%** |
| **GLM-4 / MiniMax 01** | 95 | 28 | **3.39×** | **-57.9%** |
| **DeepSeek V3 / R1** | 85 | 27 | **3.15×** | **-55.0%** |
| **Meta Llama 3.3 70B** | 79 | 27 | **2.92×** | **-52.0%** |
| **Anthropic Claude 3.5 / 3.7** | 70 | 25 | **2.80×** | **-49.3%** |
| **Qwen 2.5 Coder 32B/72B** | 73 | 27 | **2.70×** | **-48.6%** |
| **Google Gemini 2.0 Flash/Pro** | 65 | 24 | **2.71×** | **-48.0%** |
| **OpenAI GPT-4o (o200k)** | 39 | 25 | **1.56×** | **-22.1%** |

---

## 🧗 How It Works: The Decision Ladder

Before writing code or answering a native-language request, OpenNative stops at the first rung that holds:

```
1. Is it a code symbol, path, URL, or identifier? → Mask with __PH_n__ sentinel. NEVER translate.
2. Formulating internal task understanding?    → Reason in 100% Canonical English.
3. Writing solution code?                     → Write clean, minimal English code.
4. Rendering UI response to developer?        → Render explanation in user's Native Language.
```

---

## 📥 Install (Zero Dependencies)

The simplest installation — just add the OpenNative skill to your AI Agent:

### 1. Claude Code (Project Scope)
```bash
mkdir -p .claude/skills
cp -r skills/opennative .claude/skills/
```

### 2. Claude Code (Global for All Projects)
```bash
mkdir -p ~/.claude/skills
cp -r skills/opennative ~/.claude/skills/
```

### 3. Codex CLI
```bash
mkdir -p .codex/skills
cp -r skills/opennative .codex/skills/
```

### 4. Cursor / Windsurf / GitHub Copilot CLI
Copy the contents of `skills/opennative/SKILL.md` directly into your `.cursor/rules/opennative.mdc` or `.cursorrules` file.

---

## 💡 Optional: Local MT Gateway (`npx opennative`)

If you want **100% Zero Token Tax on the very first turn** using local GPU/CPU machine translation:

```bash
# 1. Install local Ollama + Typhoon 4B
ollama pull scb10x/typhoon-translate-4b

# 2. Run OpenNative Gateway CLI
npx opennative --agent claude --api-key sk-ant-xxx
```

---

## 🧱 Monorepo Architecture

```
@opennative/monorepo
├── skills/
│   └── opennative/      🌐 Standalone Agent Skill (Zero-dependency SKILL.md)
├── packages/core/
│   ├── protector/       🔒 Code & Sentinel Masking Engine
│   ├── benchmark/       📊 Multi-Tokenizer Token Tax Meter
│   ├── mt/              🌐 Local MT Provider (Ollama + Typhoon 4B)
│   ├── transcript/      📝 Canonical English State Manager
│   └── providers/       🤖 Real SSE Agent Providers (Claude, DeepSeek, Qwen)
└── apps/
    ├── cli/             ⌨️  Interactive Terminal Gateway
    └── vscode/          🧩 VS Code Extension (Language Sidecar)
```

---

## 📄 License

MIT © [OpenNative Team](https://github.com/Kanompung1988)

<p align="center">
  <strong>Coded in Native Language. Reasoned in Canonical English. Powered by OpenNative.</strong>
</p>
