const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/task.controllers");
const { validateTask } = require("../../payload-validator/task-validator");
const passport = require("passport");
const multer = require("multer");
const { multerStorage  } = require('../../utils/storage');

const storage = multerStorage(`public/images/task`, validateTask,'attachment')
const upload = multer({ storage });

const authenticate = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

router.get(
  "/",
  (req, res, next) => {
    authenticate(req, res, next);
  },
  taskController.taskList
);
router.post(
  "/",
  (req, res, next) => {
    authenticate(req, res, next);
  },
  upload.single("attachment"),
  taskController.createTask
);
router.put(
  "/:id",
  (req, res, next) => {
    authenticate(req, res, next);
  },
  upload.single("attachment"),
  taskController.editTask
);
router.delete(
  "/:id",
  (req, res, next) => {
    authenticate(req, res, next);
  },
  taskController.deleteTask
);

module.exports = router;
