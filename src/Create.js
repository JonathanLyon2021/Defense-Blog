import { useState } from "react";
import { useHistory } from "react-router-dom";
import createBlog from "./actions/createBlog";

const Create = () => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [author, setAuthor] = useState("");
	const [message, setMessage] = useState(null);

	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(title, body, author);
		if (title && body && author) {
			const result = await createBlog(title, body, author);
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
	};

	return (
		<>
			{message && <h1>{message}</h1>}

			<div className="container">
				<form>
					<div className="form-group my-2">
						<label htmlFor="exampleFormControlInput1">Title</label>
						<input
							type="email"
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
							className="form-control"
							id="exampleFormControlTextarea1"
							rows="15"
							required
							value={body}
							onChange={(e) => setBody(e.target.value)}
						></textarea>
					</div>
				</form>
				<button
					type="button"
					className="btn btn-primary my-2"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</div>
		</>
	);
};

export default Create;
