const models = require("../models");
const moment = require("moment");

exports.addEvent = (req, res) => {
  res.render("./events/edit", {
    title: "Add event",
    currentDate: moment().format("YYYY-MM-D")
  });
};

exports.showEvent = async (req, res) => {
  console.log("params:", req.params);
  try {
    const event = await models.Event.findById(req.params.id);
    res.render("./events/show", {
      title: "Show Event",
      event: event
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createEvent = async (req, res) => {
  try {
    const newEvent = {
      date: req.body.date,
      start_time: req.body.start_time.replace(/[^0-9]/g, ""),
      end_time: req.body.end_time.replace(/[^0-9]/g, "")
    };
    const event = await models.Event.create(newEvent);
    console.log(event);
    res.redirect("/events");
  } catch (err) {
    console.log(err);
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await models.Event.findAll();
    res.render("./events/index", {
      title: "Events",
      events: events || {}
    });
  } catch (err) {
    console.log(err);
  }
};
