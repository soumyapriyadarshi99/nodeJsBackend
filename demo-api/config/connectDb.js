const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/demo-api", {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Connection Issue ${error?.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;
