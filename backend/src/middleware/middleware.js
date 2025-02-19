import jwt from "jsonwebtoken";
import prisma from "../lib/utils";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized - Invalid or Expired Token" });
    }

    if (!decoded?.id) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token Payload" });
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(decoded.id, 10) }, // Ensure ID is an integer
      select: { id: true, email: true, name: true }, // Exclude hashedPassword
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
