import { generateToken } from "../lib/utils.js";
import prisma from "../lib/prisma.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
          }
        const user = await prisma.user.findUnique({
            where: { email },
          });
        
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                hashedPassword: hashedPassword,
            }
        })

        if (newUser) {
            // generate jwt token here
            const token = generateToken(newUser.id, res);
      
            res.status(201).json({
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
            });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" }); 
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

          const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);

          if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
          }

          const token = generateToken(user.id, res);

          res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
          });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    try {
      console.log("Before clearing:", req.cookies);

      res.clearCookie("jwt", { 
          httpOnly: true, 
          sameSite: "strict", 
          secure: process.env.NODE_ENV === "production",
          path: "/"
      });
      console.log("After clearing:", req.cookies);

      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export const deleteAccount = async (req, res) => {
    try {
        console.log("Before clearing:", req.cookies);

        res.clearCookie("jwt", { 
            httpOnly: true, 
            sameSite: "strict", 
            secure: process.env.NODE_ENV === "production",
            path: "/"
        });
        console.log("After clearing:", req.cookies);

        res.status(200).json({ message: "Account deleted" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkAuth = (req, res) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      console.log("Error in checkAuth controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };





