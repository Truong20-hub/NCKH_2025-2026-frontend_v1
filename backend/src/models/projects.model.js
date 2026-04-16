const db = require("../common/db");
const projects = (projects) => {
  this.id = projects.id;
  this.goal_id = projects.goal_id;
  this.title = projects.title;
  this.description = projects.description;
  this.estimated_minutes = projects.estimated_minutes;
  this.is_completed = projects.is_completed;
  this.priority = projects.priority;
  this.due_date = projects.due_date;
  this.created_at = projects.created_at;
};

projects.getById = (id, callback) => {
  const sqlString = "SELECT * FROM projects WHERE id = ? ";
  db.query(sqlString, [id], (err, result) => {
    if (err) return callback(err);
    callback(result[0]);
  });
};

projects.getAll = (callback) => {
  const sqlString = "SELECT * FROM projects ";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

projects.insert = (projects, callBack) => {
  const sqlString = "INSERT INTO projects SET ?";
  db.query(sqlString, [projects], (err, res) => {
    if (err) return callBack(err);
    callBack({ id : res.insertId, ...projects });
  });
};

projects.update = (projects, id, callBack) => {
  const sqlString = "UPDATE projects SET ? WHERE id = ?";
  db.query(sqlString, [projects, id], (err, res) => {
    if (err) return callBack(err);
    callBack("Cập nhật projects id = " + id + " thành công");
  });
};

projects.delete = (id, callBack) => {
  db.query("DELETE FROM projects WHERE id = ?", [id], (err, res) => {
    if (err) return callBack(err);
    callBack("Xóa projects id = " + id + " thành công");
  });
};

module.exports = projects;