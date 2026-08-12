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
  <sub>Measured on real-world coding benchmarks across Thai 🇹🇭, Japanese 🇯🇵, Chinese 🇨🇳, and Spanish 🇪🇸 prompts against DeepSeek V3, Qwen 2.5 Coder, Llama 3.3, and GPT-4o baselines.</sub>
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

## 📊 Numbers & Token Tax Benchmark

<p align="center">
  <img src="assets/benchmark-token-tax.png" width="860" alt="Matplotlib Token Tax Reduction Benchmark Chart across Models">
</p>

| vs Bare Prompt Baseline | Thai Tokens | English Tokens | Tax Ratio Eliminated | Token Savings | Cost Cut |
|:---|---:|---:|:---:|:---:|:---:|
| **GLM-4 / MiniMax** | 90 | 24 | **3.75×** | **-73.3%** | **-73%** |
| **DeepSeek V3 / R1** | 85 | 25 | **3.40×** | **-70.5%** | **-70%** |
| **Meta Llama 3.3** | 78 | 25 | **3.12×** | **-67.9%** | **-68%** |
| **Qwen 2.5 Coder** | 38 | 15 | **2.53×** | **-60.5%** | **-60%** |
| **GPT-4 (cl100k)** | 39 | 20 | **1.95×** | **-48.7%** | **-49%** |
| **GPT-4o (o200k)** | 27 | 23 | **1.17×** | **-14.8%** | **-15%** |

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
