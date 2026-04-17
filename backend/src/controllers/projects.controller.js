const projects = require("../models/projects.model");
const goals = require("../models/goals.model");

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

      const data = await projects.getByUserId(userId);

      if (!data || data.length === 0) {
        console.warn(
          ">>> [Controller] Chú ý: Không tìm thấy dự án nào trong DB.",
        );
        return res.json([]);
      }

      res.json(data);
    } catch (err) {
      console.error(">>> [Controller] LỖI NGHIÊM TRỌNG:", err.message); // LOG LỖI
      res.status(500).json({ message: "Lỗi server", error: err.message });
    }
  },

  insert: async (req, res) => {
    try {
      let { idGoal, newGoalName, user_id, ...projectData } = req.body;

      // 2. Logic xử lý mục tiêu mới
      if (newGoalName && newGoalName.trim() !== "") {
        const goalResult = await goals.insert({
          title: newGoalName,
          user_id: user_id,
          status: "planning",
          priority: "medium",
        });

        console.log("Đã tạo mục tiêu mới với ID:", goalResult.id);
      }

      // 3. Gom dữ liệu cuối cùng để chèn vào bảng projects
      const finalData = {
        name: projectData.name,
        description: projectData.description,
        status: projectData.status || "active",
        color_code: projectData.color_code || "#F59E0B",
        user_id: user_id,
      };

      const result = await projects.insert(finalData);
      res.status(201).json(result);
    } catch (err) {
      console.error("Lỗi insert project:", err);
      res.status(500).json({ message: "Lỗi thêm dự án", error: err.message });
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
