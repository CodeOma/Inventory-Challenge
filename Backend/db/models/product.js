const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
  description: { type: String, required: true, trim: true },
  tags: [
    {
      type: String,
      enum: ["Sale", "Casual", "Mens", "Womens", "Sportswear"],
    },
  ],
  inventory: { type: Number, trim: true, default: 0 },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    default: null,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
