const express = require('express');
const controller = require('../controllers/users.controller');
const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);       

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;