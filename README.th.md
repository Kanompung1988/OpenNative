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

## 📊 ตารางสรุปการประหยัด Token จริง

```
─────────────────────────────────────────────────────────────────────────────
 สถิติการลด Token (ภาษาไทย vs. Canonical English)
─────────────────────────────────────────────────────────────────────────────
 🇨🇳 GLM-4 / MiniMax    ████████████████████████████ ประหยัด 73.3% (-66 tokens)
 🇨🇳 DeepSeek V3 / R1   ██████████████████████████   ประหยัด 70.5% (-60 tokens)
 🦙 Meta Llama 3.3      ███████████████████████     ประหยัด 67.9% (-53 tokens)
 🇨🇳 Qwen 2.5 Coder     ███████████████████         ประหยัด 60.5% (-23 tokens)
 🇺🇸 GPT-4 (cl100k)     ███████████████             ประหยัด 48.7% (-19 tokens)
 🇺🇸 GPT-4o (o200k)     █████                       ประหยัด 14.8% (-4 tokens)
─────────────────────────────────────────────────────────────────────────────
```

---

## 📄 ลิขสิทธิ์ (License)

MIT © [OpenNative Team](https://github.com/Kanompung1988)
