const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

// Route để kiểm tra xem router chat có hoạt động không
router.get("/test", (req, res) => {
  res.json({ message: "Chat route is working!" });
});

// Route chính để gửi tin nhắn AI
// Chuyển logic xử lý vào controller để code sạch hơn
router.post("/", chatController.handleChat);

module.exports = router;
