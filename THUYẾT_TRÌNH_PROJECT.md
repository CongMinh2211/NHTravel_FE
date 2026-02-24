# THUYẾT TRÌNH PROJECT: HiTravel - HỆ THỐNG QUẢN LÝ TOUR DU LỊCH

---

## SLIDE 1: TRANG BÌA
**HiTravel - Hệ Thống Quản Lý Tour Du Lịch**

Đồ án tốt nghiệp
- Sinh viên thực hiện: [Tên sinh viên]
- GVHD: [Tên giảng viên]
- Năm: 2026

---

## SLIDE 2: GIỚI THIỆU TỔNG QUAN

### Bối cảnh
- Ngành du lịch Việt Nam đang phát triển mạnh mẽ
- Nhu cầu đặt tour trực tuyến ngày càng tăng
- Cần một hệ thống quản lý tour hiện đại, tiện lợi

### Mục tiêu
- Xây dựng website quản lý và đặt tour du lịch trong nước
- Tự động hóa quy trình đặt tour, thanh toán
- Tích hợp chatbot AI hỗ trợ khách hàng 24/7
- Quản lý hiệu quả tour, booking, khách hàng

---

## SLIDE 3: PHẠM VI DỰ ÁN

### Đối tượng sử dụng
1. **Khách hàng**: Tìm kiếm, đặt tour, thanh toán trực tuyến
2. **Nhân viên**: Quản lý booking, xử lý đơn hàng
3. **Quản trị viên**: Quản lý toàn bộ hệ thống

### Phạm vi
- Tour du lịch TRONG NƯỚC (Miền Bắc, Miền Trung, Miền Nam)
- Thanh toán trực tuyến (VNPay, Sepay)
- Quản lý voucher/mã giảm giá
- Chatbot AI tư vấn tự động

---

## SLIDE 4: CÔNG NGHỆ SỬ DỤNG

### Backend
- **Framework**: Laravel 11 (PHP 8.2)
- **Database**: SQLite
- **Authentication**: Laravel Sanctum
- **API**: RESTful API

### Frontend
- **Framework**: Vue.js 3
- **UI Library**: Bootstrap 5
- **State Management**: Vue Router
- **HTTP Client**: Axios

### AI & Services
- **Chatbot**: Google Gemini AI
- **Payment Gateway**: VNPay, Sepay
- **Email**: Laravel Mail

---

## SLIDE 5: KIẾN TRÚC HỆ THỐNG

```
┌─────────────────────────────────────────┐
│         FRONTEND (Vue.js 3)             │
│  - Giao diện khách hàng                 │
│  - Giao diện quản trị                   │
│  - Chatbot UI                           │
└──────────────┬──────────────────────────┘
               │ REST API
┌──────────────▼──────────────────────────┐
│         BACKEND (Laravel 11)            │
│  - API Controllers                      │
│  - Business Logic                       │
│  - Authentication                       │
└──────────────┬──────────────────────────┘
               │
    ┌──────────┼──────────┐
    │          │          │
┌───▼───┐  ┌──▼───┐  ┌──▼─────┐
│SQLite │  │Gemini│  │Payment │
│  DB   │  │  AI  │  │Gateway │
└───────┘  └──────┘  └────────┘
```

---

## SLIDE 6: CƠ SỞ DỮ LIỆU - CHÍNH

### Các bảng chính
1. **nguoi_dungs** - Quản lý người dùng
2. **tour_du_liches** - Thông tin tour
3. **dat_tours** - Đơn đặt tour
4. **thanh_toans** - Thanh toán
5. **danh_gias** - Đánh giá tour
6. **ma_giam_gias** - Voucher/mã giảm giá
7. **chatbot_logs** - Lịch sử chat
8. **bai_viets** - Bài viết/tin tức

### Quan hệ
- User → Booking (1-n)
- Tour → Booking (1-n)
- Booking → Payment (1-1)
- Tour → Review (1-n)

---

## SLIDE 7: CHỨC NĂNG KHÁCH HÀNG (1)

