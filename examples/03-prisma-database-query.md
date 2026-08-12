# Example 3: Prisma ORM Database Query Optimization

## 🇹🇭 User Prompt (Thai)
> "ช่วยแก้ N+1 query bug ใน `getUserOrders` ใน `orderService.ts` โดยใช้ `include` ใน Prisma แทนการวนลูป `findUnique`"

---

## 🔒 OpenNative Processing Flow

### Step 1: Sentinel Masking
- `__PH_0__` = `getUserOrders`
- `__PH_1__` = `orderService.ts`
- `__PH_2__` = `include`
- `__PH_3__` = `findUnique`

### Step 2: Canonical English Specification
> "Fix N+1 query performance bottleneck in `__PH_0__` inside `__PH_1__`. Use relational `__PH_2__` query join instead of executing individual `__PH_3__` iterations inside loop."

---

## 💻 Agent Code Diff

```diff
  export async function getUserOrders(userId: string) {
-   const user = await prisma.user.findUnique({ where: { id: userId } });
-   const orders = await Promise.all(user.orderIds.map(id => prisma.order.findUnique({ where: { id } })));
-   return orders;
+   return await prisma.order.findMany({
+     where: { userId },
+     include: { items: true, payment: true }
+   });
  }
```

---

## 🇹🇭 Native UI Output (Thai)
> แก้ไขปัญหารอบคิวรี N+1 ใน `getUserOrders` (`orderService.ts`) สำเร็จแล้ว โดยใช้ `include` ยิงคิวรีครั้งเดียวเพื่อดึงข้อมูลออเดอร์พร้อมสินค้าและชำระเงินแทนการวนลูป

---

## 📊 Token Savings Summary
- **Thai Prompt Raw Tokens**: 54 tokens (Llama 3.3 Tiktoken)
- **Canonical English Tokens**: 18 tokens
- **Reduction**: **66.7% Saved (3.0× Token Tax Eliminated)**
