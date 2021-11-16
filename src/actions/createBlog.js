import axios from "axios";

const createBlog = async (title, body, author) => {
	console.log(title, body, author);
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.post(
			"http://localhost:8000/api/blogs/create",
			{ title, body, author },
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

export default createBlog;
