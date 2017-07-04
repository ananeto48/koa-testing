const thinky = require('thinky')()
const r = thinky.r
const type = thinky.type

//Create a model - the table is automatically created
//Post Model
var Post = thinky.createModel("Post", {
  id: String,
  title: String,
  content: String,
  idAuthor: String
});

//Author model
var Author = thinky.createModel("Author", {
    id: String,
    name: String,
    email: String
})

Post.belongsTo(Author, "author", "idAuthor", "id");

module.exports = {
    Post, Author
}
