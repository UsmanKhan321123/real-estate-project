import { hash, compare } from "bcrypt";
import prisma from "../lib/prisma.js";

export let signup = async (req, res) => {
  let { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.json({
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
  let user = await prisma.user.findUnique({
    where: { username },
  });
};
export let logout = (req, res) => {
  console.log(req.body);
};
