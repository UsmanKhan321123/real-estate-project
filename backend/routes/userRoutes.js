import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../contollers/userControllers.js";
import verifyToken from "../middleware/verifyToken.js";
let userRouter = express.Router();


userRouter.get("/", getUsers);
userRouter.get("/:userId", verifyToken, getUser);
userRouter.put("/:userId", verifyToken, updateUser);
userRouter.delete("/:userId", verifyToken, deleteUser);
export default userRouter;
