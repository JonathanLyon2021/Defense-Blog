import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light custom-nav">
				<h1>Engine Blog</h1>
				<div className="links">
					<Link to="/" className="mx-4">
						{" "}
						Home{" "}
					</Link>
					<Link to="/create" className="mx-4">
						New Blog
					</Link>
					<Link to="/login" className="mx-4">
						{" "}
						Login{" "}
					</Link>
					<Link to="/registration" className="mx-4">
						{" "}
						Signup{" "}
					</Link>
					<Link to="/" className="mx-4">
						{" "}
						Logout{" "}
					</Link>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
