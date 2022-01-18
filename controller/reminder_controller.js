const { log } = require("console");
let {database:users} = require("../models/userModel.js");

let remindersController = {
  list: (req, res) => {
    let user = users.find(user => user.id === req.user.id);
    res.render("reminder/index", { reminders: user.reminders,user });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let user = users.find(user => user.id === req.user.id);
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: user.reminders });
    }
  },

  create: (req, res) => {
    let user = users.find(user => user.id === req.user.id);
    let reminder = {
      id: user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    user.reminders.push(reminder);
    res.redirect("/reminder");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let user = users.find(user => user.id === req.user.id);
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let user = users.find(user => user.id === req.user.id);
    let { title, description, completed } = req.body;
    let { id } = req.params; //let id = req.params.id;
    let reminderToUpdate = user.reminders.find(function (reminder) {
      return reminder.id == id;
    });
    reminderToUpdate.title = title;
    reminderToUpdate.description = description;
    reminderToUpdate.completed = eval(completed); //fix the completed view problem
    res.redirect("/reminder/" + id);
  },

  delete: (req, res) => {
    // Implement this code
    let user = users.find(user => user.id === req.user.id);
    let { id } = req.params;//let id = req.params.id;
    let reminderToDelete = user.reminders.findIndex(function (reminder) {
      return reminder.id == id;
    });
    user.reminders.splice(reminderToDelete, 1);
    res.redirect("/reminder");
  },
};

module.exports = remindersController;
