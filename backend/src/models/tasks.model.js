const db = require("../common/db");
const tasks = (tasks) => {
  this.id = tasks.id;
  this.goal_id = tasks.goal_id;
  this.title = tasks.title;
  this.description = tasks.description;
  this.estimated_minutes = tasks.estimated_minutes;
  this.is_completed = tasks.is_completed;
  this.priority = tasks.priority;
  this.due_date = tasks.due_date;
  this.created_at = tasks.created_at;
};

tasks.getById = (id, callback) => {
  const sqlString = "SELECT * FROM tasks WHERE id = ? ";
  db.query(sqlString, [id], (err, result) => {
    if (err) return callback(err);
    callback(result[0]);
  });
};

tasks.getAll = (callback) => {
  const sqlString = "SELECT * FROM tasks ";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

tasks.insert = (tasks, callBack) => {
  const sqlString = "INSERT INTO tasks SET ?";
  db.query(sqlString, [tasks], (err, res) => {
    if (err) return callBack(err);
    callBack({ id : res.insertId, ...tasks });
  });
};

tasks.update = (tasks, id, callBack) => {
  const sqlString = "UPDATE tasks SET ? WHERE id = ?";
  db.query(sqlString, [tasks, id], (err, res) => {
    if (err) return callBack(err);
    callBack("Cập nhật tasks id = " + id + " thành công");
  });
};

tasks.delete = (id, callBack) => {
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err, res) => {
    if (err) return callBack(err);
    callBack("Xóa tasks id = " + id + " thành công");
  });
};

module.exports = tasks;