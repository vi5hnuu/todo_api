const express = require('express')
const { addTask, getTasks, getTask, updateTask, deleteTask, getTaskCount } = require('../Controllers/TaskController')
const { isAuthenticatedUser } = require('../middlewares/auth')
const router = express.Router()

router.route('/tasks').get([isAuthenticatedUser, getTasks])
router.route('/tasks/total').get([isAuthenticatedUser, getTaskCount])
router.route('/task/:id').get([isAuthenticatedUser, getTask])
  .put([isAuthenticatedUser, updateTask])
  .delete([isAuthenticatedUser, deleteTask])

router.route('/task/').post([isAuthenticatedUser, addTask])

module.exports.route = router