const db = require("../config/db");

const Nhatkytiendo = {
  getAll: async () => {
    const [rows] = await db.promise().execute(`
      SELECT nk.*, cv.TieuDe as TenCongViec 
      FROM nhatkytiendo nk 
      JOIN congviec cv ON nk.CongViecId = cv.Id
    `);
    return rows;
  },

  create: async (data) => {
    const { CongViecId, NoiDung, NgayGhiLog } = data;
    const query = `INSERT INTO nhatkytiendo (CongViecId, NoiDung, NgayGhiLog) VALUES (?, ?, ?)`;
    const [result] = await db
      .promise()
      .execute(query, [CongViecId, NoiDung, NgayGhiLog || new Date()]);
    return result;
  },

  // Cập nhật nhật ký
  update: async (id, data) => {
    const { CongViecId, NoiDung, NgayGhiLog } = data;
    const query = `
      UPDATE nhatkytiendo 
      SET CongViecId = ?, NoiDung = ?, NgayGhiLog = ? 
      WHERE Id = ?
    `;
    const [result] = await db
      .promise()
      .execute(query, [CongViecId, NoiDung, NgayGhiLog || new Date(), id]);
    return result;
  },

  delete: async (id) => {
    const [result] = await db
      .promise()
      .execute("DELETE FROM nhatkytiendo WHERE Id = ?", [id]);
    return result;
  },

  // Tìm kiếm nhật ký theo nội dung hoặc tên công việc liên quan
  search: async (keyword) => {
    const query = `
      SELECT nk.*, cv.TieuDe as TenCongViec 
      FROM nhatkytiendo nk 
      JOIN congviec cv ON nk.CongViecId = cv.Id
      WHERE nk.NoiDung LIKE ? OR cv.TieuDe LIKE ?
    `;
    const searchTerm = `%${keyword}%`;
    const [rows] = await db.promise().execute(query, [searchTerm, searchTerm]);
    return rows;
  },

  checkCongViecExists: async (cvId) => {
    const [rows] = await db
      .promise()
      .execute("SELECT Id FROM congviec WHERE Id = ?", [cvId]);
    return rows.length > 0;
  },
};

module.exports = Nhatkytiendo;

module.exports = Nhatkytiendo;
