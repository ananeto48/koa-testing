const Router = require('koa-router')
const router = new Router()

const { Post, Author, User } = require('./models')

//POST
router.post('/posts', async(ctx, next) => {
  let isEmpty = Object.keys(ctx.request.body).length === 0
  let postInfo = true
  let authorInfo = true

  let titleIsEmpty = ctx.request.body.title === undefined 
  let contentIsEmpty = ctx.request.body.content === undefined 

  let noAuthor = ctx.request.body.author === undefined
  let noAuthorName
  let noAuthorEmail

  if (!noAuthor){
    noAuthorName = ctx.request.body.author.name === undefined
    noAuthorEmail = ctx.request.body.author.email === undefined
  }
    
  if (isEmpty) {
    ctx.body = "no body"
    return
  } else if (titleIsEmpty || contentIsEmpty) {
    postInfo = false
    ctx.body = "ERROR: post info missing"   
    return  
  } else if (noAuthor) {
    authorInfo = false
    ctx.body = "ERROR: author missing" 
    return
  } else if (noAuthorName || noAuthorEmail) {
    authorInfo = false
    ctx.body = "ERROR: author info missing" 
    return
  }
  
  if (postInfo && authorInfo){
    let post = new Post(ctx.request.body)
    let author = new Author(ctx.request.body.author)
    post.author = author

    let postSave = await post.saveAll()

    ctx.body = postSave
  }
})



//GET
router.get('/posts', async(ctx, next) => {
  let posts = await Post.orderBy('title').getJoin().run()
  ctx.body = posts
})

router.get('/authors', async(ctx, next) => {
  let authors = await Author.run()
  ctx.body = authors
})

router.get('/users', async(ctx, next) => {
  let users = await User.orderBy('title').run()
  ctx.body = users
})

router.get('/posts/:id', async(ctx, next) => {
  let post = await Post.get(ctx.params.id).getJoin().run()
  ctx.body = post
})

router.get('/author/:id', async(ctx, next) => {
  let author = await Author.get(ctx.params.id).run()
  ctx.body = post
})

//PUT
router.put('/posts/:id', async(ctx, next) => {
  let post =  Post.get(ctx.params.id)
  let updatePost = await post.update(ctx.request.body).run()
  ctx.body = updatePost
})

router.put('/author/:id', async(ctx, next) => {
  let author =  Author.get(ctx.params.id)
  let updateAuthor = await author.update(ctx.request.body).run()
  ctx.body = updateAuthor
})

//DELETE
router.del('/posts/:id', async(ctx, next) =>{
  let post =  Post.get(ctx.params.id)
  let result = await post.delete(ctx.body)
  ctx.body = 'The post was deleted'
})

router.del('/author/:id', async(ctx, next) =>{
  let author =  Author.get(ctx.params.id)
  let result = await author.delete(ctx.body)
  ctx.body = 'The author was deleted'
})


//USERS AND LOGIN
router.post('/users', async(ctx, next) => {
  let user = new User(ctx.request.body)
  let result = await user.saveAll()
  ctx.body = result
})

router.get('/login', async(ctx, next) => {
  ctx.body = "login page"
})

//LOGIN
router.post('/login', async(ctx, next) => {
  //login keys
  let email =  ctx.request.body.email 
  let password =  ctx.request.body.password 

  //find user by email
  let user = await User.filter({email: email}).run()

  //declare variables to check if email matches user and user/password matches
  let emailMatch 
  let passwordMatch

  if (user.length) {
    passwordMatch = user[0].password === password
    emailMatch = true
  }

  var activeUser = user
  console.log(activeUser)
  
  //responses
  if (emailMatch && passwordMatch) {
    ctx.body = 'login successful!'
    return
  } else if (!emailMatch && passwordMatch || emailMatch && !passwordMatch) {
    ctx.body = 'incorrect password'
    return
  } else {  
    ctx.body = 'incorrect email' 
    return
  }
})

//Export routes
module.exports = router.routes()