### Quản lý tài khoản
- ✅ Đăng ký/Đăng nhập
- ✅ Kích hoạt tài khoản qua email
- ✅ Quên mật khẩu
- ✅ Cập nhật thông tin cá nhân
- ✅ Đổi avatar

### Tìm kiếm & Xem tour
- ✅ Danh sách tour theo danh mục
- ✅ Tìm kiếm tour
- ✅ Xem chi tiết tour (lịch trình, giá, hình ảnh)
- ✅ Xem đánh giá của khách hàng khác

---

## SLIDE 8: CHỨC NĂNG KHÁCH HÀNG (2)

### Đặt tour & Thanh toán
- ✅ Chọn tour, số lượng người
- ✅ Chọn phương tiện di chuyển
- ✅ Áp dụng mã giảm giá
- ✅ Thanh toán trực tuyến (VNPay, Sepay)
- ✅ Nhận email xác nhận

### Quản lý đơn hàng
- ✅ Xem lịch sử đặt tour
- ✅ Theo dõi trạng thái đơn hàng
- ✅ Đánh giá tour sau khi hoàn thành
- ✅ Hủy đơn hàng (nếu chưa thanh toán)

---

## SLIDE 9: CHATBOT AI - TÍNH NĂNG NỔI BẬT

### Công nghệ
- **Google Gemini AI** - Mô hình ngôn ngữ lớn
- Tích hợp trực tiếp vào website
- Phản hồi tự động 24/7

### Chức năng
- ✅ Tư vấn tour du lịch
- ✅ Giải đáp thắc mắc về dịch vụ
- ✅ Hướng dẫn đặt tour
- ✅ Thông tin liên hệ, thanh toán
- ✅ Giới thiệu mã giảm giá
- ✅ Lưu lịch sử hội thoại

### Đặc điểm
- Chỉ tư vấn tour TRONG NƯỚC
- Gợi ý tour thay thế phù hợp
- Trả lời thân thiện, chuyên nghiệp

---

## SLIDE 10: CHỨC NĂNG QUẢN TRỊ (1)

### Quản lý Tour
- ✅ Thêm/Sửa/Xóa tour
- ✅ Quản lý hình ảnh tour
- ✅ Quản lý lịch trình chi tiết
- ✅ Thiết lập giá, số chỗ
- ✅ Quản lý phương tiện

### Quản lý Booking
- ✅ Xem danh sách đặt tour
- ✅ Xác nhận/Hủy đơn hàng
- ✅ Theo dõi trạng thái thanh toán
- ✅ Xuất báo cáo booking

---

## SLIDE 11: CHỨC NĂNG QUẢN TRỊ (2)

### Quản lý Người dùng
- ✅ Danh sách khách hàng
- ✅ Quản lý nhân viên
- ✅ Phân quyền theo chức vụ
- ✅ Kích hoạt/Khóa tài khoản

### Quản lý Voucher
- ✅ Tạo mã giảm giá
- ✅ Thiết lập điều kiện áp dụng
- ✅ Theo dõi lịch sử sử dụng
- ✅ Kích hoạt/Vô hiệu hóa voucher

---

## SLIDE 12: CHỨC NĂNG QUẢN TRỊ (3)

### Quản lý Nội dung
- ✅ Đăng bài viết/tin tức
- ✅ Quản lý danh mục bài viết
- ✅ Quản lý thông tin liên hệ
- ✅ Xem log chatbot

### Thống kê & Báo cáo
- ✅ Doanh thu theo thời gian
- ✅ Số lượng booking
- ✅ Tour phổ biến nhất
- ✅ Đánh giá khách hàng
- ✅ Biểu đồ trực quan (Chart.js)

---

## SLIDE 13: HỆ THỐNG THANH TOÁN

### Phương thức thanh toán
1. **VNPay** - Cổng thanh toán phổ biến
2. **Sepay** - Chuyển khoản ngân hàng
3. **Thanh toán trực tiếp** - Khi nhận dịch vụ

