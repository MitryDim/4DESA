require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const dbConnect = require("./config/database");
const chalk = require("chalk");
const open = require("open");

const URI_DEV = process.env.MONGO_URI_DEV;
const URI_PROD = process.env.MONGO_URI_PROD;

/*
 * Ask Environment (dev or prod)
*/

const util = require("util");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = util.promisify(readline.question).bind(readline);

(async () => {
  let env;
  while (!env) {
    env = await question(
      "Quel environnement voulez-vous utiliser (dev ou prod) ? "
    );
    if (env !== "dev" && env !== "prod") {
      console.log(chalk.red("Please specify the environment (dev or prod)"));
      env = null;
    }
  }
  readline.close();

  let MONGO_URI;
  if (env === "dev") {
    console.log(
      chalk.green(`Running in ${chalk.red.bold("development")} mode`)
    );
    MONGO_URI = URI_DEV;
  } else if (env === "prod") {
    console.log(
      chalk.green(`Running in ${chalk.green.bold("production")} mode`)
    );
    MONGO_URI = URI_PROD;
  }

  dbConnect.connect(MONGO_URI);

  const app = express();

  app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ type: "application/json" }));

  const port = process.env.API_PORT;

  // server listening
  app.listen(port, () => {
    console.log(chalk.magenta(`Listening on port :`, chalk.yellow(port)));
    console.log(
      chalk.cyan(
        "Swagger on :",
        chalk.yellow.underline("http://localhost:4001/api/")
      )
    );
    if (env === "dev") {
      open("http://localhost:4001/api/");
    }
  });
  module.exports = app;
})();
