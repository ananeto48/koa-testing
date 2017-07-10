function postValidator() {
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
    return
}
