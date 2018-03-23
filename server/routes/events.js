// events routes

module.exports = (app, db) => {
  app.post("/events", (req, res) => {
    console.log(req.body);
    res.send("hello");
  });
};
