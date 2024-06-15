const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/incomeRoute/index");
//require("./routes/stateRoute/index");
//require("./routes/userRoute/index");
const connectDB = require("./config/db.config");
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});