const users = require("../models/users.model");
const db = require("../common/db");

module.exports = {
  getAll: (req, res) => {
    users.getAll((result) => {
      if (!result) return res.status(500).send({ message: "Lỗi Server" });
      res.send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    users.getById(id, (result) => {
      if (!result || result.length === 0) {
        return res.status(404).send({ message: "Không tìm thấy người dùng" });
      }
      res.send(result);
    });
  },

  insert: async (data, callback) => {
    const sql = "INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)";
    try {
      const [result] = await db.query(sql, [
        data.username,
        data.email,
        data.password,
        data.full_name,
      ]);
      callback(result); 
    } catch (err) {
      console.error("Lỗi SQL Insert:", err);
      callback(null); // Thất bại trả về null
    }
  },
  update: (data, id, callback) => {
    const query =
      "UPDATE users SET username = ?, email = ?, password = ?, full_name = ? WHERE id = ?";
    db.query(
      query,
      [data.username, data.email, data.password, data.full_name, id],
      (err, result) => {
        if (err) {
          console.error("Lỗi Query UPDATE:", err);
          return callback(null);
        }
        callback(result);
      },
    );
  },

  delete: (id, callback) => {
    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Lỗi Query DELETE:", err);
        return callback(null);
      }
      callback(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    users.delete(id, (result) => {
      res.send({ message: "Đã xóa người dùng", result });
    });
  },
  findByEmail: async (email, callback) => {
    try {
      const [results] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
      callback(results[0]); // Trả về user đầu tiên hoặc undefined
    } catch (err) {
      console.error("Lỗi findByEmail:", err);
      callback(null);
    }
  },
};
