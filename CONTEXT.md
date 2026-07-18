# Lingo Project Context

## Coding Rules (Ràng buộc khi code)
- **Không thêm thư viện mới** nếu chưa được yêu cầu rõ ràng. Chỉ dùng những gì đã có trong `package.json`.
- **Phải hiểu rõ yêu cầu** trước khi code — nếu thiếu thông tin, hỏi lại, không tự suy đoán (no assumptions).
- **Break yêu cầu mơ hồ** thành các task nhỏ, cụ thể, đánh giá được mức độ khả thi.
- **Đọc code hiện tại trước khi sửa** — hiểu flow, pattern, convention của project rồi mới động vào.
- **Giữ code đơn giản** — không over-engineer, không refactor phần không liên quan, không thêm abstraction thừa.
- **Không thêm comment** nếu không được yêu cầu.
- **Luôn verify sau khi sửa** — chạy lint, typecheck, test (nếu có) trước khi push.
- **Hỏi trước khi làm** những thao tác nguy hiểm: xóa file/branch, reset git, đổi package version lớn.
- **Một commit = một mục đích** rõ ràng. Không gộp nhiều thay đổi không liên quan vào 1 commit.
- **Dùng tiếng Việt** khi giao tiếp với user.

## Tổng quan
- **Dự án**: Lingo — web app game hóa học tiếng Anh
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS, shadcn/ui (Radix), globals.css dùng @apply
- **Domain**: englishvibe.fun (Vercel)
- **Git**: https://github.com/PokeMango76/Lingo.git (branch: main)
- **Deploy**: Vercel auto-deploy khi push lên main

## Database
- **Provider**: Neon.tech (PostgreSQL serverless)
- **DATABASE_URL**: postgresql://neondb_owner:npg_0yjJQWa5NcHw@ep-holy-hill-az7kbjjn-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
- **ORM**: Drizzle ORM v0.30.2 + drizzle-kit v0.20.14
- **Schema file**: `db/schema.ts`
- **Config**: `drizzle.config.ts` (driver: pg)
- **Scripts**:
  - `npm run db:push` → npx drizzle-kit push:pg (tạo bảng)
  - `npm run db:seed` → tsx ./scripts/seed.ts (nạp dữ liệu mẫu)
  - `npm run db:prod` → tsx ./scripts/prod.ts
  - `npm run db:reset` → tsx ./scripts/reset.ts

## Auth
- **Provider**: Clerk (still-sculpin-10.clerk.accounts.dev)
- **Keys**:
  - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c3RpbGwtc2N1bHBpbi0xMC5jbGVyay5hY2NvdW50cy5kZXYk
  - CLERK_SECRET_KEY=sk_test_h5ZNLDIsTrUorCRnyK4MW5IEYBYllqiRfMEAsRasML
- **Admin**: user ID trong `lib/admin.ts` → user_3Gg27tJfSsbK88OADmWlNyj4Lhp
- **Admin page**: /admin (React Admin)

## Env Files
Cần cả `.env` và `.env.local` ở thư mục gốc (dotenv chỉ đọc .env cho drizzle-kit)

## Data Structure
- Courses (khóa học)
- Units (chương)
- Lessons (bài học)
- Challenges (câu hỏi/bài tập, type: SELECT hoặc ASSIST)
- ChallengeOptions (đáp án)
- UserProgress, ChallengeProgress, UserSubscription

## Seed Data
4 khóa học: Spanish, Italian, French, Croatian. Mỗi khóa có unit/lesson/challenges/options.

## Notable Issues
- Lệnh drizzle-kit push:pg đã deprecated, cần dùng đúng version 0.20.14
- NODE_ENV=production trên máy local → cần npm install --include=dev
- tsx phải chạy qua npx nếu không có trong PATH

## User Preferences
- Giao tiếp bằng tiếng Việt
- Dùng npm (không dùng bun/yarn/pnpm)
- Icon trình duyệt: giữ mặc định
- Background: mặc định (đã thử custom bg nhưng không đẹp, đã revert)
