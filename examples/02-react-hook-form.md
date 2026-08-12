# Example 2: React Component Form Refactoring

## 🇹🇭 User Prompt (Thai)
> "ช่วย refactor `LoginForm.tsx` ให้ใช้ `react-hook-form` ร่วมกับ `zod` แทน `useState` หน่อย"

---

## 🔒 OpenNative Processing Flow

### Step 1: Sentinel Masking
- `__PH_0__` = `LoginForm.tsx`
- `__PH_1__` = `react-hook-form`
- `__PH_2__` = `zod`
- `__PH_3__` = `useState`

### Step 2: Canonical English Specification
> "Refactor component `__PH_0__` to replace local state management `__PH_3__` with `__PH_1__` and schema validation using `__PH_2__`."

---

## 💻 Agent Code Diff

```diff
- import { useState } from 'react';
+ import { useForm } from 'react-hook-form';
+ import { zodResolver } from '@hookform/resolvers/zod';
+ import { z } from 'zod';

+ const loginSchema = z.object({
+   email: z.string().email('Invalid email address'),
+   password: z.string().min(8, 'Password must be at least 8 characters')
+ });

  export function LoginForm() {
-   const [email, setEmail] = useState('');
-   const [password, setPassword] = useState('');
+   const { register, handleSubmit, formState: { errors } } = useForm({
+     resolver: zodResolver(loginSchema)
+   });
```

---

## 🇹🇭 Native UI Output (Thai)
> ปรับปรุงคอมโพเนนต์ `LoginForm.tsx` ให้ใช้ `react-hook-form` ร่วมกับ `zod` สคีมาสำเร็จแล้ว ช่วยลดการรีเรนเดอร์ส่วนเกินและมีระบบตรวจสอบความถูกต้องของฟิลด์แบบอัตโนมัติ

---

## 📊 Token Savings Summary
- **Thai Prompt Raw Tokens**: 38 tokens (Qwen 2.5 Coder BPE)
- **Canonical English Tokens**: 15 tokens
- **Reduction**: **60.5% Saved (2.5× Token Tax Eliminated)**
