//dependices
const express = require("express");
const mongoose = require("mongoose");

//remote files
const authRoutes = require("./routes/authRoutes.js");

//global variables
const port = 8000;
const dbURI =
	"mongodb+srv://guest:guest@cluster-videotutorials.ofaiw.mongodb.net/Video-tutorials?retryWrites=true&w=majority";

//express app
const app = express();

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
app.use("./api/users", authRoutes);

//error handling
app.use((error, req, res, next) => {
	res.render("500.hbs", { error });
	console.log(error);
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
