import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		const blogs = async () => {
			const { data } = await axios.get(
				"http://localhost:8000/api/blogs/"
			);
			console.log(data.blogs);
			setBlogs(data.blogs);


		};

		blogs();
	}, []);

	return (
		<>
			<div className="container">
				{blogs.length > 0 &&
					blogs.map(({ title, body, author, _id }, index) => (
						<div className="card my-3" key={index}>
							<div className="card-header">Author: {author}</div>
							<div className="card-body">
								<h5 className="card-title">{title}</h5>
								<p className="card-text">{body}</p>
								<Link to={`/blogs/${_id}`} className="btn btn-primary">
									see more...
								</Link>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default Home;
