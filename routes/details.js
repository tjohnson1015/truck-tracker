const express = require('express')
const checkAuth = require('../middleware/checkAuth')
const router = express.Router()
const models = require('../models')

// POST /api/v1/details
router.post('/', checkAuth, async function (req, res, next) {
  // check for required fields
  if (!req.body.name) {
    res.status(400).json({ error: 'Please include a name for your truck!' })
    return
  }

  const [detail] = await models.Detail.findOrCreate({
    where: {
      UserId: req.session.user.id,
    },
  })
  detail.update({
    name: req.body.name,
    location: req.body.location,
    picture: req.body.picture,
    description: req.body.description,
    menu: req.body.menu,
    cuisine: req.body.cuisine,
    lat: req.body.lat,
    lng: req.body.lng,
    phone: req.body.phone,
    web: req.body.web,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
    email: req.body.email,
  })
  res.status(201).json(detail)
})

// GET /api/v1/details
router.get('/', checkAuth, async (req, res) => {
  // get all details for logged in user
  const details = await req.session.user.getDetail({
    order: [['createdAt', 'DESC']],
  })
  // send as json
  res.json(details)
})

router.get('/public', async (req, res) => {
  // get all details for logged in user
  const details = await models.Detail.findAll({
    order: [['createdAt', 'DESC']],
  })
  // send as json
  res.json(details)
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
