const express = require("express");
const app = express();
app.use(express.json());
const port = 3300;
const path = require("path");
var cors = require("cors");
const loginRoute = require("./api/routes/routes");

const monogodB = require("./api/helper/connection");


app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept","token"],
    exposedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true
  })
);

  
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  
  app.use("/", loginRoute);

app.listen(port, () => {
  console.log("Server Running at", port);
});
