const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(" ")?.[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized ! Token Expired ! Please Log in Again");
    }
  } else {
    throw new Error("No Token Attached. Authentication Failed");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req?.user;
  const user = await User.findOne({ email });
  if (user?.role === "admin") {
    next();
  } else {
    throw new Error("You Are Not an Admin");
  }
});

module.exports = { authMiddleware, isAdmin };
