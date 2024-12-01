const express = require("express");
const BoxData = require("../models/BoxSchema");
const router = express.Router();

// Remove or Update Box Quantity
router.post("/removebox", async (req, res) => {
  const { boxName, quantity } = req.body;

  try {
    // Find the box by its name
    const box = await BoxData.findOne({ boxName });

    if (!box) {
      return res.status(404).json({ error: "Box not found." });
    }

    // Check if the requested quantity exceeds the current quantity
    if (quantity > box.quantity) {
      return res.status(400).json({
        error: `Available quantity is ${box.quantity}. Cannot remove ${quantity}.`,
      });
    }

    // Reduce the quantity or delete the box if quantity becomes 0
    box.quantity -= quantity;

    if (box.quantity === 0) {
      await box.delete(); // Remove the box from the database
      return res.status(200).json({ message: "Box removed completely." });
    }

    await box.save(); // Save the updated box data
    res.status(200).json({ message: "Box quantity updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update box quantity." });
  }
});

// Fetch All Boxes
router.get("/getboxes", async (req, res) => {
  try {
    const boxes = await BoxData.find();
    res.status(200).json(boxes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch boxes." });
  }
});

module.exports = router;
