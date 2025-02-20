import prisma from "../lib/prisma.js"
import { subDays, startOfDay } from "date-fns";

export const getWeekData = async (req, res) => {
    try {
        const today = startOfDay(new Date()); // Get today's date at midnight
        const sevenDaysAgo = subDays(today, 7); // Get the date 7 days ago
        const records = await prisma.data.findMany({
            where: {
              user: req.user,
              day: {
                gte: sevenDaysAgo, // Greater than or equal to 7 days ago
                lte: today, // Less than or equal to today
            },
            },
            select: {
              hours: true,
              date: true,
            },
        })
        res.status(200).json(records);
    } catch (error) {
        console.log("Error in getWeekData controller", error.message);
        res.status(500).json({ message: "Internal Server Error" }); 
    }
};

export const addNewData = async (req, res) => {
    const today = startOfDay(new Date());
    try {
        const newData = await prisma.data.create({
            data: {
                day: today,
                hours: req.body,
                userId: req.user.id,
                user: req.user
            }
        })
        res.status(200).json({ message: "New Data Logged"})
    } catch (error) {
        console.log("Error in addNewData controller", error.message);
        res.status(500).json({ message: "Internal Server Error" }); 
    }
}