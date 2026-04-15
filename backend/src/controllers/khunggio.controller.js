const Khunggio = require("../models/KhunggioModel");

exports.getAll = async (req, res) => {
  try {
    const results = await Khunggio.getAll();
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { NguoiDungId, TenKhungGio } = req.body;
    if (!NguoiDungId || !TenKhungGio)
      return res.status(400).json({ message: "Thiếu thông tin" });

    const exists = await Khunggio.checkNguoiDungExists(NguoiDungId);
    if (!exists)
      return res.status(404).json({ message: "Người dùng không tồn tại" });

    const result = await Khunggio.create(req.body);
    res.status(201).json({ success: true, insertId: result.insertId });
  } catch (error) {
    if (error.errno === 1452)
      return res.status(400).json({ message: "Vi phạm khóa ngoại" });
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await Khunggio.update(req.params.id, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Không tìm thấy" });
    res.json({ success: true, message: "Cập nhật thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await Khunggio.delete(req.params.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Không tìm thấy" });
    res.json({ success: true, message: "Xóa thành công" });
  } catch (error) {
    if (error.errno === 1451)
      return res
        .status(409)
        .json({ message: "Dữ liệu đang được tham chiếu, không thể xóa." });
    res.status(500).json({ message: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const results = await Khunggio.search(req.query.keyword);
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
