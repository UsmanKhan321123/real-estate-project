import express from "express";
import verifyToken from "./../middleware/verifyToken.js";
import {
  getPost,
  getPosts,
  addPost,
  updatePost,
  deletePost,
} from "../contollers/postsControllers.js";
let postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.get("/:postId", verifyToken, getPost);
postRouter.put("/:postId", verifyToken, updatePost);
postRouter.post("/", verifyToken, addPost);
postRouter.delete("/:postId", verifyToken, deletePost);

export default postRouter;
