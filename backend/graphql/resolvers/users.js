const { UserInputError, addErrorLoggingToSchema } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkAuth = require("../../utils/checkAuth");

const User = require("../../model/User");
const SECRET_KEY = process.env.SECRET_KEY;
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validator");

const { uploadImage } = require("../uploadImage");

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getUser(_, { userId }) {
      try {
        const user = await User.findById(userId).populate(
          "tweet Retweet following followers"
        );
        if (user) {
          return user;
        } else {
          throw new Error("User not found")
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async getSearchedUser(_, { username }) {
      try {
        let usrname = new RegExp("^" + username);
        const user = await User.find({ username: { $regex: usrname }})
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    async register(_, { username, password }) {
      const { valid, errors } = validateRegisterInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      //* checking if user already exists with same email || phone number
      const usedUsername = await User.findOne({ username})
      if (userUsername) {
        errors.general = "username already in use";
        throw new UserInputError("username already in use", { errors });
      }
      if (valid && !usedUsername) {
        hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
          username,
          password: hashedPassword,
        });
        const res = await newUser.save();
        const token = await jwt.sign(
          {
            id:res._id,
            email: res.email,
            username: res.username,
          },
          SECRET_KEY,
          { expiresIn: "1h" }
        );
        return {
          ...res.toJSON(),
          id: res._id,
          token,
        };
      }
    },
    async login(_, {input, password }) {
      const {valid, errors } = validateLoginInput(input, password);
      const user = 
        (await User.findOne({ username: `${input}`})) ||
        (await User.findOne({ phone: `${input}`})) ||
        (await User.findOne({ email: `${input}`}))
      if (!valid) {
        throw new UserInputError("Errors", {errors})
      }

      if (!user) {
        errors.general = "Users not found";
        throw new UserInputError("user not found", { errors });
      }
      const matchPasword = await bcrypt.compare(password, user.password);
      if (!matchPasword) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }
      if (matchPassword && valid && user) {
        const token = await jwt.sign(
          {
            id: user._id,
            email: user.email,
            username: user.username,
            phone: user.phone,
          },
          SECRET_KEY
        );
        return {
          ...user.toJSON(),
          id: user._id,
          token,
        };
      }
    },
    async editProfile(_, {
      username,
      password,
      email,
      phone,
      token,
      profilePic,
      banner,
      bio,
      location,
      website,
      name,
      userId,
    }) {
      try {
        const user = await User.findById(userId);
        const pPic = profile && (await uploadImage(profilePic));
        const bPic = banner && (await uploadImage(banner));
        if (user) {
          if (username !== undefined) {
            user.username = username;
          }
          if (userId !== undefined) {
            user.userId = userId;
          }
          if (password !== undefined) {
            user.password = password;
          }
          if (email !== undefined) {
            user.email = email;
          }
          if (phone !== undefined) {
            user.phone = phone;
          }
          if (profilePic !== undefined) {
            if (profilePic.length > 0) {
              user.profilePic = pPic;
            }
          }
          if (banner !== undefined) {
            if (banner.length > 0) {
              user.banner = bPic;
            }
          }
          if (token !== undefined) {
            user.token = token;
          }
          if (bio !== undefined) {
            user.bio = bio;
          }
          if (location !== undefined) {
            user.location = location;
          }
          if (website !== undefined) {
            user.website = website;
          }
          if (name !== undefined) {
            user.name = name;
          }
          user.save();
          return user;
        } else {
          throw new Error("user not found")
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    async followUnfollow(_, { otherUserId }, context) {
      try {
        const { id } = checkAuth(context);
        const otherUser = await User.findById(otherUserId).populate(
          "following followers"
        );
        const user = await User.finById(id).populate("following followers")
        if (otherUser.followers.find(m => m.id === id)) {
          return await User.findByIdAndUpdate(
            otherUserId,
            {
              $pull: { followers: id },
            },
            { new: true },
            (result) => {
              User.findByIdAndUpdate(
                id,
                {
                  $pull: { following: otherUserId },
                },
                { new: true }
              ).populate("following followers");
            }
          ).populate("following followers");
        } else {
          otherUser.followers.push(id);
          user.following.push(otherUserId);
          otherUser.save();
          user.save();
          return user, otherUser;
        }
      } catch (error) {
        throw new Error(error)
      }
    },
  },
};