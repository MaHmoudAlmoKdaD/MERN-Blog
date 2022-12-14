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
const path = require("path");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

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
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.use("/api/upload", uploadImageRoute);

app.listen("5000", () => {
  console.log("Backend Is Running");
});
