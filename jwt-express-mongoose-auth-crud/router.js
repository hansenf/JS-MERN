const express = require("express")
const router = express.Router()
const PostsController = require("./controller/Posts");
const AuthController = require("./controller/Auth");

const { isSignedIn } = require("./controller/Auth");

router.get('/', (req, res) => {
    res.send("Hello World")
})
router.post('/posts/create', PostsController.createPost)
router.get('/posts', PostsController.getPost)
router.get('/posts/:id', PostsController.findSinglePost)
router.put('/posts/:id', PostsController.updatePost);
router.delete('/posts/:id', PostsController.deletePost);

router.post('/signup', AuthController.signup)
router.post('/signin', AuthController.signin)
router.get('/testauthroute', isSignedIn, (req, res) => {
    res.send("A protected route")
    // res.json(req.auth)
})

module.exports = router