const express = require("express");
const app = express();
const cors = require("cors");
const { db } = require("./config/db");
const { todoRoutes } = require("./routes/todoRoutes");

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));

app.use(cors());

db.connect();

app.use(express.json());

app.use("/todos/api", todoRoutes);

app.listen(8000, () => {
  console.log("listening port 8000");
});
