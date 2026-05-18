import prisma from "../lib/prisma.js";
let getPosts = async (req, res) => {
  try {
    let posts = await prisma.post.findMany();
    if (posts.length === 0) {
      return res.json({ message: "user has not created any post yet" });
    }
    return res.json({ message: "successfully fetched all posts", posts });
  } catch (error) {
    return res.json("failed to fetch posts");
  }
};

let getPost = async (req, res) => {
  let { postId } = req.params;
  try {
    let post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) res.json({ message: "Post Doen not exist" });
    return res.json({ message: "Successfully find the post", post });
  } catch (error) {
    return res.json("cannot find the post");
  }
};

let addPost = async (req, res) => {
  let TokenId = req.userId;
  let body = req.body;
  console.log("From addpost", TokenId, body);

  if (!TokenId) {
    return res.json({ message: "user not authenticated" });
  }
  try {
    let createdPost = await prisma.post.create({
      data: { ...body, userId: TokenId },
    });
    console.log(createdPost);

    return res.json({ message: "Successfully created the post", createdPost });
  } catch (error) {
    return res.json({ message: "Failed to create the post" });
  }
};

let deletePost = async (req, res) => {
  let userTokenid = req.userId;

  let { postId } = req.params;

  try {
    let post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      return res.json({ message: "post Does not Exist" });
    }
    if (post.id != userTokenid) {
      return res.json({ message: "user is not authorized" });
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    return res.json({ message: " Successfully deleted the post" });
  } catch (error) {
    return res.json({ message: "Failed to delete the post" });
  }
};
let updatePost = async (req, res) => {
  let userTokenid = req.userId;
  let { postId } = req.params;
  let body = req.body;
  if (!userTokenid) {
    return res.json({ messgae: "user not authenticated" });
  }
  try {
    let postToBeUpdated = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!postToBeUpdated) {
      return res.json({ message: "post not available" });
    }

    let updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { ...body },
    });
    return res.json({ message: "Post Successfully updated", updatePost });
  } catch (error) {
    return res.json({ message: "Failed to update the post" });
  }
};

export { getPosts, getPost, deletePost, addPost, updatePost };
