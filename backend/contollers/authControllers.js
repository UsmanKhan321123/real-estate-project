import { hash, compare } from "bcrypt";

export let signup = async (req, res) => {
  let { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.json({
      messgae: "Please provide all fields",
    });
  }
  let hashPassword = await hash(password, 10);
  let newUSer = await prisma.user.create({
    username,
    email,
    password: hashPassword,
  });
};
export let login = (req, res) => {
  console.log(req.body);
};
export let logout = (req, res) => {
  console.log(req.body);
};
