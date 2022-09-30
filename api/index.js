const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const uploadImageRoute = require("./routes/uploadImages");

dotenv.config();
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => {
    console.log("Connected To The Database");
  })
  .catch(() => {
    console.log((err) => console.log(err));
  });
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/category", categoryRoute);
app.use("/api/upload", uploadImageRoute);


app.listen("5000", () => {
  console.log("Backend Is Running");
});
