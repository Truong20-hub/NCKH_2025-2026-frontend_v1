const goals = require("../models/goals.model");

module.exports = {
  getAll: async (req, res) => {
    try {
      const result = await goals.getAll();
      res.send(result);
    } catch (err) {
      res.status(500).send({ message: "Lỗi lấy tất cả mục tiêu" });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await goals.getById(id);
      res.send(result);
    } catch (err) {
      res.status(500).send({ message: "Lỗi lấy chi tiết mục tiêu" });
    }
  },

  // Hàm này cực kỳ quan trọng để load vào select option ở Frontend
  getByUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const result = await goals.getByUserId(userId);
      res.send(result);
    } catch (err) {
      res.status(500).send({ message: "Lỗi lấy mục tiêu theo user" });
    }
  },

  insert: async (req, res) => {
    try {
      const data = req.body;
      const result = await goals.insert(data);
      res.send(result);
    } catch (err) {
      res.status(500).send({ message: "Lỗi thêm mục tiêu" });
    }
  },

  update: async (req, res) => {
    try {
      const data = req.body;
      const id = req.params.id;
      const result = await goals.update(data, id);
      res.send({ message: result });
    } catch (err) {
      res.status(500).send({ message: "Lỗi cập nhật mục tiêu" });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await goals.delete(id);
      res.send({ message: result });
    } catch (err) {
      res.status(500).send({ message: "Lỗi xóa mục tiêu" });
    }
  },
};