const tasks = require("../models/tasks.model");

module.exports = {
 getAll: async (req, res) => {
    try {
      const userId = req.query.userId;
      const data = await tasks.getAll(userId);
      res.json(data || []); // Luôn đảm bảo trả về mảng để Frontend không bị lỗi .filter()
    } catch (err) {
      console.error("Lỗi Controller getAll tasks:", err);
      res.status(500).json([]); // Trả về mảng rỗng nếu lỗi để cứu Frontend
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await tasks.getById(id);
      res.json(data || {}); // Luôn đảm bảo trả về đối tượng để Frontend không bị lỗi
    } catch (err) {
      console.error("Lỗi Controller getById tasks:", err);
      res.status(500).json({}); // Trả về đối tượng rỗng nếu lỗi để cứu Frontend
    }
  },
  insert: async (req, res) => {
    try {
      const data = req.body;
      const result = await tasks.insert(data);
      res.status(201).json(result);
    } catch (err) {
      console.error("Lỗi Controller insert tasks:", err);
      res.status(500).json({ error: "Lỗi khi thêm task" });
    }
  },
  update: async (req, res) => {
    try {
      const data = req.body;
      const id = req.params.id;
      const result = await tasks.update(data, id);
      res.json(result);
    } catch (err) {
      console.error("Lỗi Controller update tasks:", err);
      res.status(500).json({ error: "Lỗi khi cập nhật task" });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await tasks.delete(id);
      res.json(result);
    } catch (err) {
      console.error("Lỗi Controller delete tasks:", err);
      res.status(500).json({ error: "Lỗi khi xóa task" });
    }
  },
};
