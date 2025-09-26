const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;

const { registerUser, registerManager, registerAdmin, login } = require("../controllers/authController");

const { requireRole } = require("../middleware/roleMiddleware");

// remove /register endpoint and include these ones.
router.post("/register-user", [emailValidator, passwordValidator], registerUser);
router.post("/register-manager", protect, requireRole("admin"), [emailValidator, passwordValidator], registerManager);
router.post("/register-admin", [emailValidator, passwordValidator], registerAdmin);
router.post("/login", [emailValidator, body("password").notEmpty().trim().escape()], login);

const { registerLimiter, loginLimiter} = require("../middleware/rateLimiter")

router.post("/register-user", registerLimiter, [emailValidator, passwordValidator], registerUser);
router.post("/register-manager", protect, requireRole("admin"), registerLimiter, [emailValidator, passwordValidator], registerManager);
router.post("/register-admin", registerLimiter, [emailValidator, passwordValidator], registerAdmin);

router.post("/login", loginLimiter, [emailValidator, body("password").notEmpty().trim().escape()], login);

