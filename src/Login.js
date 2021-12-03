import React, { useState } from "react";
import login from "./actions/login";
import { useHistory } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState(null);
	const history = useHistory();

	const submitHandler = async (event) => {
		event.preventDefault();
		// if (email && password) {
		// console.log(password);
		const result = await login(email, password);
		console.log(result);

		if (result.data) {
			setMessage(result.data[0].msg);

			setTimeout(() => {
				setMessage("");
			}, 4000);
			return;
		}
		localStorage.setItem("userId", result._id);
		localStorage.setItem("userEmail", result.email);
		setIsLoggedIn();
		history.push("/");
	};

	return (
		<>
			<h1 class="text-center text-primary">Sign in</h1>
			{message && <h1 style={{ color: "white" }}>{message}</h1>}

			<div className="container">
				<form>
					<div className="form-group">
						<label htmlFor="exampleInputEmail1" style={{ color: "white" }}>
							Email address
						</label>
						<input
							type="email"
							className="form-control"
							name="email"
							required
							value={email}
							onChange={(eventObj) =>
								setEmail(eventObj.target.value)
							}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1" style={{ color: "white" }}>Password</label>
						<input
							type="password"
							className="form-control"
							name="password"
							required
							value={password}
							onChange={(eventObj) =>
								setPassword(eventObj.target.value)
							}
						/>
					</div>
					<button
						type="submit"
						className="btn btn-primary mt-2"
						onClick={submitHandler}
					>
						Submit
					</button>
				</form>
			</div>
		</>
	);
};

export default Login;
