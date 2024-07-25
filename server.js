const express = require("express");
const app = express();
const connectDb = require("./config/db");
const userRouter = require("./routes/user");
const usersRouter = require("./routes/users");
const cors = require("cors");

connectDb();

app.use(cors());

app.use(express.json());

app.use("/user", userRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is up and running");
});
