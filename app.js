// app.js

const express = require("express");
const path = require("path");
const pageRoutes = require("./routes/pageRoutes");

const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", pageRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
