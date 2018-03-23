const models = require("../models");

exports.addPlayer = (req, res) => {
  res.render("./players/edit", {
    title: "Add Player"
  });
};

exports.createPlayer = async (req, res) => {
  try {
    const player = await models.Player.create(req.body);
    res.redirect("/players");
  } catch (err) {
    console.log(err);
  }
};

exports.getPlayers = async (req, res) => {
  try {
    const players = await models.Player.findAll();
    res.render("./players/index", {
      title: "Players",
      players: players || {}
    });
  } catch (err) {
    console.log(err);
  }
};
