const { error: catchAsyncError } = require('./catchAsync')
const { ErrorHandler } = require('./../utils/errorhandler');
const jwt = require('jsonwebtoken');
const { modal: UserModal } = require('./../Modals/UserModal');

const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return next(new ErrorHandler('please login to access this resource.', 401))
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await UserModal.findById(decodedData.id)
  next()
})
module.exports.isAuthenticatedUser = isAuthenticatedUser