const Nhatkytiendo = require("../models/NhatkytiendoModel");

exports.getAll = async (req, res) => {
  try {
    const results = await Nhatkytiendo.getAll();
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { CongViecId } = req.body;
    const exists = await Nhatkytiendo.checkCongViecExists(CongViecId);
    if (!exists)
      return res.status(404).json({ message: "Công việc không tồn tại" });

    const result = await Nhatkytiendo.create(req.body);
    res.status(201).json({ success: true, insertId: result.insertId });
  } catch (error) {
    if (error.errno === 1452) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Công việc liên quan không tồn tại.",
        });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { CongViecId, NoiDung } = req.body;

    if (!CongViecId || !NoiDung) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Thiếu thông tin CongViecId hoặc NoiDung.",
        });
    }

    const exists = await Nhatkytiendo.checkCongViecExists(CongViecId);
    if (!exists)
      return res.status(404).json({ message: "Công việc không tồn tại" });

    const result = await Nhatkytiendo.update(id, req.body);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Không tìm thấy nhật ký để cập nhật.",
        });
    }

    res.json({ success: true, message: "Cập nhật thành công" });
  } catch (error) {
    if (error.errno === 1452) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Công việc liên quan không tồn tại.",
        });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await Nhatkytiendo.delete(req.params.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Không tìm thấy nhật ký" });
    res.json({ success: true, message: "Xóa thành công" });
  } catch (error) {
    if (error.errno === 1451) {
      return res
        .status(409)
        .json({
          success: false,
          message: "Không thể xóa nhật ký này do ràng buộc dữ liệu.",
        });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      const results = await Nhatkytiendo.getAll();
      return res.json({ success: true, data: results });
    }

    const results = await Nhatkytiendo.search(keyword);
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
