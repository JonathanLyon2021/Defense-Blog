import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import BlogToDelete from "./actions/deleteBlog";
import { toast } from "react-toastify";

const BlogDetails = ({ edit, isEditMode }) => {
	const history = useHistory();
	// const [title, setTitle] = useState([]);
	// const [body, setBody] = useState([]);
	// const [author, setAuthor] = useState([]);
	// const [authorId, setAuthorId] = useState("");
	// const [blogId, setBlogId] = useState("");
	const [blog, setBlog] = useState(null);

	const { id } = useParams();

	useEffect(() => {
		const blogs = async () => {
			console.log("id", id);
			const { data } = await axios.get(
				`http://localhost:8000/api/blogs/${id}`
			);
			console.log(data);
			setBlog(data);
		};

		blogs();
	}, []);
	// does 'id' go in the above array?

	const handleDelete = async () => {
		const result = await BlogToDelete(id);
		// console.log(edit);
		if (result) {
			toast.error("Blog Deleted", {
				position: "bottom-center",
				theme: "colored",
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			history.push("/");
		}
	};

	const handleEdit = async (id) => {
		isEditMode();
		// console.log(edit);
		// console.log(id);
		history.push({
			pathname: `/edit/${id}`,
		});
	};

	return (
		<div className="container">
			{blog && (
				<div className="card my-3">
					<div className="card-header">
						Author: {blog.blog.author}
					</div>
					<div className="card-body">
						<h4 className="card-title">{blog.blog.title}</h4>
						<p className="card-text">{blog.blog.content}</p>
					</div>
					{blog.blog.authorId === localStorage.getItem("userId") && (
						<div className="container">
							<div
								className="btn-group"
								role="group"
								aria-label="Basic example"
							>
								<button
									type="button"
									className="btn btn-success"
									onClick={(e) => {
										handleEdit(blog.blog._id);
									}}
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
			)}
		</div>
	);
};

export default BlogDetails;
