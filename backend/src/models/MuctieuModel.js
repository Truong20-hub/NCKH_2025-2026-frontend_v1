const db = require("../config/db");

const Muctieu = {
  getAll: async () => {
    const [rows] = await db.promise().execute("SELECT * FROM muctieu");
    return rows;
  },

  create: async (data) => {
    const { NguoiDungId, TieuDe, MoTa, HanChot } = data;
    const query = `INSERT INTO muctieu (NguoiDungId, TieuDe, MoTa, HanChot) VALUES (?, ?, ?, ?)`;
    const [result] = await db
      .promise()
      .execute(query, [NguoiDungId, TieuDe, MoTa, HanChot]);
    return result;
  },

  update: async (id, data) => {
    const { TieuDe, MoTa, HanChot } = data;
    const query = `UPDATE muctieu SET TieuDe = ?, MoTa = ?, HanChot = ? WHERE Id = ?`;
    const [result] = await db
      .promise()
      .execute(query, [TieuDe, MoTa, HanChot, id]);
    return result;
  },

  delete: async (id) => {
    const [result] = await db
      .promise()
      .execute("DELETE FROM muctieu WHERE Id = ?", [id]);
    return result;
  },

  search: async (keyword) => {
    const query = `SELECT * FROM muctieu WHERE TieuDe LIKE ? OR MoTa LIKE ?`;
    const term = `%${keyword}%`;
    const [rows] = await db.promise().execute(query, [term, term]);
    return rows;
  },

  checkNguoiDungExists: async (userId) => {
    const [rows] = await db
      .promise()
      .execute("SELECT Id FROM nguoidung WHERE Id = ?", [userId]);
    return rows.length > 0;
  },
};

module.exports = Muctieu;
