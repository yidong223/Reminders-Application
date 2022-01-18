const app = require("express").Router();
const passport = require("../middleware/passport");
const authController = require("../controller/auth_controller");

app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login",passport.authenticate("local", {
    successRedirect: "/reminder",
    failureRedirect: "/auth/login",
  }));
app.get("/logout", authController.logout);
app.get('/github',authController.gitLogin);
app.get('/github/callback',authController.gitLoginCB)
module.exports = app;