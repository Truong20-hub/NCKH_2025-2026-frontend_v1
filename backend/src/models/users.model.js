const db = require("../common/db");

module.exports = {
  getAll: async (callback) => {
    try {
      const [rows] = await db.query("SELECT id, username, email, full_name as fullname FROM users");
      callback(rows);
    } catch (err) {
      console.error("Lỗi getAll:", err);
      callback(null);
    }
  },

  getById: async (id, callback) => {
    try {
      const [rows] = await db.query("SELECT id, username, email, full_name as fullname FROM users WHERE id = ?", [id]);
      callback(rows);
    } catch (err) {
      console.error("Lỗi getById:", err);
      callback(null);
    }
  },

  insert: async (data, callback) => {
    const sql = "INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)";
    try {
      const [result] = await db.query(sql, [data.username, data.email, data.password, data.full_name]);
      callback(result);
    } catch (err) {
      console.error("Lỗi SQL Insert:", err);
      callback(null);
    }
  },

  update: async (data, id, callback) => {
    const fields = [];
    const values = [];

    if (data.username) {
      fields.push("username = ?");
      values.push(data.username);
    }
    if (data.email) {
      fields.push("email = ?");
      values.push(data.email);
    }
    if (data.password) {
      fields.push("password = ?");
      values.push(data.password);
    }
    if (data.fullname || data.full_name) {
      fields.push("full_name = ?");
      values.push(data.fullname || data.full_name);
    }

    if (fields.length === 0) return callback({ message: "Không có dữ liệu cập nhật" });

    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    try {
      const [result] = await db.query(query, values);
      callback(result);
    } catch (err) {
      console.error("Lỗi Query UPDATE:", err);
      callback(null);
    }
  },

  delete: async (id, callback) => {
    const query = "DELETE FROM users WHERE id = ?";
    try {
      const [result] = await db.query(query, [id]);
      callback(result);
    } catch (err) {
      console.error("Lỗi Query DELETE:", err);
      callback(null);
    }
  },

  findByEmail: async (email, callback) => {
    try {
      const [results] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
      callback(results[0]);
    } catch (err) {
      console.error("Lỗi findByEmail:", err);
      callback(null);
    }
  },
};
