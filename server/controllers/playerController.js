const models = require('../models')

exports.createPlayer = async (req, res) => {
  console.log('===== CREATING PLAYER =====', req.body)
  try {
    const player = await models.Player.create(req.body)
    res.status(201).send(player)
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.showPlayer = async (req, res) => {
  console.log(req.params)
  try {
    const player = await models.Player.findById(req.params.id)
    res.status(200).json(player)
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.getPlayers = async (req, res) => {
  try {
    const players = await models.Player.findAll({
      include: [models.Event]
    })
    res.status(200).json(players)
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.updatePlayer = async (req, res) => {
  try {
    const player = await models.Player.findById(req.params.id)
    const updatedPlayer = await player.update(req.body)
    res.status(200).send(updatedPlayer)
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.deletePlayer = async (req, res) => {
  try {
    const player = await models.Player.findById(req.params.id)
    await player.destroy()
    res.status(200).send(player)
  } catch (err) {
    res.status(400).send(err)
  }
}
