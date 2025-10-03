const jwt = require('jsonwebtoken')

const generateToken = payload => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  })
}

const verifyToken = token => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return null
  }
}

module.exports = {
  generateToken,
  verifyToken
}
