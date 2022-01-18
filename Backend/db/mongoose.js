const mongoose = require("mongoose");
const { DATABASE } = require("../proccess_env");

mongoose.connect("mongodb://127.0.0.1:27017/shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
