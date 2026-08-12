<p align="center">
  <img src="https://img.shields.io/badge/OpenNative-v0.1.0-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="Version" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
</p>

<h1 align="center">🌐 OpenNative</h1>

<p align="center">
  <strong>Open-Source Native-Language Infrastructure for AI Coding Agents</strong>
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

**OpenNative** eliminates this tax entirely by translating your native-language prompts to clean English **locally** — before they ever reach the AI model.

---

## 💡 How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                      YOUR TERMINAL / IDE                        │
│                                                                 │
│  🇹🇭 "ช่วย refactor handleSubmit ใน LoginForm.tsx              │
│       ให้ใช้ react-hook-form แทน useState"                      │
│                                                                 │
│                         ▼                                       │
│  ┌──────────────────────────────────────────────────────┐       │
│  │           🔒 CODE PROTECTOR ENGINE                   │       │
│  │                                                      │       │
│  │  handleSubmit     → __PH_0__                         │       │
│  │  LoginForm.tsx    → __PH_1__                         │       │
│  │  react-hook-form  → __PH_2__                         │       │
│  │  useState         → __PH_3__                         │       │
│  └──────────────────────────────────────────────────────┘       │
│                         ▼                                       │
│  ┌──────────────────────────────────────────────────────┐       │
│  │        🌐 LOCAL MACHINE TRANSLATION                  │       │
│  │        Typhoon 4B via Ollama (FREE, on-device)       │       │
│  │                                                      │       │
│  │  TH → EN (with __PH_n__ sentinels preserved)         │       │
│  └──────────────────────────────────────────────────────┘       │
│                         ▼                                       │
│  ┌──────────────────────────────────────────────────────┐       │
│  │        🔓 SENTINEL RESTORATION                       │       │
│  │                                                      │       │
│  │  __PH_0__ → handleSubmit                             │       │
│  │  __PH_1__ → LoginForm.tsx                            │       │
│  │  __PH_2__ → react-hook-form                          │       │
│  │  __PH_3__ → useState                                 │       │
│  └──────────────────────────────────────────────────────┘       │
│                         ▼                                       │
│  🇺🇸 "Please refactor handleSubmit in LoginForm.tsx             │
│       to use react-hook-form instead of useState"               │
│                                                                 │
│                     ▼ (Clean English sent to AI)                │
│              🤖 Claude / Codex / DeepSeek / Qwen                │
└─────────────────────────────────────────────────────────────────┘
```

### Key Principles

> **📌 Canonical English Transcript Rule**
>
> The internal conversation state is **100% English**. Thai is rendered only on the display layer and **never** injected back into the agent's context history. This prevents prompt cache misses, context pollution, and compounding translation errors.

> **📌 Zero Translation Cost**
>
> Machine translation runs locally on your GPU/CPU via **Typhoon 4B (Ollama)** — no API fees, no data leaving your machine.

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

> **TL;DR**: If you're using DeepSeek or Qwen in Thai, you're paying **3× the tokens** for the same work. OpenNative cuts that down to English-level costs.

---

## 🧱 Architecture

```
@opennative/monorepo
├── packages/core/
│   ├── protector/       🔒 Code & Sentinel Masking/Restoration Engine
│   ├── benchmark/       📊 Multi-Tokenizer Token Tax Meter
│   ├── mt/              🌐 Local MT Provider (Typhoon 4B / Ollama)
│   ├── transcript/      📝 Canonical English State Manager
│   └── providers/       🤖 Agent Provider Abstraction (Codex, Claude, DeepSeek)
└── apps/
    ├── cli/             ⌨️  Interactive Terminal Gateway
    └── vscode/          🧩 VS Code Extension (Language Sidecar)
```

### Package Details

| Package | Description |
|:---|:---|
| `@opennative/core-protector` | Masks code blocks, URLs, file paths, identifiers, CLI commands, and tech keywords with `__PH_n__` sentinels before MT. Restores them after translation with 100% fidelity. |
| `@opennative/core-benchmark` | Measures token counts across OpenAI (o200k, cl100k), Qwen, DeepSeek, and Llama tokenizers. Generates comparative reports. |
| `@opennative/core-mt` | Abstraction layer for local machine translation. Ships with `OllamaTyphoonProvider` (Typhoon 4B) and `MockMTProvider` for testing. |
| `@opennative/core-transcript` | Enforces the Canonical English Transcript rule. Manages conversation history, token savings tracking, and shareable stats. |
| `@opennative/core-providers` | Agent provider interface with implementations for Codex App-Server (JSON-RPC/stdio), Claude API (BYOK), and OpenAI-compatible endpoints (DeepSeek, Qwen). |
| `@opennative/cli` | Interactive terminal gateway with real-time token savings meter, session stats, and multi-agent support. |
| `opennative-vscode` | VS Code extension providing a Language Sidecar sidebar with translation input and live savings display. |

---

## ⚙️ Quick Start

### Prerequisites

- **Node.js** v18+
- **Ollama** (optional, for local translation):
  ```bash
  # Install Ollama from https://ollama.ai
  ollama pull scb10x/typhoon-translate-4b
  ```

### Install & Build

```bash
# Clone the repository
git clone https://github.com/Kanompung1988/OpenNative.git
cd OpenNative

