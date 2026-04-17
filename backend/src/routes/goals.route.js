const express = require('express');
const goalsController = require("../controllers/goals.controller");
const router = express.Router();

// Lấy danh sách tất cả
router.get('/', goalsController.getAll);
// Lấy chi tiết theo ID
router.get('/:id', goalsController.getById);
// Thêm mới
router.post('/', goalsController.insert);
// Cập nhật theo ID
router.put('/:id', goalsController.update);
// Xóa theo ID
router.delete('/:id', goalsController.delete);

router.get("/user/:userId", goalsController.getByUser);

module.exports = router;
