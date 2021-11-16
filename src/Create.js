import { useState } from "react";
import { useHistory } from "react-router-dom";
import createBlog from "./actions/createBlog"

const Create = () => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [author, setAuthor] = useState("");
	const [message, setMessage] = useState(null);

    const history = useHistory();

	const handleSubmit = async(e) => {
		e.preventDefault();
		console.log("Submitting");
        
			if (title && body && author) {
			const result = await createBlog( title, body, author);
			console.log(result);

			if (result.error) {
				setMessage(result.error);

				setTimeout(() => {
					setMessage("");
				}, 4000);
				return;
			}
			history.push("/");
		}
}

	return (
<>
	{message && <h1>{message}</h1>}
		<div className="create">
			<h2>Add a New Blog</h2>
			<form onSubmit={handleSubmit}>
				<label>Blog title:</label>
				<input
					type="text"
					required
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<label>Blog body:</label>
				<textarea
					required
					value={body}
					onChange={(e) => setBody(e.target.value)}
				></textarea>
				<label>Blog author:</label>
				<select
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
				>
					<option value="me">me</option>
					<option value="you">you</option>
				</select>
				<button>Add Blog</button>
			</form>
		</div>
</>
	);
};

export default Create;
