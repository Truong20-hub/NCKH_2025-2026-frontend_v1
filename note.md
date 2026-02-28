Sơ Đồ Kiến Trúc Hệ Thống (Luồng Dữ liệu Chính)

graph LR
    subgraph Client
        F[Frontend (ReactJS)]
    end

    subgraph Server API (Node.js)
        B[Backend (ExpressJS):5000]
        M(Middleware Auth)
    end

    subgraph Optimization Service
        A[Algorithm (FastAPI):8000]
    end

    subgraph Data
        D(MongoDB)
    end

    F -- 1. Yêu cầu Lịch Tối ưu (Goals + Fixed Schedule) --> M
    M -- 2. Nếu Auth OK --> B
    B -- 3. Truy vấn Dữ liệu Goals & Schedule --> D
    D -- 4. Trả về Dữ liệu --> B
    B -- 5. Gửi Dữ liệu (Goals, Schedule) --> A
    A -- 6. Giải thuật OR-Tools/Pulp --> A
    A -- 7. Trả về Lịch Tối ưu (Optimized Slots) --> B
    B -- 8. Lưu Optimized Slots --> D
    B -- 9. Trả về Lịch Tối ưu --> F


I. Kiến Trúc Hệ Thống (Mô hình Microservices)

Frontend (React/Vite): Chạy trên cổng 5174.

Backend (Node.js/Express): Chạy trên cổng 5000.

Sử dụng Mongoose để kết nối MongoDB.

Đã thiết lập Auth Routes (/api/users/register, /api/users/login).

Algorithm Service (Python/FastAPI): Chạy trên cổng 8000.

Sử dụng thư viện ortools và pulp cho bài toán tối ưu.

II. Các Mô Hình Dữ Liệu Đã Thiết Lập (MongoDB)

Model

Mục đích

Các trường quan trọng

User

Quản lý tài khoản.

name, email, password (hashed)

Goal

Các mục tiêu cần tối ưu.

name, deadline, totalHoursRequired, priority

Schedule

Khung giờ cố định.

startTime, endTime, dayOfWeek, isFixed

III. Các Vấn Đề Cần Xử lý Tiếp theo

A. Backend (Node.js)

Hoàn thiện Goal Routes: Tạo API để CRUD (Create, Read, Update, Delete) Goals.

Middleware Bảo mật: Triển khai middleware protect để bảo vệ các route (yêu cầu JWT token).

Tích hợp Python: Viết Controller để gọi POST http://localhost:8000/optimize.

B. Frontend (React)

Thiết lập Layout (Header, Sidebar).

Xây dựng trang Login/Register.

Xây dựng giao diện Input Goals và Input Fixed Schedule.

Ngày cập nhật gần nhất: 23/10/2025