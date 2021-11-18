const Blog = require("../models/Blogs");

const postBlog = async (req, res, next) => {
	console.log("postBlog");
	try {
		const { title, body, author } = req.body;
		Blog.create({ title, body, author });

		res.json({ message: "Blog Successfully Created" });
	} catch (err) {
		console.log(err);
		next(err);
	}
};

const getBlogs = async (req, res, next) => {
	try {
		let blogs = await Blog.find();

		res.json({ blogs });
	} catch (err) {
		console.log(err);
		next(err);
	}
};

const getBlogDetails = async (req, res, next) => {
	try {
		const blog = await Blog.findOne({ _id: req.params.id });

		res.json({ blog });
	} catch (err) {
		console.log(err);
		next(err);
	}
};

module.exports = { postBlog, getBlogs, getBlogDetails };
