const express = require('express');
const controller = require('../controllers/time_slots.controller');
const router = express.Router();

// Lấy danh sách tất cả
router.get('/', controller.getAll);
// Lấy chi tiết theo ID
router.get('/:id', controller.getById);
// Thêm mới
router.post('/', controller.insert);
// Cập nhật theo ID
router.put('/:id', controller.update);
// Xóa theo ID
router.delete('/:id', controller.delete);

module.exports = router;
