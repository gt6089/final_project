const mongoose = require('mongoose')
const Player = mongoose.model('Player')

exports.addPlayer = (req, res) => {
  res.render('editPlayer', {
    title: 'Add Player'
  })
}

exports.getPlayerById = async (req, res, next) => {
  try {
    const player = await Player.findOne({_id: req.params.id})
    if (!player) {
      return next()
    } else {
      req.body.player_id = player._id
    }
  } catch(err) {
    console.log(err)
  }
}

exports.createPlayer = async (req, res) => {
  console.log('hitting createPlayer route')
  try {
    const player = new Player(req.body)
    await player.save()
    res.redirect('/players')
  } catch(err) {
    console.log(err)
  }

}

exports.getPlayers = async (req, res) => {
  try {
    const players = await Player.find()
    res.render('./players/index', {
      title: 'Player List',
      players: players || {}
    })
  } catch(err) {
    console.log(err)
  }
}
