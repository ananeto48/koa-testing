const Router = require('koa-router')
const bcrypt = require('bcrypt')
const { Post, Author, User, Session } = require('../models')

const router = new Router()

// LOGIN PAGE AND SESSIONS PAGE
router.get('/login', async(ctx, next) => {
  ctx.body = "login page"
})
router.get('/sessions', async(ctx, next) => {
  let sessions = await Session.run()
  ctx.body = sessions
})

//CREATE NEW USER
router.post('/register', async(ctx, next) => {
  let user = new User(ctx.request.body)
  
  let email = ctx.request.body.email
  
  let userExists = Object.keys(await User.filter({email: email}).run()).length
  let passwordPlainText = ctx.request.body.password 
  let role = ctx.request.body.role
  
  //set hash  
  const saltRounds = 10   
  let hash = bcrypt.hashSync(passwordPlainText, saltRounds)
  if (userExists !== 0){
    ctx.body = "The user already exists"
  } else if( email === undefined || passwordPlainText === undefined || role === undefined){
    if (email === undefined) {
      ctx.body = "email missing"
    } else if (passwordPlainText === undefined) {
      ctx.body = "password missing"
    } else if (role === undefined) {
      ctx.body = "role missing"
    } 
  } else {
    //save user data with hash
    ctx.request.body.password = hash  
    let result = await user.saveAll()
    ctx.body = result
  }
})

//LOGIN
router.post('/login', async(ctx, next) => {
  
  //login keys
  let email =  ctx.request.body.email 
  let password =  ctx.request.body.password 
  
  //find user by email and declare validation variables
  let user = await User.filter({email: email}).run()
  let validPassword
  let emailMatch 

  if (user.length) {
    validPassword = bcrypt.compareSync(password, user[0].password)
    emailMatch = true
  }

  //responses
  if (emailMatch && validPassword) {
    let activeUser = user  

    ctx.body = 'login successful!'
    ctx.cookies.set("SID", activeUser[0].role)
    
    let session = new Session({
      user: email,
      role: activeUser[0].role,
      start: new Date()
    })
    let saveSession = await session.saveAll()
    
    console.log(session)

  } else if (emailMatch && !validPassword) {
    ctx.body = 'incorrect password'
  } else {  
    ctx.body = 'incorrect email' 
  }

  await next()
})

//Export routes
module.exports = router.routes()
