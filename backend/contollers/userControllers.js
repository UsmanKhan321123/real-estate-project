import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt"

let getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.json({ message: "user Does Not Exists" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.json({
      message: "User Does Not Exist",
    });
  }
};
let getUsers = async (req, res) => {
  let users = await prisma.user.findMany();
  return res.status(200).json(users);
};

//  let updateUser = async (req, res) => {
//   try {
//     let { userId } = req.params;

//     let loggedInUser = req.userId;

//     if (!loggedInUser) {
//       return res.status(401).json({ message: "Not Authenticated" });
//     }

//     if (userId !== loggedInUser) {
//       return res.status(403).json({ message: "Not Authorized" });
//     }

//     let userToBeUpdated = await prisma.user.findUnique({
//       where: { id: userId },
//     });

//     if (!userToBeUpdated) {
//       return res.status(404).json({ message: "User Not Found" });
//     }

//     let { username, email, password, avatar } = req.body;

//     let data = {};

//     if (username) data.username = username;
//     if (email) data.email = email;
//     if (avatar) data.avatar = avatar;

//     if (password) {
//       data.password = await bcrypt.hash(password, 10);
//     }

//     let updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data,
//     });

//     res.status(200).json({
//       message: "User Successfully Updated",
//       updatedUser,
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

let updateUser = async (req, res) => {
  try {
    let { userId } = req.params;
    let loggedInUser = req.userId;

    console.log("USER:", loggedInUser);

    if (!loggedInUser) {
      return res.status(401).json({ message: "Not Authenticated" });
    }

    if (userId.toString() !== loggedInUser.toString()) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    let userToBeUpdated = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userToBeUpdated) {
      return res.status(404).json({ message: "User Not Found" });
    }

    let { username, email, password, avatar } = req.body;

    let data = {};

    if (username) data.username = username;
    if (email) data.email = email;
    if (avatar) data.avatar = avatar;

    if (password && password.trim() !== "") {
      data.password = await bcrypt.hash(password, 10);
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    let updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });

    return res.status(200).json(updatedUser);

  } catch (err) {
    console.log("UPDATE ERROR:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};


let deleteUser = async (req, res) => {
  let { userId } = req.params;
  await prisma.user.delete({
    where: { id: userId },
  });
  return res.json("user successfully deleted")
};

let savePost = async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId;

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId,
        },
      },
    });

    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      return res.status(200).json({ message: "Post removed from saved list" });
    }

    await prisma.savedPost.create({
      data: {
        userId: tokenUserId,
        postId,
      },
    });

    return res.status(200).json({ message: "Post saved" });
  } catch (err) {
    console.log("SAVE POST ERROR:", err);
    return res.status(500).json({ message: "Failed to save post" });
  }
};

let profilePosts = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const userPosts = await prisma.post.findMany({
      where: { userId: tokenUserId },
    });

    const saved = await prisma.savedPost.findMany({
      where: { userId: tokenUserId },
      include: {
        post: true,
      },
    });

    const savedPosts = saved.map((item) => item.post);

    return res.status(200).json({ userPosts, savedPosts });
  } catch (err) {
    console.log("PROFILE POSTS ERROR:", err);
    return res.status(500).json({ message: "Failed to get profile posts" });
  }
};

let getNotificationNumber = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const number = await prisma.chat.count({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
        NOT: {
          seenBy: {
            hasSome: [tokenUserId],
          },
        },
      },
    });

    return res.status(200).json(number);
  } catch (err) {
    console.log("NOTIFICATION ERROR:", err);
    return res.status(500).json({ message: "Failed to get notification number" });
  }
};

export {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  savePost,
  profilePosts,
  getNotificationNumber,
};
  
