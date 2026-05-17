import prisma from "../lib/prisma.js";
let getPosts = async (req, res) => {
  try {
    let posts = await prisma.post.findMany();
    if (!posts) res.json("user has not created any post yet");
    return res.json({ message: "successfully fetched all posts", posts });
  } catch (error) {
    return res.json("failed to fetch posts");
  }
};

let getPost = async (req, res) => {
  try {
    let { postId } = req.params;
    let post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) res.json({ message: "Post Doen not exist" });
    return res.json({ message: "Successfully find the post", post });
  } catch (error) {
    return res.json("cannot find the post");
  }
};
export { getPosts, getPost };
