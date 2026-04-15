const db = require("../config/db");

const Ketqua = {
  getAll: async () => {
    const [rows] = await db.promise().execute("SELECT * FROM ketqua");
    return rows;
  },
  create: async (data) => {
    const { MucTieuId, NoiDung, NgayDatDuoc } = data;
    const query =
      "INSERT INTO ketqua (MucTieuId, NoiDung, NgayDatDuoc) VALUES (?, ?, ?)";
    const [result] = await db
      .promise()
      .execute(query, [MucTieuId, NoiDung, NgayDatDuoc]);
    return result;
  },
  update: async (id, data) => {
    const { NoiDung, NgayDatDuoc } = data;
    const query = "UPDATE ketqua SET NoiDung = ?, NgayDatDuoc = ? WHERE Id = ?";
    const [result] = await db
      .promise()
      .execute(query, [NoiDung, NgayDatDuoc, id]);
    return result;
  },
  delete: async (id) => {
    const [result] = await db
      .promise()
      .execute("DELETE FROM ketqua WHERE Id = ?", [id]);
    return result;
  },
  search: async (keyword) => {
    const query = "SELECT * FROM ketqua WHERE NoiDung LIKE ?";
    const term = `%${keyword}%`;
    const [rows] = await db.promise().execute(query, [term]);
    return rows;
  },
  checkMucTieuExists: async (goalId) => {
    const [rows] = await db
      .promise()
      .execute("SELECT Id FROM muctieu WHERE Id = ?", [goalId]);
    return rows.length > 0;
  },
};

module.exports = Ketqua;
