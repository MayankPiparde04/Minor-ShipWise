const express = require("express");
const ItemData = require("../models/ItemSchema"); // Update model name as needed
const router = express.Router();

// Handle item removal
router.post("/removeitem", async (req, res) => {
  const { productName, quantity } = req.body;

  try {
    const item = await ItemData.findOne({ productName });

    if (!item) {
      return res.status(404).json({ error: "Item not found." });
    }

    // Check if the quantity to remove is greater than available quantity
    if (item.quantity < quantity) {
      return res.status(400).json({
        error: `Not enough quantity to remove. Available quantity: ${item.quantity}`,
      });
    }

    // Update the item's quantity
    item.quantity -= quantity;

    // If quantity becomes zero, delete the item
    if (item.quantity === 0) {
      await item.delete();
      return res.status(200).json({
        message: "Item removed completely and deleted from inventory.",
      });
    }

    // Save the updated item
    await item.save();
    res.status(200).json({
      message: `Item quantity updated successfully. Remaining quantity: ${item.quantity}`,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item." });
  }
});

module.exports = router;
