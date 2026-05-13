import express from "express";
let postRouter = express.Router();

postRouter.get("/", (req, res) => {
  // console.log("hi");
});

postRouter.post("/post", (req, res) => {
  // console.log("hi");
});

postRouter.put("/post", (req, res) => {
  // console.log("hi");
});
postRouter.delete("/post", (req, res) => {
  // console.log("hi");
});

export default postRouter;
