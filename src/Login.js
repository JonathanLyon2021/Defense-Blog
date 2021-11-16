import React, { useState } from "react";
import login from "./actions/login";
import { useHistory } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState(null);
	const history = useHistory();

	const submitHandler = async (event) => {
		event.preventDefault();
		if (email && password) {
			console.log(password);
			const result = await login(email, password);
			console.log(result);

			if (result.error) {
				setMessage(result.error);

				setTimeout(() => {
					setMessage("");
				}, 4000);
				return;
			}
			localStorage.setItem("jwt", result.token);
			history.push("/");
		}
	};

	return (
		<>
			{message && <h1>{message}</h1>}

			<div>
				<form>
					<div className="form-group">
						<label htmlFor="exampleInputEmail1">
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
						<label htmlFor="exampleInputPassword1">Password</label>
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
						className="btn btn-primary"
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
