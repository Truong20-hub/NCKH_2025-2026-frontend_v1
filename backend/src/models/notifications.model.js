const db = require("../common/db");

const notifications = {
  // Lấy thông báo theo User ID - Giống hệt logic await của tasks
  getByUserId: async (userId) => {
    const query = "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC";
    const [rows] = await db.query(query, [userId]);
    return rows;
  },

  // Lấy chi tiết 1 thông báo
  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM notifications WHERE id = ?", [id]);
    return rows[0];
  },

  // Thêm mới thông báo
  insert: async (data) => {
    const [res] = await db.query("INSERT INTO notifications SET ?", [data]);
    return { id: res.insertId, ...data };
  },

  // Cập nhật thông báo (Ví dụ đánh dấu đã đọc)
  update: async (data, id) => {
    await db.query("UPDATE notifications SET ? WHERE id = ?", [data, id]);
    return `Cập nhật thành công thông báo ${id}`;
  },

  // Xóa thông báo
  delete: async (id) => {
    await db.query("DELETE FROM notifications WHERE id = ?", [id]);
    return `Xóa thành công thông báo ${id}`;
  },

  // Lấy tất cả (nếu cần dùng cho trang quản trị)
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM notifications ORDER BY created_at DESC");
    return rows;
  }
};

module.exports = notifications;