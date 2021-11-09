import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light custom-nav">
				<h1>Engine Blog</h1>
                <div className="links">
				<Link to="/"> Home </Link>
				<Link to="/create">New Blog</Link>
				<Link to="/login"> Login </Link>
				<Link to="/registration"> Signup </Link>
				<Link to="/"> Logout </Link>
                </div>
			</nav>
		</>
	);
};

export default Navbar;
