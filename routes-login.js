const Router = require('koa-router')
const router = new Router()

const { Post, Author, User } = require('./models')

router.post('/users', async(ctx, next) => {
  let user = new User(ctx.request.body)
  let result = await user.saveAll()
  ctx.body = result
})

router.get('/', async(ctx, next) => {
  await send(ctx, ctx.path, { root: __dirname + "/login-form.html"})

})
router.post('/login', async(ctx, next) => {
  let email =  ctx.request.body.email 
  let users = await User.filter({email: email}).run()
  let isEmpty = Object.keys(users).length === 0

  if (isEmpty) {
    ctx.body = 'not a valid email' 
    return
  } else {
    ctx.body = 'email matched a user - login'
    return
  }
})

module.exports = router.routes()