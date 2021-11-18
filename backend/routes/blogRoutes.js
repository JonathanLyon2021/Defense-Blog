const {Router} = require("express");
const router = Router();
const blogController = require("../controllers/blogController")

router.post("/create", blogController.postBlog)
// router.post("/login", blogController.postLogin)
router.get("/", blogController.getBlogs)
router.get("/:id", blogController.getBlogDetails)





module.exports = router;