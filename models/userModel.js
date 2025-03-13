/**
 * Query
 */

const db = require("../config/db");

const User = {
  // 생성 쿼리
  create: (username, email, hashedPassword, callback) => {
    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      (err, result) => {
        if (err) return callback(err);
        callback(null, result.insertId);
      }
    );
  },
};

module.exports = User;
