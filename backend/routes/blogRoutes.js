const {Router} = require("express");
const router = Router();
const blogController = require("../controllers/blogController")

router.post("/create", blogController.postBlog)
// router.post("/login", blogController.postLogin)




module.exports = router;