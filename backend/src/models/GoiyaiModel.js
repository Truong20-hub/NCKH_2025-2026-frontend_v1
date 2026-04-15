const db = require("../config/db");

const Goiyai = {
  getAll: async () => {
    const [rows] = await db.promise().execute("SELECT * FROM goiyai");
    return rows;
  },
  create: async (data) => {
    const { MucTieuId, NoiDungGoiY } = data;
    const query =
      "INSERT INTO goiyai (MucTieuId, NoiDungGoiY, NgayTao) VALUES (?, ?, CURRENT_TIMESTAMP)";
    const [result] = await db
      .promise()
      .execute(query, [MucTieuId, NoiDungGoiY]);
    return result;
  },
  update: async (id, data) => {
    const { NoiDungGoiY } = data;
    const query = "UPDATE goiyai SET NoiDungGoiY = ? WHERE Id = ?";
    const [result] = await db.promise().execute(query, [NoiDungGoiY, id]);
    return result;
  },
  delete: async (id) => {
    const [result] = await db
      .promise()
      .execute("DELETE FROM goiyai WHERE Id = ?", [id]);
    return result;
  },
  search: async (keyword) => {
    const query = "SELECT * FROM goiyai WHERE NoiDungGoiY LIKE ?";
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

module.exports = Goiyai;
