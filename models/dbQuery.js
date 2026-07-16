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
        error: "User not found/failed to update.",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      error: "User not found/failed to update.",
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

    if(reqBool === "true") {
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

module.exports = {
  createUser,
  findUser,
  findAllUsers,
  findUserThroughId,
  updateUserThroughId,
  deleteUserThroughId,
  createPost,
};