### Quy trình
1. Khách chọn tour → Giỏ hàng
2. Nhập thông tin → Áp dụng voucher
3. Chọn phương thức thanh toán
4. Xử lý thanh toán qua gateway
5. Webhook xác nhận → Cập nhật trạng thái
6. Gửi email xác nhận

### Bảo mật
- ✅ Mã hóa thông tin thanh toán
- ✅ Idempotency key (tránh trùng lặp)
- ✅ Webhook verification
- ✅ Transaction logging

---

## SLIDE 14: HỆ THỐNG PHÂN QUYỀN

### Vai trò (Roles)
1. **Admin** - Quản trị viên
   - Toàn quyền hệ thống
   - Quản lý người dùng, phân quyền
   
2. **Staff** - Nhân viên
   - Quản lý booking
   - Xử lý đơn hàng
   
3. **Customer** - Khách hàng
   - Đặt tour, thanh toán
   - Xem lịch sử, đánh giá

### Chức năng (Permissions)
- Mỗi vai trò có danh sách chức năng cụ thể
- Kiểm tra quyền trước khi truy cập
- Middleware bảo vệ routes

---

## SLIDE 15: GIAO DIỆN NGƯỜI DÙNG

### Trang khách hàng
- **Trang chủ**: Banner, tour nổi bật, tin tức
- **Danh sách tour**: Filter, search, pagination
- **Chi tiết tour**: Hình ảnh, lịch trình, đánh giá
- **Đặt tour**: Form booking, chọn phương tiện
- **Thanh toán**: Tổng tiền, voucher, payment
- **Profile**: Thông tin cá nhân, lịch sử

### Responsive Design
- ✅ Tương thích mobile, tablet, desktop
- ✅ Bootstrap 5 responsive grid
- ✅ Touch-friendly interface

---

## SLIDE 16: GIAO DIỆN QUẢN TRỊ

### Dashboard
- Thống kê tổng quan
- Biểu đồ doanh thu
- Booking gần đây
- Thông báo quan trọng

### Quản lý
- Sidebar menu theo chức năng
- DataTables với search, sort, filter
- Modal form thêm/sửa
- Toast notification

### UX/UI
- ✅ Giao diện thân thiện, dễ sử dụng
- ✅ Icons trực quan (Bootstrap Icons)
- ✅ Loading states
- ✅ Error handling

---

## SLIDE 17: TÍNH NĂNG BẢO MẬT

### Authentication
- ✅ Laravel Sanctum (Token-based)
- ✅ Password hashing (bcrypt)
- ✅ Email verification
- ✅ Password reset

### Authorization
- ✅ Role-based access control (RBAC)
- ✅ Middleware protection
- ✅ API token validation

### Data Security
- ✅ SQL injection prevention (Eloquent ORM)
- ✅ XSS protection
- ✅ CSRF protection
- ✅ CORS configuration
- ✅ Input validation & sanitization

---

## SLIDE 18: TÍNH NĂNG NỔI BẬT

### 1. Chatbot AI thông minh
- Tích hợp Google Gemini AI
- Tư vấn tự động 24/7
- Hiểu ngữ cảnh, trả lời tự nhiên

### 2. Thanh toán đa dạng
- VNPay, Sepay
- Webhook tự động
- Transaction logging

### 3. Quản lý voucher linh hoạt
- Tạo mã giảm giá dễ dàng
- Điều kiện áp dụng linh hoạt
- Theo dõi lịch sử sử dụng

### 4. Thống kê trực quan
- Chart.js biểu đồ đẹp
- Báo cáo theo thời gian
- Export dữ liệu

---

## SLIDE 19: QUY TRÌNH PHÁT TRIỂN

### Phương pháp
- **Agile/Scrum** - Phát triển linh hoạt
- Sprint 2 tuần
- Daily standup, Sprint review

### Công cụ
- **Git** - Version control
- **GitHub** - Code repository
- **Postman** - API testing
- **VS Code** - IDE

