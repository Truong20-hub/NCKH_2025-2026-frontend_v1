const db = require("../common/db");

const tasks = {
  // Lấy tất cả danh sách công việc
  getAll: async (userId) => {
    if (!userId) {
      const [rows] = await db.query("SELECT * FROM tasks");
      return rows;
    }
    const query = `
      SELECT DISTINCT t.* 
      FROM tasks t
      LEFT JOIN projects p ON t.project_id = p.id
      LEFT JOIN goals g ON t.goal_id = g.id
      WHERE p.user_id = ? OR g.user_id = ?
    `;
    const [rows] = await db.query(query, [userId, userId]);
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