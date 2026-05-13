import express from "express";
import "dotenv/config";
import morgan from "morgan";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";

let app = express();
let port = process.env.PORT || 5001;
app.use(express.json());
app.use(morgan("combined"));



app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
