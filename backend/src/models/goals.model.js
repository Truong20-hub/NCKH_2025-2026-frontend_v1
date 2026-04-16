const db = require("../common/db");
const goals = function(goal) {
  this.id = goal.id;
  this.user_id = goal.user_id;
  this.title = goal.title;
  this.description = goal.description;
  this.priority = goal.priority;
  this.status = goal.status;
  this.start_date = goal.start_date;
  this.end_date = goal.end_date;
  this.created_at = goal.created_at;
  this.updated_at = goal.updated_at;
};

goals.getById = (id, callback) => {
  const sqlString = "SELECT * FROM goals WHERE id = ? ";
  db.query(sqlString, [id], (err, result) => {
    if (err) return callback(err);
    callback(result[0]);
  });
};

goals.getAll = (callback) => {
  const sqlString = "SELECT * FROM goals ";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

goals.insert = (goals, callBack) => {
  const sqlString = "INSERT INTO goals SET ?";
  db.query(sqlString, [goals], (err, res) => {
    if (err) return callBack(err);
    callBack({ id : res.insertId, ...goals });
  });
};

goals.update = (goals, id, callBack) => {
  const sqlString = "UPDATE goals SET ? WHERE id = ?";
  db.query(sqlString, [goals, id], (err, res) => {
    if (err) return callBack(err);
    callBack("Cập nhật goals id = " + id + " thành công");
  });
};

goals.delete = (id, callBack) => {
  db.query("DELETE FROM goals WHERE id = ?", [id], (err, res) => {
    if (err) return callBack(err);
    callBack("Xóa goals id = " + id + " thành công");
  });
};

module.exports = goals;