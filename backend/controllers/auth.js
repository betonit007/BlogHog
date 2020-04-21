const User = require('../models/user')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt') // will check to see if token is valid and/or expired

exports.signup = async (req, res) => {
 
  const { name, email, password } = req.body
 
  const isUser = await User.findOne({email})
  
  if(isUser) {
    return res.status(400).json({
      error: 'Email is already in use'
    })
  }

  let username = shortId.generate() //generates a unique short id
  let profile = `${process.env.CLIENT_URL}/profile/username` 

  let newUser = new User({name, email, password, profile, username})
  newUser.save((err, savedUser) => {
    if(err) {
      return res.status(400).json({ error: err})
    }
    res.json({
      message: 'Signup success! Please signin'
    })
  })
}

exports.signin = async (req, res) => {
 
  //check if user exists
  const user = await User.findOne({email: req.body.email})
  if(!user) {
    return res.status(400).json({ error: 'Invalid Credentials'})
  }
  //authenticate
  if(!user.authenticate(req.body.password)) {
    return res.status(400).json({ error: 'Invalid password Credentials'})
  }
  // generate a jsonwebtoken
  const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn:'1d'})

  res.cookie('token', token, {expiresIn: '1d'})
  const {_id, username, name, email, role} = user
  return res.json({
    token,
    user : {_id, username, name, email, role}
  })
}

exports.signout = (req, res) => {
  res.clearCookie("token")
  res.json({
    message: "Signout Success"
  })
}

exports.requireSignin = expressJwt({ //middleware that requires a signed in user (checks to see in secret in token matches secret in env file)
  secret: process.env.JWT_SECRET
})