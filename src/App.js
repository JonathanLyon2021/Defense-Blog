import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Create from "./Create";
import Registration from "./Registration";
import Login from "./Login";
import BlogDetails from "./BlogDetails";
import NotFound from "./NotFound";
import Navbar from "./Navbar";


// import React from "react";

function App() {
	return (
		<Router>
			<div>
        <Navbar/>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/create">
						<Create />
					</Route>
					<Route path="/registration">
						<Registration />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/blogs/:id">
						<BlogDetails />
					</Route>
					<Route path="*">
						<NotFound />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
