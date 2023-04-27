const { ErrorHandler } = require('./../utils/errorhandler');
const { error: catchasyncError } = require('./../middlewares/catchAsync');
const { model: Task } = require('./../Modals/TaskModal');



module.exports.addTask = catchasyncError(async (req, res, next) => {
  const { name, date } = req.body
  const task = await new Task({ name, date, user: req.user }).save()
  res.json({
    success: true,
    task
  })
})

module.exports.getTasks = catchasyncError(async (req, res, next) => {
  const uid = req.user
  const taskPerPage = 10;
  const pageNo = req.query.page || 1
  const tasks = await Task.find({ user: uid }).skip((pageNo - 1) * taskPerPage).limit(10)
  res.json({
    tasks
  })
})

module.exports.getTask = catchasyncError(async (req, res, next) => {
  const id = req.params.id
  const task = await Task.findOne({ _id: id, user: req.user })
  if (!task) {
    return next(new ErrorHandler('No such task found', 404))
  }
  res.json({ task: task })
})


module.exports.updateTask = catchasyncError(async (req, res, next) => {
  const { isCompleted } = req.body
  const tid = req.params.id
  const uid = req.user
  const task = await Task.findOneAndUpdate({ _id: tid, user: uid }, { isCompleted }, { new: true })
  if (!task) {
    return next(new ErrorHandler('No such task found', 404))
  }
  return res.json({ task })
})

module.exports.deleteTask = catchasyncError(async (req, res, next) => {
  const tid = req.params.id
  const uid = req.user
  const task = await Task.findOneAndDelete({ _id: tid, user: uid })
  if (!task) {
    return next(new ErrorHandler('No such task found', 404))
  }
  return res.json({ task })
})

module.exports.getTaskCount = catchasyncError(async (req, res, next) => {
  const taskCount = await Task.countDocuments({ user: req.user })
  res.json({ success: true, total: taskCount })
})