const db = require("../config/db");

const Thongbao = {
  getAll: async () => {
    const [rows] = await db.promise().execute("SELECT * FROM thongbao");
    return rows;
  },
  create: async (data) => {
    const { NguoiDungId, NoiDung } = data;
    const query =
      "INSERT INTO thongbao (NguoiDungId, NoiDung, NgayTao) VALUES (?, ?, CURRENT_TIMESTAMP)";
    const [result] = await db.promise().execute(query, [NguoiDungId, NoiDung]);
    return result;
  },
  update: async (id, data) => {
    const { NoiDung } = data;
    const query = "UPDATE thongbao SET NoiDung = ? WHERE Id = ?";
    const [result] = await db.promise().execute(query, [NoiDung, id]);
    return result;
  },
  delete: async (id) => {
    const [result] = await db
      .promise()
      .execute("DELETE FROM thongbao WHERE Id = ?", [id]);
    return result;
  },
  search: async (keyword) => {
    const query = "SELECT * FROM thongbao WHERE NoiDung LIKE ?";
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

module.exports = Thongbao;
