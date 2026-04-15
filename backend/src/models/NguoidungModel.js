const db = require("../config/db");

const Nguoidung = {
  getAll: async () => {
    const [rows] = await db.promise().execute("SELECT * FROM nguoidung");
    return rows;
  },
  create: async (data) => {
    const { HoTen, Email, MatKhau } = data;
    const query =
      "INSERT INTO nguoidung (HoTen, Email, MatKhau) VALUES (?, ?, ?)";
    const [result] = await db.promise().execute(query, [HoTen, Email, MatKhau]);
    return result;
  },
  update: async (id, data) => {
    const { HoTen, Email } = data;
    const query = "UPDATE nguoidung SET HoTen = ?, Email = ? WHERE Id = ?";
    const [result] = await db.promise().execute(query, [HoTen, Email, id]);
    return result;
  },
  delete: async (id) => {
    const query = "DELETE FROM nguoidung WHERE Id = ?";
    const [result] = await db.promise().execute(query, [id]);
    return result;
  },
  search: async (keyword) => {
    const query = "SELECT * FROM nguoidung WHERE HoTen LIKE ? OR Email LIKE ?";
    const term = `%${keyword}%`;
    const [rows] = await db.promise().execute(query, [term, term]);
    return rows;
  },
};

module.exports = Nguoidung;
