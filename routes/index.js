const express = require('express');
const router = express.Router();
const authRoutes = require('./auth/auth.route');
const taskRoutes = require('./task/task.route');
const userController = require('../controllers/user.controller');

router.use('/', authRoutes);
router.use('/task', taskRoutes);
router.get('/excelSheet',userController.getExcelSheet);
router.get('/pdf/:id',userController.getPdf)
module.exports = router;