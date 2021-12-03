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
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);

	const toggleEditMode = () => {
		setIsEditMode(!isEditMode);
	};
	//doesn't setting false above already mean these methods don't need the '!isEditMode' && 'isLoggedIn'
	const handleLogIn = () => {
		setIsLoggedIn(!isLoggedIn);
	};

	return (
		<>
			<Router>
				<ToastContainer
					position="top-center"
					pauseOnFocusLoss={false}
				/>
				<Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={handleLogIn} />
				<Switch>
					<div className="Body">
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/edit/:id">
							<Create
								edit={isEditMode}
								isEditMode={toggleEditMode}
							/>
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
