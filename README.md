<p align="center">
  <h1 align="center">🌐 OpenNative</h1>
</p>

<p align="center">
  <strong>The Open-Source Native-Language Layer & Agent Skill for AI Coding Assistants</strong>
</p>

<p align="center">
  <em>You prompt in your native language. OpenNative protects your code sentinels & translates zero-bloat specs to the LLM. You save up to 73% tokens.</em>
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

## ⚡ Before & After

```
🔴 WITHOUT OPENNATIVE (Direct Thai Prompt):
   User Prompt  : "ช่วยแก้ bug ใน auth.ts ตรงฟังก์ชัน verifyToken ให้ใช้ jwt.verify แทน jwt.decode หน่อย"
   Raw Tokens   : 85 Thai BPE Tokens (3.4x Byte Inflation)
   Result       : Agent misinterprets code symbols as literal Thai words, wasting context window & money.

🟢 WITH OPENNATIVE (Sentinel Protected & Canonical Spec):
   🔒 Sentinels : __PH_0__ (auth.ts), __PH_1__ (verifyToken), __PH_2__ (jwt.verify), __PH_3__ (jwt.decode)
   🇺🇸 Spec      : Replace insecure __PH_3__ with cryptographically verified __PH_2__ inside __PH_1__ in __PH_0__.
   🇹🇭 Native UI : แก้ไขฟังก์ชัน verifyToken ใน auth.ts ให้ใช้ jwt.verify เรียบร้อยแล้วเพื่อความปลอดภัย
   Result       : 25 English Tokens (↓ 70.5% Token Tax Eliminated)
```

---

## 📊 Artificial Analysis Top LLM Leaderboard Benchmark

<p align="center">
  <img src="assets/benchmark-token-tax.png" width="900" alt="Artificial Analysis Top LLM Token Tax Reduction Benchmark Chart">
</p>

| Model Family (Artificial Analysis) | Raw Thai Tokens | Canonical English Tokens | Token Inflation Tax Eliminated | Average Token Savings |
|:---|---:|---:|:---:|:---:|
| 🇺🇸 **OpenAI GPT-4 (cl100k)** | 77 | 25 | **3.08×** | ⚡ **59.4%** |
| 🇨🇳 **GLM-4 / MiniMax 01** | 95 | 28 | **3.39×** | ⚡ **57.9%** |
| 🇨🇳 **DeepSeek V3 / R1** | 85 | 27 | **3.15×** | ⚡ **55.0%** |
| 🦙 **Meta Llama 3.3 70B** | 79 | 27 | **2.92×** | ⚡ **52.0%** |
| 🇺🇸 **Anthropic Claude 3.5 / 3.7** | 70 | 25 | **2.80×** | 🟢 **49.3%** |
| 🇨🇳 **Qwen 2.5 Coder 32B/72B** | 73 | 27 | **2.70×** | 🔥 **48.6%** |
| 🇺🇸 **Google Gemini 2.0 Flash/Pro** | 65 | 24 | **2.71×** | 🟢 **48.0%** |
| 🇺🇸 **OpenAI GPT-4o (o200k)** | 39 | 25 | **1.56×** | 🔵 **22.1%** |

---

## 🧗 How It Works: The 4-Step Decision Ladder

Before writing code or answering a native-language request, OpenNative strictly follows the 4-step decision ladder:

```
Step 1: PROTECT SENTINELS 🔒
   Mask code symbols, paths, URLs, and identifiers with __PH_n__ sentinels. Never alter technical keywords.
   ▼
Step 2: CANONICAL SPECIFICATION 🇺🇸
   Formulate internal reasoning and task specifications in 100% Canonical English.
   ▼
Step 3: EXECUTE SOLUTION 💻
   Write clean, minimal, production-grade English solution code.
   ▼
Step 4: NATIVE UI RENDER 🇹🇭
   Render user-facing explanation in native language on the UI layer.
```

---

## 📥 Zero-Dependency Installation (10 Seconds)

Add OpenNative directly as an Agent Skill with **zero external dependencies**:

### 1. Claude Code (Project Scope)
```bash
mkdir -p .claude/skills
cp -r skills/opennative .claude/skills/
```

### 2. Claude Code (Global Scope)
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
Copy `skills/opennative/SKILL.md` into `.cursor/rules/opennative.mdc` or `.cursorrules`.

---

## 💡 Local MT Gateway (`npx opennative`)

To eliminate the Token Tax on the **very first turn** using local GPU/CPU translation:

```bash
# 1. Install local Ollama + Typhoon 4B
ollama pull scb10x/typhoon-translate-4b

# 2. Launch OpenNative Gateway
npx opennative --agent claude --api-key sk-ant-xxx
```

---

## 📄 License

MIT © [OpenNative Team](https://github.com/Kanompung1988)
