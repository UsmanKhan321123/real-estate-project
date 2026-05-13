import express from "express"
let userRouter = express.Router()

userRouter.get("/",(req,res)=>{
    console.log("hi")
})
export default userRouter