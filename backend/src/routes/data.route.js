import express from "express"
import { protectRoute } from "../middleware/middleware.js"
import { getWeekData, addNewData } from "../controllers/data.controller.js"

const router = express.Router()

router.post("/get-week-data", protectRoute, getWeekData)

router.post("/add-new-data", protectRoute, addNewData)

export default router;