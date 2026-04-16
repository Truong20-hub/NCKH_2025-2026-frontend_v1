const projects = require("../models/projects.model");

module.exports = {
  // Lấy tất cả dự án
  getAll: async (req, res) => {
    try {
      const data = await projects.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: "Lỗi lấy danh sách dự án" });
    }
  },

  // Lấy chi tiết 1 dự án theo ID
  getById: async (req, res) => {
    try {
      const data = await projects.getById(req.params.id);
      if (!data)
        return res.status(404).json({ message: "Không tìm thấy dự án" });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: "Lỗi lấy chi tiết dự án" });
    }
  },

  getProjectsByUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log(">>> [Controller] Đang lấy dự án cho UserId:", userId); // LOG 1

      const data = await projects.getByUserId(userId);

      console.log(">>> [Controller] Dữ liệu từ Model trả về:", data); // LOG 2

      if (!data || data.length === 0) {
        console.warn(
          ">>> [Controller] Chú ý: Không tìm thấy dự án nào trong DB.",
        );
        return res.json([]); // Trả về mảng rỗng để React không bị loading mãi
      }

      res.json(data);
    } catch (err) {
      console.error(">>> [Controller] LỖI NGHIÊM TRỌNG:", err.message); // LOG LỖI
      res.status(500).json({ message: "Lỗi server", error: err.message });
    }
  },

  insert: async (req, res) => {
    try {
      const result = await projects.insert(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ message: "Lỗi thêm dự án" });
    }
  },

  update: async (req, res) => {
    try {
      const result = await projects.update(req.body, req.params.id);
      res.json({ message: result });
    } catch (err) {
      res.status(500).json({ message: "Lỗi cập nhật dự án" });
    }
  },

  delete: async (req, res) => {
    try {
      const result = await projects.delete(req.params.id);
      res.json({ message: result });
    } catch (err) {
      res.status(500).json({ message: "Lỗi xóa dự án" });
    }
  },
};
