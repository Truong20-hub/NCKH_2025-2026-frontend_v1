const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "02112005",
  database: "QuanLyMucTieuAI",
});

connection.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối DB:", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = connection;
