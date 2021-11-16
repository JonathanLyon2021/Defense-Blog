const Blog = require("../models/Blogs");

const postBlog = async (req, res, next) => {
    console.log("postBlog");
	try {
		const { title, body, author } = req.body
		Blog.create({ title, body, author });

            res.json({message: "Blog Successfully Created"})
	} catch (err) {
		console.log(err);
        next(err);
	}
};

module.exports = { postBlog };