const thinky = require('thinky')()
const r = thinky.r
const type = thinky.type

//Create a model - the table is automatically created

//Post Model
const Post = thinky.createModel("Post", {
  id: type.string(),
  title: type.string(),
  content: type.string(),
  idAuthor: type.string()
});

//Author Model
const Author = thinky.createModel("Author", {
    id: type.string(),
    name: type.string(),
    email: type.string()
})

Post.belongsTo(Author, "author", "idAuthor", "id");

//User Model 
const User = thinky.createModel("User", {
    id: type.string(),
    username: type.string(),
    email: type.string().email(),
    role: type.string(),
    password: type.string()
})

const Session = thinky.createModel("Session", {
    id: type.string(),
    user: type.string().email(),
    role: type.string(),
    start: type.date()
})
module.exports = {
    Post, Author, User, Session
}
