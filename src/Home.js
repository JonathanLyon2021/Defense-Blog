import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Home = () => {
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		const blogs = async () => {
			const { data } = await axios.get(
				"http://localhost:8000/api/blogs/"
			);
			// console.log(data.blogs);
			setBlogs(data.blogs);
		};

		blogs();
	}, []);

	return (
		<>
			<div className="container Body" title="Container Body">
				{blogs.length > 0 &&
					blogs.map(({ title, author, content, _id }, index) => (
						<div className="card my-3" key={index}>
							<div className="card-header">Author: {author}</div>
							<div className="card-body">
								<h4 className="card-title">{title}</h4>
								<p className="card-text">{content}</p>
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
