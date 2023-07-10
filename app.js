// Include express from node_modules and define server related variables
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");

const routes = require("./routes");

const usePassport = require("./config/passport");
require("./config/mongoose");

const app = express();
const port = 3000;

// setting template engine
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(
  session({
    secret: "ThisIsMySecret",
    resave: false,
    saveUninitialized: true,
  })
);

// setting static files
app.use(express.static("public"), express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

usePassport(app);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});
app.use(routes);

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
