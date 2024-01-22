const mongoose = require("mongoose");
const chalk = require("chalk");

// const MONGO_URI = process.env.MONGO_URI;

module.exports.connect = (MONGO_URI) => {
  mongoose.set("strictQuery", false);
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log(
        chalk.green(
          "MongoDB Database Connected at",
          chalk.blue(mongoose.connection.name)
        )
      );
    })
    .catch((error) => {
      console.error(chalk.red(error));
    });
};