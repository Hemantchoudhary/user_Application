"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const profileController_1 = require("../controllers/profileController");
const router = (0, express_1.Router)();
router.post('/register', userController_1.register);
router.post('/login', authController_1.login);
router.get('/profile', authMiddleware_1.verifyToken, profileController_1.profile);
exports.default = router;
