import express from "express"
let authRouter = express.Router();
authRouter.post("/login",(req,res)=>{
    console.log("");
    
})
authRouter.post("/signup",(req,res)=>{
    console.log("");

})
authRouter.get("/logout",(req,res)=>{
    console.log("");

})

export default authRouter