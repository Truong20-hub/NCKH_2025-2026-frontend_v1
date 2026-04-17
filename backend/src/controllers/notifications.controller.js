const notifications = require("../models/notifications.model");

module.exports = {
  // Lấy tất cả thông báo (dùng cho quản trị hoặc debug)
  getAll: async (req, res) => {
    try {
      const data = await notifications.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ success: false, message: "Lỗi lấy tất cả thông báo" });
    }
  },

  // Lấy thông báo theo User ID (Frontend đang gọi hàm này)
  getByUserId: async (req, res) => {
    try {
      const userId = req.params.userId;
      const data = await notifications.getByUserId(userId);
      res.json(data);
    } catch (err) {
      console.error("Lỗi getByUserId:", err);
      res.status(500).json({ success: false, message: "Lỗi lấy thông báo theo User" });
    }
  },

  // Lấy chi tiết một thông báo
  getById: async (req, res) => {
    try {
      const data = await notifications.getById(req.params.id);
      if (!data) return res.status(404).json({ message: "Không tìm thấy" });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: "Lỗi lấy chi tiết" });
    }
  },

  // Thêm mới thông báo (AI hoặc Hệ thống tạo)
  insert: async (req, res) => {
    try {
      const result = await notifications.insert(req.body);
      res.status(201).json({ success: true, result });
    } catch (err) {
      res.status(500).json({ message: "Lỗi thêm thông báo" });
    }
  },

  // Cập nhật (Dùng để Đánh dấu đã đọc)
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const updateData = req.body;
      const result = await notifications.update(id, updateData);
      res.json({ success: true, message: "Cập nhật thành công", result });
    } catch (err) {
      res.status(500).json({ message: "Lỗi khi cập nhật thông báo" });
    }
  },

  // Xóa thông báo
  delete: async (req, res) => {
    try {
      await notifications.delete(req.params.id);
      res.json({ success: true, message: "Xóa thông báo thành công" });
    } catch (err) {
      res.status(500).json({ message: "Lỗi xóa thông báo" });
    }
  }
};