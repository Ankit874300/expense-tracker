const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/connectDb");

// dotenv config
dotenv.config();

connectDB();

const app = express();
//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
//route
//for user
app.use("/api/v1/users", require("./routes/userRoute"));
//for transection
app.use("/api/v1/transections", require("./routes/transectionRoute"));

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.get("/", (req, res) => {
  res.send("API is running");
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running in ${PORT} `);
});
