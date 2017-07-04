const Router = require('koa-router')
const router = new Router()

const { Post, Author } = require('./models')

router.get('/', async(ctx, next) => {
  ctx.body = 'Homepage'
})

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

module.exports = router.routes()
