const thinky = require('thinky')()
const r = thinky.r
const type = thinky.type

//Create a model - the table is automatically created
//Post Model
var Post = thinky.createModel("Post", {
  id: type.string(),
  title: type.string(),
  content: type.string(),
  idAuthor: type.string()
});

//Author model
var Author = thinky.createModel("Author", {
    id: type.string(),
    name: type.string(),
    email: type.string()
})

Post.belongsTo(Author, "author", "idAuthor", "id");

//User Model 
var User = thinky.createModel("User", {
    id: type.string(),
    username: type.string(),
    email: type.string().email(),
    role: type.string(),
    password: type.string()
})
module.exports = {
    Post, Author, User
}
