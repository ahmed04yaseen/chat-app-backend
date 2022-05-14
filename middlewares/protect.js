const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = async (req, res, next) => {
  console.log(req.headers)
  let token = req.headers.authorization.split(' ')[1];
  
  if (
    
    token
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      res.status(401).send(error)
      
    }
  }

  if (!token) {
    res.status(401).send("To Token")
  }
}
module.exports = { protect }