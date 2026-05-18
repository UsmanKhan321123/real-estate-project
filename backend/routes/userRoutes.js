// import express from "express";
// import {
//   deleteUser,
//   getUser,
//   getUsers,
//   updateUser,
// } from "../contollers/userControllers.js";
// import verifyToken from "../middleware/verifyToken.js";
// let userRouter = express.Router();


// userRouter.get("/", getUsers);
// userRouter.get("/:userId", verifyToken, getUser);
// userRouter.put("/:userId", verifyToken, updateUser);
// userRouter.delete("/:userId", verifyToken, deleteUser);
// export default userRouter;


import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  savePost,
  profilePosts,
  getNotificationNumber,
} from "../contollers/userControllers.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUsers);
// router.get("/search/:id", verifyToken, getUser);
router.put("/:userId", verifyToken, updateUser);
router.delete("/:userId", verifyToken, deleteUser);
router.post("/save", verifyToken, savePost);
router.get("/profilePosts", verifyToken, profilePosts);
router.get("/notification", verifyToken, getNotificationNumber);
router.get("/:userId", verifyToken, getUser);

export default router;
