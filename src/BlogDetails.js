import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import BlogToDelete from "./actions/deleteBlog";

const BlogDetails = ({ edit, isEditMode }) => {
	const history = useHistory();
	const [title, setTitle] = useState([]);
	const [body, setBody] = useState([]);
	const [author, setAuthor] = useState([]);
	const [authorId, setAuthorId] = useState("");

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
			setAuthorId(data.blog.authorId);
		};

		blogs();
	}, []);

	const handleDelete = async () => {
		const result = await BlogToDelete(id);
		console.log(edit);
		if (result) {
			history.push("/");
		}
	};

	const handleEdit = async () => {
		isEditMode();
		console.log(id);
		history.push({
			pathname: `/create/blogs/edit/${id}`,
		});
	};

	return (
		<div className="container">
			<div className="card my-3">
				<div className="card-header">Author: {author}</div>
				<div className="card-body">
					<h5 className="card-title">{title}</h5>
					<p className="card-text">{body}</p>
				</div>
				{authorId === localStorage.getItem("userId") && (
					<div className="container">
						<div
							className="btn-group"
							role="group"
							aria-label="Basic example"
						>
							<button
								type="button"
								className="btn btn-success"
								onClick={handleEdit}
							>
								Edit
							</button>
							<button
								type="button"
								className="btn btn-danger"
								onClick={handleDelete}
							>
								Delete
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default BlogDetails;
