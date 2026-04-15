const db = require("../config/db");

const Congviec = {
  // Tạo công việc mới dựa trên cấu trúc bảng congviec trong db.sql
  create: async (data) => {
    const { MucTieuId, TieuDe, ThoiGianDuKien } = data;
    const query = `
      INSERT INTO congviec (MucTieuId, TieuDe, ThoiGianDuKien, DaHoanThanh, NgayTao) 
      VALUES (?, ?, ?, 0, CURRENT_TIMESTAMP)
    `;

    // Sử dụng promise() để hỗ trợ async/await từ mysql2
    const [result] = await db
      .promise()
      .execute(query, [MucTieuId, TieuDe, ThoiGianDuKien || null]);
    return result;
  },

  // Kiểm tra sự tồn tại của Mục tiêu (khóa ngoại)
  checkMucTieuExists: async (mucTieuId) => {
    const query = "SELECT Id FROM muctieu WHERE Id = ?";
    const [rows] = await db.promise().execute(query, [mucTieuId]);
    return rows.length > 0;
  },

  // Cập nhật công việc dựa trên Id
  update: async (id, data) => {
    const { MucTieuId, TieuDe, ThoiGianDuKien, DaHoanThanh } = data;
    const query = `
      UPDATE congviec 
      SET MucTieuId = ?, TieuDe = ?, ThoiGianDuKien = ?, DaHoanThanh = ? 
      WHERE Id = ?
    `;

    const [result] = await db
      .promise()
      .execute(query, [
        MucTieuId,
        TieuDe,
        ThoiGianDuKien || null,
        DaHoanThanh,
        id,
      ]);
    return result;
  },

  // Xóa công việc theo Id
  delete: async (id) => {
    const query = `DELETE FROM congviec WHERE Id = ?`;
    const [result] = await db.promise().execute(query, [id]);
    return result;
  },

  // Tìm kiếm công việc trên tất cả các cột (bao gồm cả tên mục tiêu)
  search: async (keyword) => {
    const query = `
      SELECT cv.*, mt.TieuDe AS TenMucTieu 
      FROM congviec cv
      LEFT JOIN muctieu mt ON cv.MucTieuId = mt.Id
      WHERE cv.TieuDe LIKE ? 
         OR cv.ThoiGianDuKien LIKE ? 
         OR mt.TieuDe LIKE ?
         OR CAST(cv.Id AS CHAR) LIKE ?
    `;
    const searchTerm = `%${keyword}%`;
    const [rows] = await db
      .promise()
      .execute(query, [searchTerm, searchTerm, searchTerm, searchTerm]);
    return rows;
  },

  // Lấy tất cả công việc kèm thông tin tiêu đề mục tiêu
  getAll: async () => {
    const query = `
      SELECT cv.*, mt.TieuDe AS TenMucTieu 
      FROM congviec cv
      LEFT JOIN muctieu mt ON cv.MucTieuId = mt.Id
    `;
    const [rows] = await db.promise().execute(query);
    return rows;
  },
};

module.exports = Congviec;