# Install dependencies
npm install

# Build all packages
npm run build
```

### Run the Benchmark

```bash
npm run benchmark
```

Example output:
```
===============================================================
 🚀 OPENNATIVE MULTI-TOKENIZER BENCHMARK REPORT
===============================================================

[Prompt #1]
🇹🇭 TH: "ช่วย refactor ฟังก์ชัน handleSubmit ใน LoginForm.tsx..."
🇺🇸 EN: "Please refactor the handleSubmit function in LoginForm.tsx..."
---------------------------------------------------------------
 Token Count (TH vs EN):
  - GPT-4o (o200k_base):  27 -> 23 tokens (14.8% saved)
  - Qwen 2.5 Coder:       38 -> 15 tokens (60.5% saved)
  - DeepSeek V3 / R1:     85 -> 25 tokens (70.5% saved)
```

### Run Tests

```bash
npm test
```

### Launch the CLI

```bash
# Start interactive terminal gateway
npm run --workspace=@opennative/cli start

# Or specify an agent target
npm run --workspace=@opennative/cli start -- codex    # Codex App-Server
npm run --workspace=@opennative/cli start -- claude   # Claude API (BYOK)
npm run --workspace=@opennative/cli start -- deepseek # DeepSeek V3
```

CLI Demo:
```
===============================================================
 🌐 OPENNATIVE — Native Language Layer for AI Coding Agents
   Thai UX. English Tokens. Zero Translation LLM Tokens.
===============================================================

✔ OpenNative Gateway active with Agent: [Codex-App-Server]
Commands: /stats (Show Savings), /clear (Reset Session), /exit (Quit)

🇹🇭 You (Thai): ช่วยแก้ bug ใน authService.ts หน่อย

⏳ Protecting code sentinels & translating via Local MT...

🇺🇸 Transmitted Canonical Prompt (EN):
   "Please fix the bug in authService.ts"

⚡ REAL-TIME LANGUAGE SAVINGS METER:
   - DeepSeek V3/R1: 42 TH -> 12 EN tokens (↓71.4% saved)
   - Qwen 2.5 Coder: 28 TH -> 10 EN tokens (↓64.3% saved)
   - GPT-4o:         18 TH -> 15 EN tokens (↓16.7% saved)
   - Latency:        45 ms | MT Cost: $0.00
```

---

## 🔒 Code Protector

The Code Protector engine ensures that **code never gets mistranslated**. It recognizes and masks:

| Category | Examples |
|:---|:---|
| 📦 Code Blocks | `` ```ts const x = 1; ``` `` |
| 🔗 URLs | `https://api.example.com/v1/auth` |
| 📁 File Paths | `src/components/LoginForm.tsx` |
| 🏷️ Identifiers | `handleSubmit`, `UserService.createUser` |
| 💻 CLI Commands | `npm install`, `git commit -m "fix"` |
| ⚙️ Tech Keywords | `useState`, `async`, `interface` |
| 🔍 Stack Traces | `at Service.method (file.ts:12:34)` |
| 📝 Git Diffs | `+ const x = 1` / `- const x = 2` |

The protector guarantees: `restore(mask(x)) === x` — **lossless round-trip** for all protected content.

---

## 🗺️ Roadmap

- [x] **Phase 0** — Multi-Tokenizer Benchmark Engine
- [x] **Phase 1** — Code Protector with Sentinel Masking
- [x] **Phase 2** — Local MT Provider (Ollama + Typhoon 4B)
- [x] **Phase 3** — Canonical English Transcript Engine
- [x] **Phase 4** — Agent Provider Abstraction (Codex, Claude, DeepSeek)
- [x] **Phase 5** — Interactive CLI Gateway
- [ ] **Phase 6** — VS Code Extension (Language Sidecar)
- [ ] **Phase 7** — Real Streaming Translation (SSE)
- [ ] **Phase 8** — Multi-language Support (Japanese, Korean, Chinese, etc.)
- [ ] **Phase 9** — Plugin System for Custom MT Providers

---

## 🤝 Contributing

Contributions are welcome! Whether it's bug fixes, new language support, additional agent providers, or documentation improvements.

```bash
# Fork the repo
git clone https://github.com/YOUR_USERNAME/OpenNative.git
cd OpenNative

# Install & build
npm install
npm run build

# Run tests
npm test

# Make your changes and submit a PR!
```

---

## 📄 Research & Background

This project is inspired by empirical research on the **Token Tax** phenomenon — the hidden cost of using non-Latin-script languages with modern LLM tokenizers. Key findings:

- **BPE tokenizers without Thai vocabulary** (DeepSeek, Llama) fall back to byte-level encoding, consuming 3× more tokens per Thai character
- **LLM reasoning quality** degrades measurably on non-English input (+4.5%–9.9% error rate on coding benchmarks)
- **Local machine translation** (4B parameter models) achieves sufficient quality for code-context translation at zero marginal cost
- **Code-aware masking** with sentinel tags eliminates the primary failure mode of MT in developer contexts

---

## 🛡️ License

MIT © [OpenNative Team](https://github.com/Kanompung1988)

---

<p align="center">
  <strong>Coded in Thai. Transmitted in English. Powered by OpenNative.</strong>
</p>
