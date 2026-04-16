const db = require("../common/db");
const time_slots = (time_slots) => {
  this.id = time_slots.id;
  this.user_id = time_slots.user_id;
  this.schedule_id = time_slots.schedule_id;
  this.goal_id = time_slots.goal_id;
  this.task_id = time_slots.task_id;
  this.start_time = time_slots.start_time;
  this.end_time = time_slots.end_time;
  this.status = time_slots.status;
};

time_slots.getById = (id, callback) => {
  const sqlString = "SELECT * FROM time_slots WHERE id = ? ";
  db.query(sqlString, [id], (err, result) => {
    if (err) return callback(err);
    callback(result[0]);
  });
};

time_slots.getAll = (callback) => {
  const sqlString = "SELECT * FROM time_slots ";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

time_slots.insert = (time_slots, callBack) => {
  const sqlString = "INSERT INTO time_slots SET ?";
  db.query(sqlString, [time_slots], (err, res) => {
    if (err) return callBack(err);
    callBack({ id : res.insertId, ...time_slots });
  });
};

time_slots.update = (time_slots, id, callBack) => {
  const sqlString = "UPDATE time_slots SET ? WHERE id = ?";
  db.query(sqlString, [time_slots, id], (err, res) => {
    if (err) return callBack(err);
    callBack("Cập nhật time_slots id = " + id + " thành công");
  });
};

time_slots.delete = (id, callBack) => {
  db.query("DELETE FROM time_slots WHERE id = ?", [id], (err, res) => {
    if (err) return callBack(err);
    callBack("Xóa time_slots id = " + id + " thành công");
  });
};

module.exports = time_slots;