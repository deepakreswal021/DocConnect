const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "DocConnect",
    })
    .then(() => {
      console.log(`Connected to database  ${mongoose.connection.host}.`.bgGreen.white);
    })
    .catch((err) => {
      console.log(`Some Error occured when connecting Database. ${err}`.bgRed.white);
    });
};

module.exports = connectDB;
