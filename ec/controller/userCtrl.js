const generateToken = require("../config/jwtToken");
const { notFound } = require("../middlewares/errorHandler");
const user = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { validateMongodbid } = require("../utils/validateMongodbid");

//create a user
const createUser = asyncHandler(async (req, res) => {
  const email = req?.body?.email;
  const findUser = await user.findOne({ email: email });
  if (!findUser) {
    const newUser = await user.create(req?.body);
    res.status(200).json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

//login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  //check if the user exist or not
  const findUser = await user.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.status(200).json({
      id: findUser?.id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?.id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//update a user
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req?.user;
  validateMongodbid(_id);
  const updatedUser = await user.findByIdAndUpdate(
    _id,
    {
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      email: req?.body?.email,
      mobile: req?.body?.mobile,
    },
    { new: true }
  );
  res.json(updatedUser);
  try {
  } catch (error) {
    throw new Error(error);
  }
});

//get all users
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await user.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

//getUserById
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  validateMongodbid(id);
  try {
    const findUser = await user.findById(id);
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

//delete a user
const deleteUserById = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  validateMongodbid(id);
  try {
    const deletedUser = await user.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    throw new Error(error);
  }
});

//block user
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  validateMongodbid(id);
  try {
    const blockedUser = await user.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      { new: true }
    );
    res.json(blockedUser);
  } catch (error) {
    throw new Error(error);
  }
});

//unblock user
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  validateMongodbid(id);
  try {
    const unBlockedUser = await user.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      { new: true }
    );
    res.json(unBlockedUser);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  updateUser,
  getAllUser,
  getUserById,
  deleteUserById,
  blockUser,
  unblockUser,
};
