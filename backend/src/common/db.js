const mysql = require("mysql2");
require("dotenv").config(); 

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 4000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    minVersion: "TLSv1.2",
    rejectUnauthorized: false,
  },
});

// Test kết nối khi khởi động server
pool.getConnection((err, connection) => {
  if (err) {
    console.error("![LỖI] Kết nối Database thất bại:", err.message);
  } else {
    console.log(`[OK] Đã kết nối thành công tới Database: ${process.env.DB_NAME}`);
    connection.release();
  }
});

module.exports = pool.promise();