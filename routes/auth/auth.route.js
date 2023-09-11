const express = require('express');
const router = express.Router();
const authController = require("../../controllers/auth.controllers");
const multer = require('multer');
const fs = require('fs');
const { validateRegister } = require('../../payload-validator/auth-validator');
const { multerStorage  } = require('../../utils/storage');
const storage = multerStorage(`public/images/profile`, validateRegister)
const upload = multer({ storage });

router.post('/register',upload.single('image'), authController.register);
router.post('/login', authController.login);
module.exports = router;