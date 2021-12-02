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
router.delete("/:blogId", blogController.deleteBlog)
router.put("/edit/:id", blogController.editBlog)








module.exports = router;