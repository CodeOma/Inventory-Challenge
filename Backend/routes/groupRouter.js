const express = require("express");
const router = new express.Router();
const Group = require("../db/models/group");
const { groupValidation } = require("../helper/errorHandler");
/** CREATE */
router.post("/group", async (req, res) => {
  try {
    groupValidation(req);
    if (groupValidation) {
      const group = await Group.create({
        group: req.body.group,
      });
      res.status(200).send(group);
    } else {
      throw new Error("Invalid group Format");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

/** GET */
router.get("/group", async (req, res) => {
  try {
    const group = await Group.find({});
    res.status(200).send(group);
  } catch (e) {
    res.status(500).send();
  }
});
/** GET By ID */
router.get("/group/:id", async (req, res) => {
  try {
    const group = await Group.find({
      _id: req.params.id,
    });
    res.status(200).send(group);
  } catch (e) {
    res.status(500).send();
  }
});

/**  Update */
router.put("/group/:id", async (req, res) => {
  try {
    //Validation
    groupValidation(req);

    const group = await Group.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).send(group);
  } catch (e) {
    res.status(500).send();
  }
});

/** DELETE */
router.delete("/group/:id", async (req, res) => {
  try {
    const group = await Group.deleteOne({
      _id: req.params.id,
    });
    res.status(200).send("Deleted");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
