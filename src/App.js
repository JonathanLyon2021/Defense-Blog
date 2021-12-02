import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Create from "./Create";
import Registration from "./Registration";
import Login from "./Login";
import BlogDetails from "./BlogDetails";
import NotFound from "./NotFound";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);

	const toggleEditMode = () => {
		setIsEditMode(!isEditMode);
	};

	const handleLogIn = () => {
		setIsLoggedIn(!isLoggedIn);
	};

	return (
		<>
			<Router>
				<Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={handleLogIn} />
				<Switch>
					<div className="Body">
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/create">
							<Create
								edit={isEditMode}
								isEditMode={toggleEditMode}
							/>
						</Route>
						<Route path="/registration">
							<Registration />
						</Route>
						<Route path="/login">
							<Login setIsLoggedIn={handleLogIn} />
						</Route>
						<Route path="/blogs/:id">
							<BlogDetails
								edit={isEditMode}
								isEditMode={toggleEditMode}
							/>
						</Route>
						<Route path="/create/blogs/edit/:id">
							<Create
								edit={isEditMode}
								isEditMode={toggleEditMode}
							/>
						</Route>
						<Route path="*">
							<NotFound />
						</Route>
					</div>
				</Switch>
			</Router>
		</>
	);
}

export default App;
