const db = require("../common/db");

const tasks = {
  // Lấy tất cả danh sách công việc
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM tasks");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
    return rows[0];
  },

  insert: async (data) => {
    const [res] = await db.query("INSERT INTO tasks SET ?", [data]);
    return { id: res.insertId, ...data };
  },

  update: async (data, id) => {
    await db.query("UPDATE tasks SET ? WHERE id = ?", [data, id]);
    return `Cập nhật thành công task ${id}`;
  },

  delete: async (id) => {
    await db.query("DELETE FROM tasks WHERE id = ?", [id]);
    return `Xóa thành công task ${id}`;
  }
};

module.exports = tasks;