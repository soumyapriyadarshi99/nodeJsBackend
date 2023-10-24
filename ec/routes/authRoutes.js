const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getAllUser,
  getUserById,
  deleteUserById,
  updateUser,
  blockUser,
  unblockUser,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/allUsers", getAllUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);
router.put("/update-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
module.exports = router;
