const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const login = require('./routes/login')
const routes = require('./routes/routes')
const { Post, Author, Users, Session } = require('./models')

const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(login)
// app.use(ctx => {
//     let userRole = ctx.cookies.get("SID")
//     console.log(userRole)

//   if(userRole === "admin"){
//       return
//   }
//   return 
// })
app.use(routes)
app.listen(3000)
console.log('listening on port 3000')

