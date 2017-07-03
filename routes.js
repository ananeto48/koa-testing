const Router = require('koa-router')
const router = new Router()

const { Post, Author } = require('./models')

router.get('/', async(ctx, next) => {
  ctx.body = 'Homepage'
})

//Posts Routes
//POST
router.post('/posts', async(ctx, next) => {
  let isEmpty = Object.keys(ctx.request.body).length === 0
  let titleIsEmpty = ctx.request.body.title === undefined 
  let contentIsEmpty = ctx.request.body.content === undefined 
  
  if (isEmpty) {
    ctx.body = "no body"
    return
  } else if (titleIsEmpty) {
    ctx.body = "ERROR: no title"   
    return  
  } else if (contentIsEmpty) {
    ctx.body = "ERROR: no content"
    return
  } 
  
  if (!isEmpty && !titleIsEmpty && !contentIsEmpty){
    let post = new Post(ctx.request.body)
    let result = await post.save()
    ctx.body = result
  }
})

//GET
router.get('/posts', async(ctx, next) => {
  let posts = await Post.run()
  ctx.body = posts
})

router.get('/posts/:id', async(ctx, next) => {
  let post = await Post.get(ctx.params.id).run()
  if (ctx.params.id === undefined) {
    ctx.body= "No post found"
  } else {
    ctx.body = post
  }
  
})



//PUT
//Doesn't work
router.put('/posts/:id', async(ctx, next) => {
  let post =  Post.get(ctx.params.id)
  let updatePost = await post.update(ctx.request.body).run()
  ctx.body = updatePost
})

//DELETE
router.del('/posts/:id', async(ctx, next) =>{
  let post =  Post.get(ctx.params.id)
  let result = await post.delete(ctx.body)
  ctx.body = 'The post was deleted'
})



module.exports = router.routes()
