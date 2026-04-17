const db = require("../common/db");
const goals = {
  getByUserId: async (userId) => {
    try {
      const [rows] = await db.query(
        "SELECT id, title FROM goals WHERE user_id = ?",
        [userId],
      );
      return rows;
    } catch (err) {
      throw err;
    }
  },
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM goals");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM goals WHERE id = ?", [id]);
    return rows[0];
  },

  insert: async (data) => {
    // data nên là object { user_id, title, description, ... }
    const [res] = await db.query("INSERT INTO goals SET ?", [data]);
    return { id: res.insertId, ...data };
  },

  update: async (data, id) => {
    await db.query("UPDATE goals SET ? WHERE id = ?", [data, id]);
    return `Cập nhật mục tiêu id = ${id} thành công`;
  },

  delete: async (id) => {
    await db.query("DELETE FROM goals WHERE id = ?", [id]);
    return `Xóa mục tiêu id = ${id} thành công`;
  },
};
module.exports = goals;
