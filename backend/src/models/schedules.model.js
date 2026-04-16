const db = require("../common/db");
const schedules = (schedules) => {
  this.id = schedules.id;
  this.user_id = schedules.user_id;
  this.title = schedules.title;
  this.created_at = schedules.created_at;
};

schedules.getById = (id, callback) => {
  const sqlString = "SELECT * FROM schedules WHERE id = ? ";
  db.query(sqlString, [id], (err, result) => {
    if (err) return callback(err);
    callback(result[0]);
  });
};

schedules.getAll = (callback) => {
  const sqlString = "SELECT * FROM schedules ";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

schedules.insert = (schedules, callBack) => {
  const sqlString = "INSERT INTO schedules SET ?";
  db.query(sqlString, [schedules], (err, res) => {
    if (err) return callBack(err);
    callBack({ id : res.insertId, ...schedules });
  });
};

schedules.update = (schedules, id, callBack) => {
  const sqlString = "UPDATE schedules SET ? WHERE id = ?";
  db.query(sqlString, [schedules, id], (err, res) => {
    if (err) return callBack(err);
    callBack("Cập nhật schedules id = " + id + " thành công");
  });
};

schedules.delete = (id, callBack) => {
  db.query("DELETE FROM schedules WHERE id = ?", [id], (err, res) => {
    if (err) return callBack(err);
    callBack("Xóa schedules id = " + id + " thành công");
  });
};

module.exports = schedules;