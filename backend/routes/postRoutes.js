import express from "express";
import verifyToken from "./../middleware/verifyToken.js";
let postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.post("/postId", verifyToken, getPost);
postRouter.put("/:postId", verifyToken, updatePost);
postRouter.post("/postId", verifyToken, addPost);
postRouter.delete("/:postId", verifyToken, deletePost);

export default postRouter;
