const express = require("express");
const router = express.Router();

const Homie = require("../../models/Homie")

router.get("/", async (req, res) => {
  try {
    const homies = await Homie.find();
    res.status(200).send(homies);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.post("/", async (req, res) => {
  try {
    const homie = new Homie(req.body);
    console.log(homie)
    await homie.save();
    res.status(201).send(homie);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const homie = await Homie.findById(req.params.id);
    if (!homie) {
      return res.status(404).send();
    }
    res.send(homie);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.put("/:id", async (req, res) => {
  try {
    const homie = await Homie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!homie) {
      return res.status(404).send();
    }
    res.send(homie);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const homie = await Homie.findByIdAndDelete(req.params.id);
    if (!homie) {
      return res.status(404).send();
    }
    res.send(homie);
  } catch (error) {
    res.status(500).send(error);
  }
});


  module.exports = router;
