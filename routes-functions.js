const Router = require('koa-router')
const router = new Router()

function get_method(item, Item){
router.get('/item/:id', async(ctx, next) => {
  let item = await Item.get(ctx.params.id).run()
  if (ctx.params.id === undefined) {
    ctx.body= "No post found"
  } else {
    ctx.body = post
  }
  
})
}