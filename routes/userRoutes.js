const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// 회원가입 API
router.post("/register", userController.register);

// 아이디찾기 API
router.post("/findid", userController.findId);

module.exports = router;
