const express = require("express");
const cors = require("cors");
/** Connect to db */
require("./db/mongoose.js");

/**Routers */
const productRouter = require("./routes/productRouter");
const groupRouter = require("./routes/groupRouter");

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());
app.use(express.json());
app.use(productRouter);
app.use(groupRouter);

const port = 5000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
