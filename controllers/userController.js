const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const userController = {
  //  회원가입
  register: async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        status: 400,
        message: "모든 필드를 입력하세요",
      });
    }

    try {
      // 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(password, 10);

      // 사용자 생성 Model 참조
      User.create(username, email, hashedPassword, (err, userId) => {
        if (err) {
          console.error("회원가입 오류:", err.code);

          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
              status: 409,
              message:
                "이미 가입된 계정이 있습니다. 다른 이메일을 입력 해주세요.",
            });
          }

          return res.status(500).json({
            status: 500,
            message: "서버 오류 회원가입 실패",
          });
        }

        res.status(201).json({
          status: 201,
          message: "회원가입 성공 쿠루루 삥뽕",
          userId,
        });
      });
    } catch (error) {
      console.error("서버 오류:", error);
      res.status(500).json({
        status: 500,
        message: "서버 오류 발생",
      });
    }
  },

  // 아이디찾기
  async findId() {
    console.log("hi");
  },
};

module.exports = userController;
