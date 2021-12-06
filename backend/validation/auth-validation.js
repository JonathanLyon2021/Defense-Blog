const { body } = require("express-validator");
const User = require("../models/User");

exports.signupValidator = (req, res) => {
	return [
		body("email")
			.trim()
			.not()
			.isEmpty()
			.withMessage("Please provide email")

			.withMessage("Invalid Email")
			.isEmail()
			.custom((email) => {
				return User.findOne({ email }).then((doc) => {
					if (doc) {
						return Promise.reject("Email is already taken");
					}
				});
			}),

		body("password", "Password must be 8-20 alpha-numeric characters")
			.trim()
			.isAlphanumeric()
			.isLength({ min: 8, max: 20 }),
	];
};

exports.loginValidator = (req, res) => {
	return [
		body("email")
			.trim()
			.not()
			.isEmpty()
			.withMessage("Please provide email")
			.isEmail()
			.withMessage("Invalid Email")
			.custom((email) => {
				return User.findOne({ email }).then((doc) => {
					if (!doc) {
						return Promise.reject("Email is not registered");
					}
				});
			}),

		body("password", "Password must be 8-20 alpha-numeric characters")
			.trim()
			.not()
			.isEmpty()
			.withMessage("Please provide password")
			.isAlphanumeric()
			.isLength({ min: 8, max: 20 }),
	];
};
