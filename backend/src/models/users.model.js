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

  insert: (data, callback) => {
    // Phải khớp với các cột: username, email, password, full_name
    const query =
      "INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [data.username, data.email, data.password, data.full_name],
      (err, result) => {
        if (err) {
          console.error("Lỗi Query INSERT:", err); // Dòng này sẽ hiện lỗi ở terminal backend
          return callback(null);
        }
        callback(result);
      },
    );
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
  // Thêm vào file models/users.model.js của Quynh
  findByEmail: (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) return callback(null);
      callback(results[0]);
    });
  },
};
