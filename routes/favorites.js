const express = require('express')
const { Op } = require('sequelize')
const checkAuth = require('../middleware/checkAuth')
const router = express.Router()
const models = require('../models')

// POST /api/v1/schedules
router.post('/:id', checkAuth, async function (req, res, next) {
  // check for required fields

  const [favorite, created] = await models.Favorite.findOrCreate({
    where: {
      UserId: req.session.user.id,
      DetailId: req.params.id,
    },
  })
  if (!created) {
    await favorite.destroy()
  }
  res.status(201).json(favorite)
})

router.get('/', checkAuth, async (req, res) => {
  // get all details for logged in user
  const details = await req.session.user.getFavorites({
    order: [['createdAt', 'DESC']],
    include: ['Detail'],
  })
  // send as json
  res.json(details)
})

module.exports = router
