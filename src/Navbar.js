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
		console.log(isLoggedIn, setIsLoggedIn);
	};

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light custom-nav py-1">
				<h1 className="Heading">Lifted Truck Blog</h1>
				<img
					src={logo1}
					alt="Lifted Blue Chevy Truck"
					height="100"
					className="imageTag"
				/>{" "}
				<img
					src={logo2}
					alt="Lifted White Chevy Truck"
					height="100"
					className="imageTag"
				/>{" "}
				<img
					src={logo3}
					alt="Lifted Bright White Chevy Truck"
					height="100"
					className="imageTag"
				/>
				<img
					src={logo4}
					alt="Lifted Blue Chevy Truck"
					height="100"
					className="imageTag"
				/>
				<div>
					<div className="links">
						<Link to="/" className="mx-4">
							{" "}
							Home{" "}
						</Link>
						<Link to="/create" className="mx-4">
							New Blog
						</Link>
						{isLoggedIn && (
							<Link
								to="/"
								className="mx-4"
								onClick={() => {
									localStorage.removeItem("userId");
									localStorage.removeItem("userEmail");
									logoutHandler();
								}}
							>
								{" "}
								Logout{" "}
							</Link>
						)}

						{!isLoggedIn && (
							<>
								<Link to="/login" className="mx-4">
									{" "}
									Login{" "}
								</Link>
								<Link to="/registration" className="mx-4">
									{" "}
									Signup{" "}
								</Link>
							</>
						)}
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
