const { prisma } = require("../prisma/prismaClient");
const bcrypt = require("bcryptjs");

// finds user based on username and returns user. Usernames will always be unique
const findUser = async (username) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    return user;
  } catch (error) {
    return console.log(error);
  }
};

// creates and adds a new user with username and hashed password to db. Returns a bool for create success or fail.
const createUser = async (username, password) => {
  try {
    const saltAmount = parseInt(process.env.PASS_SALT);

    const hashedPassword = await bcrypt.hash(password, saltAmount); //hash the password with salt amount from .env

    const foundUser = await findUser(username);

    if (foundUser) {
      console.log("Username/user already exists");

      return false;
    } else {
      await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });

      return true;
    }
  } catch (error) {
    return console.log(error);
  }
};

// returns all users found in the database
const findAllUsers = async () => {
  try {
    const allUsers = await prisma.user.findMany({});

    return allUsers;
  } catch (error) {
    return console.log(error);
  }
};

// finds and returns a user based on userId, or sends back an error message
const findUserThroughId = async (userId) => {
  try {
    // req.params.userId is a string, so convert to integer for prisma where filter
    const userIdInt = parseInt(userId);

    const user = await prisma.user.findFirst({
      where: {
        id: userIdInt,
      },
    });

    if (user) {
      return user;
    } else {
      return {
        error: "User not found.",
      };
    }
  } catch (error) {
    return console.log(error);
  }
};

// finds user through Id and updates their username. Returns a success with updated user info or error message
const updateUserThroughId = async (updatedUserName, userId) => {
  try {
    const userIdInt = parseInt(userId);

    // update user username for specific user through userId
    const updatedUser = await prisma.user.update({
      where: {
        id: userIdInt,
      },
      data: {
        username: updatedUserName,
      },
    });

    if (updatedUser) {
      return updatedUser;
    } else {
      return {
        error: "User not found/failed to update user",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      error: "User not found/failed to update user",
    };
  }
};

// finds the current user through id and deletes their record from db. Returns deleted user or error
const deleteUserThroughId = async (currentUserId) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: currentUserId,
      },
    });

    if (deletedUser) {
      return deletedUser;
    } else {
      return {
        error: "User not found/failed to delete current user",
      };
    }
  } catch (error) {
    console.log(error);

    return {
      error: "User not found/failed to delete current user",
    };
  }
};

// creates a post and inserts entry into db
const createPost = async (req) => {
  try {
    // extract req.body form fields
    const postTitle = req.body.title;
    const postText = req.body.text;
    const datePosted = new Date(req.body.datePosted).toISOString();
    const reqBool = req.body.postedStatus;
    const userId = req.user.id; //current userId

    // set boolean post status
    let postStatus;

    if (reqBool === "true") {
      postStatus = true;
    } else {
      postStatus = false;
    }

    const newPost = await prisma.post.create({
      data: {
        title: postTitle,
        postText: postText,
        datePosted: datePosted,
        posted: postStatus,
        userId: userId,
      },
    });

    if (newPost) {
      return newPost;
    } else {
      return {
        error: "Post could not be created.",
      };
    }
  } catch (error) {
    return console.log(error);
  }
};

// readAllPosts gets all posts from the database and returns it
const readAllPosts = async () => {
  try {
    const allPosts = await prisma.post.findMany({});

    if (allPosts) {
      return allPosts;
    } else {
      return {
        error: "Cannot read/find any posts to return post",
      };
    }
  } catch (error) {
    return console.log(error);
  }
};

// readPost gets all post from the database and returns it
const readPost = async (postId) => {
  try {
    // convert postId into an int for where clause
    const intPostId = parseInt(postId);

    const post = await prisma.post.findFirst({
      where: {
        id: intPostId,
      },
    });

    if (post) {
      return post;
    } else {
      return {
        error: "Cannot read/find any posts to return post",
      };
    }
  } catch (error) {
    return console.log(error);
  }
};

