import axios from "axios";

const login = async (id) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.delete(
			"http://localhost:8000/api/blogs/" + id,
			null,
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

export default login;
