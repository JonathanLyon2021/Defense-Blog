const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { validationResult } = require("express-validator");

const postSignup = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		//Validation
		const errors = validationResult(req);
		console.log(errors);

		if (!errors.isEmpty()) {
			const error = new Error("Validation Failed");
			error.statusCode = 422;
			error.data = errors.array();
			throw error;
		}

		const checkemail = await User.find({ email });
		if (checkemail.length > 0) {
			res.json({ error: "E-mail already registered" });
			return;
		}
		//validation
		//hash the password
		const salt = await bcrypt.genSalt(10);

		//construct hash the password
		const hash = await bcrypt.hash(password, salt);

		//add user to mongo(database)

		await User.create({
			email,
			password: hash,
		});
		res.status(200).json({ message: "User Successfully Registered" });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		console.log(err);
		next(err);
	}
};

const postLogin = async (req, res, next) => {
	const { email, password } = req.body;
	console.log(req.body);
	try {
		const errors = validationResult(req);
		console.log(errors);

		if (!errors.isEmpty()) {
			const error = new Error("Validation Failed");
			error.statusCode = 402;
			error.data = errors.array();
			throw error;
		}

		const user = await User.find({ email });
		console.log(user);
		if (!user) {
			res.json({ error: "E-mail not registered in database" });
			return;
		} else {
			const decodedPassword = await bcrypt.compare(
				password,
				user[0].password
			);
			console.log(decodedPassword);
			if (decodedPassword) {
				res.status(200).json(...user);
			} else {
				res.json({ error: "Authentication failed" });
				return;
			}
		}
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		console.log(err);
		next(err);
	}
};

module.exports = { postSignup, postLogin };
