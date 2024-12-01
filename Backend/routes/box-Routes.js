const express = require("express");
const router = express.Router();
const BoxData = require("../models/BoxSchema");

// Add a New Box
router.post("/addbox", async (req, res) => {
  try {
    const { boxName, dimensions, quantity, unit } = req.body;

    // Check if the box already exists
    const existingBox = await BoxData.findOne({ boxName });
    if (existingBox) {
      return res.status(400).json({ error: "Box with this name already exists." });
    }

    // Create a new box entry
    const newBox = new BoxData({
      boxName,
      dimensions,
      quantity,
      unit,
    });

    // Save the new box data
    await newBox.save();
    res.status(201).json({ message: "Box added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add box." });
  }
});

// Update Existing Box Quantity
router.post("/updateboxquantity", async (req, res) => {
  try {
    const { boxName, additionalQuantity } = req.body;

    // Find the box by name
    const box = await BoxData.findOne({ boxName });
    if (!box) {
      return res.status(404).json({ error: "Box not found." });
    }

    // Update the box quantity
    box.quantity += parseInt(additionalQuantity, 10);
    await box.save();

    res.status(200).json({ message: "Box quantity updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update box quantity." });
  }
});

// Get All Boxes
router.get("/getboxes", async (req, res) => {
  try {
    const boxes = await BoxData.find();
    res.status(200).json(boxes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch boxes." });
  }
});

module.exports = router;
