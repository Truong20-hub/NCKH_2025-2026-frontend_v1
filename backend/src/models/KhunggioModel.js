const db = require("../config/db");

const Khunggio = {
  getAll: async () => {
    const [rows] = await db.promise().execute("SELECT * FROM khunggio");
    return rows;
  },
  create: async (data) => {
    const { NguoiDungId, TenKhungGio, BatDau, KetThuc } = data;
    const query =
      "INSERT INTO khunggio (NguoiDungId, TenKhungGio, BatDau, KetThuc) VALUES (?, ?, ?, ?)";
    const [result] = await db
      .promise()
      .execute(query, [NguoiDungId, TenKhungGio, BatDau, KetThuc]);
    return result;
  },
  update: async (id, data) => {
    const { TenKhungGio, BatDau, KetThuc } = data;
    const query =
      "UPDATE khunggio SET TenKhungGio = ?, BatDau = ?, KetThuc = ? WHERE Id = ?";
    const [result] = await db
      .promise()
      .execute(query, [TenKhungGio, BatDau, KetThuc, id]);
    return result;
  },
  delete: async (id) => {
    const [result] = await db
      .promise()
      .execute("DELETE FROM khunggio WHERE Id = ?", [id]);
    return result;
  },
  search: async (keyword) => {
    const query = "SELECT * FROM khunggio WHERE TenKhungGio LIKE ?";
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

module.exports = Khunggio;
