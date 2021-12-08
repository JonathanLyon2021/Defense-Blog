import React, { useState } from "react";
import register from "./actions/register";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

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
			return;
		}
		const result = await register(email, password);

		if (result.data) {
			toast.error(result.data[0].msg, {
				position: "bottom-center",
				theme: "dark",
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		} else {
			toast.success("Registered Successfully", {
				position: "bottom-center",
				theme: "dark",
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			history.push("/login");
		}
	};

	const handleOnChange = async (event) => {
		setEmail(event.target.value);
		const result = await register(email, password);
		if (result.data) {
			setMessage(result.data[0].msg);
		} else {
			setMessage("");
		}

		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
		}
	};

	return (
		<>
			<h1 class="text-center" style={{ color: "white" }}>Registration</h1>
			{message && <h1 style={{ color: "white" }}>{message}</h1>}

			<div className="container" data-testid="Registration Form">
				<form>
					<div className="form-group">
						<label
							htmlFor="exampleInputEmail1"
							style={{ color: "white" }}
						>
							Email address
						</label>
						<input
							type="email"
							className="form-control"
							name="email"
							required
							value={email}
							onChange={(eventObj) => handleOnChange(eventObj)}
						/>
					</div>
					<div className="form-group">
						<label
							htmlFor="exampleInputPassword1"
							style={{ color: "white" }}
						>
							Password
						</label>
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
						<label
							htmlFor="exampleInputPassword1"
							style={{ color: "white" }}
						>
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

export default Registration;
