const geminiModel = require("../models/geminiModel");

/**
 * Xử lý yêu cầu chat từ người dùng
 */
exports.handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Nội dung tin nhắn không được để trống",
      });
    }

    const reply = await geminiModel.askGemini(message);

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Lỗi tại Chat Controller:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Lỗi hệ thống khi xử lý AI",
    });
  }
};
