import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from 'react';
import Home from "./Home";
import Create from "./Create";
import Registration from "./Registration";
import Login from "./Login";
import BlogDetails from "./BlogDetails";
import NotFound from "./NotFound";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
		<div className="Body">
			<Router>
				<ToastContainer
					position="bottom-center"
					pauseOnFocusLoss={false}
				/>
				<Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={handleLogIn} />
				<Switch>
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
				</Switch>
			</Router>
			 
			</div>
			<div className="Footer">
				<Footer/>
			</div>
		</>
	);
}

export default App;
