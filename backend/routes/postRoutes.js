import express from "express";
let postRouter = express.Router();

postRouter.get("/post", (req, res) => {
  console.log("");
});

postRouter.post("/post", (req, res) => {
  console.log("");
});

postRouter.put("/post", (req, res) => {
  console.log("");
});
postRouter.delete("/post", (req, res) => {
  console.log("");
});

export default postRouter;
