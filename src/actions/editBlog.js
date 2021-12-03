import axios from "axios";

const editBlog = async (title, content, author, id) => {
	console.log(title, content, author, id);
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.post(
			"http://localhost:8000/api/blogs/edit/" + id,
			{ title, content, author, id },
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
