const db = require("../common/db");

const projects = {
  getByUserId: async (userId) => {
    const [rows] = await db.query("SELECT * FROM projects WHERE user_id = ?", [userId]);
    return rows;
  },
  
  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM projects WHERE id = ?", [id]);
    return rows[0];
  },

  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM projects");
    return rows;
  },

  insert: async (data) => {
    const [res] = await db.query("INSERT INTO projects SET ?", [data]);
    return { id: res.insertId, ...data };
  },

  update: async (data, id) => {
    await db.query("UPDATE projects SET ? WHERE id = ?", [data, id]);
    return "Cập nhật thành công";
  },

  delete: async (id) => {
    await db.query("DELETE FROM projects WHERE id = ?", [id]);
    return "Xóa thành công";
  }
};

module.exports = projects;