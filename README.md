# 中文学习 · Website học tiếng Trung

## 1. Cấu trúc
- index.html: giao diện
- style.css: responsive mobile/laptop
- app.js: bài học, từ vựng, audio, tiến độ
- localStorage: lưu tiến độ trên trình duyệt của từng thiết bị

## 2. Chạy thử
Mở `index.html` bằng Chrome/Edge. Website không cần cài thư viện.

## 3. Thay bài học
Mở `app.js`, sửa mảng `lessons`.
Mỗi bài có:
id, title, sub, level, words, read.
Mỗi dòng đọc gồm: tiếng Trung, pinyin, nghĩa tiếng Việt.

## 4. Thay từ vựng
Sửa mảng `vocab` theo dạng:
["中文","pinyin","nghĩa","HSK 2"]

## 5. Đưa lên mạng miễn phí
Cách dễ nhất cho người mới:
A. GitHub Pages:
1. Tạo tài khoản GitHub.
2. Tạo repository mới, ví dụ `hoc-tieng-trung`.
3. Upload 3 file `index.html`, `style.css`, `app.js` và README.
4. Vào Settings → Pages.
5. Chọn Deploy from a branch → branch `main` → `/root`.
6. Save.
7. GitHub sẽ tạo một địa chỉ website. Mở địa chỉ đó trên điện thoại/laptop.

B. Netlify:
1. Tạo tài khoản Netlify.
2. Kéo cả thư mục `trung_hoc_tieng_trung` vào phần deploy thủ công.
3. Netlify cấp ngay một đường link.

## 6. Lưu ý về nhiều học viên
Bản hiện tại là bản frontend hoàn chỉnh để dạy học và demo. Tiến độ dùng localStorage nên mỗi trình duyệt lưu riêng.

Nếu muốn quản lý nhiều học viên thật sự (đăng nhập, giáo viên xem tiến độ từng học viên, điểm, lớp, bài tập), cần thêm backend/database. Có thể nâng cấp sau bằng Supabase/Firebase hoặc một server riêng.

## 7. Audio
Website dùng Speech Synthesis có sẵn trong trình duyệt. Không cần tải file mp3. Tốc độ có 0.7×, 0.9×, 1× và 1.25×.
