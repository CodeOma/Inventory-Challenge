const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  group: {
    type: String,
    required: true,
    unique: true,
  },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
