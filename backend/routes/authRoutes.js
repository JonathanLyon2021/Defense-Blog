const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");
const {
	signupValidator,
	loginValidator,
} = require("../validation/auth-validation");

router.post("/signup", signupValidator(), authController.postSignup);
router.post("/login", loginValidator(), authController.postLogin);

module.exports = router;
