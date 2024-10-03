const express = require("express");
const config = require("config");
const userRoute = require("./routes/user.route");

const port = config.get("port");

const app = express();

app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("views"));

app.get("/", (req, res) => {
  res.render("pages/registration");
});

app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).jsonp("Internal Server Error!");
});

app.listen(process.env.PORT || port, async () => {
  console.log(`Server Running at PORT: ${port}`);

  await userRoute(app);
});
