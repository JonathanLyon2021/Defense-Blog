const Blog = require("../models/Blogs");
const { validationResult } = require("express-validator");

const postBlog = async (req, res, next) => {
	console.log("postBlog");
	const { title, content, author, authorId } = req.body;
	console.log(req.body);

	try {
		//Validation
		const errors = validationResult(req);
		console.log(errors);

		if (!errors.isEmpty()) {
			const error = new Error("Validation Failed");
			error.statusCode = 422;
			error.data = errors.array();
			throw error;
		}

		Blog.create({ title, content, author, authorId });

		res.json({ message: "Blog Successfully Created" });
	} catch (err) {
		console.log(err);
		next(err);
	}
};

const getBlogs = async (req, res, next) => {
	try {
		let blogs = await Blog.find();

		blogs = blogs.map((blog) => {
			let description = blog.content.split(" ").slice(0, 50).join(" ");
			return {
				title: blog.title,
				content: description,
				_id: blog._id,
				authorId: blog.authorId,
				author: blog.author,
			};
		});

		res.json({ blogs });
	} catch (err) {
		console.log(err);
		next(err);
	}
};

const getBlogDetails = async (req, res, next) => {
	const id = req.params.id;
	try {
		const blog = await Blog.findOne({ _id: req.params.id });

		res.json({ blog });
	} catch (err) {
		console.log(err);
		next(err);
	}
};

const deleteBlog = async (req, res, next) => {
	const id = req.params.blogId;
	try {
		const blog = await Blog.findByIdAndDelete(id);

		if (blog) {
			console.log(blog);
			res.json({ message: "Blog Deleted" });
		} else {
			const error = new Error("Blog Not Found");
		}
	} catch (err) {
		console.log(err);
		next(err);
	}
};

const editBlog = async (req, res, next) => {
	console.log("editBlog");
	const { title, content, author, authorId } = req.body;
	const id = req.params.id;
	console.log(req.body);
	console.log(id);
	try {

		const blog = await Blog.findByIdAndUpdate(id, {
			title,
			content,
			author,
			authorId,
		});

		if (blog) {
			console.log(blog);
			res.json({ message: "Blog Updated" });
		} else {
						res.json({ message: "Blog ERROR" });

		}




		// let blog = await Blog.findByIdAndUpdate(id);
		// console.log(blog);
		// let updatedBlog = blog.find((blog) => blog.title === title);
		// // console.log(updatedBlog._id);

		// if (updatedBlog) {
		// 	updatedBlog.title = title || updatedBlog.title;
		// 	updatedBlog.content = content || updatedBlog.content;
		// 	updatedBlog.author = author || updatedBlog.author;
		// 	updatedBlog.authorId = authorId || updatedBlog.authorId;
		// 	const result = await updatedBlog.create();

		// 	if (result) {
		// 		console.log(result);
		// 		res.status(201).json({ message: "Blog Updated" });
		// 	} else {
		// 		new Error("Blog Not Found");
		// 	}
		// }
	} catch (err) {
		console.log(err);
		next(err);
	}
};

module.exports = { postBlog, getBlogs, getBlogDetails, deleteBlog, editBlog };
