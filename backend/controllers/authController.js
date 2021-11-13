const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const postSignup = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const checkemail = await User.find({ email: email });
		if (checkemail) {
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

	try {
		const user = await User.findOne({ email: email });
		if (!user) {
			throw new Error("E-mail not registered in database");
		}
		const decodedPassword = await bcrypt.compare(password, user.password);
		if (decodedPassword) {
			res.status(200).json({
				_id: user._id,
				email: user.email,
				token: generateToken(user._id),
			});
		} else {
			res.status(401);
			throw new Error("Authentication failed");
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
