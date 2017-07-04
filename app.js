const Koa = require('koa')
const app = new Koa()

const { Post, Author } = require('./models')

const bodyParser = require('koa-bodyparser')

const routes = require('./routes')

app.use(bodyParser())

// app.use(async(ctx, next) => {
   
   
// })

app.use(routes)
app.listen(3000)
console.log('listening on port 3000')