### Testing
- Unit testing (PHPUnit)
- API testing
- Manual testing
- User acceptance testing (UAT)

---

## SLIDE 20: TRIỂN KHAI

### Môi trường
- **Development**: Local (XAMPP/Laragon)
- **Staging**: Test server
- **Production**: Railway/Vercel

### CI/CD
- Git push → Auto deploy
- Environment variables
- Database migration
- Asset compilation

### Monitoring
- Error logging (Laravel Log)
- Performance monitoring
- User analytics

---

## SLIDE 21: KẾT QUẢ ĐẠT ĐƯỢC

### Chức năng
✅ Hoàn thành 100% chức năng đề ra
- Khách hàng: Đặt tour, thanh toán, đánh giá
- Quản trị: Quản lý tour, booking, người dùng
- Chatbot AI: Tư vấn tự động

### Hiệu suất
✅ Tốc độ tải trang < 2s
✅ API response time < 500ms
✅ Xử lý đồng thời nhiều request

### Trải nghiệm
✅ Giao diện thân thiện, dễ sử dụng
✅ Responsive trên mọi thiết bị
✅ Chatbot phản hồi nhanh, chính xác

---

## SLIDE 22: HẠNG CHẾ & HƯỚNG PHÁT TRIỂN

### Hạn chế hiện tại
- Chỉ hỗ trợ tour trong nước
- Chưa có app mobile native
- Chưa tích hợp nhiều payment gateway

### Hướng phát triển
🔹 Mở rộng tour quốc tế
🔹 Phát triển mobile app (React Native/Flutter)
🔹 Tích hợp thêm payment: Momo, ZaloPay
🔹 Chatbot đa ngôn ngữ
🔹 Recommendation system (AI)
🔹 Live chat với nhân viên
🔹 Tích hợp bản đồ (Google Maps)
🔹 Booking tour theo nhóm

---

## SLIDE 23: DEMO THỰC TẾ

### Video Demo
[Chèn video hoặc screenshots]

### Các tính năng demo
1. Đăng ký/Đăng nhập
2. Tìm kiếm và xem tour
3. Đặt tour và thanh toán
4. Chat với chatbot AI
5. Quản trị: Thêm tour mới
6. Quản trị: Xem thống kê

### Link demo
- Frontend: [URL]
- Backend API: [URL]
- Admin Panel: [URL]

---

## SLIDE 24: KẾT LUẬN

### Tổng kết
- ✅ Hoàn thành đầy đủ mục tiêu đề ra
- ✅ Áp dụng công nghệ hiện đại
- ✅ Giải quyết bài toán thực tế
- ✅ Có thể triển khai thương mại

### Kiến thức đạt được
- Fullstack development (Laravel + Vue.js)
- RESTful API design
- Database design & optimization
- Payment gateway integration
- AI chatbot integration
- DevOps & deployment

### Ý nghĩa
- Nâng cao trải nghiệm khách hàng
- Tự động hóa quy trình kinh doanh
- Tăng hiệu quả quản lý

---

## SLIDE 25: Q&A

# CÂU HỎI & TRẢ LỜI

**Xin cảm ơn quý thầy cô và các bạn đã lắng nghe!**

---

## PHỤ LỤC: CÂU HỎI THƯỜNG GẶP

### Q1: Tại sao chọn Laravel và Vue.js?
**A**: 
- Laravel: Framework PHP mạnh mẽ, bảo mật tốt, ecosystem phong phú
- Vue.js: Dễ học, hiệu suất cao, tích hợp tốt với Laravel
- Cả hai đều có cộng đồng lớn, tài liệu đầy đủ

### Q2: Chatbot AI hoạt động như thế nào?
**A**:
- Sử dụng Google Gemini AI API
- Gửi câu hỏi user + system prompt → Gemini
- Gemini phân tích và trả lời
- Lưu lịch sử chat vào database
- Có thể train thêm với dữ liệu tour cụ thể

