const express = require("express");
const router = new express.Router();
const Product = require("../db/models/product");
const { productValidation } = require("../helper/errorHandler");

/** Get All Products */
router.get("/product", async (req, res) => {
  try {
    const product = await Product.aggregate([
      {
        $lookup: {
          from: "groups",
          localField: "group",
          foreignField: "_id",
          as: "group",
        },
      },
      {
        $unwind: {
          path: "$group",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          inventory: 1,
          tags: 1,
          group: "$group.group",
        },
      },
    ]);
    console.log(product);
    res.status(200).send(product);
  } catch (e) {
    res.status(400).send();
  }
});

/** Get Product by ID */
router.get("/product/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const product = await Product.findOne({ _id: req.params.id });
    res.status(200).send(product);
  } catch (e) {
    res.status(400).send();
  }
});

/** Get Products by Group */
router.get("/group/product/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ group: req.params.id });
    res.status(200).send(product);
  } catch (e) {
    res.status(400).send();
  }
});

/** Post Create Product */
router.post("/product", async (req, res) => {
  try {
    productValidation(req);
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      inventory: req.body.inventory,
      tags: req.body.tags,
      group: req.body.group || null,
    });
    res.status(200).send(product);
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
});

/** Search Autocomplete */
router.get("/product/search/:key", async (req, res) => {
  try {
    let q = req.params.key;
    let query = {
      $or: [{ name: { $regex: q, $options: "i" } }],
    };
    console.log(req.params.key);

    const product = await Product.find(query).sort({ date: -1 }).limit(10);
    console.log(product);
    if (!product) {
      res.send([]);
    }
    const array = await product.map(prod => {
      return { name: prod.name, id: prod._id };
    });
    res.send(array);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

/** Product update */
router.put("/product/:id", async (req, res) => {
  try {
    productValidation(req);
    console.log(req.body);
    const product = await Product.findOneAndUpdate(
      { _id: req.body._id },
      {
        name: req.body.name,
        description: req.body.description,
        inventory: req.body.inventory,
        tags: req.body.tags,
        group: req.body.group || null,
      },
      {
        new: true,
      }
    );
    res.status(200).send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});

/** Delete */

router.delete("/product/:id", async (req, res) => {
  try {
    const product = await Product.deleteOne({
      _id: req.params.id,
    });
    res.status(200).send(product);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
module.exports = router;
