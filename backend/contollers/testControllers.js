import jwt from "jsonwebtoken";

export let test = (req, res) => {
  console.log(res.json({ message: "testing" }));
};
export let shouldBeAdmin = (req, res) => {};
export let shouldBeLoggedIn = (req, res) => {
  const token = req.cookies.Token;
  if (!token) {
    return res.status(401).json("not authenticated");
  }
jwt.verify(token,process.env.JWT_SECRET)

};
