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

## 🛠️ Machine Translation (MT) Setup

OpenNative relies on **`scb10x/typhoon-translate-4b`** via **Ollama** for state-of-the-art Thai-English translation.

### Step 1: Install Ollama
Download and install Ollama from [ollama.ai](https://ollama.ai).

### Step 2: Pull the Typhoon 4B Model
Open PowerShell and run:
```powershell
ollama pull scb10x/typhoon-translate-4b
```
*(Model size: ~2.5 GB. Runs on any GPU or CPU with 4 GB+ RAM).*

### Step 3: Run OpenNative
OpenNative auto-detects local Ollama (`http://localhost:11434`) automatically:
```
✔ Local Machine Translation: [Ollama Typhoon 4B] (Local GPU/CPU)
```
*(If Ollama is not running, OpenNative falls back to `MockMTProvider` so it never crashes).*

---

## ⚡ PowerShell Integration & Claude CLI Wrapper

Want to use OpenNative seamlessly with your existing `claude` or `codex` CLI in PowerShell?

### Quick Wrapper Command
```powershell
# Wrap Claude Code CLI
npx opennative claude --api-key sk-ant-xxx

# Wrap DeepSeek V3 / R1
npx opennative deepseek --api-key sk-xxx

# Wrap Qwen 2.5 Coder
npx opennative qwen --api-key sk-xxx
```

### Permanent PowerShell Alias (`claude`)

Open your PowerShell profile:
```powershell
notepad $PROFILE
```

Add this function:
```powershell
function claude {
    npx opennative claude $args
}
```

Now whenever you run `claude` in PowerShell, OpenNative automatically protects code sentinels, translates your Thai prompt into English via local GPU/CPU, and streams Claude Code responses back to your terminal!

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
| `@opennative/core-benchmark` | Measures token counts across OpenAI (o200k, cl100k), Qwen, DeepSeek, and Llama tokenizers. |
| `@opennative/core-mt` | Local machine translation engine (`OllamaTyphoonProvider` with NDJSON streaming & `StreamSegmenter`). |
| `@opennative/core-transcript` | Enforces the Canonical English Transcript rule. Manages conversation history & session stats. |
| `@opennative/core-providers` | Real SSE streaming agent providers for Claude API, OpenAI-compatible (DeepSeek/Qwen), and Codex App-Server (JSON-RPC/stdio). |
| `@opennative/cli` | Interactive CLI Gateway with shebang (`npx opennative`), flag parsing, and live streaming terminal UI. |
| `opennative-vscode` | VS Code extension providing a Language Sidecar sidebar with real-time savings meter. |

---

## ⚙️ Quick Start

### Install & Build

```bash
# Clone the repository
git clone https://github.com/Kanompung1988/OpenNative.git
cd OpenNative

# Install dependencies & build
npm install
npm run build
```

### Launch the CLI Gateway

```bash
# Start interactive terminal gateway
npx opennative

# Specify an agent target and API key
npx opennative --agent claude --api-key sk-ant-xxx
npx opennative --agent deepseek --api-key sk-xxx
npx opennative --agent qwen --api-key sk-xxx
```

CLI Demo Output:
```
===============================================================
 🌐 OPENNATIVE — Native Language Layer for AI Coding Agents
   Thai UX. English Tokens. Zero Translation LLM Tokens.
===============================================================

✔ OpenNative Gateway active with Agent: [Claude-API-BYOK]
✔ Local Machine Translation: [Ollama Typhoon 4B] (Local GPU/CPU)
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

🤖 Agent [Claude-API-BYOK] Output:
Here is the fix for the bug in `authService.ts`...
```

---

## 🧩 VS Code Extension (Language Sidecar)

```bash
cd apps/vscode
npx vsce package
```
Install the generated `.vsix` file in VS Code (`Extensions` -> `Install from VSIX...`).
- Press `Ctrl+Shift+L` or `Alt+T` to trigger OpenNative input.
- Use the **OpenNative Language Sidecar** sidebar panel for live token savings visualization.

---

## 🗺️ Roadmap

- [x] **Phase 0** — Multi-Tokenizer Benchmark Engine
- [x] **Phase 1** — Code Protector with Sentinel Masking
- [x] **Phase 2** — Local MT Provider (Ollama + Typhoon 4B)
- [x] **Phase 3** — Canonical English Transcript Engine
- [x] **Phase 4** — Agent Provider Abstraction (Codex, Claude, DeepSeek)
- [x] **Phase 5** — Interactive CLI Gateway
- [x] **Phase 6** — VS Code Extension (Language Sidecar)
- [x] **Phase 7** — Real Streaming Translation & Agent Response (SSE / NDJSON)
- [ ] **Phase 8** — Multi-language Support (Japanese, Korean, Chinese, Vietnamese)
- [ ] **Phase 9** — MCP Server Integration (`@opennative/mcp`) for Claude Code / Cursor

---

## 🛡️ License

MIT © [OpenNative Team](https://github.com/Kanompung1988)

---

<p align="center">
  <strong>Coded in Thai. Transmitted in English. Powered by OpenNative.</strong>
</p>
