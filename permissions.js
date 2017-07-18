const Router = require('koa-router')
const router = new Router()

function validator(){
    router.all('/posts', async(ctx, next) => {
    let activeUser = ctx.cookies.get("SID")
    let validation = activeUser === "ana@apt.pt"
    console.log(activeUser)
})
}

module.exports = validator()
