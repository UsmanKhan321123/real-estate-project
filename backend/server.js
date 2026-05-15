import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors"
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import testRouer from "./routes/testRoutes.js"

let app = express();
let port = process.env.PORT || 5001;
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/test", testRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
