const reminderController = require("../controller/reminder_controller");
const checkAuth = require("../middleware/checkAuth");
const app = require("express").Router();
app.use(checkAuth.ensureAuthenticated);
app.get("/", reminderController.list);
app.post("/", reminderController.create);

app.get("/new", reminderController.new);

app.get("/:id", reminderController.listOne);

app.get("/:id/edit", reminderController.edit);


// Implement this yourself
app.post("/update/:id", reminderController.update);

// Implement this yourself
app.post("/delete/:id", reminderController.delete);

module.exports = app;