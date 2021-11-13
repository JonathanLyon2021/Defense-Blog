import React, { useState } from "react";
import register from "./actions/register";
import { useHistory } from "react-router-dom";

const Registration = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);
	const history = useHistory();

	const submitHandler = async (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
			setPassword("");
			setConfirmPassword("");
			setTimeout(() => {
				setMessage("");
			}, 3000);
		}
		if (email && password && confirmPassword) {
			const result = await register(email, password);
			console.log(result);

			if (result.error) {
				setMessage(result.error);

				setTimeout(() => {
					setMessage("");
				}, 4000);
				return;
			}
			history.push("/login");
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
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">
							Confirm Password
						</label>
						<input
							type="password"
							className="form-control"
							name="confirmPassword"
							required
							value={confirmPassword}
							onChange={(eventObj) =>
								setConfirmPassword(eventObj.target.value)
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

export default Registration;
