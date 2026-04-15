const db = require("../config/db");

const Lich = {
  getAll: async () => {
    const [rows] = await db.promise().execute("SELECT * FROM lich");
    return rows;
  },
  create: async (data) => {
    const { NguoiDungId, TieuDe, ThoiGianBatDau, ThoiGianKetThuc } = data;
    const query =
      "INSERT INTO lich (NguoiDungId, TieuDe, ThoiGianBatDau, ThoiGianKetThuc) VALUES (?, ?, ?, ?)";
    const [result] = await db
      .promise()
      .execute(query, [NguoiDungId, TieuDe, ThoiGianBatDau, ThoiGianKetThuc]);
    return result;
  },
  update: async (id, data) => {
    const { TieuDe, ThoiGianBatDau, ThoiGianKetThuc } = data;
    const query =
      "UPDATE lich SET TieuDe = ?, ThoiGianBatDau = ?, ThoiGianKetThuc = ? WHERE Id = ?";
    const [result] = await db
      .promise()
      .execute(query, [TieuDe, ThoiGianBatDau, ThoiGianKetThuc, id]);
    return result;
  },
  delete: async (id) => {
    const [result] = await db
      .promise()
      .execute("DELETE FROM lich WHERE Id = ?", [id]);
    return result;
  },
  search: async (keyword) => {
    const query = "SELECT * FROM lich WHERE TieuDe LIKE ?";
    const term = `%${keyword}%`;
    const [rows] = await db.promise().execute(query, [term]);
    return rows;
  },
  checkNguoiDungExists: async (userId) => {
    const [rows] = await db
      .promise()
      .execute("SELECT Id FROM nguoidung WHERE Id = ?", [userId]);
    return rows.length > 0;
  },
};

module.exports = Lich;
