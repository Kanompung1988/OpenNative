<p align="center">
  <h1 align="center">🌐 OpenNative (ฉบับภาษาไทย 🇹🇭)</h1>
</p>

<p align="center">
  <strong>โครงสร้างพื้นฐานและ Agent Skill ภาษาถิ่นโอเพนซอร์ส สำหรับ AI Coding Agents</strong>
</p>

<p align="center">
  <em>พิมไทยสบายใจ · ประหยัด Token ภาษาอังกฤษ · ค่าแปล 0 บาท</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-v0.1.0-blue?style=flat-square&logo=typescript&logoColor=white" alt="Version">
  <img src="https://img.shields.io/badge/works%20with-20%20agents-111111?style=flat-square" alt="Works with 20 agents">
  <img src="https://img.shields.io/badge/ประหยัด%20Token-สูงสุด%2073%25-green?style=flat-square" alt="Token Savings">
  <img src="https://img.shields.io/badge/license-MIT-111111?style=flat-square" alt="MIT License">
</p>

---

## 🧠 ปัญหา Token Tax คืออะไร?

นักพัฒนาที่ไม่ได้ใช้ภาษาอังกฤษเป็นภาษาหลัก (เช่น ภาษาไทย 🇹🇭) เมื่อพิมพ์โจทย์หา AI Coding Agents (Claude Code, Cursor, Codex) จะต้องจ่าย **"ภาษีภาษา" (Token Tax)** โดยไม่รู้ตัว:

| ปัญหา | ผลกระทบ |
|:---|:---|
| 🔴 **Token แพงกว่าปกติ** | ภาษาไทยใช้ Token **มากกว่าภาษาอังกฤษ 2.5× ถึง 3.7× เท่า** บน Tokenizer ส่วนใหญ่ |
| 🔴 **AI คิดช้าและฉลาดน้อยลง** | โมเดลคิดคำตอบผิดพลาดมากขึ้น **+4.5% ถึง +9.9%** เมื่อได้รับ Prompt ภาษาที่ไม่ใช่ภาษาอังกฤษ |
| 🔴 **เปลือง Context Window** | ตัวอักษรไทยกินพื้นที่ความจำของ AI ทำให้คุยงานยาวๆ ไม่ได้ |

**OpenNative** เกิดมาเพื่อลบภาษีนี้ทิ้ง 100% โดยการดักแปลงคำสั่งภาษาไทยของคุณเป็น **Canonical English** ในระบบประมวลผลของ AI!

---

## 📊 ตารางสถิติและกราฟเปรียบเทียบ (Matplotlib Chart)

<p align="center">
  <img src="assets/benchmark-token-tax.png" width="860" alt="Matplotlib Token Tax Reduction Benchmark Chart">
</p>

| โมเดล / Tokenizer | Token ภาษาไทย | Token อังกฤษ | Tax Ratio ที่กำจัดได้ | **เปอร์เซ็นต์ประหยัด** |
|:---|---:|---:|:---:|:---:|
| 🇨🇳 **GLM-4 / MiniMax** | 90 | 24 | **3.75×** | ⚡ **73.3%** |
| 🇨🇳 **DeepSeek V3 / R1** | 85 | 25 | **3.40×** | ⚡ **70.5%** |
| 🦙 **Meta Llama 3.3** | 78 | 25 | **3.12×** | ⚡ **67.9%** |
| 🇨🇳 **Qwen 2.5 Coder** | 38 | 15 | **2.53×** | 🔥 **60.5%** |
| 🇺🇸 **GPT-4 (cl100k)** | 39 | 20 | **1.95×** | 🟢 **48.7%** |
| 🇺🇸 **GPT-4o (o200k)** | 27 | 23 | **1.17×** | 🔵 **14.8%** |

---

## ⚡ ติดตั้งง่ายที่สุดในโลก (Zero Dependencies!)

ถอดแบบความง่ายจาก `ponytail` ติดตั้งได้ใน **10 วินาที ไม่ต้องลงโปรแกรมเพิ่ม**:

### สำหรับ Claude Code:
ก๊อปปี้โฟลเดอร์ `skills/opennative` ไปไว้ในโฟลเดอร์โปรเจกต์ของคุณ:

```bash
mkdir -p .claude/skills
cp -r skills/opennative .claude/skills/
```

### สำหรับ Claude Code แบบใช้งานทุกโปรเจกต์ (Global):
```bash
mkdir -p ~/.claude/skills
cp -r skills/opennative ~/.claude/skills/
```

### สำหรับ Cursor / Windsurf / Copilot CLI:
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