// gets and updates the post with form info and returns the updated post if successful. Sends back error if post couldn't be found
const updatePost = async (postId, req) => {
  try {
    // convert postId to int for where clause
    const intPostId = parseInt(postId);

    // extract req.body form fields
    const newTitle = req.body.title;
    const newPostText = req.body.text;
    const dateUpdated = new Date(req.body.postUpdatedDate).toISOString();
    const reqBool = req.body.postedStatus;

    // assign boolean posted variable
    let postStatus;

    if (reqBool === "true") {
      postStatus = true;
    } else {
      postStatus = false;
    }

    // Take optionally updated values and update them with new updated values
    const updatedPost = await prisma.post.update({
      where: {
        id: intPostId,
      },
      data: {
        title: newTitle,
        postText: newPostText,
        datePosted: dateUpdated,
        posted: postStatus,
      },
    });

    if (updatedPost) {
      return updatedPost;
    } else {
      return {
        error: "Post not found/failed to update post",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      error: "Post not found/failed to update post",
    };
  }
};

// finds and deletes post based on postId from the db
const deletePost = async (postId) => {
  try {
    const intPostId = parseInt(postId);

    // deletes a single post based on the converted postId
    const deletedPost = await prisma.post.delete({
      where: {
        id: intPostId,
      },
    });

    if (deletedPost) {
      return deletedPost;
    } else {
      return {
        error: "Post not found/failed to delete post",
      };
    }
  } catch (error) {
    return {
      error: "Post not found/failed to delete post",
    };
  }
};

// find and returns all comments inside db
const readAllComments = async () => {
  try {
    const allComments = await prisma.comment.findMany({});

    if (allComments) {
      return allComments;
    } else {
      return {
        error: "Couldn't return all comments",
      };
    }
  } catch (error) {
    return console.log(error);
  }
};

// creates a comment record based on form data and returns new comment inserted into db
const createComment = async (req) => {
  try {
    // extract comment information from json
    const text = req.body.commentText;
    const dateCommented = new Date(req.body.dateCommented).toISOString(); //time when comment was created
    const userId = parseInt(req.user.id);
    const postId = parseInt(req.body.postId);

    const newComment = await prisma.comment.create({
      data: {
        commentText: text,
        dateCommented: dateCommented,
        userId: userId,
        postId: postId,
      },
    });

    if (newComment) {
      return newComment;
    } else {
      return {
        error: "Cannot create comment",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      error: "Cannot create comment",
    };
  }
};

// finds a comment based on commentId, returns single comment
const readComment = async (commentId) => {
  try {
    const intCommentId = parseInt(commentId);

    const foundComment = await prisma.comment.findFirst({
      where: {
        id: intCommentId,
      },
    });

    if (foundComment) {
      return foundComment;
    } else {
      return {
        error: "Cannot find/return comment",
      };
    }
  } catch (error) {
    return {
      error: "Cannot find/return comment",
    };
  }
};

// finds and updates comment based on form fields and commentId. Returns an error if comment not found
const updateComment = async (commentId, req) => {
  try {
    const intCommentId = parseInt(commentId);

    // get updated comment data from form fields
    const newCommentText = req.body.commentText;
    const dateUpdated = new Date(req.body.commentUpdatedDate).toISOString();
    const userId = parseInt(req.user.id);
    const postId = parseInt(req.body.postId);

    const updatedComment = await prisma.comment.update({
      where: {
        id: intCommentId,
      },
      data: {
        commentText: newCommentText,
        dateCommented: dateUpdated,
        userId: userId,
        postId: postId,
      },
    });

    if (updatedComment) {
      return updatedComment;
    } else {
      return {
        error: "Cannot find/update comment",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      error: "Cannot find/update comment",
    };
  }
};

module.exports = {
  createUser,
  findUser,
  findAllUsers,
  findUserThroughId,
  updateUserThroughId,
  deleteUserThroughId,
  createPost,
  readAllPosts,
  readPost,
  updatePost,
  deletePost,
  readAllComments,
  readComment,
  createComment,
  updateComment,
};
