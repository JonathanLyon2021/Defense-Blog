const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},
		author: {
			type: String,
		},
		body: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
