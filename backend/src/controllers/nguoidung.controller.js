const Nguoidung = require("../models/NguoidungModel");

exports.getAll = async (req, res) => {
  try {
    const results = await Nguoidung.getAll();
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const result = await Nguoidung.create(req.body);
    res.status(201).json({ success: true, insertId: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await Nguoidung.update(req.params.id, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json({ success: true, message: "Cập nhật thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Nguoidung.delete(req.params.id);
    res.json({ success: true, message: "Xóa thành công" });
  } catch (error) {
    if (error.errno === 1451) {
      return res
        .status(409)
        .json({
          success: false,
          message:
            "Không thể xóa người dùng này vì họ đã có dữ liệu mục tiêu hoặc lịch trình.",
        });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const results = await Nguoidung.search(req.query.keyword);
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
