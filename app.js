const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
//const layout = require("../public/stylesheets/style.css");
const { db, Page, User } = require("./models");

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", (req, res, next) => {
  res.send("hello world");
});

const init = async () => {
  await db.sync({ force: true });
  await Page.sync();
  await User.sync();
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();
