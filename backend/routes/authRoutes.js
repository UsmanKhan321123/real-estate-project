import express from "express"
import {login,signup,logout} from "../contollers/authControllers.js"
let authRouter = express.Router();
authRouter.post("/login",login)
authRouter.post("/signup",signup)
authRouter.post("/logout",logout)

export default authRouter