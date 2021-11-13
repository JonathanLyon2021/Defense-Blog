//dependices
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

//remote files
const authRoutes = require("./routes/authRoutes.js");

//global variables
const port = 8000;
const dbURI =
	"mongodb+srv://guest:guest@defense-blog.azmgk.mongodb.net/Defense-Blog?retryWrites=true&w=majority";

//express app
const app = express();
app.use(cors());

//static files
app.use(express.static("public"));

//middleware
app.use(express.json()); //takes form data and converts it to json
app.use(
	express.urlencoded({
		extended: true,
	})
); // does the same thing as the body parser, applies form data to the req.body object, allowing to to go to the backend

//routes
app.use("/api/users", authRoutes);

//error handling
app.use((error, req, res, next) => {
	console.log(error);
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	//server response
	res.status(status).json({ message, data });
});

//connecting to database and run Server

mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(port);
		console.log(`Listening on PORT:${port}`);
	})
	.catch((err) => {
		console.log(err.message);
	});
