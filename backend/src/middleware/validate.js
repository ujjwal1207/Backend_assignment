const { validationResult } = require('express-validator')
const AppError = require('../utils/AppError')

const validate = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map(error => error.msg)
      .join(', ')
    return next(new AppError(message, 400, 'VALIDATION_ERROR'))
  }

  next()
}

module.exports = validate
