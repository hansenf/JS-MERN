const Post = require("../model/Post")

//Creating a post
exports.createPost = async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    try {
        const postsave = await post.save();
        res.json(postsave)
    } catch (error) {
        console.log(error);
    }
}

//Getting all posts
exports.getPost = async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (error) {
        res.send("Error", error)
    }
}

//Getting a single post by id
exports.findSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.json(post)
    } catch (erorr) {
        res.send("Error", error)
    }
}

//Updating a post
exports.updatePost = async (req, res) => {
    const postUpdate = await Post.findOneAndUpdate(req.params.id, req.body, { new: true })
    res.json(postUpdate)
}

//Deleting a post
exports.deletePost = async (req, res) => {
    try {
        const postDelete = await Post.findByIdAndRemove(req.params.id)
        res.json(postDelete)
    } catch (error) {
        console.log(error)
    }
}