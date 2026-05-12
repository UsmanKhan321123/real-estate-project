import express from "express"
import "dotenv/config"
let app = express()
let port = process.env.PORT || 5001;

app.listen(port,()=>{
 console.log(`Server is running on port ${port}`); 
})
