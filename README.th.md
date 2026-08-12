<p align="center">
  <h1 align="center">🌐 OpenNative (ฉบับภาษาไทย 🇹🇭)</h1>
</p>

<p align="center">
  <strong>โครงสร้างพื้นฐานและ Agent Skill ภาษาถิ่นโอเพนซอร์ส สำหรับ AI Coding Agents</strong>
</p>

<p align="center">
  <em>พิมพ์ไทยสบายใจ · ประหยัด Token ภาษาอังกฤษ · ค่าแปล 0 บาท</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-v0.1.0-blue?style=flat-square&logo=typescript&logoColor=white" alt="Version">
  <img src="https://img.shields.io/badge/works%20with-20%20agents-111111?style=flat-square" alt="Works with 20 agents">
  <img src="https://img.shields.io/badge/ประหยัด%20Token-สูงสุด%2073%25-green?style=flat-square" alt="Token Savings">
  <img src="https://img.shields.io/badge/license-MIT-111111?style=flat-square" alt="MIT License">
</p>

---

## 🧠 ปัญหา Token Tax คืออะไร?

นักพัฒนาที่พิมพ์คำสั่งภาษาไทยใส่ AI Coding Agents (Claude Code, Cursor, Codex) จะต้องเสีย **"ภาษีภาษา" (Token Tax)** โดยไม่รู้ตัว:

| ปัญหาหลัก | ผลกระทบต่อการทำงาน |
|:---|:---|
| 🔴 **Token แพงกว่าปกติ** | ภาษาไทยใช้ Token **แพงกว่าภาษาอังกฤษ 2.5× ถึง 3.7× เท่า** |
| 🔴 **AI คิดช้าและฉลาดน้อยลง** | โมเดลคิดคำตอบผิดพลาดมากขึ้น **+4.5% ถึง +9.9%** เมื่อรับ Prompt ภาษาที่ไม่ใช่ภาษาอังกฤษ |
| 🔴 **เปลือง Context Window** | ตัวอักษรไทยกินพื้นที่ความจำของ AI ทำให้สั่งงานโปรเจกต์ยาวๆ ไม่ได้ |

**OpenNative** เกิดมาเพื่อลบภาษีนี้ทิ้ง 100% โดยการดักแปลงคำสั่งภาษาไทยของคุณเป็น **Canonical English** ในระบบประมวลผลของ AI!

---

## 📊 ตารางสถิติเปรียบเทียบโมเดลระดับโลก (Artificial Analysis Leaderboard)

<p align="center">
  <img src="assets/benchmark-token-tax.png" width="900" alt="Artificial Analysis Top LLM Token Tax Reduction Benchmark Chart">
</p>

| โมเดลระดับโลก (Artificial Analysis) | Token ภาษาไทย | Token อังกฤษ | Tax Ratio ที่กำจัดได้ | **เปอร์เซ็นต์ประหยัดเฉลี่ย** |
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

## ⚡ ติดตั้งง่ายที่สุดในโลก (Zero Dependencies!)

ถอดแบบความง่ายจาก `ponytail` ติดตั้งได้ใน **10 วินาที ไม่ต้องลงโปรแกรมเพิ่ม**:

### 1. สำหรับ Claude Code (ระดับโปรเจกต์):
ก๊อปปี้โฟลเดอร์ `skills/opennative` ไปไว้ในโฟลเดอร์โปรเจกต์ของคุณ:

```bash
mkdir -p .claude/skills
cp -r skills/opennative .claude/skills/
```

### 2. สำหรับ Claude Code แบบใช้งานทุกโปรเจกต์ (Global):
```bash
mkdir -p ~/.claude/skills
cp -r skills/opennative ~/.claude/skills/
```

### 3. สำหรับ Cursor / Windsurf / Copilot CLI:
ก๊อปปี้เนื้อหาใน `skills/opennative/SKILL.md` ไปวางในไฟล์ `.cursor/rules/opennative.mdc` หรือ `.cursorrules` ได้เลย!

---

## 🧗 บันไดการทำงาน 4 ขั้น (The Decision Ladder)

```
ขั้นที่ 1: PROTECT SENTINELS 🔒
   ดักจับชื่อโค้ด, ไฟล์, URL, ตัวแปร ไม่ให้เพี้ยนด้วย __PH_n__ Placeholders
   ▼
ขั้นที่ 2: CANONICAL SPECIFICATION 🇺🇸
   แปลความเข้าใจและวางแผนวิธีแก้ปัญหาเป็น ภาษาอังกฤษ 100%
   ▼
ขั้นที่ 3: EXECUTE SOLUTION 💻
   เขียนโค้ดภาษาอังกฤษที่สั้น กระชับ และตรงจุดที่สุด
   ▼
ขั้นที่ 4: NATIVE UI RENDER 🇹🇭
   แปลสรุปคำอธิบายกลับเป็นภาษาไทยให้ผู้ใช้ อ่านง่ายบนหน้าจอ
```

---

## 📄 ลิขสิทธิ์ (License)

MIT © [OpenNative Team](https://github.com/Kanompung1988)
