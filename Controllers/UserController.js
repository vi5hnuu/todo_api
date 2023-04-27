const { ErrorHandler } = require('./../utils/errorhandler');
const { error: catchasyncError } = require('./../middlewares/catchAsync');
const { modal: User } = require('./../Modals/UserModal');
const { sendToken } = require('../utils/jwtToken')

//register user
exports.registerUser = catchasyncError(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await new User({ username, email, password }).save()
  sendToken(user, 201, res)
})

//login user
exports.loginuser = catchasyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //checking if user has given pass and email
  if (!email || !password) {
    return next(new ErrorHandler('Please enter a valid Email/Password.', 400))
  }

  const user = await User.findOne({ email }).select("+password")
  if (!user) {
    return next(new ErrorHandler('Invalid Email/Password.', 401))
  }

  const isPassMatched = await user.comparePassword(password)
  if (!isPassMatched) {
    return next(new ErrorHandler('Invalid Email/Password.', 401))
  }
  sendToken(user, 200, res)
})

//log out user
exports.logoutuser = catchasyncError(async (req, res, next) => {
  res.clearCookie('token', { expiresIn: new Date(Date.now()), httpOnly: true })
  res.status(200).json({
    success: true,
    message: 'Logout successful.'
  })
})
