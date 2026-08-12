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
  <strong>~50%–73% fewer tokens &middot; ~65% cheaper &middot; ~30% faster reasoning &middot; 100% code safe</strong><br>
  <sub>Measured across all 11 frontier models on Artificial Analysis Intelligence Index Leaderboard (Claude Opus 5, Claude Fable 5, GPT-5.6 Sol, Grok 4.6, Kimi K3, Muse Spark 1.2, GLM-5.2, DeepSeek V4, Gemini 3.6, MiniMax-M3, Nemotron 3).</sub>
</p>

---

## ⚡ Before & After

```
🔴 WITHOUT OPENNATIVE (Direct Native Prompt):
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

## 📊 Artificial Analysis Intelligence Index Leaderboard Benchmark (11 Models)

<p align="center">
  <img src="assets/benchmark-token-tax.png" width="900" alt="Artificial Analysis Intelligence Index Benchmark Chart (Top 11 Frontier LLMs)">
</p>

| # | Model Name | Artificial Analysis Score | Provider | Thai Tokens | English Tokens | **Average Token Savings** |
|:---:|:---|:---:|:---:|---:|---:|:---:|
| **1** | **Claude Opus 5 (max)** | **63** | Anthropic | 70 | 25 | ⚡ **49.3%** |
| **2** | **Claude Fable 5 (with fallback)** | **62** | Anthropic | 70 | 25 | ⚡ **49.3%** |
| **3** | **GPT-5.6 Sol (max)** | **61** | OpenAI | 39 | 25 | 🔵 **22.1%** |
| **4** | **Grok 4.6 (high)** | **61** | xAI | 74 | 27 | 🟢 **49.6%** |
| **5** | **Kimi K3 (max)** | **60** | Moonshot | 82 | 27 | ⚡ **53.6%** |
| **6** | **Muse Spark 1.2 (xhigh)** | **57** | Meta | 79 | 27 | ⚡ **52.0%** |
| **7** | **GLM-5.2 (max)** | **53** | Zhipu AI | 95 | 28 | 🔥 **57.9%** |
| **8** | **DeepSeek V4 Flash 0731 (max)** | **52** | DeepSeek | 85 | 27 | 🔥 **55.0%** |
| **9** | **Gemini 3.6 Flash** | **52** | Google | 65 | 24 | 🟢 **48.0%** |
| **10**| **MiniMax-M3** | **45** | MiniMax | 94 | 28 | 🔥 **57.4%** |
| **11**| **Nemotron 3 Ultra** | **38** | NVIDIA | 83 | 27 | ⚡ **54.4%** |

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

## 📄 License

MIT © [OpenNative Team](https://github.com/Kanompung1988)
