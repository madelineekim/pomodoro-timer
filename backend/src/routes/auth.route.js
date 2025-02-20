import express from "express"
import { signup, login, logout, checkAuth, deleteAccount } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/middleware.js";

const router = express.Router()

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/delete-account", deleteAccount)

router.get("/check", protectRoute, checkAuth);

export default router;