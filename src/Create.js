import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import createBlog from "./actions/createBlog";
import BlogToEdit from "./actions/editBlog";
import axios from "axios";
import { useParams } from "react-router-dom";

const Create = ({ edit, isEditMode }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [author, setAuthor] = useState("");
	const [message, setMessage] = useState(null);
	const [authorId, setAuthorId] = useState(null);

	const { id } = useParams();

	useEffect(() => {
		setAuthorId(localStorage.getItem("userId"));
		if (edit) {
			blogs();
		}
	}, []);

	const blogs = async () => {
		console.log(id);
		let { data } = await axios.get(`http://localhost:8000/api/blogs/${id}`);

		console.log(data);

		if (data) {
			setTitle(data.blog.title);
			setContent(data.blog.body);
			setAuthor(data.blog.author);
			setAuthorId(data.blog.authorId);
		}
	};

	const history = useHistory();

	const handleSubmit = async (e) => {
		console.log(edit);
		if (edit) {
			handleEdit();
			return;
		}

		e.preventDefault();
		console.log(title, content, author, authorId);
		// if (title && content && author) {
		const result = await createBlog(title, content, author, authorId);
		console.log(result);

		if (result.data) {
			setMessage(result.data[0].msg);

			setTimeout(() => {
				setMessage("");
			}, 4000);
			return;
		} else {
			history.push("/");
		}
		// }
	};

	const handleEdit = async () => {
		const result = await BlogToEdit(title, content, author, authorId);
		console.log(result);
		if (result) {
			isEditMode();
			console.log(edit);
			history.push("/");
		}
	};

	return (
		<>
			{message && <h1>{message}</h1>}

			<div className="container">
				<form>
					<div className="form-group my-2">
						<label htmlFor="exampleFormControlInput1">Title</label>
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
						<label htmlFor="exampleFormControlSelect1">
							Author
						</label>
						<select
							name="author"
							className="form-control"
							id="exampleFormControlSelect1"
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
						>
							<option defaultValue>Select</option>
							<option>John</option>
							<option>Bill</option>
							<option>Sam</option>
							<option>Bob</option>
							<option>Tom</option>
						</select>
					</div>

					<div className="form-group my-2">
						<label htmlFor="exampleFormControlTextarea1">
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
					className="btn btn-primary my-2"
					onClick={handleSubmit}
				>
					{!edit ? "Edit" : "Submit"}
				</button>
			</div>
		</>
	);
};

export default Create;
