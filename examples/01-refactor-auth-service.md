# Example 1: Refactoring Authentication Service Security

## 🇹🇭 User Prompt (Thai)
> "ช่วยแก้ bug ใน `authService.ts` ตรงฟังก์ชัน `verifyToken` ให้ใช้ `jwt.verify` แทน `jwt.decode` หน่อย"

---

## 🔒 OpenNative Processing Flow

### Step 1: Sentinel Masking
- `__PH_0__` = `authService.ts`
- `__PH_1__` = `verifyToken`
- `__PH_2__` = `jwt.verify`
- `__PH_3__` = `jwt.decode`

### Step 2: Canonical English Specification
> "Fix security vulnerability in `__PH_0__` inside function `__PH_1__`. Replace insecure `__PH_3__` with cryptographically verified `__PH_2__` using process environment secret key."

---

## 💻 Agent Code Diff

```diff
  export async function verifyToken(token: string): Promise<UserSession> {
-   const decoded = jwt.decode(token) as UserSession;
-   return decoded;
+   const secret = process.env.JWT_SECRET || 'default_secret';
+   const verified = jwt.verify(token, secret) as UserSession;
+   return verified;
  }
```

---

## 🇹🇭 Native UI Output (Thai)
> แก้ไขฟังก์ชัน `verifyToken` ใน `authService.ts` ให้ใช้ `jwt.verify` สำเร็จแล้ว เพื่อตรวจสอบความถูกต้องของลายเซ็นดิจิทัลแทนการถอดรหัสเพียงอย่างเดียว

---

## 📊 Token Savings Summary
- **Thai Prompt Raw Tokens**: 42 tokens (DeepSeek BPE)
- **Canonical English Tokens**: 12 tokens
- **Reduction**: **71.4% Saved (3.5× Token Tax Eliminated)**
