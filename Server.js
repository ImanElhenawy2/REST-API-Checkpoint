const express = require("express");
const cors = require("cors");

const app = express();

//connection database
require("./database");

app.use(cors());
app.use(express.json());

//include Routes
const UserRouter = require("./Routes/User.Route");
// use Routes
app.use("/user", UserRouter)


app.listen(8080, () => console.log("server is running on port 8080 ...."));