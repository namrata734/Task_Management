const express = require("express");
const app = express();
const cors = require("cors");

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const todoRoute = require("./routes/todos");

app.use(cors());
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/todo", todoRoute);

app.listen(5000, () => {
  console.log("server is running at port 5000");
});
