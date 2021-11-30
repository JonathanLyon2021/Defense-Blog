const {Router} = require("express");
const router = Router();
const blogController = require("../controllers/blogController")
const {
	blogValidator,
} = require("../validation/blog-validation");

router.post("/create", blogValidator(), blogController.postBlog)
// router.post("/login", blogController.postLogin)
router.get("/", blogController.getBlogs)
router.get("/:id", blogController.getBlogDetails)





module.exports = router;