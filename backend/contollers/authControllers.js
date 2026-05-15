import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export let signup = async (req, res) => {
  let { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.json({
      messgae: "Please provide all fields",
    });
  }
  let hashPassword = await hash(password, 10);
  let newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashPassword,
    },
  });
  res.json({
    message: "successfully done",
    body: newUser,
  });
};
export let login = async (req, res) => {
  let { username, password } = req.body;
  try {
    let user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }
    let isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Please Enter Correct Password",
      });
    }

    let token = await jwt.sign(
      { id: user.id, role: "user" },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    // res.setHeader("Set-Cookie" , "test=" + "myValue" ).json("success")
    res
      .cookie("Token", token, {
        httpOnly: true,
        // secure : true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .status(200)
      .json("login Successfully");
  } catch (error) {
    return res.json({ message: "Invalid Crede" });
  }
};

export let logout = (req, res) => {
  res.clearCookie("Token").status(200).json("User Logout Successfully");
};
