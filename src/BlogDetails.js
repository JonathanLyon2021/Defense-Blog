import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
	const [title, setTitle] = useState([]);
	const [body, setBody] = useState([]);
	const [author, setAuthor] = useState([]);

	const { id } = useParams();

	useEffect(() => {
		const blogs = async () => {
			const { data } = await axios.get(
				`http://localhost:8000/api/blogs/${id}`
			);
			console.log(data);
			setTitle(data.blog.title);
			setBody(data.blog.body);
			setAuthor(data.blog.author);
		};

		blogs();
	}, [id]);

	return (
		<div className="container">
			<div className="card my-3">
				<div className="card-header">Author: {author}</div>
				<div className="card-body">
					<h5 className="card-title">{title}</h5>
					<p className="card-text">{body}</p>
				</div>
			</div>
		</div>
	);
};

export default BlogDetails;
