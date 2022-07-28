const express = require('express')
const { Op } = require('sequelize')
const checkAuth = require('../middleware/checkAuth')
const router = express.Router()
const models = require('../models')

// POST /api/v1/schedules
router.post('/', checkAuth, async function (req, res, next) {
  // check for required fields
  if (!req.body.location || !req.body.address || !req.body.start || !req.body.end) {
    res.status(400).json({ error: 'Please include all fields' })
    return
  }

  const schedule = await req.session.user.createSchedule({
    location: req.body.location,
    address: req.body.address,
    start: req.body.start,
    end: req.body.end,
    lat: req.body.lat,
    lng: req.body.lng,
  })
  res.status(201).json(schedule)
})

// GET /api/v1/schedules
router.get('/', checkAuth, async (req, res) => {
  // get all schedules for logged in user
  const schedules = await req.session.user.getSchedules({
    order: [['createdAt', 'DESC']],
  })
  // send as json
  res.json(schedules)
})

router.get('/public', async (req, res) => {
  // get all schedules for logged in user
  const where = {
    start: {
      [Op.lte]: new Date(),
    },
  }
  if (req.query.show !== 'all') {
    where.end = {
      [Op.gte]: new Date(),
    }
  }
  const schedules = await models.Schedule.findAll({
    order: [['createdAt', 'DESC']],
    where,
    include: [
      {
        model: models.User,
        attributes: {
          exclude: ['password', 'email', 'id'],
        },
        include: [
          {
            model: models.Detail,
          },
        ],
      },
    ],
  })

  res.json(schedules)
})

// // DELETE /api/v1/todos/:id
// router.delete('/:id', checkAuth, async (req, res) => {
//   // get todo from db using id
//   const todo = await models.Todo.findByPk(req.params.id)
//   // if no todo, send 404 or
//   // if todo not owned by current user, send 404
//   if (!todo || todo.UserId !== req.session.user.id) {
//     res.status(404).json({ error: 'cannot find todo with id ' + req.params.id })
//     return
//   }
//   // destroy todo
//   await todo.destroy()
//   // send success message
//   res.status(200).json({ success: 'deleted todo' })
// })

// // PATCH /api/v1/todos/:id
// router.patch('/:id', async (req, res) => {
//   // get todo from db using id
//   const todo = await models.Todo.findByPk(req.params.id)
//   // if no todo, send 404 or
//   // if todo not owned by current user, send 404
//   if (!todo || todo.UserId !== req.session.user.id) {
//     res.status(404).json({ error: 'cannot find todo with id ' + req.params.id })
//     return
//   }
//   // update todo
//   await todo.update({
//     text: req.body.text || todo.text,
//     priority: req.body.priority || todo.priority,
//     color: req.body.color || todo.color,
//   })

//   res.status(200).json(todo)
// })

module.exports = router