### Q3: Xử lý thanh toán như thế nào?
**A**:
- Tích hợp VNPay/Sepay SDK
- Redirect user đến payment gateway
- Gateway xử lý thanh toán
- Webhook callback về server
- Verify signature → Cập nhật trạng thái
- Gửi email xác nhận

### Q4: Bảo mật dữ liệu khách hàng?
**A**:
- Password: bcrypt hashing
- API: Token authentication (Sanctum)
- Database: Prepared statements (SQL injection prevention)
- Input: Validation & sanitization
- HTTPS: SSL/TLS encryption
- CORS: Whitelist domains

### Q5: Có thể scale hệ thống không?
**A**:
- Database: Có thể chuyển sang MySQL/PostgreSQL
- Cache: Redis/Memcached
- Queue: Laravel Queue cho background jobs
- Load balancer: Nginx
- CDN: Cloudflare cho static assets
- Microservices: Tách services độc lập

### Q6: Chi phí vận hành?
**A**:
- Hosting: Railway/Vercel (Free tier hoặc ~$5-20/tháng)
- Domain: ~$10-15/năm
- Gemini API: Free tier 60 requests/phút
- VNPay/Sepay: Phí giao dịch 1-2%
- Email: Laravel Mail (SMTP free)
- **Tổng**: ~$10-30/tháng cho startup

### Q7: Thời gian phát triển?
**A**:
- Planning & Design: 2 tuần
- Backend Development: 4 tuần
- Frontend Development: 4 tuần
- Integration & Testing: 2 tuần
- Deployment & Bug fixes: 1 tuần
- **Tổng**: ~3 tháng (1 người)

### Q8: Khác biệt với các website tour khác?
**A**:
- ✅ Chatbot AI tư vấn tự động (độc đáo)
- ✅ Giao diện hiện đại, UX tốt
- ✅ Thanh toán đa dạng, an toàn
- ✅ Quản trị mạnh mẽ, thống kê chi tiết
- ✅ Open source, có thể customize

---

## HƯỚNG DẪN THUYẾT TRÌNH

### Chuẩn bị
1. **Thời gian**: 15-20 phút thuyết trình + 5-10 phút Q&A
2. **Thiết bị**: Laptop, projector, pointer
3. **Demo**: Chuẩn bị video demo hoặc live demo
4. **Backup**: PDF slides, video offline

### Cấu trúc thuyết trình
1. **Mở đầu** (2 phút): Giới thiệu, bối cảnh
2. **Nội dung chính** (12 phút):
   - Công nghệ & kiến trúc (3 phút)
   - Chức năng chính (5 phút)
   - Demo (4 phút)
3. **Kết luận** (1 phút): Tổng kết, ý nghĩa
4. **Q&A** (5-10 phút): Trả lời câu hỏi

### Tips
- ✅ Nói rõ ràng, tự tin
- ✅ Nhấn mạnh điểm nổi bật (Chatbot AI)
- ✅ Sử dụng hình ảnh, video minh họa
- ✅ Tương tác với hội đồng
- ✅ Chuẩn bị trả lời câu hỏi khó
- ✅ Giữ thời gian

### Điểm nhấn
🌟 **Chatbot AI** - Tính năng độc đáo
🌟 **Fullstack** - Làm chủ cả FE & BE
🌟 **Real-world** - Giải quyết bài toán thực tế
🌟 **Modern tech** - Công nghệ mới nhất

---

## TÀI LIỆU THAM KHẢO

### Documentation
- Laravel 11: https://laravel.com/docs/11.x
- Vue.js 3: https://vuejs.org/guide/
- Google Gemini AI: https://ai.google.dev/docs
- VNPay API: https://sandbox.vnpayment.vn/apis/
- Bootstrap 5: https://getbootstrap.com/docs/5.3/

### Source Code
- GitHub Repository: [Link]
- API Documentation: [Link]
- Database Schema: [Link]

### Contact
- Email: [email]
- Phone: [phone]
- LinkedIn: [profile]

---

**Chúc bạn thuyết trình thành công! 🎉**
