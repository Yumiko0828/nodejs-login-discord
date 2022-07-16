const router = require("express").Router();
const passport = require("../passport/passport");
const auth = require("./auth");

router.get("/", (req, res) => {
  res.send('<a href="/perfil">Login</a>');
});

router.use(
  "/login",
  passport.authenticate("discord", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/perfil");
  }
);

router.use("/perfil", auth, (req, res) => {
  res.json({
    datos_discord: req.user,
  });
});

module.exports = router;
