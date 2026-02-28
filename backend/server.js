const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Task = require("./src/models/Task");

dotenv.config();

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Kết nối MongoDB Atlas ---
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    console.log("✅ Đã kết nối với MongoDB: " + process.env.MONGODB_URI)
  )
  .catch((err) => console.error("❌ Lỗi kết nối Database:", err));

// --- Các Routes (API) ---

// 1. Trang chủ kiểm tra server
app.get("/", (req, res) => {
  res.send("🚀 Máy chủ TaskAI đang chạy ổn định...");
});

// 2. API Lấy toàn bộ danh sách công việc (GET)
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy dữ liệu", error: err.message });
  }
});

// 3. API Tạo dữ liệu mẫu nhanh (GET)
app.get("/add-sample", async (req, res) => {
  try {
    const sampleTask = new Task({
      title: "Nghiên cứu Backend Nodejs",
      description: "Học cách kết nối Express với MongoDB Atlas",
      status: "in-progress",
      deadline: new Date("2026-01-30"),
    });
    const savedTask = await sampleTask.save();
    res
      .status(201)
      .json({ message: "✅ Đã tạo dữ liệu mẫu!", data: savedTask });
  } catch (err) {
    res.status(500).json({ message: "Lỗi tạo dữ liệu", error: err.message });
  }
});

// 4. API Tạo công việc mới (POST) - Dùng cho Frontend sau này
app.post("/tasks", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    deadline: req.body.deadline,
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Dữ liệu không hợp lệ", error: err.message });
  }
});

// --- Khởi động Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại cổng: ${PORT}`);
});
