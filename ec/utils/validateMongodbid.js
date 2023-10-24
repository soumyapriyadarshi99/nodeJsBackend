const mongoose = require("mongoose");
const validateMongodbid = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error("This Id is Not Valid or Not Found");
  }
};
module.exports = { validateMongodbid };
