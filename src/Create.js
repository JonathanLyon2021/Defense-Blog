import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import createBlog from "./actions/createBlog";
import BlogToEdit from "./actions/editBlog";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Create = ({ edit, isEditMode }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [author, setAuthor] = useState("");
	const [message, setMessage] = useState(null);
	const [authorId, setAuthorId] = useState(null);

	const { id } = useParams();

	useEffect(() => {
		setAuthorId(localStorage.getItem("userId"));
		const blogs = async () => {
			// console.log("id", id);
			const { data } = await axios.get(
				`http://localhost:8000/api/blogs/${id}`
			);
			// console.log(data);
				if (edit) {
					setTitle(data.blog.title);
					setContent(data.blog.content);
					setAuthor(data.blog.author);
				}
			
		};

		blogs();
	}, []);

	const history = useHistory();

	const handleSubmit = async (e) => {
		console.log(edit);
		if (edit) {
			handleEdit();
			return;
		}

		e.preventDefault();
		// console.log(title, content, author, authorId);
		// if (title && content && author) {
		const result = await createBlog(title, content, author, authorId);
		// console.log(result);

		if (result.data) {
			toast.error(result.data[0].msg, {
				position: "bottom-center",
				theme: "colored",
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		} else {
			toast.success("Blog Created", {
				position: "bottom-center",
				theme: "colored",
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});

			history.push("/");
		}
	};

	const handleEdit = async () => {
		const result = await BlogToEdit(title, content, author, id);
		// console.log(result);
		if (result) {
			isEditMode();
			toast.success("Blog Successfully Edited", {
				position: "bottom-center",
				theme: "light",
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			// console.log(edit);
			history.push("/");
		}
	};

	return (
		<>
			{message && <h1 style={{ color: "white" }}>{message}</h1>}

			<div className="container">
				<form>
					<div className="form-group my-2">
						<label
							htmlFor="exampleFormControlInput1"
							style={{ color: "white" }}
						>
							Title
						</label>
						<input
							name="title"
							className="form-control"
							id="exampleFormControlInput1"
							required
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className="form-group my-2">
						<label
							htmlFor="exampleFormControlSelect1"
							style={{ color: "white" }}
						>
							Author
						</label>
						<textarea
							name="author"
							className="form-control"
							id="exampleFormControlSelect1"
							required
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
						></textarea>
					</div>

					<div className="form-group my-2">
						<label
							htmlFor="exampleFormControlTextarea1"
							style={{ color: "white" }}
						>
							Description
						</label>
						<textarea
							name="content"
							className="form-control"
							id="exampleFormControlTextarea1"
							rows="15"
							required
							value={content}
							onChange={(e) => setContent(e.target.value)}
						></textarea>
					</div>
				</form>

				<button
					type="button"
					className="btn btn-dark my-2"
					onClick={handleSubmit}
				>
					{edit ? "Edit" : "Submit"}
				</button>
			</div>
		</>
	);
};

export default Create;
