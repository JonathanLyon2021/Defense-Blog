import axios from "axios";

const editBlog = async (title, content, author, authorId) => {
	console.log(title, content, author,authorId);
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.put(
			"http://localhost:8000/api/blogs/edit/" + authorId,
			{ title, content, author, authorId },
			config
		);
		if (data) {
			return data;
		} else {
			return "Database Error";
		}
	} catch (err) {
		console.log(err);
	}
};

export default editBlog;
