import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import logo1 from "./images/LiftedChevyBlue.jpg";
import logo2 from "./images/LiftedChevyWhite2.jpg";
import logo3 from "./images/LiftedChevyWhite.jpg";
import logo4 from "./images/LiftedChevyBlue2.jpg";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
	const logoutHandler = () => {
		localStorage.removeItem("userId");
		setIsLoggedIn();
		// console.log(isLoggedIn, setIsLoggedIn);
	};

	return (
		<>
			<nav className="navbar navbar-expand-xl navbar-dark bg-dark">
				<h1 className="Heading" style={{ color: "rgb(60, 248, 3) " }}>
					Lifted Truck Blog
				</h1>
				<img
					src={logo1}
					alt="Lifted Blue Chevy Truck"
					height="120"
					width="130"
					className="imageTag"
				/>{" "}
				<img
					src={logo2}
					alt="Lifted White Chevy Truck"
					height="120"
					width="130"
					className="imageTag"
				/>{" "}
				<img
					src={logo3}
					alt="Lifted Bright White Chevy Truck"
					height="120"
					width="130"
					className="imageTag"
				/>
				<img
					src={logo4}
					alt="Lifted Blue Chevy Truck"
					height="120"
					width="140"
					className="imageTag"
				/>
				<div>
					<Link to="/" className="mx-3" style={{ color: "rgb(60, 248, 3)" }}>
						{" "}
						Home{" "}
					</Link>
					{isLoggedIn && (
						<>
					<Link
						to="/create"
						className="mx-3"
						style={{ color: "rgb(60, 248, 3)" }}
					>
						New Blog
					</Link>
					
						<Link
							title="logout"
							to="/"
							className="mx-3"
							style={{ color: "rgb(60, 248, 3)" }}
							onClick={() => {
								localStorage.removeItem("userId");
								localStorage.removeItem("userEmail");
								logoutHandler();
							}}
						>
							{" "}
							Logout{" "}
						</Link>
						</>
					)}

					{!isLoggedIn && (
						<>
							<Link
								to="/login"
								className="mx-3"
								style={{ color: "rgb(60, 248, 3)" }}
							>
								{" "}
								Login{" "}
							</Link>
							<Link
								to="/registration"
								className="mx-3"
								style={{ color: "rgb(60, 248, 3)" }}
							>
								{" "}
								Signup{" "}
							</Link>
						</>
					)}
				</div>
			</nav>
		</>
	);
};

export default Navbar;
