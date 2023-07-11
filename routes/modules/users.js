const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../../models/user");

router.get("/login", (req, res) => {
  const userInput = req.session.userInput || {};
  // 清除 session 中的使用者輸入
  delete req.session.userInput;

  res.render("login", { email: userInput.email, password: userInput.password });
});

router.post(
  "/login",
  (req, res, next) => {
    const { email, password } = req.body;

    req.session.userInput = { email, password };
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];

  //提示使用者填寫資料
  if (!email || !password || !confirmPassword) {
    errors.push({ message: "這些欄位都是必填。" });
  }
  if (password !== confirmPassword) {
    errors.push({ message: "密碼與確認密碼不相符。" });
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: "這個 Email 已經註冊過了。" });
      return res.render("register", {
        errors,
        name,
        email,
        password,
        confirmPassword,
      });
    }

    return User.create({
      name,
      email,
      password,
    })
      .then(() => res.redirect("/"))
      .catch(err => console.log(err));
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "你已經成功登出。");
  res.redirect("/users/login");
});

module.exports = router;
