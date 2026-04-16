const db = require("../common/db");
const progress_logs = (progress_logs) => {
  this.id = progress_logs.id;
  this.user_id = progress_logs.user_id;
  this.goal_id = progress_logs.goal_id;
  this.task_id = progress_logs.task_id;
  this.progress_percentage = progress_logs.progress_percentage;
  this.log_date = progress_logs.log_date;
};

progress_logs.getById = (id, callback) => {
  const sqlString = "SELECT * FROM progress_logs WHERE id = ? ";
  db.query(sqlString, [id], (err, result) => {
    if (err) return callback(err);
    callback(result[0]);
  });
};

progress_logs.getAll = (callback) => {
  const sqlString = "SELECT * FROM progress_logs ";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

progress_logs.insert = (progress_logs, callBack) => {
  const sqlString = "INSERT INTO progress_logs SET ?";
  db.query(sqlString, [progress_logs], (err, res) => {
    if (err) return callBack(err);
    callBack({ id : res.insertId, ...progress_logs });
  });
};

progress_logs.update = (progress_logs, id, callBack) => {
  const sqlString = "UPDATE progress_logs SET ? WHERE id = ?";
  db.query(sqlString, [progress_logs, id], (err, res) => {
    if (err) return callBack(err);
    callBack("Cập nhật progress_logs id = " + id + " thành công");
  });
};

progress_logs.delete = (id, callBack) => {
  db.query("DELETE FROM progress_logs WHERE id = ?", [id], (err, res) => {
    if (err) return callBack(err);
    callBack("Xóa progress_logs id = " + id + " thành công");
  });
};

module.exports = progress_logs;